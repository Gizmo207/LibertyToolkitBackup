import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
    open: true,
    // 👇 this makes React Router work properly
    fs: { strict: false }
  },
  preview: {
    port: 4173
  },
  optimizeDeps: {
    // Exclude the problematic rollup dependency
    exclude: ['@rollup/rollup-win32-x64-msvc']
  },
  build: {
    rollupOptions: {
      external: ['@rollup/rollup-win32-x64-msvc']
    }
  }
})
