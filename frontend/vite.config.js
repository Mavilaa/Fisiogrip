import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/login':       'http://localhost:8080',
      '/register':    'http://localhost:8080',
      '/logout':      'http://localhost:8080',
      '/sessao':      'http://localhost:8080',
      '/dispositivo': 'http://localhost:8080',
      '/ranking':     'http://localhost:8080',
    },
  },
});
