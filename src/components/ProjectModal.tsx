import { useEffect } from 'react';
import type { Project } from '../data/projects.ts';
import styles from './ProjectModal.module.css';

type Props = {
	project: Project;
	onClose: () => void;
};

export const ProjectModal = ({ project, onClose }: Props): React.ReactElement => {
	useEffect(() => {
		const onKey = (e: KeyboardEvent): void => {
			if (e.key === 'Escape') onClose();
		};
		document.addEventListener('keydown', onKey);
		return () => document.removeEventListener('keydown', onKey);
	}, [onClose]);

	return (
		<div
			className={styles.overlay}
			onClick={onClose}
			role="dialog"
			aria-modal="true"
			aria-label={project.title}
		>
			<div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
				<div className={styles.media} style={{ backgroundImage: `url(${project.img})` }}>
					<button className={styles.close} onClick={onClose} aria-label="Close">
						×
					</button>
				</div>
				<div className={styles.body}>
					<p className={styles.eyebrow}>{project.eyebrow}</p>
					<h3 className={styles.title}>{project.title}</h3>
					<p className={styles.meta}>
						{project.role} · {project.year}
					</p>

					<p className={styles.label}>The problem</p>
					<p className={styles.problem}>{project.problem}</p>

					<p className={`${styles.label} ${styles.labelTight}`}>What I built</p>
					<ul className={styles.list}>
						{project.build.map((line) => (
							<li key={line} className={styles.item}>
								<span className={styles.bulletBuild}>▸</span>
								<span>{line}</span>
							</li>
						))}
					</ul>

					<p className={`${styles.label} ${styles.labelTight}`}>Impact</p>
					<ul className={styles.list}>
						{project.impact.map((line) => (
							<li key={line} className={styles.item}>
								<span className={styles.bulletImpact}>✦</span>
								<span>{line}</span>
							</li>
						))}
					</ul>

					<div className={styles.footer}>
						<span className={styles.stack}>{project.stack}</span>
						{project.links && project.links.length > 0 && (
							<div className={styles.links}>
								{project.links.map((l) => (
									<a
										key={l.href}
										className={styles.link}
										href={l.href}
										target="_blank"
										rel="noreferrer"
									>
										{l.label} ↗
									</a>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
