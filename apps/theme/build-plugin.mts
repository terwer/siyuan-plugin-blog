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

// https://github.com/vitejs/vite/discussions/1736#discussioncomment-3229793

import { build, InlineConfig } from "vite"
import path from "path";

/**
 * zhi 主题构建
 *
 * @author terwer
 * @since 1.0.0
 */
class ZhiBuild {
  // libraries
  private readonly libraries = [
    {
      entry: "./theme.ts",
      name: "Theme",
      fileName: "theme",
    },
  ]

  public async processBuild() {
    // for (const libItem of this.libraries) {
    //   const viteConfig: InlineConfig = {
    //     configFile: false,
    //     resolve: {
    //       alias: [
    //         {
    //           find: "~",
    //           replacement: path.resolve(path.dirname("."), ""),
    //         },
    //       ],
    //     },
    //     plugins: [],
    //     build: {
    //       outDir: "../../",
    //       lib: {
    //         entry: libItem.entry,
    //         name: libItem.name,
    //         fileName: libItem.fileName,
    //         formats: ["cjs"],
    //       },
    //       emptyOutDir: false,
    //       copyPublicDir: true,
    //       commonjsOptions: {
    //         defaultIsModuleExports: true,
    //         include: [],
    //       },
    //       rollupOptions: {
    //         output: {
    //           esModule: "if-default-prop",
    //         },
    //         external: ["path", "fs", "siyuan"],
    //       },
    //       // 构建后是否生成 source map 文件
    //       sourcemap: false,
    //       // 是否压缩
    //       minify: false,
    //     },
    //     optimizeDeps: {
    //       disabled: false,
    //     },
    //   }
    //   await build(viteConfig)
    // }
  }
}

;(async function () {
  console.log("Zhi theme is building...")
  const zhiBuild = new ZhiBuild()
  await zhiBuild.processBuild()
  console.log("Zhi theme build finished.")
})()
