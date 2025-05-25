import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url'; // Adicione esta linha

// Adicione estas duas linhas para definir __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  root: 'client', //
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'), // Agora __dirname está definido
      '@shared': path.resolve(__dirname, './shared'),
      '@assets': path.resolve(__dirname, './client/src/assets')
    }
  },
  build: {
    outDir: '../dist/public', //
    emptyOutDir: true, //
    sourcemap: true, //
    rollupOptions: { //
      output: { //
        manualChunks: { //
          vendor: ['react', 'react-dom', 'react-router-dom'], //
          charts: ['chart.js', 'recharts'] //
        }
      }
    }
  },
  server: {
    port: 3000, //
    proxy: { //
      '/api': { //
        target: 'http://localhost:5000', //
        changeOrigin: true, //
        secure: false //
      }
    }
  }
});