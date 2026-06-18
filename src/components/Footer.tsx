import { FaGithub } from 'react-icons/fa';
import { GITHUB_URL, LINKEDIN_URL } from '../data/contact.ts';
import { LinkedInIcon } from './LinkedInIcon.tsx';
import styles from './Footer.module.css';

export const Footer = (): React.ReactElement => (
	<footer className={styles.footer}>
		<div className={styles.inner}>
			<span className={styles.note}>© 2026 Jacob Henley · Human factors × engineering</span>
			<div className={styles.icons}>
				<a
					href={LINKEDIN_URL}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="LinkedIn"
					className={styles.icon}
				>
					<LinkedInIcon />
				</a>
				<a
					href={GITHUB_URL}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="GitHub"
					className={styles.icon}
				>
					<FaGithub size={24} />
				</a>
			</div>
		</div>
	</footer>
);
