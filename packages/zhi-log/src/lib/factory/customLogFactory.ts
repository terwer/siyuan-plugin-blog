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

import AbstractLogFactory from "./abstractLogFactory"
import LogLevelEnum from "../logConstants"
import Env from "zhi-env"
import DefaultLogger from "../defaultLogger"

/**
 * 自定义日志工厂
 *
 * @public
 * @author terwer
 * @since 1.0.7
 */
class CustomLogFactory extends AbstractLogFactory {
  constructor(level?: LogLevelEnum, sign?: string, env?: Env) {
    super(level, sign, env)
  }

  /**
   * 获取默认的日志记录器
   *
   * @param loggerName - 日志记录器名称
   * @param stackSize - 打印栈的深度
   */
  override getLogger(loggerName?: string, stackSize?: number): DefaultLogger {
    return super.getLogger(loggerName, stackSize)
  }
}

export default CustomLogFactory
