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

import ZhiServerCustomUtil from "../util/ZhiServerCustomUtil"
import { SiyuanDevice } from "zhi-device"
import express from "express"
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from "react-router-dom/server"
import routes from "../routes"
import createFetchRequest from "./request"
import React from "react"
import ReactDOMServer from "react-dom/server"

/**
 * HTTP 服务
 *
 * @author terwer
 * @version 1.0.0
 * @since 1.0.0
 */
class ZhiSsrServer {
  private readonly logger
  private readonly env

  constructor() {
    this.env = ZhiServerCustomUtil.zhiEnv()
    this.logger = ZhiServerCustomUtil.zhiLog("zhi-ssr-server")
  }

  init(base?: string, p?: number) {
    this.logger.info("Http server is staring...")
    const app = express()

    const handler = createStaticHandler(routes)

    // 指定静态文件目录
    const staticPath = SiyuanDevice.joinPath(base ?? SiyuanDevice.zhiThemePath(), "/static/blog")
    this.logger.info("staticPath=>", staticPath)
    app.use("/public", express.static(staticPath))

    // 处理请求处理路由
    app.get("*", async (req, res) => {
      const fetchRequest = createFetchRequest(req)
      const context: any = await handler.query(fetchRequest)

      // 重定向处理
      // https://reactrouter.com/en/main/guides/ssr#redirects
      if (context instanceof Response && [301, 302, 303, 307, 308].includes(context.status)) {
        return res.redirect(context.status, context.headers.get("Location") ?? "/")
      }

      const router = createStaticRouter(handler.dataRoutes, context)
      const appHtml = ReactDOMServer.renderToString(<StaticRouterProvider router={router} context={context} />)

      // 定义模板字符串
      // let template
      // 开发阶段不注入js，提高开发速度
      // if (this.env.isNodeDev()) {
      //   template = <T extends { appHtml: string; staticV: string }>({ appHtml, staticV }: T) => `
      //   <html lang="zh">
      //     <head>
      //       <title>zhi-blog-ssr1</title>
      //       <link rel="stylesheet" href="http://localhost:3232/app.css?v=${staticV}">
      //     </head>
      //     <body>
      //       <div id="app">${appHtml}</div>
      //       <script src="http://localhost:3232/app.js?v=${staticV}" async defer></script>
      //     </body>
      //   </html>
      // `
      // } else {
      //   template = <T extends { appHtml: string; staticV: string }>({ appHtml, staticV }: T) => `
      //   <html lang="zh">
      //     <head>
      //       <title>zhi-blog-ssr</title>
      //       <link rel="stylesheet" href="/public/app.css?v=${staticV}">
      //     </head>
      //     <body>
      //       <div id="app">${appHtml}</div>
      //       <script src="/public/app.js?v=${staticV}" async defer></script>
      //     </body>
      //   </html>
      // `
      // }
      const template = <T extends { appHtml: string; staticV: string }>({ appHtml, staticV }: T) => `
zhi
        <html lang="zh">
          <head>
            <title>zhi-blog-ssr</title>
            <link rel="stylesheet" href="/public/app.css?v=${staticV}">
          </head>
          <body>
            <div id="app">${appHtml}</div>
            <script src="/public/app.js?v=${staticV}" async defer></script>
          </body>
        </html>
      `

      // 定义静态文件版本号
      const staticV = "202304200051"
      // 替换模板
      const html = template({ appHtml, staticV })

      // 渲染页面
      res.send(html)
    })

    // 监听端口
    const listener = app.listen(p ?? 3333, () => {
      const { port } = listener.address() as any
      this.logger.info(`Server is listening on port ${port}...`)
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
  return new ZhiSsrServer().init(basePath, port)
}

export default init
