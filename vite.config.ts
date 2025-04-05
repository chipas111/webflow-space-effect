import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/lib/space-travel.ts",
      name: "SpaceTravel",
      formats: ["es", "umd"],
      fileName: (format) => `space-travel.${format}.js`
    },
    rollupOptions: {
      external: ['three'],
      output: {
        globals: {
          three: 'THREE'
        }
      }
    }
  }
});
