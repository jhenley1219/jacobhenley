import { idbGet, idbSet } from './idb.ts';
import { TARGETS, type Target } from './targets.ts';

const USE_LOCAL = false;
const LOCAL_MODEL_PATH = './models/';
const TRANSFORMERS_URL = 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.5.1';
const MODEL_ID = 'Xenova/all-MiniLM-L6-v2';
const CACHE_VERSION = 'v6';

export type ProgressInfo = { status?: string; progress?: number; total?: number };
export type MatchSource = 'keyword' | 'semantic';
export type ClassifyResult = { target: Target; score: number; source: MatchSource };

type FeatureExtractor = (
	text: string,
	opts: { pooling: string; normalize: boolean },
) => Promise<{ data: ArrayLike<number> }>;

type TransformersModule = {
	pipeline: (
		task: string,
		model: string,
		opts: { dtype: string; progress_callback?: (p: ProgressInfo) => void },
	) => Promise<FeatureExtractor>;
	env: {
		allowRemoteModels: boolean;
		allowLocalModels: boolean;
		localModelPath: string;
		useBrowserCache: boolean;
	};
};

type CachedVec = { id: string; vec: Array<number> };
type TargetVec = { id: string; vec: Float32Array };

const clean = (s: string): string =>
	s.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();

const normalizeQuery = (q: string): string => ' ' + clean(q) + ' ';

// Cross-target function words that carry no routing signal. Filtered from
// single-word scoring so a query's filler can't pull it toward whichever
// target happens to list those words. Full-phrase matches are unaffected.
const STOPWORDS = new Set<string>([
	'the', 'and', 'for', 'with', 'from', 'into', 'about', 'you', 'your', 'his', 'her',
	'they', 'them', 'their', 'that', 'this', 'these', 'those', 'there',
	'was', 'were', 'are', 'has', 'had', 'have', 'been', 'being',
	'any', 'all', 'some', 'more', 'most',
]);

class IntentClassifier {
	private extractor: FeatureExtractor | null = null;
	private targetVecs: Array<TargetVec> | null = null;
	private loadPromise: Promise<void> | null = null;
	ready = false;

	private keywordScore(q: string, t: Target): number {
		const query = normalizeQuery(q);
		let score = 0;
		const phrases = new Set([...t.ex, t.label].map(clean));
		const words = new Set<string>();
		for (const p of phrases) {
			if (query.indexOf(' ' + p + ' ') !== -1) {
				// Reward specificity: a longer exact phrase ("soft skills") is a
				// stronger signal than a generic single token ("skills"/"work").
				score += 2 + p.split(' ').length;
				continue;
			}
			for (const word of p.split(' ')) {
				if (word.length > 2 && !STOPWORDS.has(word)) words.add(word);
			}
		}
		// Count each distinct word once so a word repeated across a target's
		// phrases (e.g. "work" in flagship) can't inflate the score.
		for (const word of words) {
			if (query.indexOf(' ' + word + ' ') !== -1) score += 1;
		}
		return score;
	}

	private classifyKeyword(q: string): ClassifyResult | null {
		let best: Target | null = null;
		let bestScore = 0;
		for (const t of TARGETS) {
			const s = this.keywordScore(q, t);
			if (s > bestScore) {
				bestScore = s;
				best = t;
			}
		}
		return best ? { target: best, score: bestScore / 6, source: 'keyword' } : null;
	}

	load(onProgress?: (p: ProgressInfo) => void): Promise<void> {
		if (this.loadPromise) return this.loadPromise;
		this.loadPromise = import(/* @vite-ignore */ TRANSFORMERS_URL)
			.then((mod: TransformersModule) => {
				const { pipeline, env } = mod;
				if (USE_LOCAL) {
					env.allowRemoteModels = false;
					env.allowLocalModels = true;
					env.localModelPath = LOCAL_MODEL_PATH;
				} else {
					env.allowLocalModels = false;
				}
				env.useBrowserCache = true;
				return pipeline('feature-extraction', MODEL_ID, { dtype: 'q8', progress_callback: onProgress });
			})
			.then((ext) => {
				this.extractor = ext;
				return this.buildTargetVecs();
			})
			.then(() => {
				this.ready = true;
			})
			.catch((err) => {
				console.warn('[agent] model load failed, keyword fallback:', err);
			});
		return this.loadPromise;
	}

	private async embed(text: string): Promise<Float32Array> {
		const out = await this.extractor!(text, { pooling: 'mean', normalize: true });
		return Float32Array.from(out.data);
	}

	private async buildTargetVecs(): Promise<void> {
		const cacheKey = `targetvecs-${CACHE_VERSION}-${MODEL_ID}`;
		const cached = await idbGet<Array<CachedVec>>(cacheKey);
		if (cached && cached.length === TARGETS.length) {
			this.targetVecs = cached.map((c) => ({ id: c.id, vec: Float32Array.from(c.vec) }));
			return;
		}
		const out: Array<TargetVec> = [];
		for (const t of TARGETS) {
			const vec = await this.embed(t.label + '. ' + t.ex.join('. '));
			out.push({ id: t.id, vec });
		}
		this.targetVecs = out;
		void idbSet(cacheKey, out.map((o) => ({ id: o.id, vec: Array.from(o.vec) })));
	}

	private cosine(a: Float32Array, b: Float32Array): number {
		let s = 0;
		for (let i = 0; i < a.length; i++) s += a[i] * b[i];
		return s;
	}

	async classify(q: string): Promise<ClassifyResult | null> {
		const ql = ' ' + q.toLowerCase() + ' ';
		if (
			/(best|strongest|most impressive|impressive|proudest|biggest|flagship|standout|stand out|top)/.test(ql) &&
			/(work|project|thing|built|build|piece)/.test(ql)
		) {
			const fg = TARGETS.find((x) => x.id === 'flagship');
			if (fg) return { target: fg, score: 1, source: 'keyword' };
		}

		const kw = this.classifyKeyword(q);
		if (!this.ready || !this.targetVecs) return kw;

		try {
			const qv = await this.embed(q);
			let best: TargetVec | null = null;
			let bestSim = -1;
			for (const tv of this.targetVecs) {
				const sim = this.cosine(qv, tv.vec);
				if (sim > bestSim) {
					bestSim = sim;
					best = tv;
				}
			}
			const t = best ? TARGETS.find((x) => x.id === best!.id) : null;
			if (!t) return kw;
			if (kw && kw.score >= 0.5 && bestSim < 0.42) return kw;
			return { target: t, score: bestSim, source: 'semantic' };
		} catch {
			return kw;
		}
	}
}

export const Classifier = new IntentClassifier();
