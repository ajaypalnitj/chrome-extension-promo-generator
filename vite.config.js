import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Get repo name from package.json or environment variable
const getBase = () => {
  // For GitHub Pages deployment, set the base to the repo name
  return '/chrome-extension-promo-generator/'; // For ajaypalnitj.github.io
  
  // For development or other deployments, use root
  // return '/';
  
  // Note: Uncomment the GitHub Pages line and comment out the root line
  // when deploying to GitHub Pages
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: getBase(),
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'styled-components'],
          utils: ['html-to-image', 'file-saver', 'react-dropzone']
        }
      }
    }
  }
}) 