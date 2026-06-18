import { beforeAll, describe, expect, it } from 'vitest';
import { Classifier } from './Classifier.ts';
import { CANONICAL, QUESTION_BANK, type Kind } from './intent.fixtures.ts';

type Outcome = { q: string; kind: Kind; acceptable: Array<string>; got: string; score: number };

const outcomes: Array<Outcome> = [];

beforeAll(async () => {
	for (const [q, kind, ...acceptable] of QUESTION_BANK) {
		const res = await Classifier.classify(q);
		outcomes.push({
			q,
			kind,
			acceptable,
			got: res ? res.target.id : 'NO_MATCH',
			score: res ? res.score : 0,
		});
	}
});

const forKind = (kind: Kind): Array<Outcome> => outcomes.filter((o) => o.kind === kind);
const isHit = (o: Outcome): boolean => o.got !== 'NO_MATCH' && o.acceptable.includes(o.got);

describe('canonical routing (hard guarantees)', () => {
	it.each(CANONICAL)('routes %j -> %s', async (q, want) => {
		const res = await Classifier.classify(q);
		expect(res?.target.id).toBe(want);
	});
});

describe('recruiter question bank (keyword path)', () => {
	it('has at least 500 unique questions', () => {
		const qs = QUESTION_BANK.map((r) => r[0]);
		expect(qs.length).toBeGreaterThanOrEqual(500);
		expect(new Set(qs).size).toBe(qs.length);
	});

	it('routes navigational questions to an expected section', () => {
		const nav = forKind('nav');
		const misses = nav.filter((o) => !isHit(o));
		if (misses.length) {
			console.error(
				`NAV misses (${misses.length}/${nav.length}):\n` +
					misses.map((m) => `  got=${m.got} want=${m.acceptable.join('/')} "${m.q}"`).join('\n'),
			);
		}
		expect((nav.length - misses.length) / nav.length).toBeGreaterThanOrEqual(0.97);
	});

	it('never gives a confident answer to out-of-scope questions', () => {
		const oos = forKind('oos');
		const leaks = oos.filter((o) => o.got !== 'NO_MATCH' && o.score >= 0.5);
		if (leaks.length) {
			console.error(
				`OOS leaks (${leaks.length}/${oos.length}):\n` +
					leaks.map((m) => `  got=${m.got} score=${m.score.toFixed(2)} "${m.q}"`).join('\n'),
			);
		}
		expect((oos.length - leaks.length) / oos.length).toBeGreaterThanOrEqual(0.9);
	});

	it('keeps soft-question routing above the keyword floor', () => {
		const soft = forKind('soft');
		const hits = soft.filter(isHit);
		expect(hits.length / soft.length).toBeGreaterThanOrEqual(0.3);
	});
});
