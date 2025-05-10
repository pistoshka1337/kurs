import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['jwt-decode']
  },
  server: {
    host: '192.168.1.70', // Позволяет подключение с других устройств
    port: 5000,      // или любой другой
  }
})
