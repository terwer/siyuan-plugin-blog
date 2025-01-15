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
    //<div contenteditable="false" data-av-id="20250115212822-7vcugma" data-av-type="table"
    // data-node-id="20250115212815-grwybvd" data-node-index="2" data-type="NodeAttributeView" class="av"
    // updated="20250115214917" custom-sy-av-view="20250115212823-reg0iqj">
    // <div spellcheck="false"></div>
    //   <div class="protyle-attr" contenteditable="false"></div>
    //</div>
    //  1、找到 data-av-type="table" 的元素，就是DataTable节点。然后找到  data-av-id
    //  2、同时找到第一个默认的 view，就是 custom-sy-av-view
    const dataTables = $("div[data-av-type='table']")
    const dataTableIds: { dataTableId: string; defaultViewId: string }[] = []
    dataTables.each((index, element) => {
      const dataTableId = $(element).attr("data-av-id")
      const defaultViewId = $(element).attr("custom-sy-av-view")
      logger.debug(`Found dataTable: ${dataTableId}`)
      logger.debug(`Found defaultView: ${defaultViewId}`)
      if (!dataTableId || !defaultViewId) {
        return
      }
      dataTableIds.push({dataTableId, defaultViewId})
    })
    // 并发请求所有视图渲染并收集结果
    const results = await Promise.all(
      dataTableIds.map(async (item) => {
        const resultMap: Record<string, any> = {}
        const initialRes = await kernelApi.siyuanRequest("/api/av/renderAttributeView", {
          id: item.dataTableId,
          viewID: item.defaultViewId,
          query: "",
        })
        logger.debug(`renderAttributeView res for ${item.dataTableId}:`, initialRes)
        // 记录默认视图结果
        resultMap[JSON.stringify({id: item.dataTableId, viewID: item.defaultViewId})] = initialRes
        // 并发请求其他视图
        if (initialRes.views) {
          const otherViewPromises = initialRes.views
            .filter((view: any) => view.id !== item.defaultViewId) // 排除默认视图
            .map((view: any) =>
              kernelApi.siyuanRequest("/api/av/renderAttributeView", {
                id: item.dataTableId,
                viewID: view.id,
                query: "",
              }).then((res) => {
                logger.debug(`renderAttributeView res for view ${view.id}:`, res)
                resultMap[JSON.stringify({id: item.dataTableId, viewID: view.id})] = res
              })
            )
          // 等待其他视图请求完成
          await Promise.all(otherViewPromises)
        }
        return resultMap
      })
    )
    // 直接合并结果
    const mergedResults = Object.assign({}, ...results)
    logger.debug("All merged results:", mergedResults)
    return mergedResults
  }
  return {getDataViews}
}

export {useDataTable}