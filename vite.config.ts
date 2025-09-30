import react from "@vitejs/plugin-react-swc";
import fs from "fs";
import path from "path";
import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

// https://vite.dev/config/

export default defineConfig({
  plugins: [react(), ViteImageOptimizer({})],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "localhost-key.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, "localhost.pem")),
    },
    port: 5173,
  },
  build: {
    chunkSizeWarningLimit: 800,
  },
});
