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

import { CategoryInfo, IBlogApi, MediaObject, Post, UserBlog } from "zhi-blog-api"
import SiyuanKernelApi from "./siyuanKernelApi"

/**
 * 思源笔记API适配器
 *
 * @author terwer
 * @version 1.0.0
 * @since 1.0.0
 */
class SiYuanApiAdaptor implements IBlogApi {
  private siyuanKernelApi

  constructor() {
    this.siyuanKernelApi = new SiyuanKernelApi()
  }

  async deletePost(postid: string): Promise<boolean> {
    return Promise.resolve(false)
  }

  async editPost(postid: string, post: Post, publish?: boolean): Promise<boolean> {
    return Promise.resolve(false)
  }

  async getCategories(): Promise<CategoryInfo[]> {
    return Promise.resolve([])
  }

  getPost(postid: string, useSlug?: boolean): Promise<Post> {
    return Promise.resolve(new Post())
  }

  async getPreviewUrl(postid: string): Promise<string> {
    return Promise.resolve("")
  }

  async getRecentPosts(numOfPosts: number, page?: number, keyword?: string): Promise<Array<Post>> {
    return Promise.resolve([])
  }

  getRecentPostsCount(keyword?: string): Promise<number> {
    return Promise.resolve(0)
  }

  async getUsersBlogs(): Promise<Array<UserBlog>> {
    return Promise.resolve([])
  }

  newMediaObject(mediaObject: MediaObject): Promise<MediaObject> {
    return Promise.resolve({} as MediaObject)
  }

  async newPost(post: Post, publish?: boolean): Promise<string> {
    return Promise.resolve("")
  }
}

export default SiYuanApiAdaptor
