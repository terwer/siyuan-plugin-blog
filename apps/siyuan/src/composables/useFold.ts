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
 * 获取折叠块的内容
 *
 * @author
 * @since 6.1.0
 * @returns 折叠块相关内容
 */
const useFold = () => {
  const logger = createAppLogger("use-fold")
  const {kernelApi} = useSiyuanApi()

  /**
   * 获取折叠块的内容并返回结果对象
   *
   * @param editorDom 编辑器的 DOM 字符串
   * @returns 包含折叠块数据的结果对象
   */
  const getFoldBlocks = async (editorDom: string) => {
    const $ = cheerio.load(editorDom)
    const foldBlocks = $("div[fold='1']")

    const results = {
      foldBlockMap: {} as Record<string, string>, // 折叠块内容映射
      order: [] as string[], // 折叠块的顺序
    }

    await Promise.all(
      foldBlocks.map(async (_, foldBlock) => {
        const foldBlockId = $(foldBlock).attr("data-node-id")

        if (!foldBlockId || $(foldBlock).attr("data-type") !== "NodeHeading") {
          logger.warn("折叠块缺少必要的属性或不是 NodeHeading 类型")
          return
        }

        // 从 document 中读取 session
        const protyleElement = document.querySelector("div.protyle")
        const session = protyleElement?.getAttribute("data-id")
        const app = Math.random().toString(36).substring(8)

        if (!session) {
          logger.error("未找到有效的 session 数据")
          return null
        }

        // 请求折叠块
        try {
          const res = await kernelApi.siyuanRequest("/api/transactions", {
            session,
            app,
            transactions: [
              {
                doOperations: [{action: "unfoldHeading", id: foldBlockId}],
                undoOperations: [{action: "foldHeading", id: foldBlockId}],
              },
            ],
            reqId: Date.now(),
          })

          // 提取 doOperations 的 retData
          if (Array.isArray(res) && res.length > 0) {
            const doOperations = res[0].doOperations || []
            const operation = doOperations.find((op: any) => op.retData)
            if (operation && operation.retData) {
              results.foldBlockMap[foldBlockId] = operation.retData
              results.order.push(foldBlockId)
            }
          }
        } catch (error) {
          logger.error(`请求折叠块失败，ID: ${foldBlockId}`, error)
        }
      }).get() // 转换为数组
    )

    logger.debug("get fold blocks success=>", results)
    return results
  }

  return {
    getFoldBlocks,
  }
}

export {useFold}
