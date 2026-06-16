import { useRef, useState } from 'react';
import type { RoboticsCard as RoboticsCardData } from '../data/projects.ts';
import styles from './RoboticsCard.module.css';

type Props = {
	card: RoboticsCardData;
	onOpen: () => void;
};

export const RoboticsCard = ({ card, onOpen }: Props): React.ReactElement => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [playing, setPlaying] = useState(false);

	const handleMouseEnter = (): void => {
		const video = videoRef.current;
		if (!video) return;
		setPlaying(true);
		video.play().catch(() => {});
	};

	const handleMouseLeave = (): void => {
		const video = videoRef.current;
		if (!video) return;
		setPlaying(false);
		video.pause();
		video.currentTime = 0;
	};

	return (
		<button
			type="button"
			data-agent={card.id}
			className={styles.card}
			onClick={onOpen}
			onMouseEnter={card.video ? handleMouseEnter : undefined}
			onMouseLeave={card.video ? handleMouseLeave : undefined}
		>
			<div className={styles.media} style={{ backgroundImage: `url(${card.img})` }}>
				{card.video && (
					<video
						ref={videoRef}
						className={`${styles.video}${playing ? ` ${styles.playing}` : ''}`}
						src={card.video}
						muted
						loop
						playsInline
						preload="none"
					/>
				)}
			</div>
			<div className={styles.body}>
				<p className={styles.eyebrow}>{card.eyebrow}</p>
				<h3 className={styles.title}>{card.title}</h3>
				<p className={styles.desc}>{card.desc}</p>
				<span className={styles.tag}>{card.tag}</span>
			</div>
		</button>
	);
};
