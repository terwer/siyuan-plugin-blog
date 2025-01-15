/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
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
