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

import loglevel from "loglevel"
import prefix from "loglevel-plugin-prefix"
import LogLevelEnum from "./logConstants"
import callsites, { CallSite } from "callsites"
import EnvHelper from "./envHelper"
import Env from "zhi-env"
import DefaultLogger from "./defaultLogger"
import crossChalk from "./crossChalk"

/**
 * 日志工具类
 *
 * @author terwer
 * @since 1.0.0
 */
class Logger {
  private consoleLogger = "console"
  private stackSize = 1

  /**
   * 设置输出栈的深度，默认1
   *
   * @param stackSize - 栈的深度
   */
  public setStackSize(stackSize?: number): void {
    this.stackSize = stackSize ?? 1
  }

  constructor(level?: LogLevelEnum, sign?: string, env?: Env) {
    this.stackSize = 1

    // 级别
    let customLevel = undefined
    if (level) {
      customLevel = level
    } else {
      customLevel = EnvHelper.getEnvLevel(env)
    }
    customLevel = customLevel ?? LogLevelEnum.LOG_LEVEL_INFO
    loglevel.setLevel(customLevel)

    const fmtLog = (level: LogLevelEnum, name: string, timestamp: Date, colorFn: any) => {
      const strarr = []

      // sign
      const logSign = sign ?? EnvHelper.getEnvLogger(env) ?? "zhi"
      strarr.push(crossChalk.gray("[") + colorFn(logSign) + crossChalk.gray("]"))
      // timestamp
      strarr.push(crossChalk.gray("[") + crossChalk.gray(timestamp.toString()) + crossChalk.gray("]"))
      // level
      strarr.push(colorFn(level.toUpperCase().toString()))
      // name
      strarr.push(colorFn(name))
      strarr.push(crossChalk.gray(":"))
      return strarr
    }
    prefix.reg(loglevel)
    prefix.apply(loglevel, {
      format(level, name, timestamp) {
        let strarr = []
        const logName = name ?? ""

        switch (level) {
          case LogLevelEnum.LOG_LEVEL_TRACE:
            strarr = fmtLog(level, logName, timestamp, crossChalk.gray)
            break
          case LogLevelEnum.LOG_LEVEL_DEBUG:
            strarr = fmtLog(level, logName, timestamp, crossChalk.blue)
            break
          case LogLevelEnum.LOG_LEVEL_INFO:
            strarr = fmtLog(level, logName, timestamp, crossChalk.green)
            break
          case LogLevelEnum.LOG_LEVEL_WARN:
            strarr = fmtLog(level, logName, timestamp, crossChalk.yellow)
            break
          case LogLevelEnum.LOG_LEVEL_ERROR:
            strarr = fmtLog(level, logName, timestamp, crossChalk.red)
            break
          default:
            strarr = fmtLog(LogLevelEnum.LOG_LEVEL_INFO, logName, timestamp, crossChalk.green)
            break
        }

        return strarr.join(" ")
      },
    })
  }

  /**
   * 获取调用堆栈，若未获取到直接返回空数组
   *
   * @author terwer
   * @since 1.6.0
   */
  public getCallStack(): CallSite[] {
    let cs: CallSite[]
    try {
      cs = callsites()
    } catch (e) {
      // if callsites not get logger, just ignore
      cs = []
    }
    return cs
  }

  /**
   * 获取日志记录器
   *
   * @param loggerName - 日志记录器，默认为 console
   * @author terwer
   * @since 1.0.0
   */
  public getLogger = (loggerName?: string): DefaultLogger => {
    let loggerFrom
    // 显示优先
    if (loggerName) {
      loggerFrom = loggerName
    } else {
      const allcs = this.getCallStack()
      const baseNames = <string[]>[]

      const cs = []

      for (let i = 0; i < allcs.length; i++) {
        const c = allcs[i]
        const fname = c.getFileName() ?? "none"

        if (i > this.stackSize - 1) {
          break
        }

        const baseName = fname + "-" + c.getLineNumber() + ":" + c.getColumnNumber()
        baseNames.push(baseName)
      }

      if (cs.length > 0) {
        loggerFrom = baseNames.join(" -> ")
      }
    }

    if (!loggerFrom || loggerFrom.trim().length === 0) {
      loggerFrom = this.consoleLogger
    }
    return loglevel.getLogger(loggerFrom) as DefaultLogger
  }
}

export default Logger
