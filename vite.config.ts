import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          mui: [
            "@emotion/react",
            "@emotion/styled",
            "@mui/material",
            "@mui/icons-material",
          ],
          data: ["axios", "@tanstack/react-query"],
        },
      },
    },
  },
  test: {
    environment: "node",
    coverage: {
      reporter: ["text", "html"],
    },
  },
});
