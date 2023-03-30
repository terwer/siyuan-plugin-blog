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
import ZhiCommon from "zhi-common"
import Env from "zhi-env"

/**
 * 工具类统一入口，每个应用自己实现
 *
 * @public
 * @author terwer
 * @since 1.0.0
 */
class ZhiUtil {
  private static logger: DefaultLogger
  private static common: ZhiCommon
  private static env: Env

  /**
   * 获取 zhi-env 实例
   */
  public static zhiEnv() {
    if (!ZhiUtil.env) {
      // https://github.com/vitejs/vite/issues/9539#issuecomment-1206301266
      // add vite/client to tsconfig.lib.json
      ZhiUtil.env = new Env(import.meta.env)
    }
    return ZhiUtil.env
  }

  /**
   * 获取 zhi-common 实例
   */
  public static zhiCommon() {
    if (!ZhiUtil.common) {
      ZhiUtil.common = new ZhiCommon()
    }
    return ZhiUtil.common
  }

  /**
   * 获取 zhi-log 实例
   */
  public static zhiLog(loggerName: string) {
    if (!ZhiUtil.logger) {
      const env = ZhiUtil.zhiEnv()
      ZhiUtil.logger = LogFactory.customSignLogFactory("zhi", env).getLogger(loggerName)

      const logger = ZhiUtil.logger
      const common = ZhiUtil.zhiCommon()
      logger.debug(common.strUtil.f("ZhiLog inited."))
    }
    return ZhiUtil.logger
  }
}

export default ZhiUtil
