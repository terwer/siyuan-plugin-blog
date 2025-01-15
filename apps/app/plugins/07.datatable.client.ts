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

  const createTable = (dataTableEl: HTMLElement, currentDataTable: any) => {
    const dataTableId = dataTableEl.getAttribute("data-av-id")
    logger.debug("start createTable for=>", dataTableId)

    // 创建 Tabs 容器和内容容器
    const tabsContainer = document.createElement("div")
    tabsContainer.id = `tabs-${dataTableId}`
    tabsContainer.className = "tabs"

    const tabContentsContainer = document.createElement("div")
    tabContentsContainer.id = `tab-contents-${dataTableId}`
    tabContentsContainer.className = "tab-contents"

    // 创建表格标题
    const tableTitle = document.createElement("div")
    tableTitle.id = `title-${dataTableId}`
    tableTitle.className = "tabs-title"
    tableTitle.innerText = "Table Title"
    dataTableEl.appendChild(tableTitle)

    // Add the tabs container and contents container to the DOM
    dataTableEl.appendChild(tabsContainer)
    dataTableEl.appendChild(tabContentsContainer)

    // 动态生成 Tabs 和表格内容
    for (const key in currentDataTable) {
      const item = currentDataTable[key]
      // item.name需要设置到tableTitle
      tableTitle.innerText = item.name

      // 创建 Tab 按钮
      const tabButton = document.createElement("button")
      tabButton.className = "tab-button"
      tabButton.innerText = item.view.name || item.name // 默认使用 item.view.name，如果为空则使用 item.name
      tabButton.dataset.tabId = key
      tabButton.onclick = () => {
        // 仅在当前 dataTableEl 内查找
        const allTabs = tabsContainer.querySelectorAll(".tab-button")
        const allTabContents = tabContentsContainer.querySelectorAll(".tab-content")

        allTabs.forEach(btn => btn.classList.remove("active"))
        allTabContents.forEach(content => content.classList.remove("active"))

        tabButton.classList.add("active")
        document.getElementById(`content-${key}`)?.classList.add("active")
      }
      tabsContainer.appendChild(tabButton)

      // 创建表格内容
      const tabContent = document.createElement("div")
      tabContent.className = "tab-content"
      tabContent.id = `content-${key}`
      tabContent.style.display = "none"

      const table = document.createElement("table")
      table.className = "data-table"

      // 创建表头
      const thead = document.createElement("thead")
      const headerRow = document.createElement("tr")
      item.view.columns.forEach((col: any) => {
        const th = document.createElement("th")
        th.innerText = col.name || "" // 使用 columns 中的 name 作为表头
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

          // 使用 colIndex 来从 row.cells 中获取对应的 cell
          const cell = row.cells[colIndex]

          if (cell && cell.value && cell.value.block) {
            td.innerText = cell.value.block.content || "" // 获取 block.content 作为单元格内容
          } else {
            td.innerText = "" // 如果没有有效值，显示空字符串
          }

          tr.appendChild(td)
        })
        tbody.appendChild(tr)
      })
      table.appendChild(tbody)

      tabContent.appendChild(table)
      tabContentsContainer.appendChild(tabContent)
    }

    // 默认激活第一个 Tab 和内容
    const firstTab = tabsContainer.querySelector(".tab-button")
    const firstContent = tabContentsContainer.querySelector(".tab-content")
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
        const defaultViewId = dataTableEl.getAttribute("custom-sy-av-view")
        // logger.debug(`Found dataTable: ${dataTableId}`)
        // logger.debug(`Found defaultView: ${defaultViewId}`)
        if (!dataTableId || !defaultViewId) {
          return
        }
        const currentDataTable = dataTableDatas[dataTableId]
        if (!currentDataTable) {
          return
        }
        logger.debug(`Found currentDataTable: ${currentDataTable}`)
        createTable(dataTableEl, currentDataTable)
      })
    },
  })
})
