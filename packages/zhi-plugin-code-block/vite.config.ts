/// <reference types="vitest" />
import { defineConfig } from "vite"

import viteTsConfigPaths from "vite-tsconfig-paths"
import dts from "vite-plugin-dts"
import { join } from "path"
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js"
import { viteStaticCopy } from "vite-plugin-static-copy"

export default defineConfig({
  cacheDir: "../../node_modules/.vite/zhi-plugin-code-block",

  plugins: [
    // dts({
    //   entryRoot: "src",
    //   tsConfigFilePath: join(__dirname, "tsconfig.lib.json"),
    //   skipDiagnostics: true,
    // }),

    viteTsConfigPaths({
      root: "../../",
    }),

    cssInjectedByJsPlugin({ styleId: "zhi-code-block-custom-style" }),

    viteStaticCopy({
      targets: [
        {
          src: "README.md",
          dest: "./",
        },
        {
          src: "manifest.json",
          dest: "./",
        },
      ],
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
      entry: ["src/main.ts", "src/main.styl"],
      name: "zhi-plugin-code-block",
      fileName: "main",
      // Change this to the formats you want to support.
      // Don't forgot to update your package.json as well.
      formats: ["cjs"],
    },
    rollupOptions: {
      output: {
        entryFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ?? ""
          if (!facadeModuleId.includes("ts")) {
            return "[name]"
          }

          let entryName = "[name]"
          if (facadeModuleId.includes("main.ts")) {
            entryName = "main.js"
          } else {
            entryName = "[name].js"
          }
          return entryName
        },
      },
      // External packages that should not be bundled into your library.
      external: ["path", "fs", "siyuan"],
    },
    // minify: false,
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
