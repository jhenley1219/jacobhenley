export type ProjectId = 'flagship' | 'robot-arm' | 'sim' | 'autonomous' | 'noseknows' | 'blimp';

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
	links?: Array<{ label: string; href: string }>;
};

export const PROJECTS: Record<ProjectId, Project> = {
	flagship: {
		eyebrow: 'Flagship · Production platform',
		title: 'Design-automation platform',
		role: 'Full-Stack Software Engineer',
		year: '2023–Present',
		img: 'images/kitchen-platform.jpg',
		problem:
			'A made-to-order product line depended on slow, manual design and quoting — and customers struggled to picture a finished build in their own space, a visualization the business paid an outside firm roughly $100k/year to produce.',
		build: [
			'Joined as an apprentice to a senior systems architect and grew into the platform’s primary author, now owning the full stack end to end.',
			'Built the standout feature: designers drop a photo of a customer’s own backyard into a real-time 3D scene and place the kitchen inside it, producing a true-to-life rendering on demand.',
			'Layered in AI image upscaling and generation for high-fidelity renders with correct shadows — without hallucinating away real kitchen detail.',
			'Migrated the platform to Azure Static Web Apps and a SQL database, expanded every package, and built additional packages and companion apps.',
		],
		impact: [
			'Replaced a ~$100k/year outsourced rendering service with an in-house, on-demand tool.',
			'Became the production platform the business now designs and quotes with.',
		],
		stack: 'TypeScript · React 19 · Three.js · Azure (SWA, Functions) · SQL · Prisma · Auth · CI/CD',
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
		eyebrow: 'Built from scratch',
		title: 'Autonomous robot',
		role: 'Researcher',
		year: '2024–2025',
		img: 'images/autonomous-robot.jpg',
		problem:
			'A human-robot interaction study on trust needed both a physical robot and a complete experiment harness around it.',
		build: [
			'Built the robot on a microcontroller board: motors, an arm, and line-following sensors driven over wireless serial.',
			'Wrote the full experiment as a desktop app: consent, instructions, questionnaires, the task, and data capture.',
			'Manipulated how the robot was described to test its effect on participants’ trust.',
		],
		impact: ['Powered a human-robot interaction study on trust, end to end.'],
		stack: 'Arduino · Embedded C · Python · Sensors',
	},
	noseknows: {
		eyebrow: 'HRI · Student Design Competition',
		title: 'Nose Knows',
		role: 'Hardware, ML & software',
		year: '2026',
		img: 'images/nose-knows-1.jpg',
		problem:
			'Air-quality alerts are abstract — a beep or a blinking light is easy to ignore and says nothing intuitive about what is actually wrong with the air.',
		build: [
			'Built an air-quality robot that reacts the way a person would: an expressive nose that sneezes or wrinkles when the air goes bad.',
			'Read air quality with a BME688 gas sensor feeding a trained machine-learning classifier, running on a Raspberry Pi.',
			'Designed and 3D-printed the noses and housing, and wired sensing, compute, and reaction together end to end (four-person HRI capstone).',
		],
		impact: [
			'Presented at the HRI 2026 Student Design Competition — 21st ACM/IEEE Conference on Human-Robot Interaction, Edinburgh.',
			'Reframes machine feedback as an intuitive bodily reaction instead of an abstract alert.',
		],
		stack: 'Python · BME688 gas sensor · ML classifier · Raspberry Pi · 3D printing',
		links: [
			{
				label: 'GMU MIX write-up',
				href: 'https://www.mix.gmu.edu/blog/nose-knows-air-quality-detection-capstone-made-in-the-mix',
			},
			{ label: 'HRI 2026 proceedings', href: 'https://dl.acm.org/doi/10.1145/3776734.3794605' },
		],
	},
	blimp: {
		eyebrow: 'Mechatronics · GMU MIX program',
		title: 'BLIMP program',
		role: 'Mechatronics · team of three',
		year: '2026',
		img: 'images/blimp.jpg',
		problem:
			'The GMU BLIMP program — Biologically-inspired, Lighter-than-air, Instructional, Mechatronics Program — challenges teams to build a bio-inspired, lighter-than-air robot with flapping-wing propulsion, efficient and safe enough to fly around people.',
		build: [
			'Built a bio-inspired flapping-wing blimp — the team nicknamed it "Jack the Flapper" — over a nine-week mechatronics program at the GMU MIX.',
			'Flew it from an ESP32 paired to a PS3 controller over Bluetooth, mapping a single joystick to three servos.',
			'Designed a top-mounted stick-and-counterweight mechanism for pitch (front/back, side-to-side) plus zero-radius rotation, with custom FFF-printed parts — built as a team of three.',
		],
		impact: [
			'Earned the GMU "Lighter-than-air Mechatronics Prototyping" micro-credential.',
			'Competed in the program’s judged design competition.',
		],
		stack: 'ESP32 · Bluetooth (PS3 controller) · 3× servo control · CAD · FFF 3D printing',
		links: [{ label: 'BLIMP program', href: 'https://www.mix.gmu.edu/blimp' }],
	},
};

export type RoboticsCard = {
	id: Extract<ProjectId, 'robot-arm' | 'sim' | 'autonomous' | 'noseknows' | 'blimp'>;
	img: string;
	eyebrow: string;
	title: string;
	desc: string;
	tag: string;
	video?: string;
};

export const ROBOTICS_CARDS: Array<RoboticsCard> = [
	{
		id: 'robot-arm',
		img: 'images/robot-arm.jpg',
		eyebrow: 'HRI research',
		title: 'Research robot arm',
		desc: 'Programmed a collaborative robot arm at the control level for human-robot interaction studies.',
		tag: 'C++ · ROS →',
	},
	{
		id: 'sim',
		img: 'images/robot-sim.jpg',
		eyebrow: 'Research tooling',
		title: 'Robotics simulation',
		desc: 'Modeled and animated a robot-interaction scene as a controlled study stimulus.',
		tag: '3D · Animation →',
		video: 'videos/sim.mp4',
	},
	{
		id: 'autonomous',
		img: 'images/autonomous-robot.jpg',
		eyebrow: 'Built from scratch',
		title: 'Autonomous robot',
		desc: 'Built a custom robot and its full experiment harness for a human-robot interaction study on trust.',
		tag: 'Embedded · Python →',
	},
	{
		id: 'noseknows',
		img: 'images/nose-knows-1.jpg',
		eyebrow: 'HRI · Design competition',
		title: 'Nose Knows',
		desc: 'An air-quality robot that sneezes and wrinkles its nose at bad air — shown at the HRI 2026 conference in Edinburgh.',
		tag: 'BME688 · ML · 3D print →',
	},
	{
		id: 'blimp',
		img: 'images/blimp.jpg',
		eyebrow: 'Mechatronics · GMU MIX',
		title: 'BLIMP program',
		desc: 'A bio-inspired flapping-wing blimp flown from a PS3 controller, built in a nine-week mechatronics program.',
		tag: 'ESP32 · Servos →',
		video: 'videos/blimp.mp4',
	},
];
