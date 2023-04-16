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

import { describe, it } from "vitest"
import Env from "zhi-env"
import LogFactory, { LogLevelEnum } from "./index"

describe("zhiLog", () => {
  it("test default log", function () {
    const logger = LogFactory.defaultLogger()
    logger.debug("This is debug log")
    logger.info("This is info log")
    logger.error("This is error log")
  })

  it("test default log env", function () {
    const env = new Env(import.meta.env)
    const logger = LogFactory.defaultLogger(env, 4)
    logger.debug("This is debug log")
    logger.info("This is info log")
    logger.error("This is error log")
  })

  it("test custom sign", function () {
    const logger = LogFactory.customSignLogFactory("haha").getLogger()
    logger.debug("This is debug log")
    logger.info("This is info log")
    logger.error("This is error log")
  })

  it("test default logger", function () {
    const logger = LogFactory.customLogFactory().getLogger(undefined, 2)
    logger.debug("This is debug log")
    logger.info("This is info log")
    logger.error("This is error log")
  })

  it("test custom logger", function () {
    const logger = LogFactory.customLogFactory().getLogger("haha")
    logger.debug("This is debug log")
    logger.info("This is info log")
    logger.error("This is error log")
  })

  it("test custom log level", function () {
    const logger = LogFactory.customLogFactory(LogLevelEnum.LOG_LEVEL_TRACE).getLogger("test")
    logger.trace("This is trace log")
    logger.debug("This is debug log")
    logger.info("This is info log")
    // logger.error("This is error log")
  })

  it("test custom level and sign", function () {
    const logger = LogFactory.customLogFactory(LogLevelEnum.LOG_LEVEL_DEBUG, "my-log").getLogger("test")
    logger.debug("This is debug log")
    logger.info("This is info log")
    logger.error("This is error log")
  })
})
