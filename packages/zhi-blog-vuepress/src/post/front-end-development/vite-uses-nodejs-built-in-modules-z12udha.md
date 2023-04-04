---
title: vite使用nodeJS内置的模块
short_title: ''
description: vite使用nodejs内置的模块问题背景vite是一个新工具有助于快速启动和简化前端javascript开发。vite相对于parcel等其他解决方案的主要优势是速度更快并将编译限制为对依赖项的一次性操作保持源代码不受影响（如果您不需要因为jsx或typescript）。vite下一代前端工具它由两个主要部分组成_一个通过原生es模块为您的源文件提供服务的开发服务器具有丰富的内置功能和惊人的快速热模块替换(hmr)。一个构建命令将您的代码与rollup捆绑在一起预先配置为输出高度优化的静态资产以用于生产
date: 2022-08-17 16:02:01
category:
  - 前端开发
tag:
  - 内置
  - 模块
  - vite
  - node
  - nodejs
  - fetch
  - node-fetch
article: true
timeline: false
---
# vite使用nodeJS内置的模块



## 问题背景

Vite 是一个新工具，有助于快速启动和简化前端 Javascript 开发。 Vite 相对于 Parcel 等其他解决方案的主要优势是速度更快，并将编译限制为对依赖项的一次性操作，保持源代码不受影响（如果您不需要，因为 JSX 或 typescript）。

**vite-下一代前端工具**

它由两个主要部分组成：

* 一个通过原生 ES 模块为您的源文件提供服务的开发服务器，具有丰富的内置功能和惊人的快速热模块替换 (HMR)。

* 一个构建命令，将您的代码与 Rollup 捆绑在一起，预先配置为输出高度优化的静态资产以用于生产。  
  它与 Snowpack 非常相似，并且这两个项目具有相同的好处。

Snowpack 在开发阶段和生产捆绑使用 Rollup，而 Vite 在开发阶段使用 Esbuild，而 Rollup 仅用于生产构建。最终目标是在最新版本达到与 Rollup 相同的功能级别时，用性能更高的 Esbuild 完全替换 Rollup。

## 问题引入

我在项目中使用 Vite 时发现的一个问题是如何为浏览器填充 Node.js 内置模块。

**不鼓励在浏览器项目中使用 Node.js 内置和全局变量（es util 或 process），但有时您需要使用一些依赖包来使用它们。**

为了让这些包在浏览器上运行，你通常会添加一些 polyfill 来帮助你模仿这些缺失的包。

Snowpack 会自动将这些 polyfills 添加到所需的 Rollup 插件中，但在 Vite 中，我必须编写一些配置。

这是 Vite 配置文件：`vite.config.js`

```ts
import {defineConfig} from 'vite'
import {loadEnv} from "vite";
import vue from '@vitejs/plugin-vue'
import vitePluginRequireTransform from 'vite-plugin-require-transform';
// yarn add --dev @esbuild-plugins/node-globals-polyfill
import {NodeGlobalsPolyfillPlugin} from '@esbuild-plugins/node-globals-polyfill'
// yarn add --dev @esbuild-plugins/node-modules-polyfill
import {NodeModulesPolyfillPlugin} from '@esbuild-plugins/node-modules-polyfill'
// You don't need to add this to deps, it's included by @esbuild-plugins/node-modules-polyfill
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd())

    const processEnvValues = {
        'process.env': Object.entries(env).reduce(
            (prev, [key, val]) => {
                return {
                    ...prev,
                    [key]: val,
                }
            },
            {},
        )
    }

    return {
        plugins: [
            vue(),
            // https://github.com/WarrenJones/vite-plugin-require-transform/issues/10
            // @ts-ignore
            vitePluginRequireTransform.default({
                fileRegex: /.ts$|.vue$/
            }),
        ],
        base: './',
        // https://github.com/vitejs/vite/issues/1930
        // https://vitejs.dev/guide/env-and-mode.html#env-files
        // 在这里自定义变量
        define: Object.assign(processEnvValues, {}),
        resolve: {
            alias: {
                'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
                'node-fetch': 'isomorphic-fetch',
                // This Rollup aliases are extracted from @esbuild-plugins/node-modules-polyfill,
                // see https://github.com/remorses/esbuild-plugins/blob/master/node-modules-polyfill/src/polyfills.ts
                // process and buffer are excluded because already managed
                // by node-globals-polyfill
                util: 'rollup-plugin-node-polyfills/polyfills/util',
                sys: 'util',
                events: 'rollup-plugin-node-polyfills/polyfills/events',
                stream: 'rollup-plugin-node-polyfills/polyfills/stream',
                path: 'rollup-plugin-node-polyfills/polyfills/path',
                querystring: 'rollup-plugin-node-polyfills/polyfills/qs',
                punycode: 'rollup-plugin-node-polyfills/polyfills/punycode',
                url: 'rollup-plugin-node-polyfills/polyfills/url',
                string_decoder: 'rollup-plugin-node-polyfills/polyfills/string-decoder',
                http: 'rollup-plugin-node-polyfills/polyfills/http',
                https: 'rollup-plugin-node-polyfills/polyfills/http',
                os: 'rollup-plugin-node-polyfills/polyfills/os',
                assert: 'rollup-plugin-node-polyfills/polyfills/assert',
                constants: 'rollup-plugin-node-polyfills/polyfills/constants',
                _stream_duplex: 'rollup-plugin-node-polyfills/polyfills/readable-stream/duplex',
                _stream_passthrough: 'rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough',
                _stream_readable: 'rollup-plugin-node-polyfills/polyfills/readable-stream/readable',
                _stream_writable: 'rollup-plugin-node-polyfills/polyfills/readable-stream/writable',
                _stream_transform: 'rollup-plugin-node-polyfills/polyfills/readable-stream/transform',
                timers: 'rollup-plugin-node-polyfills/polyfills/timers',
                console: 'rollup-plugin-node-polyfills/polyfills/console',
                vm: 'rollup-plugin-node-polyfills/polyfills/vm',
                zlib: 'rollup-plugin-node-polyfills/polyfills/zlib',
                tty: 'rollup-plugin-node-polyfills/polyfills/tty',
                domain: 'rollup-plugin-node-polyfills/polyfills/domain',
                buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6', // add buffer
                process: 'rollup-plugin-node-polyfills/polyfills/process-es6', // add process
            },
        },
        optimizeDeps: {
            esbuildOptions: {
                // Node.js global to browser globalThis
                define: {
                    global: 'globalThis'
                },
                // Enable esbuild polyfill plugins
                plugins: [
                    NodeGlobalsPolyfillPlugin({
                        process: true,
                        buffer: true
                    }),
                    NodeModulesPolyfillPlugin()
                ]
            }
        },
        build: {
            // 不压缩，用于调试
            minify: false,
            rollupOptions: {
                plugins: [
                    // Enable rollup polyfills plugin
                    // used during production bundling
                    rollupNodePolyFill()
                ]
            }
        }
    }
})
```

如您所见，我为 Esbuild 添加了两个 polyfill 模块（它们正在大量开发中）。  
然后我将 Rollup 配置为在生产捆绑期间应用相同的 polyfill。

这对我的项目有用，希望这也能帮助你并抽出一些时间。

## 参考

[https://medium.com/@ftaioli/using-node-js-builtin-modules-with-vite-6194737c2cd2](https://medium.com/@ftaioli/using-node-js-builtin-modules-with-vite-6194737c2cd2)

[https://github.com/vitejs/vite/issues/9511](https://github.com/vitejs/vite/issues/9511)