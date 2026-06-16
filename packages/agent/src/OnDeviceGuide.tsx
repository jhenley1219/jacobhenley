import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PAGE_PATHS, pageFromPath } from './routes.ts';
import { PortfolioAgent } from './PortfolioAgent.ts';

// Mounts the on-device guide custom element once at the document body (it is a
// full-screen overlay) and keeps it in sync with the router: navigation runs
// through react-router, and the current page is pushed on every route change.
export const OnDeviceGuide = (): null => {
	const navigate = useNavigate();
	const page = pageFromPath(useLocation().pathname);
	const elRef = useRef<PortfolioAgent | null>(null);

	useEffect(() => {
		PortfolioAgent.register();
		const el = document.createElement(PortfolioAgent.TAG) as PortfolioAgent;
		el.setAttribute('data-page', page);
		document.body.appendChild(el);
		elRef.current = el;
		return () => {
			el.remove();
			elRef.current = null;
		};
		// Mount once; page sync and navigate wiring happen in the effects below.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (elRef.current) elRef.current.navigate = (p) => navigate(PAGE_PATHS[p]);
	}, [navigate]);

	useEffect(() => {
		elRef.current?.setPage(page);
	}, [page]);

	return null;
};
