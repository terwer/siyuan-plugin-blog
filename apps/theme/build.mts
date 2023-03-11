// https://github.com/vitejs/vite/discussions/1736#discussioncomment-3229793

import { build, InlineConfig } from "vite"
import path from "path"

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
        build: {
          outDir: "../../",
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
  console.log("Zhi theme is building...")
  const zhiBuild = new ZhiBuild()
  await zhiBuild.processBuild()
  console.log("Zhi theme build finished.")
})()
