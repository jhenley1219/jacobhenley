import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the build works at a project subpath
// (jhenley1219.github.io/jacobhenley/) or a custom domain root.
// HashRouter keeps client-side routing working with no 404 shim.
export default defineConfig({
	base: './',
	plugins: [react()],
});
