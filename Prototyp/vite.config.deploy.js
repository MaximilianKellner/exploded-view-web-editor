import { defineConfig } from 'vite';

export default defineConfig({
  base: '/exploded-view-web-editor/',
  server: {
    host: true // Erlaubt den Zugriff aus dem lokalen Netzwerk
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './index.html',
        playground: './pages/playground/index.html',
        demo: './pages/demo/index.html',
      }
    }
  }
});
