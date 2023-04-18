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

import Env from "zhi-env"
import SiyuanConfig from "./siyuanConfig"
import SiyuanKernelApi from "./siyuanKernelApi"
import SiyuanClientApi from "./siyuanClientApi"

/**
 * 思源笔记API
 *
 * @author terwer
 * @since 1.0.0
 */
class SiyuanApi {
  /**
   * 思源笔记内核API
   */
  public readonly kernelApi

  /**
   * 思源笔记客户端API
   */
  public readonly clientApi

  /**
   * 构造思源 API对象
   *
   * @param cfg - 环境变量 或者 配置项
   */
  constructor(cfg: Env | SiyuanConfig) {
    this.kernelApi = new SiyuanKernelApi(cfg)
    this.clientApi = new SiyuanClientApi()
  }
}

export default SiyuanApi
