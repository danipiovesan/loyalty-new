import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    host: '0.0.0.0', // Importante para Docker
  },
  preview: {
    port: 8080,
    host: '0.0.0.0', // Importante para Docker
  }
})
