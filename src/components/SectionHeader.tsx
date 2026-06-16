import styles from './SectionHeader.module.css';

type Props = {
	title: string;
	note?: string;
	tight?: boolean;
};

export const SectionHeader = ({ title, note, tight = false }: Props): React.ReactElement => (
	<div className={`${styles.head} ${tight ? styles.tight : ''}`}>
		<h2 className={styles.kicker}>{title}</h2>
		{note && <span className={styles.note}>{note}</span>}
	</div>
);
