/*
 * Copyright (c) 2022-2023, Terwer . All rights reserved.
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
 * 通用分类模型定义
 *
 * @author terwer
 * @version 1.0.0
 * @since 1.0.0
 */
class CategoryInfo {
  /**
   * 分类ID
   */
  categoryId: string

  /**
   * 父分类ID
   */
  parentId: string

  /**
   * 分类名称
   */
  description: string

  /**
   * 分类英文名
   */
  categoryName: string

  /**
   * 分类详情
   */
  categoryDescription: string

  /**
   * 分类地址
   */
  htmlUrl: string

  /**
   * 分类订阅地址
   */
  rssUrl: string

  constructor() {
    this.categoryId = "-1"
    this.parentId = "0"
    this.description = "分类1"
    this.categoryDescription = "这是测试分类1"
    this.categoryName = "cate1"
    this.htmlUrl = ""
    this.rssUrl = ""
  }
}

export default CategoryInfo
