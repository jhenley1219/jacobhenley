import styles from './FlagshipCard.module.css';

const FLAGSHIP_TAGS = ['React 19', 'Three.js', 'TypeScript', 'Cloud · Full-stack'];

type Props = {
	onOpen: () => void;
};

export const FlagshipCard = ({ onOpen }: Props): React.ReactElement => (
	<button type="button" data-agent="flagship" className={styles.flagship} onClick={onOpen}>
		<div
			className={styles.media}
			style={{ backgroundImage: 'url(images/kitchen-platform.jpg)' }}
		/>
		<div className={styles.body}>
			<p className={styles.eyebrow}>Flagship · Production platform</p>
			<h3 className={styles.title}>Design-automation platform</h3>
			<p className={styles.desc}>
				A production platform a manufacturer designs, prices, and sells with. As a full-stack engineer on it, I built
				the in-house image pipeline that turns a customer’s design into a sales-ready
				rendering.
			</p>
			<div className={styles.tags}>
				{FLAGSHIP_TAGS.map((t) => (
					<span key={t} className={styles.tag}>
						{t}
					</span>
				))}
			</div>
			<span className={styles.cta}>Saved ~$90k/yr by bringing rendering in-house · read the story →</span>
		</div>
	</button>
);
