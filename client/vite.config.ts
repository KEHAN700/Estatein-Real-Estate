import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

const api = 'http://localhost:4000';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        svgoConfig: {
          plugins: [
            { name: 'preset-default', params: { overrides: { removeViewBox: false } } },
            'prefixIds',
          ],
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `@use "@/styles/abstracts" as *;\n`,
      },
    },
  },
  server: {
    proxy: {
      '/api': api,
      '/images': api,
    },
  },
});
