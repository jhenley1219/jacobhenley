import { CredlyBadge } from '../components/CredlyBadge.tsx';
import { SectionHeader } from '../components/SectionHeader.tsx';
import { SkillCard } from '../components/SkillCard.tsx';
import { EDUCATION, EXPERIENCE, MAKER, SKILLS } from '../data/about.ts';
import styles from './AboutPage.module.css';

export const AboutPage = (): React.ReactElement => (
	<>
		<section data-agent="bio" className={styles.bio}>
			<p className={styles.kickerTag}>About</p>
			<div className={styles.bioGrid}>
				<div>
					<img src="images/headshot.jpg" alt="Jacob Henley" className={styles.headshot} />
					<div className={styles.bioMeta}>
						<span className={styles.bioMetaItem}>Chicago, IL</span>
						<span className={styles.bioMetaItem}>Human factors × full-stack × robotics</span>
					</div>
				</div>
				<div>
					<h1 className={styles.bioTitle}>
						A full-stack software engineer with a roboticist's hands and a human-factors mind,
						building systems people find natural to trust.
					</h1>
					<p className={styles.bioText}>
						His work lives at the intersection of cognitive science and applied technology. He asks
						one question across everything he builds: how can a system extend what a person can do
						while staying intuitive enough to trust?
					</p>
					<p className={styles.bioText}>
						That question has taken him from running behavioral experiments, to programming physical
						robots, to building and shipping a production platform used in a real business. The
						throughline is range, paired with a habit of grounding every engineering decision in
						human factors: usability, transparency, and cognitive ergonomics.
					</p>
					<p className={styles.bioText}>
						He moves comfortably from a soldering iron and a control loop to a cloud deployment and a
						design review, drawn to the seams where hardware, software, and people meet.
					</p>
				</div>
			</div>
		</section>

		<section data-agent="skills" className={styles.section}>
			<SectionHeader title="Skills & stack" />
			<div className={styles.skillsGrid}>
				{SKILLS.map((s) => (
					<SkillCard key={s.title} title={s.title} text={s.text} />
				))}
			</div>
		</section>

		<section data-agent="experience" className={styles.section}>
			<SectionHeader title="Experience" />
			<div className={styles.timeline}>
				{EXPERIENCE.map((item, i) => (
					<div
						key={item.title}
						data-agent={item.dataAgent}
						className={`${styles.row} ${i === EXPERIENCE.length - 1 ? styles.rowLast : ''}`}
					>
						<span className={styles.rowDate}>{item.date}</span>
						<div>
							<h3 className={styles.rowTitle}>{item.title}</h3>
							<p className={styles.rowOrg}>{item.org}</p>
							<p className={styles.rowDesc}>{item.desc}</p>
						</div>
					</div>
				))}
			</div>
		</section>

		<section data-agent="team" className={styles.section}>
			<SectionHeader title="On a team" />
			<p className={styles.prose}>
				When a process breaks or a team gets stuck, Jacob tends to be the person called in. He trained
				for an interim factory-management role in a single day, then built the systems that outlasted
				him in it: room-mapping that eliminated double-scheduling, color-coded workflows that cut the
				error rate, and procedural Spanish so a mixed-language crew could run without him standing over
				it. Today he turns big ideas into features that are both impressive and genuinely practical,
				weighing real user needs, ROI, and the architecture a system will need to grow — as at home on a
				shop floor as in a design review.
			</p>
			<blockquote className={styles.quote}>
				<p className={styles.quoteText}>
					“Jacob was uniquely able to excel at both ‘blue collar’ manufacturing roles and ‘white
					collar’ system development roles… [he has] a passion for, and talent in, evaluating and
					providing valuable organizational systems to optimize various jobs.”
				</p>
				<cite className={styles.quoteCite}>— Co-Founder, RTA Outdoor Living</cite>
			</blockquote>
		</section>

		<section data-agent="maker" className={styles.section}>
			<SectionHeader title="Off the clock" />
			<p className={styles.prose}>
				Away from the keyboard, Jacob builds physical things end to end — the same instinct that
				drives his robotics and manufacturing work, just pointed at whatever he wants to make next.
			</p>
			<div className={styles.skillsGrid}>
				{MAKER.map((m) => (
					<SkillCard key={m.title} title={m.title} text={m.text} />
				))}
			</div>
		</section>

		<section className={styles.section}>
			<div className={styles.splitGrid}>
				<div data-agent="research">
					<SectionHeader title="Research" tight />
					<p className={styles.prose}>
						He studies how the way a machine is described and presented changes how people judge it.
						As lead author, he investigates how anthropomorphic framing affects perceived danger,
						transparency, and agency; as a contributor, he studies its effect on trust, designing the
						paradigms and programming the robots.
					</p>
					<p className={styles.prose}>
						He served as secretary of the human factors and ergonomics student chapter, and built the
						digital and physical apparatus his studies ran on.
					</p>
					<img
						src="images/purdue-poster.jpg"
						alt="Jacob presenting his research poster at Purdue"
						className={styles.posterImg}
					/>
				</div>

				<div data-agent="education">
					<SectionHeader title="Education & training" tight />
					<div className={styles.eduList}>
						{EDUCATION.map((e) => (
							<div key={e.title}>
								<h3 className={styles.eduTitle}>{e.title}</h3>
								<p className={styles.eduMeta}>{e.meta}</p>
							</div>
						))}
					</div>
					<div className={styles.badge}>
						<CredlyBadge />
					</div>
				</div>
			</div>
		</section>

		<div className={styles.spacer} />
	</>
);
