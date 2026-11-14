/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: { target: 'safari15', chunkSizeWarningLimit: 900 },
  server: { port: 5173, host: '127.0.0.1' },
  test: { environment: 'node', include: ['src/**/*.test.ts'] },
});
