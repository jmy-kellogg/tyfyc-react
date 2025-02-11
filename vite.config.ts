import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import express from './express-plugin'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss(), express('src/server')],
  server: {
    port: 8000,
  },
})
