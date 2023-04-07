/// <reference types="vitest" />
import { defineConfig } from "vite"
import ssr from "vite-plugin-ssr/plugin"
import viteTsConfigPaths from "vite-tsconfig-paths"
import vue from "@vitejs/plugin-vue"

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
})
