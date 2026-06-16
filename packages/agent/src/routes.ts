export type PageKey = 'index' | 'about' | 'contact';

export const PAGE_PATHS: Record<PageKey, string> = {
	index: '/',
	about: '/about',
	contact: '/contact',
};

export const pageFromPath = (pathname: string): PageKey => {
	if (pathname.startsWith('/about')) return 'about';
	if (pathname.startsWith('/contact')) return 'contact';
	return 'index';
};
