import type { PageKey } from './routes.ts';

export type Target = {
	id: string;
	page: PageKey;
	sel: string;
	label: string;
	say: string;
	ex: Array<string>;
};

// Every place on the site the guide can take you. `sel` matches the
// data-agent attributes rendered by the page components.
export const TARGETS: Array<Target> = [
	{
		id: 'projects',
		page: 'index',
		sel: '[data-agent="projects"]',
		label: 'His work',
		say: "Here's the work. Hover any card to open the full story.",
		ex: ['show me his work', 'projects', 'portfolio', 'what has he built', 'see his work', 'case studies'],
	},
	{
		id: 'flagship',
		page: 'index',
		sel: '[data-agent="flagship"]',
		label: 'Flagship platform',
		say: 'His strongest work: a production design platform he shipped end to end.',
		ex: [
			'most impressive work', 'best work', 'his best work', 'best project', 'strongest work',
			'impressive work', 'flagship', 'biggest project', 'full stack platform', 'the design tool',
			'react three.js app', 'something impressive', 'what is he most proud of',
			'show me the best thing', 'standout project', 'proudest work',
		],
	},
	{
		id: 'robot-arm',
		page: 'index',
		sel: '[data-agent="robot-arm"]',
		label: 'Robot arm research',
		say: 'Low-level control of a research robot arm.',
		ex: [
			'robot arm', 'robot interaction', 'collaborative robot', 'manipulator', 'c++ ros',
			'control a robot', 'franka panda arm',
		],
	},
	{
		id: 'sim',
		page: 'index',
		sel: '[data-agent="sim"]',
		label: 'Robotics simulation',
		say: 'An animated robotics simulation built for a research study.',
		ex: ['simulation', 'robotics simulation', '3d animation', 'animated robot', 'blender', 'modeling'],
	},
	{
		id: 'autonomous',
		page: 'index',
		sel: '[data-agent="autonomous"]',
		label: 'Autonomous robot',
		say: 'An autonomous robot he built from scratch for a human-robot interaction study.',
		ex: [
			'autonomous robot', 'hardware robot', 'arduino robot', 'built a robot', 'physical robot',
			'companion robot', 'embedded robot', 'robot he made',
		],
	},
	{
		id: 'noseknows',
		page: 'index',
		sel: '[data-agent="noseknows"]',
		label: 'Nose Knows',
		say: 'Nose Knows — an air-quality robot that reacts with a sneeze, shown at HRI 2026.',
		ex: [
			'nose knows', 'air quality', 'gas sensor', 'electronic nose', 'smell', 'olfaction',
			'design competition', 'hri conference', 'bme688', 'sneezing robot', 'air sensor',
		],
	},
	{
		id: 'blimp',
		page: 'index',
		sel: '[data-agent="blimp"]',
		label: 'BLIMP program',
		say: 'The BLIMP program — a bio-inspired flapping-wing blimp from the GMU mechatronics program.',
		ex: [
			'blimp', 'blimp program', 'flapping wing', 'lighter than air', 'mechatronics',
			'airship', 'bio-inspired robot', 'mix program', 'flapping robot',
		],
	},
	{
		id: 'ops',
		page: 'about',
		sel: '[data-agent="ops"]',
		label: 'Manufacturing & operations',
		say: 'His manufacturing and operations background, here in the experience timeline.',
		ex: [
			'manufacturing', 'operations', 'factory', 'cad', 'cnc', 'workflow', 'efficiency',
			'process improvement', 'ergonomics',
		],
	},
	{
		id: 'robotics',
		page: 'index',
		sel: '[data-agent="robotics"]',
		label: 'Robotics',
		say: 'His robotics and hardware work.',
		ex: ['robotics', 'robots', 'hardware', 'robot work', 'show me robots'],
	},
	{
		id: 'bio',
		page: 'about',
		sel: '[data-agent="bio"]',
		label: 'About Jacob',
		say: 'A bit about Jacob and how he approaches problems.',
		ex: [
			'about jacob', 'who is he', 'background', 'bio', 'tell me about him', 'his story',
			'who are you presenting', 'introduce him',
		],
	},
	{
		id: 'team',
		page: 'about',
		sel: '[data-agent="team"]',
		label: 'On a team',
		say: 'How Jacob works with a team — collaboration, leadership, and communication.',
		ex: [
			'how is he socially', 'team player', 'is he a team player', 'soft skills', 'collaboration',
			'communication', 'work ethic', 'personality', 'what is he like to work with',
			'how does he work with people', 'leadership', 'works with others', 'on a team',
		],
	},
	{
		id: 'maker',
		page: 'about',
		sel: '[data-agent="maker"]',
		label: 'Off the clock',
		say: 'What Jacob builds for fun — speakers, 3D prints, woodworking, and a homelab.',
		ex: [
			'hobbies', 'maker', 'side projects', 'what does he build for fun', '3d printing', 'speakers',
			'woodworking', 'homelab', 'tinkering', 'off the clock',
		],
	},
	{
		id: 'skills',
		page: 'about',
		sel: '[data-agent="skills"]',
		label: 'Skills & stack',
		say: 'His skills and technical stack.',
		ex: [
			'skills', 'tech stack', 'technologies', 'languages', 'what can he do', 'tools',
			'what does he use', 'programming languages', 'frameworks', 'capabilities', 'expertise',
		],
	},
	{
		id: 'experience',
		page: 'about',
		sel: '[data-agent="experience"]',
		label: 'Experience',
		say: 'His professional experience.',
		ex: [
			'experience', 'work history', 'jobs', 'career', 'resume', 'cv', 'where has he worked',
			'employment', 'timeline',
		],
	},
	{
		id: 'research',
		page: 'about',
		sel: '[data-agent="research"]',
		label: 'Research',
		say: 'His human-robot interaction research.',
		ex: [
			'research', 'hri', 'human robot interaction', 'studies', 'academic', 'lead researcher',
			'trust', 'transparency', 'lab work', 'publications',
		],
	},
	{
		id: 'education',
		page: 'about',
		sel: '[data-agent="education"]',
		label: 'Education',
		say: 'His education and training.',
		ex: [
			'education', 'degree', 'university', 'school', 'masters', 'studied', 'academics',
			'where did he study', 'graduate program',
		],
	},
	{
		id: 'contact',
		page: 'contact',
		sel: '[data-agent="contact"]',
		label: 'Contact',
		say: "Here's how to reach Jacob by email or LinkedIn.",
		ex: [
			'contact', 'hire him', 'email', 'reach out', 'get in touch', 'connect', 'linkedin',
			'how do i contact', 'work with him', 'message him', 'hire', 'talk to him',
		],
	},
];

export const SUGGESTIONS: Array<[string, string]> = [
	['Best work', 'show me his most impressive work'],
	['Robotics', 'show me his robotics and hardware projects'],
	['Skills', 'what is his tech stack'],
	['Research', 'tell me about his research'],
	['Hire', 'how do I contact him'],
];
