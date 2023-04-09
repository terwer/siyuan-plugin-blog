/// <reference types="vitest" />
import { defineConfig } from "vite"
import ssr from "vite-plugin-ssr/plugin"
import viteTsConfigPaths from "vite-tsconfig-paths"
import vue from "@vitejs/plugin-vue"
import path from "path"
import builtinModules from "builtin-modules"

export default defineConfig({
    cacheDir: "../../node_modules/.vite/zhi-server-modules-blog",

    server: {
        port: 4200,
        host: "localhost",
    },

    preview: {
        port: 4300,
        host: "localhost",
    },

    plugins: [
        vue(),
        ssr(),
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

    build: {
        rollupOptions: {
            // https://rollupjs.org/configuration-options/
            input: {
                main: path.resolve(__dirname, "src/main.ts"),
            },
            output:{
                chunkFileNames: "static/js/[name]-[hash].js",
                entryFileNames: "static/js/[name].js",
                assetFileNames: "static/[ext]/[name]-[hash].[ext]",
            },
            // External packages that should not be bundled into your library.
            // external: ["express", "vite-plugin-ssr", ...builtinModules],
            external: [...builtinModules],
        },
        minify: false,
    },
})
