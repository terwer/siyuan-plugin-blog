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
import { createExpressServer } from "~/src/server/index"

const logger = ZhiServerVue3SsrUtil.zhiLog("vercel-middleware")

const server = createExpressServer()
// 解决req.body undefined
server.use(express.json())

/**
 * CORS 在 vercel.json 配置，这里无需配置
 */
server.use(function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  // res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    logger.debug("precheck request received")
    res.send(200)
  } else {
    next()
  }
})

export default server
