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

import {createAppLogger} from "../utils/appLogger.ts"
import {useSiyuanApi} from "./useSiyuanApi.ts"
import {useStaticAssets} from "./useStaticAssets.ts"

/**
 * 静态分享相关处理（开启授权码模式）
 */
export const useStaticShare = () => {
  const logger = createAppLogger("use-static-share")
  const {blogApi, kernelApi} = useSiyuanApi()
  const {downloadAssetsToPublic} = useStaticAssets()

  const updateSharePage = async (pageId: string, post: any) => {
    const shareJsonFile = `/data/public/siyuan-blog/${pageId}.json`
    const pubicAssetsFolder = `/data/public/siyuan-blog/${pageId}`

    // 保存图片附件
    await downloadAssetsToPublic(post.editorDom ?? "", pubicAssetsFolder)
    logger.info("assets downloaded success")

    // 只暴露有限的属性
    const sPost = {} as any
    sPost.attrs = post.attrs
    sPost.title = post.title
    sPost.editorDom = post.editorDom
    const sJson = JSON.stringify(sPost) ?? "{}"
    await kernelApi.saveTextData(shareJsonFile, sJson)
    logger.info("static share success")
  }

  const removeSharePage = async (pageId: string) => {
    const shareJsonFile = `/data/public/siyuan-blog/${pageId}.json`
    const pubicAssetsFolder = `/data/public/siyuan-blog/${pageId}`

    // 移除文档信息
    await kernelApi.removeFile(shareJsonFile)
    logger.info("static doc data removed success")

    // 移除附件信息
    await kernelApi.removeFile(pubicAssetsFolder)
    logger.info("static attachment data removed success")

    logger.info("static share data removed success")
  }
  // ===========================================================================================

  /**
   * 打开静态分享
   *
   * @param {string} pageId - 页面ID
   * @param {Post} post - 文章对象
   */
  const openStaticShare = async (pageId: string, post: any) => {
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
    await removeSharePage(pageId)
  }

  return {openStaticShare, closeStaticShare, updateStaticShare}
}
