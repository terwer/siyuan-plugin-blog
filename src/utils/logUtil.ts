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

import loglevel, { Logger } from "loglevel"
import prefix from "loglevel-plugin-prefix"
import envUtil from "~/src/utils/envUtil"

/**
 * 日志工具类
 *
 * @author terwer
 * @since 1.0.0
 */
class LogUtil {
  private consoleLogger = "console"

  constructor() {
    // DEBUG, INFO, WARN, ERROR
    const LOG_LEVEL_DEBUG = "DEBUG"
    const LOG_LEVEL_INFO = "INFO"
    const LOG_LEVEL_WARN = "WARN"
    const LOG_LEVEL_ERROR = "ERROR"

    // polyfill due to https://github.com/vitejs/vite/issues/7385
    const chalk = {
      gray: (src: any): string => {
        return src.toString()
      },
      green: (src: any): string => {
        return src.toString()
      },
      yellow: (src: any): string => {
        return src.toString()
      },
      red: (src: any): string => {
        return src.toString()
      },
    }

    prefix.reg(loglevel)
    if (envUtil.isDev) {
      loglevel.setLevel(LOG_LEVEL_DEBUG)
    } else {
      loglevel.setLevel(LOG_LEVEL_INFO)
    }

    prefix.apply(loglevel, {
      format(level, name, timestamp) {
        const strarr = ["[zhi]"]
        strarr.push(
          chalk.gray("[") + chalk.green(timestamp).toString() + chalk.gray("]")
        )

        switch (level) {
          case LOG_LEVEL_INFO:
            strarr.push(chalk.green(level.toUpperCase().toString()))
            break
          case LOG_LEVEL_WARN:
            strarr.push(chalk.yellow(level.toUpperCase().toString()))
            break
          case LOG_LEVEL_ERROR:
            strarr.push(chalk.red(level.toUpperCase().toString()))
            break
        }

        strarr.push(chalk.green(name).toString())
        strarr.push(chalk.gray(":"))

        return strarr.join(" ")
      },
    })
  }

  /**
   * 获取日志记录器
   *
   * @param loggerName 日志记录器，默认为 console
   * @author terwer
   * @since 1.0.0
   */
  public getLogger = (loggerName?: string): Logger =>
    loglevel.getLogger(loggerName ?? this.consoleLogger)
}

/**
 * 日志记录工厂
 *
 * @author terwer
 * @since 1.0.0
 */
class LogFactory {
  private logUtil

  constructor() {
    this.logUtil = new LogUtil()
  }

  getLogger(loggerName: string) {
    return this.logUtil.getLogger(loggerName)
  }
}

const logFactory = new LogFactory()

export default logFactory
if (typeof module !== "undefined") {
  module.exports = logFactory
}
