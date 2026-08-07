import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import prerender from "./prerender.js";

export default defineConfig({
  plugins: [react(), prerender()],
});
