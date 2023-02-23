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

import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: "./",
    build: {
        rollupOptions: {
            input: {
                themeStyle: "src/zhi-theme.sass",
                themeScript: "src/zhi-theme.ts",
                appEntry: "index.html"
            },
            output: {
                chunkFileNames: "chunk/[name]-[hash].js",
                entryFileNames: (entry) => {
                    if (entry.name == "themeScript") {
                        return "zhi-theme.js"
                    } else {
                        return "entry/[name]-[hash].js"
                    }
                },
                assetFileNames: (asset) => {
                    console.log(asset.name)
                    if (asset.name == "zhi-theme.css") {
                        return "[name].[ext]"
                    } else {
                        return "static/[ext]/[name]-[hash].[ext]"
                    }
                },
                manualChunks(id) {
                    if (id.indexOf("node_modules") > -1) {
                        let arr = id.toString().split("node_modules/")[1].split("/")
                        // pnpm单独处理
                        if (id.indexOf(".pnpm") > -1) {
                            arr = id.toString().split(".pnpm/")[1].split("/")
                        }
                        const dep = arr[0].split("@")[0].replace(/\./g, "-")
                        // console.log("id=>", id)
                        // console.log("dep=>", dep)
                        if (dep !== "") {
                            return "vendor_" + dep
                        }
                        return "vendor"
                    }
                }
            }
        }
    }
})
