import type { PageKey } from './routes.ts';
import { Classifier, type MatchSource, type ProgressInfo } from './Classifier.ts';
import { SUGGESTIONS, TARGETS, type Target } from './targets.ts';

type Mode = 'idle' | 'listening' | 'thinking' | 'travel' | 'select' | 'outline';
type Point = [number, number];
type Pending = { id: string; source: MatchSource };

type SpeechResultEvent = {
	results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }>;
};
type SpeechRecognitionLike = {
	lang: string;
	interimResults: boolean;
	maxAlternatives: number;
	start(): void;
	stop(): void;
	onresult: ((e: SpeechResultEvent) => void) | null;
	onerror: (() => void) | null;
	onend: (() => void) | null;
};
type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

const DRONE =
	'<g class="drone"><circle r="8" fill="#8d7dff" opacity="0.22"></circle><circle r="4" fill="#6d5cf0"></circle><circle r="1.7" fill="#fff"></circle></g>';
const DRONE_SET = DRONE.repeat(9);

const TEMPLATE =
	'<style>' +
	':host{position:fixed;inset:0;pointer-events:none;z-index:2147483000;font-family:"Hanken Grotesk",system-ui,sans-serif;}' +
	'*{box-sizing:border-box;}' +
	'#field{position:absolute;inset:0;overflow:visible;pointer-events:none;}' +
	'@keyframes march{to{stroke-dashoffset:-36}}' +
	'#edges{animation:march 1s linear infinite;}' +
	'.hit{position:absolute;right:22px;bottom:22px;width:96px;height:96px;border:0;background:transparent;border-radius:50%;cursor:pointer;pointer-events:auto;}' +
	'.bubble{position:absolute;max-width:264px;pointer-events:none;background:#fff;color:#1b1b22;border:1px solid #ece9ff;border-radius:16px;' +
	'padding:12px 15px;font-size:14px;line-height:1.45;box-shadow:0 24px 60px -18px rgba(75,59,196,.45),0 2px 8px rgba(0,0,0,.05);' +
	'opacity:0;transform:translateY(8px) scale(.96);transition:opacity .35s ease,transform .35s ease;}' +
	'.bubble.show{opacity:1;transform:none;}' +
	'.bubble .src{display:block;margin-top:7px;font-family:"JetBrains Mono",monospace;font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:#9a93c4;}' +
	'.dock{position:absolute;right:26px;bottom:26px;width:330px;pointer-events:auto;background:rgba(255,255,255,.88);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);' +
	'border:1px solid #eceaf6;border-radius:20px;padding:14px;box-shadow:0 30px 70px -24px rgba(60,50,130,.45);opacity:0;transform:translateY(14px) scale(.97);transition:opacity .3s ease,transform .3s ease;display:none;}' +
	'.dock.open{display:block;opacity:1;transform:none;}' +
	'.dock .top{display:flex;align-items:center;gap:8px;margin-bottom:11px;}' +
	'.dock .top .dot{width:8px;height:8px;border-radius:50%;background:#6d5cf0;box-shadow:0 0 0 4px rgba(109,92,240,.16);}' +
	'.dock .top .ttl{font-size:12px;font-weight:600;color:#2a2740;}' +
	'.dock .top .x{margin-left:auto;border:0;background:transparent;cursor:pointer;color:#9a96b5;font-size:18px;line-height:1;padding:2px 4px;}' +
	'.dock .hint{font-size:12px;color:#86829e;margin:0 2px 11px;line-height:1.5;}' +
	'.row{display:flex;gap:8px;align-items:center;}' +
	'.inp{flex:1;border:1px solid #e6e3f2;border-radius:12px;background:#fff;padding:11px 13px;font-size:14px;font-family:inherit;color:#1b1b22;outline:none;min-width:0;}' +
	'.inp:focus{border-color:#b9afff;box-shadow:0 0 0 3px rgba(109,92,240,.14);}' +
	'.iconbtn{flex:0 0 auto;width:42px;height:42px;border-radius:12px;border:1px solid #e6e3f2;background:#fff;cursor:pointer;display:grid;place-items:center;color:#6d5cf0;transition:all .2s ease;}' +
	'.iconbtn:hover{background:#f3f1ff;border-color:#cfc6ff;}' +
	'.iconbtn.go{background:#6d5cf0;border-color:#6d5cf0;color:#fff;}.iconbtn.go:hover{background:#5b49e6;}' +
	'.iconbtn.mic.live{background:#6d5cf0;border-color:#6d5cf0;color:#fff;animation:micpulse 1.1s ease-in-out infinite;}' +
	'@keyframes micpulse{0%,100%{box-shadow:0 0 0 0 rgba(109,92,240,.4)}50%{box-shadow:0 0 0 7px rgba(109,92,240,0)}}' +
	'.chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:11px;}' +
	'.chip{font-size:11.5px;border:1px solid #ece9fb;background:#f7f6ff;color:#5a5680;border-radius:999px;padding:5px 10px;cursor:pointer;transition:all .15s ease;font-family:inherit;}' +
	'.chip:hover{background:#6d5cf0;border-color:#6d5cf0;color:#fff;}' +
	'.status{font-size:11px;font-family:"JetBrains Mono",monospace;color:#a7a2c4;margin:10px 2px 1px;display:flex;align-items:center;gap:7px;min-height:14px;}' +
	'.bar{flex:1;height:3px;border-radius:3px;background:#ece9fb;overflow:hidden;}.bar>i{display:block;height:100%;width:0;background:#6d5cf0;transition:width .25s ease;}' +
	'.label{position:absolute;right:130px;bottom:46px;pointer-events:none;font-size:12px;color:#7a7596;background:#fff;border:1px solid #eceaf6;border-radius:999px;padding:5px 11px;white-space:nowrap;box-shadow:0 10px 30px -12px rgba(60,50,130,.4);opacity:0;transition:opacity .3s ease;}' +
	'.label.show{opacity:1;}' +
	'@media (max-width:560px){.dock{right:14px;left:14px;width:auto;bottom:14px;}}' +
	'</style>' +
	'<svg id="field" xmlns="http://www.w3.org/2000/svg">' +
	'<path id="edges" fill="none" stroke="#6d5cf0" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" stroke-dasharray="2 8" opacity="0"></path>' +
	'<rect id="marquee" rx="3" fill="rgba(109,92,240,0.10)" stroke="#6d5cf0" stroke-width="1.2" stroke-dasharray="4 4" opacity="0"></rect>' +
	DRONE_SET +
	'<circle id="ripple" fill="none" stroke="#6d5cf0" stroke-width="2" opacity="0"></circle>' +
	'<g id="cursor" opacity="0"><path d="M0,0 L0,21 L5.5,15.5 L9,23 L12,21.6 L8.6,14.4 L16,14 Z" fill="#4b3bc4" stroke="#fff" stroke-width="1.1" stroke-linejoin="round"></path></g>' +
	'</svg>' +
	'<button class="hit" id="hit" aria-label="Open the on-device guide"></button>' +
	'<div class="label" id="lbl">Ask me to find anything &rarr;</div>' +
	'<div class="bubble" id="bubble"></div>' +
	'<div class="dock" id="dock">' +
	'<div class="top"><span class="dot"></span><span class="ttl">On-device guide</span><button class="x" id="close" aria-label="Close">&times;</button></div>' +
	'<p class="hint">Ask in your own words. I run a small language model right in your browser, then walk you to the answer.</p>' +
	'<div class="row">' +
	'<input class="inp" id="inp" placeholder="e.g. show me his best work" autocomplete="off"/>' +
	'<button class="iconbtn mic" id="mic" aria-label="Speak" title="Speak"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/></svg></button>' +
	'<button class="iconbtn go" id="go" aria-label="Go"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></button>' +
	'</div>' +
	'<div class="chips" id="chips"></div>' +
	'<div class="status" id="status"><span id="statustext">Ready · text works now; voice &amp; smarter matching warm up on first ask</span></div>' +
	'</div>';

// idle dance formations (160-space, centred on 80,80)
const RING: Array<Point> = [[100, 56], [128, 66], [143, 92], [138, 122], [115, 141], [85, 141], [62, 122], [57, 92], [72, 66]];
const MAG: Array<Point> = [[118, 86], [103, 112], [73, 112], [58, 86], [73, 60], [103, 60], [116, 114], [133, 131], [150, 148]];
const CUBE_EDGES: Array<Point> = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
const CURS: Array<Point> = [[1, 2], [1, 11], [4, 7], [6, 15], [3, 5], [8, 11], [5, 19], [2, 16], [7, 7]];

export class PortfolioAgent extends HTMLElement {
	static readonly TAG = 'portfolio-agent';

	static register(): void {
		if (!customElements.get(PortfolioAgent.TAG)) {
			customElements.define(PortfolioAgent.TAG, PortfolioAgent);
		}
	}

	navigate: ((page: PageKey) => void) | null = null;

	private inited = false;
	private root!: ShadowRoot;
	private page: PageKey = 'index';
	private SC = 0.5;
	private mode: Mode = 'idle';
	private dockOpen = false;
	private idIdx = 0;
	private t0 = Date.now();
	private idStart = Date.now();
	private cur: Point = [0, 0];
	private cursorTo: Point = [0, 0];
	private _cursorOp = 0;
	private _marqOp = 0;
	private _eop = 0;
	private _lastRect: DOMRect | null = null;
	private dragStart: Point | null = null;
	private outlineEl: Element | null = null;
	private rect: DOMRect | null = null;
	private pos: Array<Point> = [];
	private pending: Pending | null = null;

	private _W = 0;
	private _H = 0;
	private _iv = 0;
	private _scrollIV = 0;
	private _rel = 0;
	private _bubT = 0;
	private _rippleAt = 0;
	private _warmed = false;
	private _rec: SpeechRecognitionLike | null = null;

	private field!: SVGSVGElement;
	private drones!: Array<Element>;
	private cursorEl!: SVGGElement;
	private marqEl!: SVGRectElement;
	private edgeEl!: SVGPathElement;
	private rippleEl!: SVGCircleElement;
	private bubble!: HTMLElement;
	private dock!: HTMLElement;
	private inp!: HTMLInputElement;

	connectedCallback(): void {
		if (this.parentElement !== document.body) {
			document.body.appendChild(this);
			return;
		}
		if (this.inited) return;
		this.inited = true;
		this.page = (this.getAttribute('data-page') as PageKey) || 'index';
		this.root = this.attachShadow({ mode: 'open' });
		this.root.innerHTML = TEMPLATE;
		this.bind();
		this.resize();
		const h = this.home();
		this.pos = Array.from({ length: 9 }, () => [h[0], h[1]] as Point);
		this.renderChips();
		this._iv = window.setInterval(() => this.tick(), 33);
		setTimeout(() => {
			if (!this.dockOpen && this.mode === 'idle') this.showLabel(true);
		}, 1800);
		setTimeout(() => this.showLabel(false), 7200);
	}

	disconnectedCallback(): void {
		clearInterval(this._iv);
	}

	setPage(page: PageKey): void {
		if (this.page === page) return;
		this.page = page;
		this.resumePending();
	}

	private $<T extends HTMLElement>(id: string): T {
		return this.root.getElementById(id) as unknown as T;
	}

	private bind(): void {
		this.field = this.$('field') as unknown as SVGSVGElement;
		this.drones = Array.from(this.root.querySelectorAll('.drone'));
		this.cursorEl = this.$('cursor') as unknown as SVGGElement;
		this.marqEl = this.$('marquee') as unknown as SVGRectElement;
		this.edgeEl = this.$('edges') as unknown as SVGPathElement;
		this.rippleEl = this.$('ripple') as unknown as SVGCircleElement;
		this.bubble = this.$('bubble');
		this.dock = this.$('dock');
		this.inp = this.$('inp');
		this.$('hit').addEventListener('click', () => this.toggleDock());
		this.$('close').addEventListener('click', () => this.toggleDock(false));
		this.$('go').addEventListener('click', () => this.submit(this.inp.value));
		this.inp.addEventListener('keydown', (e) => {
			if ((e as KeyboardEvent).key === 'Enter') this.submit(this.inp.value);
		});
		this.inp.addEventListener('focus', () => this.warm());
		this.$('mic').addEventListener('click', () => this.toggleMic());
		window.addEventListener('resize', () => this.resize());
	}

	private resize(): void {
		this._W = window.innerWidth;
		this._H = window.innerHeight;
		this.field.setAttribute('viewBox', '0 0 ' + this._W + ' ' + this._H);
		this.field.setAttribute('width', String(this._W));
		this.field.setAttribute('height', String(this._H));
	}

	private renderChips(): void {
		const c = this.$('chips');
		for (const [label, query] of SUGGESTIONS) {
			const b = document.createElement('button');
			b.className = 'chip';
			b.textContent = label;
			b.addEventListener('click', () => this.submit(query));
			c.appendChild(b);
		}
	}

	private home(): Point {
		const W = this._W || window.innerWidth;
		const H = this._H || window.innerHeight;
		if (W < 560) return [W - 60, this.dockOpen ? H - 250 : H - 64];
		return this.dockOpen ? [W - 191, H - 250] : [W - 70, H - 70];
	}

	/* ---- patterns (160-space) ---- */
	private pat(idx: number, ts: number): Array<Point> {
		const C = 80;
		const out: Array<Point> = [];
		if (idx === 0) {
			for (let i = 0; i < 9; i++) {
				const th = ts * 1.1 + i * ((Math.PI * 2) / 9);
				out.push([C + 54 * Math.cos(th), C + 26 * Math.sin(2 * th)]);
			}
		} else if (idx === 1) {
			const a = ts * 0.7;
			const b = ts * 0.5;
			const s = 44;
			const corners = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
			for (let i = 0; i < 8; i++) {
				const x = corners[i][0];
				const y = corners[i][1];
				const z = corners[i][2];
				const x1 = x * Math.cos(a) + z * Math.sin(a);
				const z1 = -x * Math.sin(a) + z * Math.cos(a);
				const y1 = y * Math.cos(b) - z1 * Math.sin(b);
				const z2 = y * Math.sin(b) + z1 * Math.cos(b);
				const f = 1.7 / (2.6 - z2);
				out.push([C + x1 * s * f, C + y1 * s * f]);
			}
			out.push([C, C]);
		} else if (idx === 2) {
			const rings = [[54, 1, 4], [34, -1.4, 3], [15, 2.2, 2]];
			for (const r of rings) {
				for (let k = 0; k < r[2]; k++) {
					const th = ts * r[1] + k * ((Math.PI * 2) / r[2]);
					out.push([C + r[0] * Math.cos(th), C + r[0] * Math.sin(th)]);
				}
			}
		} else if (idx === 3) {
			for (let i = 0; i < 9; i++) out.push([C + (i - 4) * 15, C + 20 * Math.sin(ts * 2.2 + i * 0.7)]);
		} else if (idx === 4) {
			for (let i = 0; i < 9; i++) {
				const p = (ts * 0.35 + i / 9) % 1;
				if (p < 0.8) {
					const u = p / 0.8;
					out.push([128 - u * 96, 110]);
				} else {
					const u2 = (p - 0.8) / 0.2;
					out.push([32 + u2 * 96, 110 - Math.sin(u2 * Math.PI) * 58]);
				}
			}
		} else if (idx === 5) {
			const ph = ts * 1.4;
			const bx = 80 - 48 * Math.cos(ph);
			const by = 104 - 60 * Math.abs(Math.sin(ph));
			out.push([32, 102 - Math.max(0, Math.cos(ph)) * 7]);
			out.push([128, 102 - Math.max(0, -Math.cos(ph)) * 7]);
			out.push([bx, by]);
			for (let k = 0; k < 6; k++) out.push([80, 50 + k * 12]);
		} else {
			const tri = (t: number, lo: number, hi: number): number => {
				const p = ((t % 2) + 2) % 2;
				const v = p < 1 ? p : 2 - p;
				return lo + (hi - lo) * v;
			};
			const gr = (ts * 0.85) % 2 < 1;
			const bx = tri(ts * 0.85, 36, 124);
			const by = tri(ts * 1.15, 46, 114);
			const lY = gr ? 80 : by;
			const rY = gr ? by : 80;
			for (let k = 0; k < 4; k++) out.push([32, lY - 18 + k * 12]);
			for (let k = 0; k < 4; k++) out.push([128, rY - 18 + k * 12]);
			out.push([bx, by]);
		}
		return out;
	}

	private perim(L: number, T: number, R: number, B: number, n: number): Array<Point> {
		const w = R - L;
		const h = B - T;
		const per = 2 * (w + h);
		const out: Array<Point> = [];
		for (let k = 0; k < n; k++) {
			const d = (per * k) / n;
			let x: number;
			let y: number;
			if (d < w) {
				x = L + d;
				y = T;
			} else if (d < w + h) {
				x = R;
				y = T + (d - w);
			} else if (d < 2 * w + h) {
				x = R - (d - w - h);
				y = B;
			} else {
				x = L;
				y = B - (d - 2 * w - h);
			}
			out.push([x, y]);
		}
		return out;
	}

	private roundRect(L: number, T: number, R: number, B: number, r: number): string {
		return (
			'M' + (L + r) + ',' + T + ' H' + (R - r) + ' A' + r + ',' + r + ' 0 0 1 ' + R + ',' + (T + r) +
			' V' + (B - r) + ' A' + r + ',' + r + ' 0 0 1 ' + (R - r) + ',' + B + ' H' + (L + r) +
			' A' + r + ',' + r + ' 0 0 1 ' + L + ',' + (B - r) + ' V' + (T + r) + ' A' + r + ',' + r + ' 0 0 1 ' + (L + r) + ',' + T + ' Z'
		);
	}

	private tick(): void {
		const now = Date.now();
		const ts = (now - this.t0) / 1000;
		const home = this.home();
		const mode = this.mode;
		const tgt: Array<Point> = new Array(9);
		let cursorOp = 0;
		let marqOn = false;
		let edgeMode: 'cube' | 'frame' | null = null;
		const H = (p: Point): Point => [home[0] + (p[0] - 80) * this.SC, home[1] + (p[1] - 80) * this.SC];

		if (mode === 'idle' || mode === 'listening' || mode === 'thinking') {
			let pts: Array<Point>;
			if (mode === 'listening') {
				const sc = 1 + 0.06 * Math.sin(ts * 6);
				pts = RING.map((p) => [80 + (p[0] - 80) * sc, 80 + (p[1] - 80) * sc]);
			} else if (mode === 'thinking') {
				const a = ts * 1.6;
				pts = MAG.map((p) => {
					const dx = p[0] - 90;
					const dy = p[1] - 86;
					return [90 + dx * Math.cos(a) - dy * Math.sin(a), 86 + dx * Math.sin(a) + dy * Math.cos(a)];
				});
			} else {
				const HOLD = 3200;
				const TRANS = 2000;
				const next = (this.idIdx + 1) % 7;
				const elapsed = now - this.idStart;
				let blend = 0;
				if (elapsed > HOLD) {
					const u = Math.min(1, (elapsed - HOLD) / TRANS);
					blend = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
				}
				const A = this.pat(this.idIdx, ts);
				const B = this.pat(next, ts);
				pts = A.map((p, i) => [p[0] * (1 - blend) + B[i][0] * blend, p[1] * (1 - blend) + B[i][1] * blend]);
				if ((blend < 0.5 ? this.idIdx : next) === 1) edgeMode = 'cube';
				if (elapsed >= HOLD + TRANS) {
					this.idIdx = next;
					this.idStart = now;
				}
			}
			for (let i = 0; i < 9; i++) tgt[i] = H(pts[i]);
		} else if (mode === 'travel' || mode === 'select') {
			this.cur[0] += (this.cursorTo[0] - this.cur[0]) * 0.12;
			this.cur[1] += (this.cursorTo[1] - this.cur[1]) * 0.12;
			for (let i = 0; i < 9; i++) tgt[i] = [this.cur[0] + CURS[i][0], this.cur[1] + CURS[i][1]];
			cursorOp = 1;
			if (mode === 'select') marqOn = true;
		} else if (mode === 'outline') {
			const r = this.outlineEl ? this.outlineEl.getBoundingClientRect() : this.rect!;
			this._lastRect = r;
			const per = this.perim(r.left - 10, r.top - 10, r.right + 10, r.bottom + 10, 9);
			for (let i = 0; i < 9; i++) tgt[i] = per[i];
			edgeMode = 'frame';
		}

		const lf = 0.2;
		for (let i = 0; i < 9; i++) {
			this.pos[i][0] += (tgt[i][0] - this.pos[i][0]) * lf;
			this.pos[i][1] += (tgt[i][1] - this.pos[i][1]) * lf;
			this.drones[i].setAttribute('transform', 'translate(' + this.pos[i][0].toFixed(1) + ',' + this.pos[i][1].toFixed(1) + ')');
		}
		this._cursorOp += (cursorOp - this._cursorOp) * 0.2;
		this.cursorEl.setAttribute('transform', 'translate(' + this.cur[0].toFixed(1) + ',' + this.cur[1].toFixed(1) + ')');
		this.cursorEl.setAttribute('opacity', this._cursorOp.toFixed(2));

		this._marqOp += ((marqOn ? 0.9 : 0) - this._marqOp) * 0.2;
		if (this.dragStart) {
			const mx = Math.min(this.dragStart[0], this.cur[0]);
			const my = Math.min(this.dragStart[1], this.cur[1]);
			this.marqEl.setAttribute('x', mx.toFixed(1));
			this.marqEl.setAttribute('y', my.toFixed(1));
			this.marqEl.setAttribute('width', Math.abs(this.cur[0] - this.dragStart[0]).toFixed(1));
			this.marqEl.setAttribute('height', Math.abs(this.cur[1] - this.dragStart[1]).toFixed(1));
		}
		this.marqEl.setAttribute('opacity', this._marqOp.toFixed(2));

		let eop = 0;
		if (edgeMode === 'cube') {
			let d = '';
			for (const [ai, bi] of CUBE_EDGES) {
				const pa = this.pos[ai];
				const pb = this.pos[bi];
				d += 'M' + pa[0].toFixed(1) + ',' + pa[1].toFixed(1) + 'L' + pb[0].toFixed(1) + ',' + pb[1].toFixed(1);
			}
			this.edgeEl.setAttribute('d', d);
			eop = 0.4;
		} else if (edgeMode === 'frame' && this._lastRect) {
			const r2 = this._lastRect;
			this.edgeEl.setAttribute('d', this.roundRect(r2.left - 10, r2.top - 10, r2.right + 10, r2.bottom + 10, 14));
			eop = 0.6;
		}
		this._eop += (eop - this._eop) * 0.15;
		this.edgeEl.setAttribute('stroke-opacity', this._eop.toFixed(2));

		if (this._rippleAt) {
			const age = now - this._rippleAt;
			if (age < 520) {
				const p = age / 520;
				this.rippleEl.setAttribute('cx', this.cur[0].toFixed(1));
				this.rippleEl.setAttribute('cy', this.cur[1].toFixed(1));
				this.rippleEl.setAttribute('r', (4 + p * 26).toFixed(1));
				this.rippleEl.setAttribute('opacity', (0.5 * (1 - p)).toFixed(2));
			} else {
				this.rippleEl.setAttribute('opacity', '0');
				this._rippleAt = 0;
			}
		}
	}

	private setMode(m: Mode): void {
		this.mode = m;
	}

	private toIdle(): void {
		this.mode = 'idle';
		this.outlineEl = null;
		this.dragStart = null;
	}

	private showLabel(on: boolean): void {
		this.$('lbl').classList.toggle('show', on);
	}

	private toggleDock(force?: boolean): void {
		this.dockOpen = force === undefined ? !this.dockOpen : force;
		this.dock.classList.toggle('open', this.dockOpen);
		this.showLabel(false);
		if (this.dockOpen) {
			this.warm();
			setTimeout(() => this.inp.focus(), 80);
		}
	}

	private warm(): void {
		if (this._warmed) return;
		this._warmed = true;
		this.setStatus('Loading on-device model … one-time · then cached locally', 0.04);
		Classifier.load((p: ProgressInfo) => {
			if (p && p.status === 'progress' && p.total) {
				this.setStatus('Downloading model … ' + Math.round(p.progress || 0) + '%', (p.progress || 0) / 100);
			} else if (p && p.status === 'ready') {
				this.setStatus('Model ready · on-device', 1);
			}
		}).then(() => {
			this.setStatus(
				Classifier.ready
					? 'Ready · on-device semantic matching active'
					: 'Running in keyword mode · text matching active',
				1,
			);
		});
	}

	private setStatus(text: string, frac?: number): void {
		this.$('statustext').textContent = text;
		const s = this.$('status');
		let bar = s.querySelector<HTMLElement>('.bar');
		if (frac != null) {
			if (!bar) {
				bar = document.createElement('span');
				bar.className = 'bar';
				bar.innerHTML = '<i></i>';
				s.appendChild(bar);
			}
			const fill = bar.querySelector<HTMLElement>('i')!;
			fill.style.width = Math.max(0, Math.min(1, frac)) * 100 + '%';
			if (frac >= 1) {
				const toRemove = bar;
				setTimeout(() => {
					if (toRemove.parentNode) toRemove.remove();
				}, 900);
			}
		}
	}

	private toggleMic(): void {
		const w = window as unknown as {
			SpeechRecognition?: SpeechRecognitionCtor;
			webkitSpeechRecognition?: SpeechRecognitionCtor;
		};
		const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
		if (!SR) {
			this.setStatus("Voice isn't supported in this browser, so type instead");
			this.inp.focus();
			return;
		}
		if (this._rec) {
			try {
				this._rec.stop();
			} catch {
				/* ignore */
			}
			this._rec = null;
			return;
		}
		const rec = new SR();
		rec.lang = 'en-US';
		rec.interimResults = true;
		rec.maxAlternatives = 1;
		this._rec = rec;
		this.$('mic').classList.add('live');
		this.setMode('listening');
		this.setStatus('Listening …');
		rec.onresult = (e: SpeechResultEvent): void => {
			let txt = '';
			for (let i = 0; i < e.results.length; i++) txt += e.results[i][0].transcript;
			this.inp.value = txt;
			if (e.results[e.results.length - 1].isFinal) {
				this.endMic();
				this.submit(txt);
			}
		};
		rec.onerror = (): void => {
			this.endMic();
			this.setStatus("Didn't catch that. Try again or type");
		};
		rec.onend = (): void => this.endMic();
		try {
			rec.start();
		} catch {
			this.endMic();
		}
	}

	private endMic(): void {
		this.$('mic').classList.remove('live');
		if (this.mode === 'listening') this.setMode('idle');
		this._rec = null;
	}

	private submit(text: string): void {
		text = (text || '').trim();
		if (!text) return;
		this.inp.value = text;
		this.warm();
		this.setMode('thinking');
		this.setStatus('Thinking …');
		this.hideBubble();
		Classifier.classify(text).then((res) => {
			if (!res || !res.target) {
				this.setMode('idle');
				this.setStatus('Not sure. Try work, skills, research, or contact');
				this.bubbleAtHome(
					'Hmm, I couldn’t place that. Try “his best work”, “skills”, “research”, or “contact”.',
					'no match',
				);
				return;
			}
			this.setStatus((res.source === 'semantic' ? 'Matched on-device · ' : 'Matched · ') + res.target.label);
			this.go(res.target, res.source);
		});
	}

	private navButton(page: PageKey): HTMLElement | null {
		return document.querySelector<HTMLElement>('[data-agent-nav="' + page + '"]');
	}

	private go(target: Target, source: MatchSource): void {
		if (target.page !== this.page) {
			const link = this.navButton(target.page);
			const home = this.home();
			this.pending = { id: target.id, source };
			if (link) {
				const r = link.getBoundingClientRect();
				this.cur = [home[0], home[1]];
				this.setMode('travel');
				this.cursorTo = [r.left + r.width / 2, r.top + r.height / 2];
				setTimeout(() => {
					this._rippleAt = Date.now();
				}, 820);
				setTimeout(() => this.navigate?.(target.page), 1200);
			} else {
				this.navigate?.(target.page);
			}
			return;
		}
		this.reveal(target, source);
	}

	private resumePending(): void {
		const p = this.pending;
		if (!p) return;
		const target = TARGETS.find((t) => t.id === p.id);
		if (!target || target.page !== this.page) return;
		this.pending = null;
		setTimeout(() => this.reveal(target, p.source), 250);
	}

	private reveal(target: Target, source: MatchSource, tries = 0): void {
		const el = document.querySelector(target.sel);
		if (!el) {
			if (tries < 24) {
				window.setTimeout(() => this.reveal(target, source, tries + 1), 180);
				return;
			}
			this.toIdle();
			return;
		}
		const rectAbs = el.getBoundingClientRect();
		const targetY = window.scrollY + rectAbs.top - Math.max(90, (window.innerHeight - rectAbs.height) / 2);
		this.smoothScrollTo(Math.max(0, targetY), 560);
		setTimeout(() => {
			const r = el.getBoundingClientRect();
			const home = this.home();
			this.outlineEl = el;
			this.cur = [home[0], home[1]];
			this.setMode('travel');
			this.cursorTo = [r.left + 16, r.top + 16];
			setTimeout(() => {
				const r2 = el.getBoundingClientRect();
				this.dragStart = [r2.left + 8, r2.top + 8];
				this.setMode('select');
				this.cursorTo = [r2.right - 8, r2.bottom - 8];
				setTimeout(() => {
					this.setMode('outline');
					this.rect = el.getBoundingClientRect();
					this._rippleAt = Date.now();
					this.bubbleNear(this.rect, target.say, source);
					clearTimeout(this._rel);
					this._rel = window.setTimeout(() => {
						this.toIdle();
						this.hideBubble();
					}, 5200);
				}, 1000);
			}, 1000);
		}, 600);
	}

	private smoothScrollTo(to: number, duration: number): void {
		const start = window.scrollY || 0;
		const max = Math.max(0, (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight);
		to = Math.max(0, Math.min(to, max));
		const dist = to - start;
		if (Math.abs(dist) < 2) {
			window.scrollTo(0, to);
			return;
		}
		clearInterval(this._scrollIV);
		const t0 = Date.now();
		const ease = (p: number): number => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);
		this._scrollIV = window.setInterval(() => {
			const p = Math.min(1, (Date.now() - t0) / duration);
			window.scrollTo(0, Math.round(start + dist * ease(p)));
			if (p >= 1) clearInterval(this._scrollIV);
		}, 16);
	}

	private bubbleNear(rect: DOMRect, text: string, source: MatchSource): void {
		const b = this.bubble;
		b.innerHTML = this.esc(text) + (source ? '<span class="src">' + (source === 'semantic' ? 'on-device match' : 'matched') + '</span>' : '');
		const bw = 264;
		const x = Math.min(Math.max(rect.left, 12), this._W - bw - 12);
		const y = Math.max(rect.top - 14, 64);
		b.style.left = x + 'px';
		b.style.top = y + 'px';
		b.style.transform = 'translateY(-100%)';
		b.classList.add('show');
	}

	private bubbleAtHome(text: string, source: string): void {
		const b = this.bubble;
		const h = this.home();
		b.innerHTML = this.esc(text) + (source ? '<span class="src">' + source + '</span>' : '');
		b.style.left = Math.max(12, h[0] - 230) + 'px';
		b.style.top = h[1] - 20 + 'px';
		b.style.transform = 'translateY(-100%)';
		b.classList.add('show');
		clearTimeout(this._bubT);
		this._bubT = window.setTimeout(() => this.hideBubble(), 4600);
	}

	private hideBubble(): void {
		this.bubble.classList.remove('show');
	}

	private esc(s: string): string {
		return String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c] || c);
	}
}
