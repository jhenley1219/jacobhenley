import { useState } from 'react';
import { PROJECTS, RESEARCH_CARDS, SHOWCASE_CARDS, type ProjectId } from '../data/projects.ts';
import { FlagshipCard } from '../components/FlagshipCard.tsx';
import { RoboticsCard } from '../components/RoboticsCard.tsx';
import { SectionHeader } from '../components/SectionHeader.tsx';
import { ProjectModal } from '../components/ProjectModal.tsx';
import styles from './WorkPage.module.css';

export const WorkPage = (): React.ReactElement => {
	const [openId, setOpenId] = useState<ProjectId | null>(null);
	const open = openId ? PROJECTS[openId] : null;

	return (
		<>
			<section className={styles.hero}>
				<h1 className={styles.heroTitle}>Building technology the way people think.</h1>
				<p className={styles.heroLede}>
					I work where cognitive science meets engineering, building interfaces and machines that
					feel natural and earn trust, from research robots to a production platform.
				</p>
				<div className={styles.badge}>
					<span className={styles.badgeDot} />
					<span className={styles.badgeText}>
						Ask the guide <span className={styles.badgeAccent}>bottom-right</span> to show you
						anything, by voice or text.
					</span>
				</div>
			</section>

			<section id="work" data-agent="projects" className={styles.work}>
				<SectionHeader title="01 · Selected work" note="click any card for the full story" />

				<FlagshipCard onOpen={() => setOpenId('flagship')} />

				<div className={`${styles.grid} ${styles.gridSpace}`}>
					{SHOWCASE_CARDS.map((card) => (
						<RoboticsCard
							key={card.id}
							card={card}
							onOpen={() => card.project && setOpenId(card.project)}
						/>
					))}
				</div>

				<div data-agent="robotics" className={styles.subHead}>
					<h2 className={styles.kicker}>02 · Research</h2>
				</div>

				<div className={styles.grid}>
					{RESEARCH_CARDS.map((card) => (
						<RoboticsCard
							key={card.id}
							card={card}
							onOpen={() => card.project && setOpenId(card.project)}
						/>
					))}
				</div>

				<p className={styles.affiliation}>
					Research conducted with the Human-Robot Interaction Lab and the Human-Autonomy
					Collaboration Lab at George Mason University, working with Dr. Eileen Roesler and Dr. J.
					Gregory Trafton, and in Dr. Anne Sereno’s cognition lab at Purdue University.
				</p>
			</section>

			{open && <ProjectModal project={open} onClose={() => setOpenId(null)} />}
		</>
	);
};
