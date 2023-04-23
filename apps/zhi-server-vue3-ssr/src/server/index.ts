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
import express from "express"
import { renderToString } from "vue/server-renderer"
import createVueApp from "../app"
import { SiyuanDevice } from "zhi-device"

/**
 * HTTP 服务
 *
 * @author terwer
 * @version 1.0.0
 * @since 1.0.0
 */
class ZhiVue3SsrServer {
  init(base?: string, p?: number) {
    const server = express()

    // 指定静态文件目录
    const staticPath = SiyuanDevice.joinPath(base ?? SiyuanDevice.zhiThemePath(), "/dynamic/blog")
    // // this.logger.info("staticPath=>", staticPath)
    // console.log("staticPath=>", staticPath)
    // app.use(".", express.static(staticPath))
    // 先映射静态文件
    // app.use(express.static(__dirname))
    server.use(express.static(staticPath))

    // 服务器端路由匹配
    server.get("*", (req, res) => {
      const context = {
        url: req.url,
      }

      const { app, router } = createVueApp()

      console.log("ssr context=>", context)
      router
        .push(context.url)
        .then(() => {
          console.log("route pushed to=>", context.url)

          router.isReady().then(() => {
            console.log("router.isReady")
            const matchedComponents = router.currentRoute.value.matched
            console.log("matchedComponents=>", matchedComponents)
            if (!matchedComponents.length) {
              return res.status(404).end("Page Not Found")
            }
            Promise.all(
              matchedComponents.map((component: any) => {
                if (component.asyncData) {
                  return component.asyncData({
                    route: router.currentRoute.value,
                  })
                }
              })
            )
              .then(() => {
                console.log("start renderToString...")
                const staticV = "202304220051"
                renderToString(app, context).then((appHtml) => {
                  console.log("appHtml=>", appHtml)
                  res.send(`
                  <!DOCTYPE html>
                  <html lang="zh">
                    <head>
                      <title>zhi-blog-ssr-dev</title>
                      <link rel="stylesheet" href="./app.css?v=${staticV}" />
                    </head>
                    <body>
                      <div id="app">${appHtml}</div>
                      <script type="module" src="./app.js?v=${staticV}" async defer></script>
                    </body>
                  </html>
              `)
                  res.end()
                })
              })
              .catch((reason) => {
                res.end("error, reason is:" + reason)
              })
          })
        })
        .catch((reason) => {
          console.error("route push failed", reason)
        })
    })

    const port = p ?? 3000
    server.listen(port, () => {
      console.log(`ready ${port}...`)
    })

    return "ok"
  }
}

/**
 * 服务入口
 *
 * @param basePath - 基本路径，默认是 zhi 主题路径，需要传递绝对路径
 * @param port - 端口
 */
const init = (basePath?: string, port?: number) => {
  return new ZhiVue3SsrServer().init(basePath, port)
}

export default init
