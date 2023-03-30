/// <reference types="vitest" />
import { defineConfig, loadEnv } from "vite"

import viteTsConfigPaths from "vite-tsconfig-paths"
import dts from "vite-plugin-dts"
import { join, resolve } from "path"

const mode = process.env["NODE_ENV"] ?? "production"
const zhiBase = join(process.cwd(), "packages", "zhi")
const env: Record<string, string> = loadEnv(mode, zhiBase)
const debugMode = env["VITE_DEBUG_MODE"] === "true"

console.log("mode=>", mode)
console.log("zhiBase=>", zhiBase)
console.log("debugMode=>", debugMode)

export default defineConfig({
  cacheDir: "../../node_modules/.vite/zhi",

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

  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: ["src/theme.ts", "src/theme.styl"],
      name: "zhi",
      fileName: "index",
      // Change this to the formats you want to support.
      // Don't forgot to update your package.json as well.
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      output: {
        assetFileNames: "[name].[ext]",
        entryFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ?? ""
          if (!facadeModuleId.includes("ts")) {
            return "[name]"
          }

          let entryName = "[name]"
          if (facadeModuleId.includes("theme.ts")) {
            entryName = "theme.js"
          } else {
            entryName = "[name].js"
          }
          return entryName
        },
      },
      // External packages that should not be bundled into your library.
      external: [],
    },
    minify: false
  },

  test: {
    globals: true,
    cache: {
      dir: "../../node_modules/.vitest",
    },
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
})
