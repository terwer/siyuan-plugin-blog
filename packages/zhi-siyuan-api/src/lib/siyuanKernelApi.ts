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

import Env, { EnvConstants } from "zhi-env"
import SiyuanConfig from "./SiyuanConfig"
import LogFactory, { DefaultLogger, LogLevelEnum } from "zhi-log"
import { version } from "../../package.json"
import { LogConstants } from "zhi-log"

/**
 * 思源笔记服务端API v2.0.27
 * https://github.com/siyuan-note/siyuan/blob/master/API_zh_CN.md#%E9%89%B4%E6%9D%83
 * https://github.com/leolee9086/noob-core/blob/master/frontEnd/noobApi/util/kernelApi.js
 *
 * @public
 * @author terwer
 * @since 1.0.0
 */
class SiyuanKernelApi {
  /**
   * 思源笔记服务端API版本号
   */
  public readonly VERSION
  private readonly logger: DefaultLogger

  private readonly siyuanConfig

  /**
   * 初始化思源服务端 API
   *
   * @param env - 环境变量
   * @param siyuanConfig - 配置项
   */
  constructor(env?: Env, siyuanConfig?: SiyuanConfig) {
    const defaultEnv = new Env({
      [LogConstants.LOG_LEVEL_KEY]: LogLevelEnum.LOG_LEVEL_INFO,
      [EnvConstants.VITE_DEBUG_MODE_KEY]: false,
    })
    const siyuanEnv = env ?? defaultEnv

    this.VERSION = version
    this.logger = LogFactory.defaultLogger(siyuanEnv, 1)

    if (siyuanConfig) {
      this.siyuanConfig = siyuanConfig
    } else {
      const siyuanApiUrl = siyuanEnv.getStringEnv("VITE_SIYUAN_API_URL")
      const siyuanApiToken = siyuanEnv.getStringEnv("VITE_SIYUAN_AUTH_TOKEN")
      this.siyuanConfig = new SiyuanConfig(siyuanApiUrl, siyuanApiToken)
    }
  }
}

export default SiyuanKernelApi
