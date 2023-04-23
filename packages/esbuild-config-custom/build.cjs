#!/usr/bin/env node

const path = require("path")
const esbuild = require("esbuild")
const minimist = require("minimist")
const { existsSync } = require("fs")
const getNormalizedEnvDefines = require("./utils.cjs")
const { ServeOnRequestArgs } = require("esbuild")
const { createServer } = require("http")

/**
 *  zhi 主题构建
 */
class ZhiBuild {
  /**
   * 构建过程
   */
  static async processBuild() {
    // 处理参数
    const args = minimist(process.argv.slice(2))
    const cfg = args.c ?? "esbuild.config.cjs"
    const isWatch = args.watch ?? false
    const isProduction = !isWatch

    // 读取用户定义的配置文件
    let userEsbuildConfig = {}
    let customConfig = {}
    const esbuildConfigFile = path.join(process.cwd(), cfg)
    console.log("reading user defined esbuild config from =>", esbuildConfigFile)
    if (existsSync(esbuildConfigFile)) {
      try {
        // 兼容 mjs 和 cjs
        const pkg = await import(esbuildConfigFile)
        console.log("pkg=>", pkg)
        let cfg = pkg
        if (pkg.default) {
          cfg = pkg.default
        }
        userEsbuildConfig = cfg.esbuildConfig ?? {}
        customConfig = cfg.customConfig ?? {}
      } catch (error) {
        console.error(`Failed to load esbuild config: ${error}`)
        process.exit(1)
      }
    }
    // console.log("parsed user defined esbuild config", esbuildConfig)

    // ===================
    // 默认集成的配置开始
    // ===================
    let bundledEsbuildConfig = {
      plugins: [],
      define: {},
    }

    // 监控构建插件
    if (isWatch) {
      const firstBuildFinished = new Set()
      let buildStartTime
      // Following the log format of https://github.com/connor4312/esbuild-problem-matchers
      const status = (msg) => console.log(`${isWatch ? "[watch] " : ""}${msg}`)
      const watchPlugin = (type) => ({
        name: "watcher",
        setup(build) {
          build.onStart(() => {
            buildStartTime = Date.now()
            // status(`${type} build started.`)
          })
          build.onEnd((result) => {
            result.errors.forEach((error) =>
              console.error(
                `> ${error.location.file}:${error.location.line}:${error.location.column}: error: ${error.text}`
              )
            )
            if (firstBuildFinished.size === 0) {
              firstBuildFinished.add(type)
              status(`${type} build finished in ${Date.now() - buildStartTime} ms.`)
            } else {
              // esbuild problem matcher extension is listening for this log, once this is logged, it will open the Extension Host
              // So we have to assure only printing this when both extension and webview have been built
              status(`build hot reloaded in ${Date.now() - buildStartTime} ms.`)
            }
          })
        },
      })
      if (customConfig.isServe) {
        bundledEsbuildConfig.banner = {
          js: `(() => new EventSource("http://localhost:${customConfig.servePort}/esbuild").addEventListener("change", e => { location.reload() }))();`,
        }
      }
      bundledEsbuildConfig.plugins.push(watchPlugin(isProduction ? "production" : "development"))
    }

    // https://github.com/Jarred-Sumner/esbuild-plugin-ifdef
    // ifdef插件

    // 是否压缩
    // 压缩会去掉标记，所以仅在最终产物进行
    // 可在最后使用的地方手动压缩
    // https://github.com/evanw/esbuild/releases/tag/v0.16.14
    bundledEsbuildConfig.minify = false
    // 是否生成sourcemap
    bundledEsbuildConfig.sourcemap = isProduction ? false : "inline"

    // 环境变量
    // vite读取解析会报错
    // const defineEnv = {
    //   NODE_ENV: isProduction ? "production" : "development",
    //   ...getNormalizedEnvDefines(["NODE", "VITE_"]),
    // }
    // bundledEsbuildConfig.define = {}
    // bundledEsbuildConfig.define = {
    //   ...bundledEsbuildConfig.define,
    //   "import.meta.env": JSON.stringify(defineEnv),
    // }
    // ===================
    // 默认集成的配置结束
    // ===================

    // 配置合并
    const defaultEsbuildConfig = {
      entryPoints: ["./src/index.ts"],
      outfile: "./dist/index.js",
      // default for browser
      // https://esbuild.github.io/getting-started/#bundling-for-the-browser
      bundle: true,
      minify: true,
      sourcemap: true,
      // target: ["chrome58", "firefox57", "safari11", "edge16"],
      plugins: [],
    }
    // console.log("defaultEsbuildConfig=>", defaultEsbuildConfig)
    // console.log("bundledEsbuildConfig=>", bundledEsbuildConfig)
    // console.log("userEsbuildConfig=>", userEsbuildConfig)

    const esbuildConfig = {
      ...defaultEsbuildConfig,
      ...bundledEsbuildConfig,
      ...userEsbuildConfig,
      plugins: defaultEsbuildConfig.plugins
        .concat(bundledEsbuildConfig.plugins)
        .concat(userEsbuildConfig.plugins ?? []),
      define: {
        ...(defaultEsbuildConfig.define ?? {}),
        ...(bundledEsbuildConfig.define ?? {}),
        ...(userEsbuildConfig.define ?? {}),
      },
    }
    // some fix
    if (esbuildConfig.target && esbuildConfig.platform === "node") {
      esbuildConfig.target = undefined
    }

    console.log("building is start, esbuildConfig=>", esbuildConfig)

    // 热部署新版
    // https://esbuild.github.io/api/#watch
    // https://github.com/evanw/esbuild/releases/tag/v0.17.0
    if (isWatch) {
      const context = await esbuild.context(esbuildConfig)

      // Manually do an incremental build
      const result = await context.rebuild()
      // console.log("rebuilded, result=>", result)

      // Enable watch mode
      // console.log("watch mode enabled")
      await context.watch()
      console.log("esbuild is watching...")

      // Enable serve mode
      if (customConfig.isServe) {
        await context.serve({
          port: customConfig.servePort,
          host: "127.0.0.1",
          servedir: customConfig.distDir ?? process.cwd(),
          onRequest: (args) => {
            console.log(args)
          },
        })

        console.log(`esbuild is serving on ${customConfig.servePort} ...`)
      }
    } else {
      await esbuild.build(esbuildConfig)
      console.log("ZhiBuild process finished")
    }

    // invoke success callback
    if (customConfig.onZhiBuildSuccess) {
      console.log("ZhiBuild detected success callback")
      customConfig.onZhiBuildSuccess()
    }
  }
}

/**
 * 构建入口
 */
;(async () => {
  try {
    console.log("ZhiBuild is starting...")
    await ZhiBuild.processBuild()
  } catch (e) {
    console.error(`ZhiBuild process failed: ${e}`)
    process.exit(1)
  }
})()

module.exports = ZhiBuild
