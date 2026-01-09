import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
  base: './', // Use relative paths for assets
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    open: true,
  },
});
