/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2025 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import { JsonUtil, StrUtil } from "zhi-common"

/**
 * 嵌入块插件
 * https://github.com/nuxt/nuxt/issues/13382
 * client = browser only
 *
 * @author terwer
 * @version  6.1.0
 * @since 6.1.0
 */
export default defineNuxtPlugin(({ vueApp }) => {
  const logger = createAppLogger("embed-block-client-plugin")

  vueApp.directive("embedblock", {
    mounted (el, binding) {
      // 获取数据库数据集合
      const embedblockStr = el.getAttribute("data-embedblocks")
      if (StrUtil.isEmptyString(embedblockStr)) {
        return
      }
      const embedblockDatas = JsonUtil.safeParse<any>(embedblockStr, {} as any)
      logger.debug("Found embedblockDatas: ", embedblockDatas)
      // 渲染元素
      const embedblocks = el.querySelectorAll("div[data-type='NodeBlockQueryEmbed']")
      embedblocks.forEach((embedblockEl: any) => {
        const embedblockId = embedblockEl.getAttribute("data-node-id")
        if (StrUtil.isEmptyString(embedblockId)) {
          return
        }
        const embedblockData = embedblockDatas.embedBlockMap[embedblockId]
        if (embedblockData) {
          embedblockEl.innerHTML = embedblockData
        }
      })
    }
  })
})
