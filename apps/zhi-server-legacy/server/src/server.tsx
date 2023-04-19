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
import { App } from "../../client/src/App"
import ReactDOMServer from "react-dom/server"
import ZhiServerLegacyUtil from "../../util/ZhiServerLegacyUtil"
import { SiyuanDevice } from "zhi-device"

/**
 * HTTP 服务
 *
 * @author terwer
 * @version 1.0.0
 * @since 1.0.0
 */
class ZhiSsrServer {
  private readonly logger

  constructor() {
    this.logger = ZhiServerLegacyUtil.zhiLog("zhi-ssr-server")
  }

  init(p?: number) {
    this.logger.info("Http server is staring...")
    const app = express()

    app.get("/", (req, res) => {
      const app = ReactDOMServer.renderToString(<App />)

      const staticV = "202304200051"
      const html = `
        <html lang="zh">
        <head>
            <title>zhi-blog-ssr</title>
            <link rel="stylesheet" href="app.css?v=${staticV}">
            <script src="app.js?v=${staticV}" async defer></script>
        </head>
        <body>
            <div id="app">${app}</div>
        </body>
        </html>
    `
      res.send(html)
    })

    app.use(express.static(SiyuanDevice.joinPath(SiyuanDevice.zhiThemePath(), "/server/legacy")))
    const port = p ?? 3333
    app.listen(port)
    this.logger.info(`Http server is listening at ${port}...`)

    return "ok"
  }
}

/**
 * 服务入口
 */
const init = (port?: number) => {
  return new ZhiSsrServer().init(port)
}

export default init
