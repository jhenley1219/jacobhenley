import { useRef, useState } from 'react';
import type { CardItem } from '../data/projects.ts';
import { AxleThumb } from './AxleThumb.tsx';
import styles from './RoboticsCard.module.css';

type Props = {
	card: CardItem;
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

	const media = (
		<div
			className={`${styles.media}${card.img || card.live ? '' : ` ${styles.mediaEmpty}`}`}
			style={
				card.img && !card.live
					? { backgroundImage: `url(${card.img})`, backgroundPosition: card.imgPos }
					: undefined
			}
		>
			{card.live && <AxleThumb />}
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
	);

	const body = (
		<div className={styles.body}>
			<p className={styles.eyebrow}>{card.eyebrow}</p>
			<h3 className={styles.title}>{card.title}</h3>
			<p className={styles.desc}>{card.desc}</p>
			{card.status ? (
				<span className={styles.status}>{card.status}</span>
			) : (
				<span className={styles.tag}>{card.tag}</span>
			)}
		</div>
	);

	if (card.status) {
		return (
			<div data-agent={card.id} className={`${styles.card} ${styles.cardStatic}`}>
				{media}
				{body}
			</div>
		);
	}

	return (
		<button
			type="button"
			data-agent={card.id}
			className={styles.card}
			onClick={onOpen}
			onMouseEnter={card.video ? handleMouseEnter : undefined}
			onMouseLeave={card.video ? handleMouseLeave : undefined}
		>
			{media}
			{body}
		</button>
	);
};
