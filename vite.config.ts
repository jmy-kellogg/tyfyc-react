import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import express from "./express-plugin";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tailwindcss(), express("src/server"), tsconfigPaths()],
  server: {
    port: 8000,
  },
});
