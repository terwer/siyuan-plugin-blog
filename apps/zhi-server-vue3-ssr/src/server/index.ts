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
import { createApp } from "../app"
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
    const app = express()

    // 指定静态文件目录
    const staticPath = SiyuanDevice.joinPath(base ?? SiyuanDevice.zhiThemePath(), "/dynamic/blog")
    // this.logger.info("staticPath=>", staticPath)
    console.log("staticPath=>", staticPath)
    app.use("/public", express.static(staticPath))

    app.get("/", (req, res) => {
      const app = createApp()

      const staticV = "202304220051"
      renderToString(app).then((html) => {
        res.send(`
        <!DOCTYPE html>
        <html lang="zh">
          <head>
            <title>zhi-blog-ssr-dev</title>
            <!--
            <link rel="stylesheet" href="/public/app.css?v=${staticV}" />
            -->
          </head>
          <body>
            <div id="app">${html}</div>
            <script src="/public/app.js?v=${staticV}" async defer></script>
          </body>
        </html>
    `)
      })
    })

    app.listen(3000, () => {
      console.log("ready")
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
