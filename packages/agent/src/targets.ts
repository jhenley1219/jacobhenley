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
		ex: [
			'show me his work', 'projects', 'portfolio', 'what has he built', 'see his work', 'case studies',
			'worked on',
		],
	},
	{
		id: 'flagship',
		page: 'index',
		sel: '[data-agent="flagship"]',
		label: 'Flagship platform',
		say: 'His strongest work: a production design platform he builds on as a full-stack engineer, including the in-house rendering pipeline he made.',
		ex: [
			'most impressive work', 'best work', 'his best work', 'best project', 'strongest work',
			'impressive work', 'flagship', 'biggest project', 'full stack platform', 'the design tool',
			'react three.js app', 'something impressive', 'what is he most proud of',
			'show me the best thing', 'standout project', 'proudest work', 'coolest', 'coolest thing',
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
			'control a robot', 'franka panda arm', 'panda arm', 'ros', 'ros project', 'robot control software',
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
			'autonomous robot', 'hardware robot', 'arduino robot', 'built a robot', 'build a robot',
			'physical robot', 'companion robot', 'embedded robot', 'robot he made', 'from scratch',
			'robot from scratch',
		],
	},
	{
		id: 'noseknows',
		page: 'index',
		sel: '[data-agent="noseknows"]',
		label: 'Nose Knows',
		say: 'Nose Knows, an air-quality robot that reacts with a sneeze, shown at HRI 2026.',
		ex: [
			'nose knows', 'air quality', 'gas sensor', 'electronic nose', 'smell', 'smells', 'olfaction',
			'design competition', 'hri conference', 'hri 2026', 'bme688', 'sneezing robot', 'sneezes', 'air sensor',
			'detects smells',
		],
	},
	{
		id: 'blimp',
		page: 'index',
		sel: '[data-agent="blimp"]',
		label: 'BLIMP program',
		say: 'The BLIMP program, a bio-inspired flapping-wing blimp from the GMU mechatronics program.',
		ex: [
			'blimp', 'blimp program', 'flapping wing', 'lighter than air', 'mechatronics',
			'airship', 'bio-inspired robot', 'mix program', 'flapping robot', 'jack the flapper',
		],
	},
	{
		id: 'purdue',
		page: 'index',
		sel: '[data-agent="purdue"]',
		label: 'Attention & practice study',
		say: 'A cognition study at Purdue, where he first-authored a poster on practice effects in spatial attention.',
		ex: [
			'purdue', 'cognition', 'attention', 'psychology', 'poster', 'practice effects',
			'lexical decision', 'undergraduate research', 'attention study',
		],
	},
	{
		id: 'litreview',
		page: 'index',
		sel: '[data-agent="litreview"]',
		label: 'Systematic literature review',
		say: 'An in-progress systematic literature review on transparency in human-agent interaction.',
		ex: [
			'literature review', 'systematic review', 'review paper', 'meta analysis',
			'human agent interaction', 'survey paper', 'in progress research',
		],
	},
	{
		id: 'axle',
		page: 'index',
		sel: '[data-agent="axle"]',
		label: 'Axle',
		say: 'Axle, an open-source voice harness he built for working with coding agents.',
		ex: [
			'axle', 'voice harness', 'coding agent', 'ai assistant', 'ai project',
			'agent tool', 'open source project', 'his ai work', 'ai work',
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
		ex: [
			'robotics', 'robots', 'hardware', 'robot work', 'show me robots', 'embedded',
			'embedded work', 'sensors', 'engineering work',
		],
	},
	{
		id: 'bio',
		page: 'about',
		sel: '[data-agent="bio"]',
		label: 'About Jacob',
		say: 'A bit about Jacob and how he approaches problems.',
		ex: [
			'about jacob', 'who is he', 'background', 'bio', 'tell me about him', 'his story',
			'who are you presenting', 'introduce him', 'approach problems', 'problem solving', 'how he approaches problems',
		],
	},
	{
		id: 'team',
		page: 'about',
		sel: '[data-agent="team"]',
		label: 'On a team',
		say: 'How Jacob works with a team, including collaboration, leadership, and communication.',
		ex: [
			'how is he socially', 'team player', 'is he a team player', 'soft skills', 'collaboration',
			'collaborate', 'collaborator', 'communication', 'communicate', 'teamwork', 'mentor', 'work ethic',
			'personality', 'what is he like to work with', 'how does he work with people', 'good with people',
			'easy to work with', 'leadership', 'leadership experience', 'lead a team', 'works with others', 'on a team',
		],
	},
	{
		id: 'maker',
		page: 'about',
		sel: '[data-agent="maker"]',
		label: 'Off the clock',
		say: 'What Jacob builds for fun, like speakers, 3D prints, woodworking, and a homelab.',
		ex: [
			'hobbies', 'maker', 'side projects', 'side project', 'what does he build for fun', 'build for fun',
			'3d printing', '3d print', 'speakers', 'audio gear', 'woodworking', 'homelab',
			'tinkering', 'tinker', 'off the clock', 'free time', 'spare time', 'weekends',
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
			'experience', 'work history', 'jobs', 'roles', 'last job', 'recent role', 'previous jobs',
			'companies', 'professional', 'professionally', 'professional history', 'career', 'resume', 'cv',
			'where has he worked', 'employment', 'timeline',
		],
	},
	{
		id: 'research',
		page: 'about',
		sel: '[data-agent="research"]',
		label: 'Research',
		say: 'His human-robot interaction research.',
		ex: [
			'research', 'researcher', 'researching', 'hri', 'human robot interaction', 'studies', 'academic',
			'lead researcher', 'trust', 'transparency', 'lab work', 'publications', 'published', 'publish papers',
			'papers',
		],
	},
	{
		id: 'education',
		page: 'about',
		sel: '[data-agent="education"]',
		label: 'Education',
		say: 'His education and training.',
		ex: [
			'education', 'degree', 'university', 'school', 'masters', 'studied', 'academics', 'academic background',
			'major', 'student', 'gpa', 'graduate', 'graduated', 'where did he study', 'graduate program',
		],
	},
	{
		id: 'contact',
		page: 'contact',
		sel: '[data-agent="contact"]',
		label: 'Contact',
		say: "Here's how to reach Jacob by email or LinkedIn.",
		ex: [
			'contact', 'hire him', 'email', 'reach out', 'reach you', 'get in touch', 'connect', 'linkedin',
			'github', 'how do i contact', 'work with him', 'work with you', 'message him', 'hire', 'talk to him',
			'apply', 'schedule a call', 'find you online',
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
