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

import { useSiyuanApi } from "~/composables/api/useSiyuanApi"
import { createAppLogger } from "~/common/appLogger"
import { Post } from "zhi-blog-api"

/**
 * 静态分析相关处理（开启授权码模式）
 */
export const useStaticShare = () => {
  const logger = createAppLogger("use-static-share")
  const { blogApi, kernelApi } = useSiyuanApi()

  const updateSharePage = async (pageId: string, post: Post) => {
    const shareJsonFile = `/data/public/siyuan-blog/${pageId}.json`

    // 只暴露有限的属性
    const sPost = new Post()
    sPost.attrs = post.attrs
    sPost.title = post.title
    sPost.editorDom = post.editorDom
    const sJson = JSON.stringify(sPost) ?? "{}"
    await kernelApi.saveTextData(shareJsonFile, sJson)
  }

  /**
   * 打开静态分享
   *
   * @param {string} pageId - 页面ID
   * @param {Post} post - 文章对象
   */
  const openStaticShare = async (pageId: string, post: Post) => {
    await updateSharePage(pageId, post)
  }

  /**
   * 更新分享
   *
   * @param pageId - 文档ID
   */
  const updateStaticShare = async (pageId: string) => {
    const post = await blogApi.getPost(pageId, false, false)
    await updateSharePage(pageId, post)
  }

  /**
   * 关闭静态分享
   *
   * @param {string} pageId - 页面ID
   */
  const closeStaticShare = async (pageId: string) => {
    const shareJsonFile = `/data/public/siyuan-blog/${pageId}.json`
    await kernelApi.removeFile(shareJsonFile)
  }

  return { openStaticShare, closeStaticShare, updateStaticShare }
}
