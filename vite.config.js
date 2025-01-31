import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/hakumoo-labs', // Relative paths for deployment
  plugins: [react()],
  build: {
    outDir: 'dist', // Matches Netlify's publish folder
  },
});
