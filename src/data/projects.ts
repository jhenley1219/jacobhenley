export type ProjectId =
	| 'flagship'
	| 'axle'
	| 'robot-arm'
	| 'sim'
	| 'autonomous'
	| 'noseknows'
	| 'blimp'
	| 'purdue';

export type Project = {
	eyebrow: string;
	title: string;
	role: string;
	year: string;
	img: string;
	problem: string;
	build: Array<string>;
	impact: Array<string>;
	stack: string;
	imgPos?: string;
	links?: Array<{ label: string; href: string }>;
	live?: boolean;
};

export const PROJECTS: Record<ProjectId, Project> = {
	flagship: {
		eyebrow: 'Flagship · Production platform',
		title: 'Design-automation platform',
		role: 'Full-Stack Software Engineer',
		year: '2023–Present',
		img: 'images/kitchen-platform.jpg',
		problem:
			'A production platform a manufacturer uses to design, price, and sell custom outdoor kitchens.',
		build: [
			'In-house image pipeline that turns a design into a sales-ready rendering, from an uploaded photo or the customer’s own photos in the CRM.',
			'3D environment objects: seating, bar stools, canvases, and full-scene staging.',
			'Customer-facing design package: a shareable presentation with the 3D model, an itemized estimate, and a printable quote.',
			'CRM integration that keeps design, pricing, and customer data in sync through its API.',
		],
		impact: [
			'Replaced an outsourced rendering firm, saving ~$90k a year.',
			'Used daily to design and quote every build.',
		],
		stack: 'TypeScript · React 19 · Three.js · Azure (SWA, Functions) · SQL · Prisma · HubSpot API · Replicate · Auth · CI/CD',
	},
	axle: {
		eyebrow: 'Open source · Spatial agent workspace',
		title: 'Axle',
		role: 'Creator · Full-stack',
		year: '2026',
		img: 'images/axle.svg',
		live: true,
		problem:
			'Coding agents can change real files and run real commands now. The hard part is keeping track of a few at once across a stack of look-alike terminals.',
		build: [
			'A self-hosted control surface for coding agents: direct and supervise them from one place instead of babysitting terminals.',
			'Lays every project out in space, a 2D constellation or a 3D galaxy in Three.js, so you track work by where it sits, not by re-reading it.',
			'Voice output and one-command Docker isolation, with anything destructive gated behind a tap or a spoken yes.',
		],
		impact: [
			'See at a glance what every agent is doing and where it lives.',
			'Open source and built from swappable parts, not locked to one model or voice vendor.',
		],
		stack: 'TypeScript · React · Node/Express · WebSocket · Three.js · MCP · Claude Code CLI · Docker',
		links: [{ label: 'GitHub', href: 'https://github.com/jhenley1219/axel' }],
	},
	'robot-arm': {
		eyebrow: 'HRI research',
		title: 'Research robot arm',
		role: 'Researcher',
		year: '2024–2025',
		img: 'images/robot-arm.jpg',
		problem:
			'Behavioral studies needed a real robot that moves precisely and repeatably through a participant session.',
		build: [
			'Programmed a collaborative robot arm at the control-interface level in C++ and ROS.',
			'Designed the motion paradigms for the experimental task.',
			'Tuned behavior for safe, legible interaction with study participants.',
		],
		impact: ['Enabled physical human-robot interaction studies with a real manipulator.'],
		stack: 'C++ · ROS · Real-time control interface',
	},
	sim: {
		eyebrow: 'Research tooling',
		title: 'Robotics simulation',
		role: 'Lead researcher',
		year: '2024–2025',
		img: 'images/robot-sim.jpg',
		problem:
			'Some study conditions are safer and far more controllable as a high-fidelity simulation than with hardware.',
		build: [
			'Modeled and animated a robot performing a pick-and-place task in a controlled scene.',
			'Designed framing conditions that shift how participants perceive the same robot.',
		],
		impact: ['Provided a clean, controlled stimulus for measuring how people read machines.'],
		stack: 'Blender · 3D modeling · Animation',
	},
	autonomous: {
		eyebrow: 'HRI · Embedded systems',
		title: 'Autonomous robot',
		role: 'Researcher',
		year: '2024–2025',
		img: 'images/autonomous-robot.jpg',
		problem:
			'A human-robot interaction study on trust needed both a physical robot and a complete experiment harness around it.',
		build: [
			'Programmed a MegaPi microcontroller in C++ at the embedded level, driving motors, an arm, and line-following sensors over wireless serial.',
			'Wrote the full experiment as a desktop app: consent, instructions, questionnaires, the task, and data capture.',
			'Manipulated how the robot was described to test its effect on participants’ trust.',
		],
		impact: ['Powered a human-robot interaction study on trust, end to end.'],
		stack: 'C++ · MegaPi microcontroller · Embedded · Python · Sensors',
		links: [{ label: 'GitHub', href: 'https://github.com/jhenley1219/PaulTheRobot' }],
	},
	noseknows: {
		eyebrow: 'HRI · Student Design Competition',
		title: 'Nose Knows',
		role: 'Hardware, ML & software',
		year: '2026',
		img: 'images/nose-knows-1.jpg',
		problem:
			'Air-quality alerts are abstract; a beep or a blinking light is easy to ignore and says nothing intuitive about what is actually wrong with the air.',
		build: [
			'Built an air-quality robot that reacts the way a person would: an expressive nose that sneezes or wrinkles when the air goes bad.',
			'Read air quality with a BME688 gas sensor feeding a trained machine-learning classifier, running on a Raspberry Pi.',
			'Designed and 3D-printed the noses and housing, and wired sensing, compute, and reaction together end to end (four-person HRI capstone).',
		],
		impact: [
			'Presented at the HRI 2026 Student Design Competition, the 21st ACM/IEEE Conference on Human-Robot Interaction, Edinburgh.',
			'Reframes machine feedback as an intuitive bodily reaction instead of an abstract alert.',
		],
		stack: 'Python · BME688 gas sensor · ML classifier · Raspberry Pi · 3D printing',
		links: [
			{
				label: 'GMU MIX write-up',
				href: 'https://www.mix.gmu.edu/blog/nose-knows-air-quality-detection-capstone-made-in-the-mix',
			},
			{ label: 'HRI 2026 proceedings', href: 'https://dl.acm.org/doi/10.1145/3776734.3794605' },
			{ label: 'GitHub', href: 'https://github.com/jhenley1219/nose-knows' },
		],
	},
	blimp: {
		eyebrow: 'Mechatronics · GMU MIX program',
		title: 'BLIMP program',
		role: 'Mechatronics · team of three',
		year: '2026',
		img: 'images/blimp.jpg',
		problem:
			'The GMU BLIMP program (Biologically-inspired, Lighter-than-air, Instructional, Mechatronics Program) challenges teams to build a bio-inspired, lighter-than-air robot with flapping-wing propulsion, efficient and safe enough to fly around people.',
		build: [
			'Built a bio-inspired flapping-wing blimp, nicknamed "Jack the Flapper" by the team, over a nine-week mechatronics program at the GMU MIX.',
			'Flew it from an ESP32 paired to a PS3 controller over Bluetooth, mapping the two analog sticks to four servos: one flaps the wings, the other steers pitch and rotation.',
			'Designed a top-mounted stick-and-counterweight mechanism that tilts the blimp front-to-back and side-to-side and turns it in place, with custom 3D-printed parts, built as a team of three.',
		],
		impact: [
			'Earned the GMU "Lighter-than-air Mechatronics Prototyping" micro-credential.',
			'Competed in the program’s judged design competition.',
		],
		stack: 'ESP32 · Bluetooth (PS3 controller) · 4× servo control · CAD · FFF 3D printing',
		links: [
			{ label: 'BLIMP program', href: 'https://www.mix.gmu.edu/blimp' },
			{ label: 'GitHub', href: 'https://github.com/jhenley1219/jack-the-flapper' },
		],
	},
	purdue: {
		eyebrow: 'Cognition research',
		title: 'Attention & practice study',
		role: 'First author',
		year: '2023–2024',
		img: 'images/purdue-poster.jpg',
		imgPos: 'center 20%',
		problem:
			'Spatial attention speeds responses to cued locations, but it was unclear how that benefit changes as people practice the task.',
		build: [
			'First-authored a poster, “Does practicing reduce attentional benefits?”, on practice effects in spatial attention.',
			'Ran the attention and lexical-decision tasks in Dr. Anne Sereno’s cognition lab.',
			'Found the attentional benefit shrank with practice: the reaction-time advantage from a spatial cue diminished as participants repeated the task.',
			'Built a Python tool to calibrate monitor refresh rate so stimulus timing stayed precise.',
		],
		impact: ['Presented at the Purdue Spring 2024 Undergraduate Research Conference.'],
		stack: 'Python · Experimental design · Behavioral data analysis',
	},
};

export type CardItem = {
	id: string;
	eyebrow: string;
	title: string;
	desc: string;
	img?: string;
	imgPos?: string;
	tag?: string;
	video?: string;
	project?: ProjectId;
	status?: string;
	live?: boolean;
};

export const SHOWCASE_CARDS: Array<CardItem> = [
	{
		id: 'noseknows',
		project: 'noseknows',
		img: 'images/nose-knows-1.jpg',
		eyebrow: 'HRI · Design competition',
		title: 'Nose Knows',
		desc: 'An air-quality robot that sneezes and wrinkles its nose at bad air, shown at the HRI 2026 conference in Edinburgh.',
		tag: 'BME688 · ML · 3D print →',
	},
	{
		id: 'blimp',
		project: 'blimp',
		img: 'images/blimp.jpg',
		eyebrow: 'Mechatronics · GMU MIX',
		title: 'BLIMP program',
		desc: 'A bio-inspired flapping-wing blimp flown from a PS3 controller, built in a nine-week mechatronics program.',
		tag: 'ESP32 · Servos →',
		video: 'videos/blimp.mp4',
	},
	{
		id: 'axle',
		project: 'axle',
		live: true,
		eyebrow: 'Open source · Spatial agent workspace',
		title: 'Axle',
		desc: 'A self-hosted control surface for coding agents. Lays every session out in space so you can follow them all without a screen full of terminals.',
		tag: 'Spatial UI · Voice · Open source →',
	},
];

export const RESEARCH_CARDS: Array<CardItem> = [
	{
		id: 'robot-arm',
		project: 'robot-arm',
		img: 'images/robot-arm.jpg',
		eyebrow: 'HRI research',
		title: 'Research robot arm',
		desc: 'Programmed a collaborative robot arm at the control level for human-robot interaction studies.',
		tag: 'C++ · ROS →',
	},
	{
		id: 'sim',
		project: 'sim',
		img: 'images/robot-sim.jpg',
		eyebrow: 'Research tooling',
		title: 'Robotics simulation',
		desc: 'Modeled and animated a robot-interaction scene as a controlled study stimulus.',
		tag: '3D · Animation →',
		video: 'videos/sim.mp4',
	},
	{
		id: 'autonomous',
		project: 'autonomous',
		img: 'images/autonomous-robot.jpg',
		eyebrow: 'HRI · Embedded systems',
		title: 'Autonomous robot',
		desc: 'A custom MegaPi robot programmed in C++, with the full experiment harness for an HRI study on trust.',
		tag: 'C++ · Embedded →',
	},
	{
		id: 'purdue',
		project: 'purdue',
		img: 'images/purdue-poster.jpg',
		imgPos: 'center 20%',
		eyebrow: 'Cognition research',
		title: 'Attention & practice study',
		desc: 'First-authored a poster on practice effects in spatial attention, presented at Purdue’s 2024 undergraduate research conference.',
		tag: 'Experiment · Python →',
	},
	{
		id: 'litreview',
		eyebrow: 'Systematic review · in progress',
		title: 'Transparency in human-agent interaction',
		desc: 'A systematic literature review on transparency in human-agent interaction, with the GMU human-robot interaction lab.',
		status: 'In progress',
	},
];
