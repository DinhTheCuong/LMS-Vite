import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8000,
  },
  css: {
    devSourcemap: true,
  },
  optimizeDeps: {
    include: ['tailwind.config.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'tailwind.config.ts': path.resolve(__dirname, 'tailwind.config.ts'),
    },
  },
})
