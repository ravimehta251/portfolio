import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Three.js is lazy-loaded and intentionally isolated from the initial UI bundle.
    chunkSizeWarningLimit: 1000,
  },
})
