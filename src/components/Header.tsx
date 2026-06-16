import { Link, useLocation } from 'react-router-dom';
import { PAGE_PATHS, pageFromPath, type PageKey } from '@jacobhenley/agent';
import styles from './Header.module.css';

const NAV: Array<{ page: PageKey; label: string }> = [
	{ page: 'index', label: 'Work' },
	{ page: 'about', label: 'About' },
	{ page: 'contact', label: 'Contact' },
];

export const Header = (): React.ReactElement => {
	const current = pageFromPath(useLocation().pathname);
	return (
		<header className={styles.header}>
			<div className={styles.inner}>
				<Link to={PAGE_PATHS.index} className={styles.brand}>
					Jacob Henley
				</Link>
				<nav className={styles.nav}>
					{NAV.map(({ page, label }) => (
						<Link
							key={page}
							to={PAGE_PATHS[page]}
							data-agent-nav={page}
							className={`${styles.link} ${current === page ? styles.active : ''}`}
						>
							{label}
						</Link>
					))}
				</nav>
			</div>
		</header>
	);
};
