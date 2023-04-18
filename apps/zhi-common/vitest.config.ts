/// <reference types="vitest" />
import { defineConfig } from "vite"

export default defineConfig({
  // https://github.com/vitejs/vite/issues/1930
  // https://vitejs.dev/guide/env-and-mode.html#env-files
  // 在这里自定义变量
  // define: Object.assign(processEnvValues, {}),

  test: {
    globals: true,
    // cache: {
    //   dir: "./node_modules/.vitest",
    // },
    setupFiles: ["./setup.ts"],
    // environment: "node",
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
})
