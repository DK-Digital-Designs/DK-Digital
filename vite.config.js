import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

function getHtmlEntries() {
  const entries = {};

  // Root index
  entries['main'] = resolve(__dirname, 'index.html');

  // Pages in /pages
  const pagesDir = resolve(__dirname, 'pages');
  if (fs.existsSync(pagesDir)) {
    const files = fs.readdirSync(pagesDir);
    files.forEach(file => {
      if (file.endsWith('.html')) {
        const name = file.replace('.html', '');
        entries[name] = resolve(pagesDir, file);
      }
    });
  }

  // Projects in /pages/projects
  const projectsDir = resolve(__dirname, 'pages/projects');
  if (fs.existsSync(projectsDir)) {
    const files = fs.readdirSync(projectsDir);
    files.forEach(file => {
      if (file.endsWith('.html')) {
        const name = `project-${file.replace('.html', '')}`;
        entries[name] = resolve(projectsDir, file);
      }
    });
  }

  // Learn section in /pages/learn
  const learnDir = resolve(__dirname, 'pages/learn');
  if (fs.existsSync(learnDir)) {
    const files = fs.readdirSync(learnDir);
    files.forEach(file => {
      if (file.endsWith('.html')) {
        const name = `learn-${file.replace('.html', '')}`;
        entries[name] = resolve(learnDir, file);
      }
    });
  }

  return entries;
}

export default defineConfig({
  root: './',
  base: './', // Use relative paths for assets
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: getHtmlEntries(),
    },
  },
  server: {
    open: true,
  },
});
