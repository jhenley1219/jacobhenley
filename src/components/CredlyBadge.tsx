import { useEffect } from 'react';

const BADGE_ID = 'd9fe70a6-7821-4dac-9927-b48c9fbd5996';
const EMBED_SRC = 'https://cdn.credly.com/assets/utilities/embed.js';

// Credly's embed.js scans the DOM for badge divs and swaps in an iframe. In a
// single-page app we append a fresh copy on mount so it re-scans on this view.
export const CredlyBadge = (): React.ReactElement => {
	useEffect(() => {
		const s = document.createElement('script');
		s.src = EMBED_SRC;
		s.async = true;
		document.body.appendChild(s);
		return () => {
			s.remove();
		};
	}, []);

	return (
		<div
			data-iframe-width="150"
			data-iframe-height="270"
			data-share-badge-id={BADGE_ID}
			data-share-badge-host="https://www.credly.com"
		/>
	);
};
