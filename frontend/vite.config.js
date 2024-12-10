import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/user': {
        target: ' http://127.0.0.1:8080',
        changeOrigin: true,
        secure: false,
      },
      '/api/credit': {
        target: ' http://127.0.0.1:8080',
        changeOrigin: true,
        secure: false,
      },
      '/api/file': {
        target: ' http://127.0.0.1:8080',
        changeOrigin: true,
        secure: false,
      },
      '/api/evaluate': {
        target: ' http://127.0.0.1:8080',
        changeOrigin: true,
        secure: false,
      },
      '/api/totalcost': {
        target: ' http://127.0.0.1:8080',
        changeOrigin: true,
        secure: false,
      },
      '/api/state': {
        target: ' http://127.0.0.1:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})