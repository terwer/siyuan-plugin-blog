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

import LogFactory, { DefaultLogger } from "zhi-log"
import Env from "zhi-env"
import ZhiCommon from "./zhi-common"

/**
 * 默认的日志标志
 */
const DEFAULT_LOG_SIGN = "zhi"

/**
 * 工具类统一入口，每个应用自己实现，可继承 zhi-common 然后扩展
 *
 * ```
 * zhiEnv 方法必须重写，zhiLog 方法可不用
 * ```
 *
 * @public
 * @author terwer
 * @since 1.0.0
 */
abstract class ZhiUtil {
  /**
   * zhi-util 的运行时环境
   */
  protected static env: Env | undefined

  /**
   * zhi-util 的日志器缓存
   */
  protected static loggerMap: { [key: string]: DefaultLogger } = {}

  /**
   * zhi-util 的通用工具类
   */
  protected static common: ZhiCommon | undefined

  /**
   * 某些情况下，可能需要手动 init 之后才能用
   */
  public static initEnv(env: Env) {
    this.env = env
  }

  /**
   * 获取 zhi-env 实例 - 必须在使用的时候重写此方法
   *
   * ```
   * if (!this.env) {
   *   this.env = new Env(import.meta.env)
   * }
   * return this.env
   * ```
   *
   * @see {@link https://github.com/terwer/zhi/tree/main/apps/zhi-env#usage docs for zhi-env usage}
   */
  public static zhiEnv(): Env {
    throw new Error("Method 'zhiEnv' must be implemented")
  }

  /**
   * 获取 zhi-log 实例
   *
   * @param sign - 标志
   * @param loggerName - 日志名称
   */
  public static zhiLogWithSign(sign: string, loggerName: string): DefaultLogger {
    if (this.loggerMap[loggerName]) {
      // 日志存在，直接返回缓存
      this.loggerMap[loggerName].debug("Zhi-log use cache")
      return this.loggerMap[loggerName]
    }

    // 日志不存在，生成一个新的缓存到 Map
    const env = this.env
    const logger = LogFactory.customSignLogFactory(sign, env).getLogger(loggerName)
    this.loggerMap[loggerName] = logger
    logger.debug("Zhi-log add new logger")

    return logger
  }

  /**
   * 获取 zhi-log 实例
   *
   * @param loggerName - 日志名称
   */
  public static zhiLog(loggerName: string): DefaultLogger {
    return this.zhiLogWithSign(DEFAULT_LOG_SIGN, loggerName)
  }

  /**
   * 获取 zhi-common 实例
   */
  public static zhiCommon(): ZhiCommon {
    if (!this.common) {
      this.common = new ZhiCommon()
    }
    return this.common
  }
}

export default ZhiUtil
