/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';
import eslint from 'vite-plugin-eslint';
import StylelintPlugin from 'vite-plugin-stylelint';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint(),
    StylelintPlugin({
      fix: true,
      quiet: false,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'test-utils': fileURLToPath(
        new URL('./src/helpers/test-utils.tsx', import.meta.url)
      ),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // example : additionalData: `@import "./src/styles/variables";`
        // There is need to include the .scss file extensions.
        // additionalData: `@import "./src/styles/variables";`,
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    setupFiles: ['./vitest.setup.ts'],
  },
});
