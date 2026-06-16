import { HashRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout.tsx';
import { OnDeviceGuide } from '@jacobhenley/agent';
import { WorkPage } from './pages/WorkPage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';

export const App = (): React.ReactElement => (
	<HashRouter>
		<Routes>
			<Route element={<Layout />}>
				<Route index element={<WorkPage />} />
				<Route path="about" element={<AboutPage />} />
				<Route path="contact" element={<ContactPage />} />
				<Route path="*" element={<WorkPage />} />
			</Route>
		</Routes>
		<OnDeviceGuide />
	</HashRouter>
);
