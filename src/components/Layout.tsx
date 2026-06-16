import { Outlet } from 'react-router-dom';
import { Header } from './Header.tsx';
import { Footer } from './Footer.tsx';
import styles from './Layout.module.css';

export const Layout = (): React.ReactElement => (
	<div className={styles.page}>
		<Header />
		<main className={styles.main}>
			<Outlet />
		</main>
		<Footer />
	</div>
);
