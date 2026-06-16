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
				Built and shipped the production platform a manufacturer now designs and quotes with —
				including a real-time 3D configurator that drops a kitchen into a photo of the customer’s
				own backyard.
			</p>
			<div className={styles.tags}>
				{FLAGSHIP_TAGS.map((t) => (
					<span key={t} className={styles.tag}>
						{t}
					</span>
				))}
			</div>
			<span className={styles.cta}>Replaced a ~$100k/yr rendering service · read the story →</span>
		</div>
	</button>
);
