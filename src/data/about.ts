export type ExperienceItem = {
	date: string;
	title: string;
	org: string;
	desc: string;
	dataAgent?: string;
};

export const SKILLS: Array<{ title: string; text: string }> = [
	{ title: 'Languages', text: 'Python · TypeScript · JavaScript · C++ · R · HTML/CSS' },
	{
		title: 'Web & platforms',
		text: 'React 19 · Node.js · Three.js · Django · Vite · Redux · cloud functions · auth & CI/CD',
	},
	{
		title: 'Robotics & hardware',
		text: 'Arduino · ESP32 · microcontrollers · ROS · sensors · feedback control · computer vision',
	},
	{
		title: '3D · CAD · design',
		text: 'Blender · CAD · ergonomics modeling · additive manufacturing (FFF & SLS)',
	},
	{
		title: 'Research methods',
		text: 'Experimental design · HRI paradigms · statistical analysis in R · survey instruments · literature review',
	},
	{ title: 'Human factors', text: 'Usability · trust & transparency · cognitive ergonomics' },
];

export const EXPERIENCE: Array<ExperienceItem> = [
	{
		date: '2023–Present',
		title: 'Full-Stack Software Engineer',
		org: 'Outdoor-living products manufacturer',
		desc: 'Grew from contributor to primary author of a production design-automation platform, building its real-time 3D rendering, full-stack web app, and core business logic.',
	},
	{
		date: '2024–2025',
		title: 'Researcher · Human-Robot Interaction',
		org: 'George Mason University',
		desc: 'Designed and ran HRI studies on how framing and trust shape perceptions of robots, building both digital and physical paradigms, and led the robotics simulation study as lead author.',
	},
	{
		date: '2021–2024',
		title: 'CAD / CNC & Operations',
		org: 'Manufacturing company',
		desc: 'Built software and CAD tooling, designed ergonomic and workflow systems, and stepped into interim management as the operation scaled.',
		dataAgent: 'ops',
	},
	{
		date: '2023–2024',
		title: 'Research Assistant · Cognition',
		org: 'Purdue University',
		desc: 'Ran attention and lexical-decision tasks and built a tool to calibrate monitor refresh rate, then first-authored a poster on practice effects in spatial attention.',
	},
];

export const EDUCATION: Array<{ title: string; meta: string }> = [
	{
		title: 'M.S., Human Factors & Applied Cognition',
		meta: 'George Mason University · 2025',
	},
	{ title: 'B.S., Brain & Behavioral Sciences', meta: 'Purdue University · 2024' },
	{
		title: 'Mechatronics Prototyping micro-credential',
		meta: 'Lighter-than-air robotics program · 2026',
	},
];

export const MAKER: Array<{ title: string; text: string }> = [
	{
		title: 'Speaker building',
		text: 'Designs and hand-builds two-way speakers from the driver up, including custom crossovers laid out in crossover-CAD software.',
	},
	{
		title: '3D printing & modeling',
		text: 'Models his own gear in Blender and 3D-prints it — speaker stands and other shop fixtures among them.',
	},
	{
		title: 'Woodworking',
		text: 'Built a river-table wooden desk by hand, marrying woodworking with poured epoxy.',
	},
	{
		title: 'Homelab',
		text: 'Runs an Optiplex 7020 home server on Coolify, self-hosting Nextcloud synced across his phone and Mac.',
	},
	{
		title: 'Tinkering',
		text: 'Also keeps a water-cooled custom PC and a set of electric-longboard modifications going on the side.',
	},
];
