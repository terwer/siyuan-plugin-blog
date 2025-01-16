/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2025 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import { DateUtil, JsonUtil, StrUtil } from "zhi-common"
import { useStaticClientAssets } from "~/plugins/libs/renderer/useStaticClientAssets"

/**
 * 数据库插件
 * https://github.com/nuxt/nuxt/issues/13382
 * client = browser only
 *
 * @author terwer
 * @version 1.0.0
 * @since 0.0.1
 */
export default defineNuxtPlugin(({ vueApp }) => {
  const logger = createAppLogger("datatable-client-plugin")
  const { addClientAssetsPrefix } = useStaticClientAssets()

  const getDate = (cell: any, dt: any) => {
    if (!dt) {
      return ""
    }
    if (cell?.value?.date?.isNotTime) {
      return DateUtil.formatTimestampToZhDate(dt, false)
    } else {
      return DateUtil.formatTimestampToZh(dt, true)
    }
  }

  const getCellContent = (cell: any) => {
    logger.debug("start render cell block=>", cell)
    if (!cell || !cell?.value) {
      return ""
    }

    // block
    try {
      switch (cell?.valueType) {
        case "block":
          return cell?.value?.block?.content || ""
        case "number":
          return cell?.value?.number?.content || "0"
        case "select":
        case "mSelect":
          const mSelect = cell?.value?.mSelect
          if (!mSelect) {
            return ""
          }
          // item.color是一个数字代表颜色
          const bgColors = ["#F5F5DC", "#87CEEB", "#98FB98", "#FFEFD5", "#B0C4DE", "#FFB6C1"] // 中性偏浅的背景颜色
          const textColors = ["#5A3E36", "#1A3A5F", "#2F5F2F", "#5F5F1A", "#4B4B4B", "#8B3A3A"] // 高对比度的字体颜色
          return mSelect
            .map((item: any) => {
              const bgColor = bgColors[item.color % bgColors.length] || "#FFFFFF" // 使用模运算确保颜色索引在范围内
              const color = textColors[item.color % textColors.length] || "#000000" // 使用模运算确保颜色索引在范围内
              return `<span style="background-color: ${bgColor}; color: ${color};" class="db-select-item">${item.content}</span>`
            })
            .join(", ")
        case "date":
          if (cell?.value?.date?.hasEndDate) {
            const dt1 = cell?.value?.date?.content
            const dt2 = cell?.value?.date?.content2
            const content = getDate(cell, dt1)
            const content2 = getDate(cell, dt2)
            return `${content} ~ ${content2}`
          } else {
            const dt = cell?.value?.date?.content
            return getDate(cell, dt)
          }
        case "text":
          return cell?.value?.text?.content || ""
        case "mAsset":
          const mAsset = cell?.value?.mAsset
          if (!mAsset) {
            return ""
          }
          if (mAsset.length === 0) {
            return ""
          }
          let assetHtml = ""
          mAsset.forEach((item: any) => {
            // 处理图片，生产 img 标签，保护 src，title，alt
            // item.type:image或者file
            // item.name: file.md
            // item.content: /assets/file.md
            if (item.type === "image") {
              const alt = StrUtil.isEmptyString(item.name) ? "image" : item.name
              assetHtml += `<img src="${item.content}" alt="${alt}" title="${item.name}">`
            } else if (item.type === "file") {
              assetHtml += `<a href="${item.content}">${item.name}</a>`
            } else { /* empty */
            }
          })
          return assetHtml
      }
    } catch (e) {
      logger.error("getCellContent error", e)
      return ""
    }
  }

  const createTable = (dataTableEl: HTMLElement, currentDataTable: any) => {
    const dataTableId = dataTableEl.getAttribute("data-av-id")
    // const defaultViewId = dataTableEl.getAttribute("custom-sy-av-view")
    // logger.debug(`start createTable for ${dataTableId} =>view:${dataTableId}`)
    logger.debug(`start createTable for ${dataTableId}`)

    // 创建 Tabs 容器和内容容器
    const tabsContainer = document.createElement("div")
    tabsContainer.id = `db-tabs-${dataTableId}`
    tabsContainer.className = "db-tabs"

    const tabContentsContainer = document.createElement("div")
    tabContentsContainer.id = `db-tab-contents-${dataTableId}`
    tabContentsContainer.className = "db-tab-contents"

    // 创建表格标题
    const tableTitle = document.createElement("div")
    tableTitle.id = `db-title-${dataTableId}`
    tableTitle.className = "db-tabs-title"
    tableTitle.innerText = "Table Title"
    dataTableEl.appendChild(tableTitle)

    // Add the tabs container and contents container to the DOM
    dataTableEl.appendChild(tabsContainer)
    dataTableEl.appendChild(tabContentsContainer)

    // 动态生成 Tabs 和表格内容
    const views = currentDataTable.order
    logger.debug(`Found views: ${views} for datatable=>${dataTableId}`)
    views.forEach((viewId: any) => {
      logger.debug(`start create view: ${viewId} for datatable=>${dataTableId}`)
      const item = currentDataTable[viewId]
      tableTitle.innerText = item.name

      // 创建 Tab 按钮
      const tabButton = document.createElement("button")
      tabButton.className = "db-tab-button"
      tabButton.innerText = item.view.name || item.name
      tabButton.dataset.tabId = viewId
      tabButton.onclick = () => {
        // 仅在当前 dataTableEl 内查找
        const allTabs = tabsContainer.querySelectorAll(".db-tab-button")
        const allTabContents = tabContentsContainer.querySelectorAll(".db-tab-content")

        allTabs.forEach(btn => btn.classList.remove("active"))
        allTabContents.forEach(content => content.classList.remove("active"))

        tabButton.classList.add("active")
        document.getElementById(`db-content-${viewId}`)?.classList.add("active")
      }
      tabsContainer.appendChild(tabButton)

      // 创建表格内容
      const tabContent = document.createElement("div")
      tabContent.className = "db-tab-content"
      tabContent.id = `db-content-${viewId}`
      tabContent.style.display = "none"

      const table = document.createElement("table")
      table.className = "db-data-table"

      // 创建表头
      const thead = document.createElement("thead")
      const headerRow = document.createElement("tr")
      item.view.columns.forEach((col: any) => {
        const th = document.createElement("th")
        th.innerText = col.name || ""
        headerRow.appendChild(th)
      })
      thead.appendChild(headerRow)
      table.appendChild(thead)

      // 创建表格主体
      const tbody = document.createElement("tbody")
      item.view.rows.forEach((row: any) => {
        const tr = document.createElement("tr")
        item.view.columns.forEach((col: any, colIndex: number) => {
          const td = document.createElement("td")
          const cell = row.cells[colIndex]

          td.innerHTML = getCellContent(cell) || ""
          tr.appendChild(td)
        })
        tbody.appendChild(tr)
      })
      table.appendChild(tbody)

      tabContent.appendChild(table)
      tabContentsContainer.appendChild(tabContent)
    })

    // 默认激活第一个 Tab 和内容
    const firstTab = tabsContainer.querySelector(".db-tab-button")
    const firstContent = tabContentsContainer.querySelector(".db-tab-content")
    if (firstTab && firstContent) {
      firstTab.classList.add("active")
      firstContent.classList.add("active")
    }
  }

  vueApp.directive("db", {
    mounted (el, binding) {
      // 获取数据库数据集合
      const dataTableStr = el.getAttribute("data-dataviews")
      if (StrUtil.isEmptyString(dataTableStr)) {
        return
      }
      const dataTableDatas = JsonUtil.safeParse<any>(dataTableStr, {} as any)
      logger.debug("Found dataTableDatas: ", dataTableDatas)
      // 渲染元素
      const dataTables = el.querySelectorAll("div[data-av-type='table']")
      // logger.debug("find dataTables:", dataTables)
      dataTables.forEach((dataTableEl: any) => {
        const dataTableId = dataTableEl.getAttribute("data-av-id")
        logger.debug(`Found dataTable: ${dataTableId}`)
        if (!dataTableId) {
          return
        }
        const currentDataTable = dataTableDatas[dataTableId]
        if (!currentDataTable) {
          return
        }
        logger.debug("Found currentDataTable =>", currentDataTable)
        createTable(dataTableEl, currentDataTable)
        // 处理数据库图谱
        addClientAssetsPrefix(dataTableEl)
      })
    },
  })
})
