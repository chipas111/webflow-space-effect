import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/lib/space-travel.ts",
      name: "SpaceTravel",
      formats: ["umd"],
      fileName: () => `space-travel.min.js`
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
