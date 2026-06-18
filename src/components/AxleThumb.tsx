import { useEffect, useRef } from 'react';
import { AxleOrb } from './AxleOrb.tsx';
import styles from './AxleThumb.module.css';

/* Living node-graph background: drifting nodes with proximity links, cursor
   repulsion, and data-pulses travelling the edges. The idle orb sits on top. */

const COLORS = ['#c9ff2e', '#33ffe0', '#ff2f86', '#ff6a1a'];
const LINK = 138;

type GraphNode = {
	x: number;
	y: number;
	vx: number;
	vy: number;
	r: number;
	col: string | null;
	glow: boolean;
	ph: number;
};

type Pulse = { a: GraphNode; b: GraphNode; t: number; spd: number; col: string };

export const AxleThumb = (): React.ReactElement => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const mouse = useRef({ x: -1e3, y: -1e3 });

	useEffect(() => {
		const c = canvasRef.current;
		const host = c?.parentElement;
		if (!c || !host) return;
		const ctx = c.getContext('2d');
		if (!ctx) return;

		let W = 0;
		let H = 0;
		let dpr = 1;
		let nodes: Array<GraphNode> = [];
		let pulses: Array<Pulse> = [];

		const init = (): void => {
			const count = Math.max(36, Math.min(110, Math.round((W * H) / 15000)));
			nodes = [];
			for (let i = 0; i < count; i++) {
				const accent = Math.random() < 0.26;
				nodes.push({
					x: Math.random() * W,
					y: Math.random() * H,
					vx: (Math.random() - 0.5) * 0.22,
					vy: (Math.random() - 0.5) * 0.22,
					r: Math.random() * 1.7 + 0.7,
					col: accent ? COLORS[(Math.random() * COLORS.length) | 0] : null,
					glow: accent && Math.random() < 0.5,
					ph: Math.random() * 6.28,
				});
			}
			pulses = [];
		};

		const resize = (): void => {
			dpr = Math.min(window.devicePixelRatio || 1, 2);
			W = host.clientWidth;
			H = host.clientHeight;
			c.width = W * dpr;
			c.height = H * dpr;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			init();
		};

		const spawnPulse = (): void => {
			const a = nodes[(Math.random() * nodes.length) | 0];
			let best: GraphNode | null = null;
			let bd = LINK * LINK;
			for (const b of nodes) {
				if (b === a) continue;
				const dx = a.x - b.x;
				const dy = a.y - b.y;
				const d = dx * dx + dy * dy;
				if (d < bd) {
					bd = d;
					best = b;
				}
			}
			if (best) {
				pulses.push({ a, b: best, t: 0, spd: 0.012 + Math.random() * 0.022, col: COLORS[(Math.random() * COLORS.length) | 0] });
			}
		};

		let tick = 0;
		let raf = 0;
		const step = (): void => {
			tick++;
			ctx.clearRect(0, 0, W, H);
			const m = mouse.current;

			for (const n of nodes) {
				n.x += n.vx;
				n.y += n.vy;
				const mdx = n.x - m.x;
				const mdy = n.y - m.y;
				const md = Math.hypot(mdx, mdy);
				if (md < 130 && md > 0.001) {
					n.x += (mdx / md) * 0.8;
					n.y += (mdy / md) * 0.8;
				}
				if (n.x < 0 || n.x > W) n.vx *= -1;
				if (n.y < 0 || n.y > H) n.vy *= -1;
				n.x = Math.max(0, Math.min(W, n.x));
				n.y = Math.max(0, Math.min(H, n.y));
			}

			for (let i = 0; i < nodes.length; i++) {
				const a = nodes[i];
				for (let j = i + 1; j < nodes.length; j++) {
					const b = nodes[j];
					const dx = a.x - b.x;
					const dy = a.y - b.y;
					const d2 = dx * dx + dy * dy;
					if (d2 < LINK * LINK) {
						const o = 1 - Math.sqrt(d2) / LINK;
						ctx.strokeStyle = 'rgba(243,238,226,' + (o * 0.13).toFixed(3) + ')';
						ctx.lineWidth = 1;
						ctx.beginPath();
						ctx.moveTo(a.x, a.y);
						ctx.lineTo(b.x, b.y);
						ctx.stroke();
					}
				}
			}

			for (const n of nodes) {
				const pulse = n.glow ? 0.6 + 0.4 * Math.sin(tick * 0.04 + n.ph) : 1;
				ctx.beginPath();
				ctx.arc(n.x, n.y, n.r, 0, 6.2832);
				if (n.col) {
					ctx.fillStyle = n.col;
					if (n.glow) {
						ctx.shadowColor = n.col;
						ctx.shadowBlur = 10 * pulse;
					}
				} else {
					ctx.fillStyle = 'rgba(243,238,226,.45)';
				}
				ctx.globalAlpha = n.col ? pulse : 1;
				ctx.fill();
				ctx.shadowBlur = 0;
				ctx.globalAlpha = 1;
			}

			if (pulses.length < 14 && Math.random() < 0.06) spawnPulse();
			for (let k = pulses.length - 1; k >= 0; k--) {
				const p = pulses[k];
				p.t += p.spd;
				if (p.t >= 1) {
					pulses.splice(k, 1);
					continue;
				}
				const x = p.a.x + (p.b.x - p.a.x) * p.t;
				const y = p.a.y + (p.b.y - p.a.y) * p.t;
				ctx.beginPath();
				ctx.arc(x, y, 2.1, 0, 6.2832);
				ctx.fillStyle = p.col;
				ctx.shadowColor = p.col;
				ctx.shadowBlur = 12;
				ctx.fill();
				ctx.shadowBlur = 0;
			}

			raf = requestAnimationFrame(step);
		};

		resize();
		const ro = new ResizeObserver(resize);
		ro.observe(host);
		raf = requestAnimationFrame(step);

		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
		};
	}, []);

	const onMove = (e: React.PointerEvent): void => {
		const c = canvasRef.current;
		if (!c) return;
		const rect = c.getBoundingClientRect();
		mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
	};
	const onLeave = (): void => {
		mouse.current = { x: -1e3, y: -1e3 };
	};

	return (
		<div className={styles.wrap} onPointerMove={onMove} onPointerLeave={onLeave}>
			<canvas ref={canvasRef} className={styles.net}></canvas>
			<div className={styles.core}>
				<AxleOrb state="static" finish="signature" size={110} seed={2} />
			</div>
		</div>
	);
};
