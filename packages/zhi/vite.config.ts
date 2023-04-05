/*
 * Copyright (c) 2023, Terwer . All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Terwer designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Terwer in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Terwer, Shenzhen, Guangdong, China, youweics@163.com
 * or visit www.terwer.space if you need additional information or have any
 * questions.
 */

/// <reference types="vitest" />
import { defineConfig, loadEnv } from "vite"

import viteTsConfigPaths from "vite-tsconfig-paths"
import dts from "vite-plugin-dts"
import { join } from "path"

const mode = process.env["NODE_ENV"] ?? "production"
const zhiBase = join(process.cwd(), "packages", "zhi")
const env: Record<string, string> = loadEnv(mode, zhiBase)
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
console.log("zhiBase=>", zhiBase)
console.log("debugMode=>", debugMode)

export default defineConfig({
    cacheDir: "../../node_modules/.vite/zhi",

    plugins: [
        // dts({
        //   entryRoot: "src",
        //   tsConfigFilePath: join(__dirname, "tsconfig.lib.json"),
        //   skipDiagnostics: true,
        // }),

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
            external: [
                "fs",
                "path",
                "tls",
                "node:perf_hooks",
                "node:stream/web",
                "node:timers",
                "stream",
                "https",
                "url",
            ],
        },
        minify: false,
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
