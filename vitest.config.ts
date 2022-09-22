import { defineConfig } from "vitest/config";
import { alias } from './vitest.alias'
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith("v-"),
        }
      }
    })
  ],
  root: '.',
  esbuild: {
    tsconfigRaw: '{}',
  },
  resolve: {
    alias,
  },
  test: {
    environment: 'happy-dom'
  },
})