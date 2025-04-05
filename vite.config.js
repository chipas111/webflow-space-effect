import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/main.js',
      name: 'SpaceEffect',
      formats: ['umd'],
      fileName: (format) => `space-effect.${format}.js`
    },
    rollupOptions: {
      external: [],
      output: {
        format: 'umd',
        name: 'SpaceEffect',
        extend: true,
        globals: {},
        sourcemap: true,
        minify: false
      }
    },
    sourcemap: true,
    minify: false
  }
}); 