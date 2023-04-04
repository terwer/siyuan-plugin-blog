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

/**
 * 配置提示
 *
 * @author terwer
 * @since 1.0.0
 */
abstract class BlogPlaceholder {
  /**
   * 首页操作提示
   */
  protected homePlaceholder: string

  /**
   * API 地址操作提示
   */
  protected apiUrlPlaceholder: string

  /**
   * 用户名操作提示
   */
  protected usernamePlaceholder: string

  /**
   * 密码类型操作提示
   */
  protected passwordTypePlaceholder: string

  /**
   * 密码操作提示
   */
  protected passwordPlaceholder: string

  /**
   * API状态是否正常操作提示
   */
  protected apiStatusPlaceholder: boolean

  /**
   * 博客名（API获取）操作提示
   */
  protected blogNamePlaceholder: string

  /**
   * 文章别名key操作提示
   */
  protected posidKeyPlaceholder: string

  /**
   * 文章预览链接操作提示
   */
  protected previewUrlPlaceholder: string

  /**
   * 文章类型操作提示
   */
  protected pageTypePlaceholder: string

  constructor() {
    this.homePlaceholder = ""
    this.apiUrlPlaceholder = ""
    this.usernamePlaceholder = ""
    this.passwordTypePlaceholder = ""
    this.passwordPlaceholder = ""
    this.apiStatusPlaceholder = false
    this.blogNamePlaceholder = ""
    this.posidKeyPlaceholder = ""
    this.previewUrlPlaceholder = ""
    this.pageTypePlaceholder = ""
  }
}

export default BlogPlaceholder
