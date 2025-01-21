/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2025 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import * as cheerio from "cheerio"
import {createAppLogger} from "../utils/appLogger.ts"
import {useSiyuanApi} from "./useSiyuanApi.ts"


/**
 * 获取嵌入块的内容
 *
 * @author terwer
 * @since 6.1.0
 * @returns 嵌入块的 HTML 内容
 */
const useEmbedBlock = () => {
  const logger = createAppLogger("use-embed-block")
  const {kernelApi} = useSiyuanApi()

  /**
   * 获取嵌入块的内容并返回结果对象
   * @param editorDom 编辑器的 DOM 字符串
   * @param parentDocId 父文档 ID
   * @returns 包含嵌入块数据的结果对象
   */
  const getEmbedBlocks = async (editorDom: string, parentDocId: string) => {
    const $ = cheerio.load(editorDom)
    const embedBlocks = $("div[data-type='NodeBlockQueryEmbed']")

    const results = {
      embedBlockMap: {} as Record<string, string>, // 嵌入块内容映射
      order: [] as string[], // 嵌入块的顺序
    }

    await Promise.all(
      embedBlocks.map(async (_, embedBlock) => {
        const stmt = $(embedBlock).attr("data-content")
        const embedBlockId = $(embedBlock).attr("data-node-id")

        if (!stmt || !embedBlockId) {
          logger.warn("嵌入块缺少必要的属性")
          return
        }

        // 请求嵌入块默认视图
        try {
          const res = await kernelApi.siyuanRequest("/api/search/searchEmbedBlock", {
            embedBlockID: embedBlockId,
            stmt,
            headingMode: 0,
            excludeIDs: [embedBlockId, parentDocId],
            breadcrumb: false,
          })

          debugger
          const resBlocks = res.blocks || []
          const content = resBlocks.map((block: { block: { content: string } }) => block.block.content).join("")

          // 更新结果对象
          results.embedBlockMap[embedBlockId] = content
          results.order.push(embedBlockId)
        } catch (error) {
          logger.error(`请求嵌入块失败，ID: ${embedBlockId}`, error)
        }
      }).get() // 转换为数组
    )

    return results
  }

  return {
    getEmbedBlocks,
  }
}

export {useEmbedBlock}
