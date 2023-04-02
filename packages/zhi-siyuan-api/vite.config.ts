/// <reference types="vitest" />
import { defineConfig, loadEnv } from "vite"

import viteTsConfigPaths from "vite-tsconfig-paths"
import dts from "vite-plugin-dts"
import { join } from "path"

const mode = process.env["NODE_ENV"] ?? "production"
const zhiSiyuanApiBase = process.cwd()
const env: Record<string, string> = loadEnv(mode, zhiSiyuanApiBase)
const debugMode = env["VITE_DEBUG_MODE"] === "true"
const processEnvValues = {
  "process.env": Object.entries(env).reduce((prev, [key, val]) => {
    return {
      ...prev,
      [key]: val,
    }
  }, {}),
}
console.log("mode=>", mode)
console.log("zhiSiyuanApiBase=>", zhiSiyuanApiBase)
console.log("debugMode=>", debugMode)
// console.log("processEnvValues=>", processEnvValues)

export default defineConfig({
  cacheDir: "../../node_modules/.vite/zhi-siyuan-api",

  plugins: [
    dts({
      entryRoot: "src",
      tsConfigFilePath: join(__dirname, "tsconfig.lib.json"),
      skipDiagnostics: true,
    }),

    viteTsConfigPaths({
      root: "../../",
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../../',
  //    }),
  //  ],
  // },

  // https://github.com/vitejs/vite/issues/1930
  // https://vitejs.dev/guide/env-and-mode.html#env-files
  // 在这里自定义变量
  define: Object.assign(processEnvValues, {}),

  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: "src/index.ts",
      name: "zhi-siyuan-api",
      fileName: "index",
      // Change this to the formats you want to support.
      // Don't forgot to update your package.json as well.
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: [],
    },
  },

  test: {
    globals: true,
    cache: {
      dir: "../../node_modules/.vitest",
    },
    setupFiles: ["./setup.ts"],
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
})
