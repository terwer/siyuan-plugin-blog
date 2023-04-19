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

import { CategoryInfo, IBlogApi, MediaObject, Post, PostStatusEnum, UserBlog } from "zhi-blog-api"
import SiyuanKernelApi from "./siyuanKernelApi"
import Env from "zhi-env"
import SiyuanConfig from "./siyuanConfig"
import ZhiSiyuanApiUtil from "./ZhiSiyuanApiUtil"

/**
 * 思源笔记API适配器
 *
 * @author terwer
 * @version 1.0.0
 * @since 1.0.0
 */
class SiYuanApiAdaptor implements IBlogApi {
  private readonly logger
  private readonly common
  private readonly siyuanKernelApi
  private readonly cfg

  /**
   * 初始化思源 API 适配器
   *
   * @param cfg - 环境变量 或者 配置项
   */
  constructor(cfg: Env | SiyuanConfig) {
    this.logger = ZhiSiyuanApiUtil.zhiLog("siyuan-api-adaptor")
    this.common = ZhiSiyuanApiUtil.zhiCommon()

    this.siyuanKernelApi = new SiyuanKernelApi(cfg)
    this.cfg = this.siyuanKernelApi.siyuanConfig
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

  public async getPost(postid: string, useSlug?: boolean, skipBody?: boolean): Promise<Post> {
    let pid = postid
    if (useSlug) {
      const pidObj = await this.siyuanKernelApi.getRootBlockBySlug(postid)
      if (pidObj) {
        pid = pidObj.root_id
      }
    }
    const siyuanPost = await this.siyuanKernelApi.getBlockByID(pid)
    if (!siyuanPost) {
      throw new Error("文章不存存在，postid=>" + pid)
    }

    const attrs = await this.siyuanKernelApi.getBlockAttrs(pid)

    // 发布状态
    let isPublished = true
    const publishStatus = attrs["custom-publish-status"] || "draft"
    if (publishStatus === "secret") {
      isPublished = false
    }

    // 访问密码
    const postPassword = attrs["custom-post-password"] || ""

    // 访问密码
    const shortDesc = attrs["custom-desc"] || ""

    // 标题处理
    let title = siyuanPost.content ?? ""
    if (this.cfg.fixTitle) {
      title = this.common.htmlUtil.removeTitleNumber(title)
    }

    // 渲染Markdown
    let html
    // 如果忽略 body，则不进行转换
    if (!skipBody) {
      const md = await this.siyuanKernelApi.exportMdContent(pid)
      html = await this.common.markdownUtil.renderHTML(md.content)
      // 移除挂件html
      html = this.common.htmlUtil.removeWidgetTag(html)
      if (this.cfg.fixTitle) {
        html = this.common.htmlUtil.removeH1(html)
      }
    }

    // 适配公共属性
    const commonPost = new Post()
    commonPost.postid = siyuanPost.root_id || ""
    commonPost.title = title || ""
    commonPost.description = html || ""
    commonPost.shortDesc = shortDesc || ""
    commonPost.mt_keywords = attrs.tags || ""
    commonPost.post_status = isPublished ? PostStatusEnum.PostStatusEnum_Publish : PostStatusEnum.PostStatusEnum_Draft
    commonPost.wp_password = postPassword
    // commonPost.dateCreated

    return commonPost
  }

  async getPreviewUrl(postid: string): Promise<string> {
    return Promise.resolve("")
  }

  public async getRecentPosts(numOfPosts: number, page?: number, keyword?: string): Promise<Array<Post>> {
    const result: Post[] = []

    let pg = 0
    if (page) {
      pg = page
    }
    const k = keyword ?? ""
    const siyuanPosts = await this.siyuanKernelApi.getRootBlocks(pg, numOfPosts, k)
    // logUtil.logInfo(siyuanPosts)

    this.logger.debug("getRecentPosts from siyuan, get counts =>", siyuanPosts.length)
    for (let i = 0; i < siyuanPosts.length; i++) {
      const siyuanPost = siyuanPosts[i]

      // 某些属性详情页控制即可
      const attrs = await this.siyuanKernelApi.getBlockAttrs(siyuanPost.root_id)
      const page = await this.getPost(siyuanPost.root_id, false, true)

      // // 发布状态
      // let isPublished = true
      // const publishStatus = attrs["custom-publish-status"] || "draft"
      // if (publishStatus == "secret") {
      //     isPublished = false;
      // }
      //
      // // 访问密码
      // const postPassword = attrs["custom-publish-password"] || ""

      // 文章别名
      const customSlug = attrs["custom-slug"] || ""

      // 标题处理
      let title = siyuanPost.content ?? ""
      if (this.cfg.fixTitle) {
        title = this.common.htmlUtil.removeTitleNumber(title)
      }

      // 适配公共属性
      const commonPost = new Post()
      commonPost.postid = siyuanPost.root_id
      commonPost.title = title
      commonPost.permalink =
        customSlug === ""
          ? this.common.strUtil.appendStr("/post/", siyuanPost.root_id)
          : this.common.strUtil.appendStr("/post/", customSlug, ".html")
      // commonPost.isPublished = isPublished
      commonPost.mt_keywords = page.mt_keywords
      commonPost.description = page.description
      result.push(commonPost)
    }

    return result
  }

  public async getRecentPostsCount(keyword?: string): Promise<number> {
    return await this.siyuanKernelApi.getRootBlocksCount(keyword ?? "")
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
