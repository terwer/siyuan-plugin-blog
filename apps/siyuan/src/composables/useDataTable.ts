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
 * 数据库支持
 *
 * @author terwer
 * @since 6.1.0
 */
const useDataTable = () => {
  const logger = createAppLogger("use-data-table")
  const {kernelApi} = useSiyuanApi()

  const getDataViews = async (editorDom: string) => {
    const $ = cheerio.load(editorDom)
    const dataTables = $("div[data-av-type='table']")
    const dataTableIds: { dataTableId: string; defaultViewId?: string }[] = []

    dataTables.each((index, element) => {
      const dataTableId = $(element).attr("data-av-id")
      const defaultViewId = $(element).attr("custom-sy-av-view")
      if (!dataTableId) {
        return
      }
      dataTableIds.push({ dataTableId, defaultViewId })
    })

    const results = await Promise.all(
      dataTableIds.map(async (item) => {
        const resultMap: Record<string, any> = {
          [item.dataTableId]: { order: [] }, // 初始化 order 数组
        }

        // 请求默认视图
        const initialRes = await kernelApi.siyuanRequest("/api/av/renderAttributeView", {
          id: item.dataTableId,
          viewID: item.defaultViewId || "", // 初始可能为空
          query: "",
        })
        logger.debug(`renderAttributeView res for ${item.dataTableId}:`, initialRes)

        let fallbackViewId = item.defaultViewId

        // 如果 defaultViewId 未定义，从结果中选取 `initialRes.view.id` 作为默认视图
        if (!item.defaultViewId && initialRes.view?.id) {
          fallbackViewId = initialRes.view.id
          logger.debug(`Fallback defaultViewId for ${item.dataTableId}: ${fallbackViewId}`)
        }

        if (fallbackViewId) {
          // 保存默认视图结果
          resultMap[item.dataTableId][fallbackViewId] = initialRes
          resultMap[item.dataTableId].order.push(fallbackViewId) // 记录顺序
        }

        // 并发请求其他视图
        if (initialRes.views) {
          const otherViewPromises = initialRes.views
            .filter((view: any) => view.id !== fallbackViewId) // 排除默认视图
            .map((view: any) =>
              kernelApi.siyuanRequest("/api/av/renderAttributeView", {
                id: item.dataTableId,
                viewID: view.id,
                query: "",
              }).then((res) => {
                logger.debug(`renderAttributeView res for view ${view.id}:`, res)
                resultMap[item.dataTableId][view.id] = res
                resultMap[item.dataTableId].order.push(view.id) // 按顺序记录视图 ID
              })
            )
          await Promise.all(otherViewPromises)
        }
        return resultMap
      })
    )

    // 将所有结果合并为单一对象
    const mergedResults = results.reduce((acc, cur) => ({ ...acc, ...cur }), {})
    logger.debug("Merged results:", mergedResults)
    return mergedResults
  }

  return { getDataViews }
}

export {useDataTable}