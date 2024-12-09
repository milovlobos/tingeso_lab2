import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/user': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/api/credit': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/api/file': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },  
      '/api/evaluate': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/api/totalcost': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/api/state': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})