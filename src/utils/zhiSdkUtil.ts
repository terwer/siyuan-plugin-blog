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

import LogFactory from "zhi-log"
import Env from "zhi-env"
import Config from "~/src/utils/Config"

/**
 * SDK操作统一入口，建议大部分操作使用此工具类实现
 *
 * @author terwer
 * @since 1.0.0
 */
class ZhiSdkUtil {
  private readonly env
  private readonly logger

  constructor() {
    this.env = new Env(import.meta.env)
    this.logger = LogFactory.defaultLogger(this.env, Config.LOG_STACK_SIZE)
  }

  /**
   * 获取配置环境变量
   */
  public getEnv() {
    return this.env
  }

  /**
   * 获取日志操作对象
   */
  public getLogger() {
    return this.logger
  }
}

const zhiSdkUtil = new ZhiSdkUtil()
export default zhiSdkUtil
