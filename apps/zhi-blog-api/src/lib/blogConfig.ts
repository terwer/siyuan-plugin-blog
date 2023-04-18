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

import BlogPlaceholder from "./blogPlaceholder"

/**
 * 页面类型
 */
export enum PageType {
  /**
   * Markdown正文
   */
  Markdown,

  /**
   * HTML
   */
  Html,

  /**
   * 属性
   */
  Formatter,

  /**
   * Markdown和属性
   */
  Markdown_And_Formatter,

  /**
   * MDX
   *
   * @see {@link https://mdxjs.com/ mdx}
   */
  MDX,
}

/**
 * 密码类型
 */
export enum PasswordType {
  /**
   * 密码
   */
  PasswordType_Password,
  /**
   * token
   */
  PasswordType_Token,
}

/**
 * 博客通用配置类
 */
abstract class BlogConfig {
  /**
   * 首页
   */
  protected home: string

  /**
   * API地址
   */
  protected apiUrl: string

  /**
   * 用户名
   */
  protected username: string

  /**
   * 密码类型
   */
  protected passwordType: PasswordType

  /**
   * 密码
   */
  protected password: string

  /**
   * 是否发布
   */
  protected apiStatus: boolean

  /**
   * 博客名（API获取）
   */
  protected blogName: string

  /**
   * 文章别名key
   */
  protected posidKey: string

  /**
   * 文章预览链接
   */
  protected previewUrl: string

  /**
   * 文章类型
   */
  protected pageType: PageType

  /**
   * 操作提示
   */
  protected placeholder: BlogPlaceholder | undefined

  /**
   * 是否处理标题
   *
   * @protected
   */
  protected fixTitle: boolean

  protected constructor() {
    this.home = ""
    this.apiUrl = ""
    this.username = ""
    this.passwordType = PasswordType.PasswordType_Password
    this.password = ""
    this.apiStatus = false
    this.blogName = ""
    this.posidKey = ""
    this.previewUrl = ""
    this.pageType = PageType.Markdown
    this.placeholder = undefined
    this.fixTitle = false
  }
}

export default BlogConfig
