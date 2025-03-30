import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',    // Use jsdom to simulate browser environment
    globals: true,           // Enable globals like `describe`, `it`, etc.
    setupFiles: './src/setupTests.jsx',  // Specify the correct path to your setupTests file
    coverage: {
      provider: 'c8',        // Use c8 for code coverage
    },
  },
});
