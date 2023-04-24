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
import ZhiServerVue3SsrUtil from "~/utils/ZhiServerVue3SsrUtil"
import { SiyuanDevice } from "zhi-device"
import createVueApp from "~/src/app"
import { renderToString } from "vue/server-renderer"

/**
 * 通用的 express 实例
 *
 * @author terwer
 * @version 1.0.0
 * @since 1.0.0
 */
export function createExpressServer() {
  const logger = ZhiServerVue3SsrUtil.zhiLog("server-middleware")
  const server = express()

  // 指定静态文件目录
  const staticPath = process.env.BASE_PATH ?? SiyuanDevice.joinPath(SiyuanDevice.zhiThemePath(), "/dynamic/blog")
  logger.info("staticPath=>", staticPath)
  server.use(express.static(staticPath))

  // 服务器端路由匹配
  server.get("*", (req, res) => {
    const context = {
      url: req.url,
    }

    const { app, router } = createVueApp()

    logger.debug("ssr context=>", context)
    router
      .push(context.url)
      .then(() => {
        logger.info("route pushed to=>", context.url)

        router.isReady().then(() => {
          logger.debug("router.isReady")
          const matchedComponents = router.currentRoute.value.matched
          logger.trace("matchedComponents=>", matchedComponents)
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
              logger.trace("start renderToString...")
              const staticV = "202304220051"
              renderToString(app, context).then((appHtml) => {
                logger.trace("appHtml=>", appHtml)
                res.send(`
                  <!DOCTYPE html>
                  <html lang="zh">
                    <head>
                      <meta charset="UTF-8" />
                      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                      <link rel="icon" href="./favicon.ico">
                      <link rel="stylesheet" href="./app.css?v=${staticV}" />
                      <title>zhi-blog-ssr-dev</title>
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
        logger.error("route push failed", reason)
      })
  })

  return server
}
