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
import { BlogConfig, PasswordType } from "zhi-blog-api"
import SiyuanPlaceholder from "./siyuanPlaceholder"

/**
 * 思源笔记配置
 *
 * @author terwer
 * @since 1.0.0
 */
class SiyuanConfig extends BlogConfig {
  /**
   * 思源笔记伺服地址
   */
  public override apiUrl: string

  /**
   * 思源笔记 API token
   */
  public override password: string

  /**
   * 思源笔记操作提示
   *
   * @protected
   */
  public override placeholder: SiyuanPlaceholder

  /**
   * 是否修复标题
   *
   * @protected
   */
  public override fixTitle: boolean

  constructor(apiUrl?: string, password?: string) {
    super()
    this.apiUrl = apiUrl ?? "http://127.0.0.1:6806"
    this.passwordType = PasswordType.PasswordType_Token
    this.password = password ?? ""
    this.placeholder = new SiyuanPlaceholder()
    this.fixTitle = true
  }
}

export default SiyuanConfig
