import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/contract-management-platform/',
  plugins: [react()],
})
