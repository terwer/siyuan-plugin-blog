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
import { commonConfig } from "../../vite.config"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  ...commonConfig,
  build: {
    lib: {
      entry: path.resolve(
        __dirname,
        "../../src/apps/zhi/zhi-plugins/zhi-picture-plugin/main.ts"
      ),
      name: "zhi-picture-plugin",
      fileName: "main",
      formats: ["cjs"],
    },

    commonjsOptions: {
      defaultIsModuleExports: true,
    },

    rollupOptions: {
      external: "siyuan",
    },

    // 生成sourcemap
    sourcemap: false,

    // 设置为 false 可以禁用最小化混淆
    // 或是用来指定是应用哪种混淆器
    // boolean | 'terser' | 'esbuild'
    // minify: false,
    minify: "esbuild",
  },
})
