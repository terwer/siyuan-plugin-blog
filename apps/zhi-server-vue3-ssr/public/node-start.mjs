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

import { Headers, Request, Response } from "crosss-fetch"

// 1 构建代码
// pnpm nodeBuild -F zhi-server-vue3-ssr

// 2 拷贝客户端、服务端所有代码到同一个文件夹
// 如果不复制代码，可跳过这一步
// cp -r /Users/terwer/Documents/mydocs/zhi/apps/zhi-server-vue3-ssr/dist/ /Users/terwer/Documents/mydocs/SiYuanWorkspace/public/conf/appearance/themes/zhi/dynamic/blog
// 注意后面的路径要和下面的 basePath 对应

// 3 安装nodemon
// pnpm init
// pnpm install node-fetch nodemon -D
// "dev": "nodemon node-start.mjs"

// 4 运行
// pnpm dev

// 或者，直接 IDEA 源码调试
// pnpm nodeBuild -F zhi-server-vue3-ssr
// pnpm nodeDev -F zhi-server-vue3-ssr

// 兼容 Node
if (!global.fetch) {
  global.Headers = Headers
  global.Request = Request
  global.Response = Response
}

;(async () => {
  // const basePath = "/Users/terwer/Documents/mydocs/SiYuanWorkspace/public/conf/appearance/themes/zhi/dynamic/blog"
  const devBasePath = "/Users/terwer/Documents/mydocs/zhi/apps/zhi-server-vue3-ssr/dist"
  const basePath = process.env.BASE_PATH || devBasePath
  const port = 3333
  const server = await import(`file://${basePath}/server.mjs`)
  server.default(basePath, port)
})()
