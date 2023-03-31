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

import UserBlog from "./models/userBlog"
import Post from "./models/post"

/**
 * 通用博客接口
 *
 * @public
 */
interface IBlogApi {
  /**
   * 博客配置列表
   */
  getUsersBlogs(): Promise<Array<UserBlog>>

  /**
   * 最新文章
   *
   * @param numOfPosts - 文章数目
   * @param page - 页码（可选，部分平台不支持分页）
   * @param keyword - 关键字（可选，部分平台不支持搜索）
   */
  getRecentPosts(numOfPosts: number, page?: number, keyword?: string): Promise<Array<Post>>

  /**
   * 文章详情
   * @param postid - postid
   * @param useSlug - 是否使用的是别名（可选，部分平台不支持）
   */
  getPost(postid: string, useSlug?: boolean): Promise<Post>
}

/**
 * 博客API
 *
 * @public
 * @author terwer
 * @since 1.0.0
 */
class BlogApi implements IBlogApi {
  private readonly apiAdaptor: IBlogApi

  /**
   * 博客API版本号
   */
  public readonly VERSION

  /**
   * 初始化博客 API
   *
   * @param apiAdaptor - 对应博客的适配器，例如：SiYuanApiAdaptor
   */
  constructor(apiAdaptor: IBlogApi) {
    this.VERSION = "1.0.0"
    this.apiAdaptor = apiAdaptor
  }

  /**
   * 最新文章
   *
   * @param numOfPosts - 文章数目
   * @param page - 页码（可选，部分平台不支持分页）
   * @param keyword - 关键字（可选，部分平台不支持搜索）
   */
  async getRecentPosts(numOfPosts: number, page?: number, keyword?: string): Promise<Array<Post>> {
    return this.apiAdaptor.getRecentPosts(numOfPosts, page, keyword)
  }

  /**
   * 博客配置列表
   */
  async getUsersBlogs(): Promise<Array<UserBlog>> {
    return this.apiAdaptor.getUsersBlogs()
  }

  /**
   * 文章详情
   * @param postid - postid
   * @param useSlug - 是否使用的是别名（可选，部分平台不支持）
   */
  getPost(postid: string, useSlug?: boolean): Promise<Post> {
    return this.apiAdaptor.getPost(postid, useSlug)
  }
}

export default BlogApi
export { IBlogApi }
