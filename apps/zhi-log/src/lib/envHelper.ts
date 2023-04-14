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

import LogLevelEnum, { LogConstants } from "./logConstants"
import Env from "zhi-env"

/**
 * 解析日志级别为枚举
 *
 * @public
 * @author terwer
 * @since 1.4.0
 */
class EnvHelper {
  /**
   * 解析日志级别为枚举
   *
   * @param enumObj - 枚举对象
   * @param value - 配置的值
   */
  private static stringToEnumValue<T extends Record<string, string>, K extends keyof T>(
    enumObj: T,
    value: string
  ): T[keyof T] | undefined {
    return enumObj[Object.keys(enumObj).filter((k) => enumObj[k as K].toString() === value)[0] as keyof typeof enumObj]
  }

  /**
   * 获取配置的日志级别
   */
  public static getEnvLevel(env?: Env): LogLevelEnum | undefined {
    if (!env) {
      return undefined
    }

    const envValue = env.getEnvOrDefault(LogConstants.LOG_LEVEL_KEY, LogLevelEnum.LOG_LEVEL_INFO)
    const envLevel = EnvHelper.stringToEnumValue(LogLevelEnum, envValue.toUpperCase())
    if (!envLevel) {
      console.warn(
        "[zhi-log] LOG_LEVEL is invalid in you .env file.It must be either debug, info, warn or error, fallback to default info level"
      )
    }

    return envLevel
  }

  /**
   * 获取默认日志
   */
  public static getEnvLogger(env?: Env): string | undefined {
    return !env ? undefined : env.getEnv(LogConstants.LOG_PREFIX_KEY)
  }
}

export default EnvHelper
