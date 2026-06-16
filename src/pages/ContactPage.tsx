import { useMemo } from 'react';
import { getEmail, LINKEDIN_URL } from '../data/contact.ts';
import styles from './ContactPage.module.css';

export const ContactPage = (): React.ReactElement => {
	const email = useMemo(getEmail, []);

	return (
		<section data-agent="contact" className={styles.section}>
			<div className={styles.inner}>
				<p className={styles.kicker}>Contact</p>
				<h1 className={styles.title}>Let's build something people can actually trust.</h1>
				<p className={styles.lede}>
					If the work here resonated, I'd like to hear from you, especially if you're building where
					people and complex systems meet.
				</p>

				<div className={styles.grid}>
					<a className={styles.card} href={`mailto:${email}`}>
						<p className={styles.cardLabel}>Email</p>
						<p className={styles.cardValue}>{email}</p>
						<span className={styles.cardCta}>Send a message →</span>
					</a>
					<a
						className={styles.card}
						href={LINKEDIN_URL}
						target="_blank"
						rel="noopener noreferrer"
					>
						<p className={styles.cardLabel}>LinkedIn</p>
						<p className={styles.cardValue}>in/jacob-henley2</p>
						<span className={styles.cardCta}>Connect →</span>
					</a>
				</div>
			</div>
		</section>
	);
};
