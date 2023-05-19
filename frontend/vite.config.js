import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },

  define: {
    // use global for development and _global to build for production
    // _global: {},
    global: {},
  },
});