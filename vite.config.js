import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    open: '/examples/dev_example.html',
  },
  build: {
    cssCodeSplit: false
  }
});
