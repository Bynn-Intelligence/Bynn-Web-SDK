import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    open: '/example.html'
  },
  build: {
    cssCodeSplit: false
  }
});
