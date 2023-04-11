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

import esbuild from "esbuild"
import { esbuildConfig } from "../esbuild.config"
import minimist from "minimist"

/**
 * zhi 主题构建
 *
 * @author terwer
 * @since 1.0.0
 */
class ZhiBuild {
  /**
   * 构建过程
   *
   * @param isWatch - 是否监视
   * @param isProduction - 是否生产模式
   */
  public static async processBuild(isWatch: boolean, isProduction: boolean) {
    // dev
    if (isWatch) {
      const firstBuildFinished = new Set()
      let buildStartTime: number

      // Following the log format of https://github.com/connor4312/esbuild-problem-matchers
      const status = (msg: any) => console.log(`${isWatch ? "[watch] " : ""}${msg}`)
      const watchPlugin = (type: any) => ({
        name: "watcher",
        setup(build: any) {
          build.onStart(() => {
            buildStartTime = Date.now()
            status(`${type} build started.`)
          })
          build.onEnd((result: any) => {
            result.errors.forEach((error: any) =>
              console.error(
                `> ${error.location.file}:${error.location.line}:${error.location.column}: error: ${error.text}`
              )
            )
            firstBuildFinished.add(type)
            status(`${type} build finished in ${Date.now() - buildStartTime} ms.`)
            if (firstBuildFinished.size === 2) {
              // esbuild problem matcher extension is listening for this log, once this is logged, it will open the Extension Host
              // So we have to assure only printing this when both extension and webview have been built
              status(`build finished in ${Date.now() - buildStartTime} ms.`)
            }
          })
        },
      })

      if (!esbuildConfig.plugins) {
        esbuildConfig.plugins = []
      }
      esbuildConfig.plugins.push(watchPlugin("extension"))
      esbuildConfig.watch = true
    }

    // 是否压缩
    esbuildConfig.minify = isProduction
    esbuildConfig.sourcemap = isProduction ? false : "inline"

    // define
    if (!esbuildConfig.define) {
      esbuildConfig.define = {}
    }
    esbuildConfig.define = {
      ...esbuildConfig.define,
      "process.env.NODE_ENV": isProduction ? '"production"' : '"development"',
    }

    // hande result
    const resultHandler = async (result: any) => {
      result.metafile &&
        console.log(
          await esbuild.analyzeMetafile(result.metafile, {
            verbose: true,
          })
        )
    }

    // do build
    esbuild
      .build(esbuildConfig)
      .then(resultHandler)
      .catch(() => {
        process.exit(1)
      })
  }
}

;(async function () {
  console.log("Zhi plugins is building...")

  const args = minimist(process.argv.slice(2))
  const isWatch = args.watch || args.w
  const isProduction = args.production
  console.log("isWatch=>", isWatch)
  console.log("isProduction=>", isProduction)

  try {
    const buildResult = await ZhiBuild.processBuild(isWatch, isProduction)
    console.log("Zhi build success.")
  } catch (e) {
    console.error("Zhi build error=>", e)
  }
})()
