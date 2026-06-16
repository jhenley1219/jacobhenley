import styles from './SkillCard.module.css';

type Props = {
	title: string;
	text: string;
};

export const SkillCard = ({ title, text }: Props): React.ReactElement => (
	<div className={styles.card}>
		<h3 className={styles.title}>{title}</h3>
		<p className={styles.text}>{text}</p>
	</div>
);
