import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
      {
        find: '@assets',
        replacement: fileURLToPath(new URL('./src/assets', import.meta.url)),
      },
      {
        find: '@components',
        replacement: fileURLToPath(
          new URL('./src/components', import.meta.url)
        ),
      },
      {
        find: '@stores',
        replacement: fileURLToPath(new URL('./src/stores', import.meta.url)),
      },
      {
        find: '@models',
        replacement: fileURLToPath(new URL('./src/models', import.meta.url)),
      },
    ],
  },
  plugins: [react()],
});
