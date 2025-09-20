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
    rollupOptions: {
      output: {
        manualChunks: {
          // core
          react: ["react", "react-dom"],
          // Mantine UI
          mantineCore: ["@mantine/core"],
          mantineForm: ["@mantine/form"],
          mantineOthers: [
            "@mantine/dates",
            "@mantine/dropzone",
            "@mantine/notifications",
            "@mantine/nprogress",
            "@mantine/tiptap",
          ],
          // State + data
          state: ["zustand", "@tanstack/react-query", "@tanstack/react-query-devtools"],
          // Icons
          icons: ["@tabler/icons-react", "lucide-react"],
          // Animation
          motion: ["framer-motion"],
          // Editor
          editor: [
            "@tiptap/react",
            "@tiptap/starter-kit",
            "@tiptap/extension-link",
            "@tiptap/extension-placeholder",
            "@tiptap/extension-text-align",
          ],
          // Stripe
          stripe: ["@stripe/react-stripe-js", "@stripe/stripe-js"],
          // Others heavy libs (optional)
          charts: ["recharts"],
          carousel: ["swiper"],
        },
      },
    },
  },
});
