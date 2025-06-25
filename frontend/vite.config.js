import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { format } from 'date-fns';
import format from 'date-fns/format';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})


