import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    open: '/examples/example.html',
  },
  build: {
    cssCodeSplit: false
  }
});
