/*
 Copyright (c) 2023 Terwer. All rights reserved.

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

// https://github.com/vitejs/vite/discussions/1736#discussioncomment-3229793

import { build, InlineConfig } from "vite"
import path from "path"
import fs from "fs-extra"
import pluginJson from "./plugin.json" assert { type: "json" }

/**
 * zhi 主题构建
 *
 * @author terwer
 * @since 1.0.0
 */
class ZhiBuild {
  // libraries
  private readonly libraries = pluginJson

  // 插件处理
  private handlePluginName(chunkInfo: any) {
    const facadeModuleId = chunkInfo.facadeModuleId
    const entryPath = path.dirname(facadeModuleId ?? ".")
    const entryFolder = entryPath.split("/").pop() ?? ""
    const pluginBasePath = path.join("lib", "zhi-plugins")

    // 复制 manifest.json
    const manifestPath = path.join(entryPath, "manifest.json")
    const manifestToPath = path.join(pluginBasePath, entryFolder, "manifest.json")
    if (fs.pathExistsSync(manifestPath)) {
      fs.copySync(manifestPath, manifestToPath)
      console.log("manifest.json copied.")
    }

    // 复制 README.md
    const readmePath = path.join(entryPath, "README.md")
    const readmeToPath = path.join(pluginBasePath, entryFolder, "README.md")
    if (fs.pathExistsSync(manifestPath)) {
      fs.copySync(readmePath, readmeToPath)
      console.log("README.md copied.")
    }

    const mainToPath = path.join(pluginBasePath, entryFolder)
    return path.join(mainToPath, "main.js")
  }

  public async processBuild() {
    const that = this
    for (const libItem of this.libraries) {
      const viteConfig: InlineConfig = {
        configFile: false,
        resolve: {
          alias: [
            {
              find: "~",
              replacement: path.resolve(path.dirname("."), ""),
            },
          ],
        },
        plugins: [],
        build: {
          outDir: ".",
          lib: {
            entry: libItem.entry,
            name: libItem.name,
            fileName: libItem.fileName,
            formats: ["cjs"],
          },
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
                const facadeModuleId = chunkInfo.facadeModuleId
                const entryPath = path.dirname(facadeModuleId ?? ".")
                const entryFolder = entryPath.split("/").pop() ?? ""
                console.log("entryFolder=>", entryFolder)

                // 插件
                if (entryFolder.includes("zhi-")) {
                  chunkName = that.handlePluginName(chunkInfo)
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
      }
      await build(viteConfig)
    }
  }
}

;(async function () {
  console.log("Zhi plugins is building...")
  const zhiBuild = new ZhiBuild()
  await zhiBuild.processBuild()
  console.log("Zhi plugins build finished.")
})()
