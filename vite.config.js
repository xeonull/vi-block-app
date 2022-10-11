const path = require("path");
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

module.exports = defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/scss/_variables.scss";`,
      },
    },
  },
  server: {
    port: 8000,
  },
  build: {
    sourcemap: true,
  },
});
