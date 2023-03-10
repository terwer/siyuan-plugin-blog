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

import { build } from "vite"
import path from "path"
import fs from "fs-extra"
import { PreRenderedChunk } from "rollup"

// libraries
const libraries = [
  {
    entry: "./theme.ts",
    name: "Theme",
    fileName: "theme",
  },
  {
    entry: "./src/apps/zhi/plugin-system/plugin-system-hook.ts",
    name: "PluginSystemHook",
    fileName: "plugin-system-hook",
  },
  {
    entry: "./src/apps/zhi/zhi-plugins/zhi-blog-plugin/zhi-blog-plugin.ts",
    name: "ZhiBlogPlugin",
    fileName: "zhi-blog-plugin",
  },
]

// 插件处理
const handlePluginName = (chunkInfo: PreRenderedChunk) => {
  const facadeModuleId = chunkInfo.facadeModuleId
  const entryPath = path.dirname(facadeModuleId ?? ".")
  const pluginBasePath = path.join("dist-cjs", "zhi-plugins")

  // 复制 manifest.json
  const manifestPath = path.join(entryPath, "manifest.json")
  const manifestToPath = path.join(
    pluginBasePath,
    chunkInfo.name,
    "manifest.json"
  )
  if (fs.pathExistsSync(manifestPath)) {
    fs.copySync(manifestPath, manifestToPath)
    console.log("manifest.json copied.")
  }

  return path.join(pluginBasePath, "[name]", "main.js")
}

// build
for (const libItem of libraries) {
  await build({
    configFile: false,
    resolve: {
      alias: [
        {
          find: "~",
          replacement: path.resolve(path.dirname("."), ""),
        },
      ],
    },
    build: {
      outDir: ".",
      lib: libItem,
      emptyOutDir: false,
      copyPublicDir: true,
      commonjsOptions: {
        defaultIsModuleExports: true,
        include: [],
      },
      rollupOptions: {
        output: {
          assetFileNames: "[name].[ext]",
          entryFileNames: (chunkInfo) => {
            let chunkName
            const pluginSystemBasePath = path.join("dist-cjs", "plugin-system")
            // console.log("pluginSystemBasePath=>", pluginSystemBasePath)

            // 插件系统
            if (chunkInfo.name === "plugin-system-hook") {
              chunkName = path.join(pluginSystemBasePath, "[name].cjs")
            } else if (chunkInfo.name.includes("-plugin")) {
              // 插件
              chunkName = handlePluginName(chunkInfo)
            } else {
              // 其他，比如主题入口
              chunkName = "[name].js"
            }
            return chunkName
          },
          esModule: "if-default-prop",
        },
        external: ["path", "fs", "siyuan"],
      },
      // 构建后是否生成 source map 文件
      sourcemap: false,
      // 是否压缩
      minify: false,
    },
    optimizeDeps: {
      disabled: false,
    },
  })
}
