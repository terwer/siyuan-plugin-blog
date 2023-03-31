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
import CategoryInfo from "./models/categoryInfo"
import { version } from "../../package.json"
import MediaObject from "./models/mediaObject"

/**
 * 通用博客接口
 *
 * @public
 * @author terwer
 * @version 1.0.0
 * @since 1.0.0
 */
interface IBlogApi {
  /**
   * 博客配置列表
   * @see {@link https://codex.wordpress.org/XML-RPC_MetaWeblog_API#metaWeblog.getUsersBlogs getUsersBlogs}
   * @returns {Promise<Array<UserBlog>>}
   */
  getUsersBlogs(): Promise<Array<UserBlog>>

  /**
   * 最新文章数目
   *
   * @param keyword - 关键字（可选，部分平台不支持搜索）
   * @returns {Promise<number>}
   */
  getRecentPostsCount(keyword?: string): Promise<number>

  /**
   * 最新文章
   *
   * @param numOfPosts - 文章数目
   * @param page - 页码（可选，部分平台不支持分页）
   * @param keyword - 关键字（可选，部分平台不支持搜索）
   * @see {@link https://codex.wordpress.org/XML-RPC_MetaWeblog_API#metaWeblog.getRecentPosts getRecentPosts}
   * @returns {Promise<Array<Post>>}
   */
  getRecentPosts(numOfPosts: number, page?: number, keyword?: string): Promise<Array<Post>>

  /**
   * 发布文章
   *
   * @param post - 文章
   * @param publish - 可选，是否发布
   *
   * ```ts
   *    const post = {
   *         description: "自动发布的测试内容",
   *         title: "自动发布的测试标题",
   *         categories: ["标签1","标签2"],
   *         // dateCreated: new Date(),
   *         // link: "",
   *         // permalink: "",
   *         // postid: "",
   *         // source: {
   *         //  name: "",
   *         //  url: ""
   *         // };
   *         // userid: ""
   *    }
   *
   *    const result = newPost(post, false)
   * ```
   * @see {@link  https://codex.wordpress.org/XML-RPC_MetaWeblog_API#metaWeblog.newPost newPost}
   * @returns {Promise<string>}
   */
  newPost(post: Post, publish?: boolean): Promise<string>

  /**
   * 文章详情
   * @param postid - postid
   * @param useSlug - 是否使用的是别名（可选，部分平台不支持）
   * @see {@link https://codex.wordpress.org/XML-RPC_MetaWeblog_API#metaWeblog.getPost getPost}
   * @returns {Promise<Post>}
   */
  getPost(postid: string, useSlug?: boolean): Promise<Post>

  /**
   * 更新文章
   *
   * @param postid - 文章id
   * @param post - 文章
   * @param publish - 可选，是否发布
   *
   * ```ts
   *     // wordpress
   *     // const postid = 4115
   *     // conf
   *     // const postid = 1540103
   *     const postid = "2490384_1"
   *     const post = {
   *         description: "修改过的自动发布的测试内容2",
   *         title: "修改过的自动发布的测试标题2",
   *         categories: ["标签1", "标签2"],
   *         // dateCreated: new Date(),
   *         // link: "",
   *         // permalink: "",
   *         // postid: postid,
   *         // source: {
   *         //  name: "",
   *         //  url: ""
   *         // };
   *         // userid: ""
   *     }
   *
   *     const result = editPost(postid, post, false)
   * ```
   * @see {@link https://codex.wordpress.org/XML-RPC_MetaWeblog_API#metaWeblog.editPost editPost}
   * @returns {Promise<boolean>}
   */
  editPost(postid: string, post: Post, publish?: boolean): Promise<boolean>

  /**
   * 删除文章
   *
   * @param postid - 文章ID
   * @see {@link https://codex.wordpress.org/XML-RPC_MetaWeblog_API#metaWeblog.deletePost deletePost}
   * @returns {Promise<boolean>}
   */
  deletePost(postid: string): Promise<boolean>

  /**
   * 获取分类列表
   *
   * @see {@link https://codex.wordpress.org/XML-RPC_MetaWeblog_API#metaWeblog.getCategories getCategories}
   * @returns {Promise<CategoryInfo[]>}
   */
  getCategories(): Promise<CategoryInfo[]>

  /**
   * 获取预览链接
   *
   * @param postid - 文章ID
   * @returns {Promise<string>}
   */
  getPreviewUrl(postid: string): Promise<string>

  /**
   * 上传附件
   *
   * @param mediaObject
   * @see {@link https://codex.wordpress.org/XML-RPC_MetaWeblog_API#metaWeblog.newMediaObject newMediaObject}
   * @returns {Promise<MediaObject>}
   */
  newMediaObject(mediaObject: MediaObject): Promise<MediaObject>
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
    this.VERSION = version
    this.apiAdaptor = apiAdaptor
  }

  /**
   * 博客配置列表
   */
  public async getUsersBlogs(): Promise<Array<UserBlog>> {
    return await this.apiAdaptor.getUsersBlogs()
  }

  /**
   * 最新文章数目
   *
   * @param keyword - 关键字（可选，部分平台不支持搜索）
   */
  public async getRecentPostsCount(keyword?: string): Promise<number> {
    return await this.apiAdaptor.getRecentPostsCount(keyword)
  }

  /**
   * 最新文章
   *
   * @param numOfPosts - 文章数目
   * @param page - 页码（可选，部分平台不支持分页）
   * @param keyword - 关键字（可选，部分平台不支持搜索）
   */
  public async getRecentPosts(numOfPosts: number, page?: number, keyword?: string): Promise<Array<Post>> {
    return await this.apiAdaptor.getRecentPosts(numOfPosts, page, keyword)
  }

  /**
   * 发布文章
   *
   * @param post - 文章
   * @param publish - 可选，是否发布
   */
  public async newPost(post: Post, publish?: boolean): Promise<string> {
    return await this.apiAdaptor.newPost(post, publish)
  }

  /**
   * 文章详情
   * @param postid - postid
   * @param useSlug - 是否使用的是别名（可选，部分平台不支持）
   */
  public async getPost(postid: string, useSlug?: boolean): Promise<Post> {
    return await this.apiAdaptor.getPost(postid, useSlug)
  }

  /**
   * 更新文章
   *
   * @param postid - 文章id
   * @param post - 文章
   * @param publish - 可选，是否发布
   */
  public async editPost(postid: string, post: Post, publish?: boolean): Promise<boolean> {
    return await this.apiAdaptor.editPost(postid, post, publish)
  }

  /**
   * 删除文章
   *
   * @param postid - 文章ID
   */
  public async deletePost(postid: string): Promise<boolean> {
    return await this.apiAdaptor.deletePost(postid)
  }

  /**
   * 获取分类列表
   */
  public async getCategories(): Promise<CategoryInfo[]> {
    return await this.apiAdaptor.getCategories()
  }

  /**
   * 获取预览链接
   *
   * @param postid - 文章ID
   */
  public async getPreviewUrl(postid: string): Promise<string> {
    return await this.apiAdaptor.getPreviewUrl(postid)
  }

  /**
   * 上传附件
   *
   * @param mediaObject
   */
  public async newMediaObject(mediaObject: MediaObject): Promise<MediaObject> {
    return await this.apiAdaptor.newMediaObject(mediaObject)
  }
}

export default BlogApi
export { IBlogApi }
