import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const eslintPlugin = require('vite-plugin-eslint');

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    process.env.NODE_ENV !== 'production' && eslintPlugin.default(), 
  ].filter(Boolean),
});