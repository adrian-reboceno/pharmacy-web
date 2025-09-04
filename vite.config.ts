import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path'; // Importación correcta de 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Importación de Tailwind CSS
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Alias para la carpeta 'src'
    },
  },

});