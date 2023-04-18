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

import PostStatusEnum from "../enums/postStatusEnum"

/**
 * 通用文章模型定义
 *
 * @public
 */
class Post {
  /**
   * 文章ID
   */
  postid: string

  /**
   * 标题
   */
  title: string

  /**
   * 逗号分隔的标签
   */
  mt_keywords: string

  /**
   * 链接
   */
  link?: string

  /**
   * 永久链接
   */
  permalink: string

  /**
   * 摘要
   */
  shortDesc?: string

  /**
   * 描述
   */
  description: string

  /**
   * 短评
   */
  mt_excerpt?: string

  /**
   * 别名
   */
  wp_slug: string

  /**
   * 创建时间
   */
  dateCreated: Date

  /**
   * 分类
   */
  categories: Array<string>

  /**
   * 更多
   */
  mt_text_more?: string

  /**
   * 发布状态
   */
  post_status?: PostStatusEnum

  /**
   * 是否发布
   */
  isPublished: boolean

  /**
   * 发布密码
   */
  wp_password: string

  constructor() {
    this.postid = ""
    this.title = ""
    this.mt_keywords = ""
    this.permalink = ""
    this.description = ""
    this.wp_slug = ""
    this.dateCreated = new Date()
    this.categories = []
    this.isPublished = true
    this.post_status = PostStatusEnum.PostStatusEnum_Publish
    this.wp_password = ""
  }
}

export default Post
