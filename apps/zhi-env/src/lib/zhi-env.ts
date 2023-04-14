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

import EnvConstants from "./EnvConstants"

/**
 * 环境变量工具类
 *
 * @public
 * @author terwer
 * @since 0.0.1
 */
class Env {
  private readonly envMeta

  /**
   * 是否是开发阶段调试
   */
  public isNodeDev() {
    return this.getEnv(EnvConstants.NODE_ENV_KEY) === EnvConstants.NODE_ENV_DEVELOPMENT
  }

  /**
   * 是否是调试阶段
   */
  public isDev() {
    return this.isNodeDev() || this.getBooleanEnv(EnvConstants.VITE_DEBUG_MODE_KEY)
  }

  /**
   * 环境初始化
   *
   * @param envMeta - 需要传入 import.meta.env 。特别提醒：此参数是静态元数据，取决于最终使用的项目。因此仅仅在最终使用的地方显示传递此值，中间项目请保持参数传递
   * @see {@link https://vitejs.dev/guide/env-and-mode.html#production-replacement}
   */
  constructor(envMeta: any) {
    this.envMeta = envMeta
  }

  /**
   * 获取环境变量，key不存在返回undefined
   * @param key - key
   */
  public getEnv(key: string): string | undefined {
    let env
    try {
      if (this.envMeta[key]) {
        env = this.envMeta[key]
      }
    } catch (e: any) {
      // console.error(e)
    }

    return env
  }

  /**
   * 获取String类型的环境变量，key不存在直接返回空值
   * @param key - key
   */
  public getStringEnv(key: string): string {
    return this.getEnv(key) ?? ""
  }

  /**
   * 获取Boolean类型的环境变量，key不存在返回false
   * @param key - key
   */
  public getBooleanEnv(key: string): boolean {
    let env = false
    if (this.getEnv(key)) {
      env = this.getStringEnv(key).toLowerCase() === "true"
    }
    return env
  }

  /**
   * 获取环境变量，如果未定义或者为空值，用指定的默认值代替
   *
   * @param key - key
   * @param defaultValue - 默认值
   * @since 0.1.0
   * @author terwer
   */
  public getEnvOrDefault(key: string, defaultValue: string) {
    const value = this.getStringEnv(key)
    if (value.trim().length == 0) {
      return defaultValue
    }
    return value
  }
}

export default Env
