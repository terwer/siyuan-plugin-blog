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

  const createTable = (dataTableEl: HTMLElement, currentDataTable:any) => {
    const dataTableId = dataTableEl.getAttribute("data-av-id")
    logger.debug("start createTable for=>", dataTableId)

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
    for (const key in currentDataTable) {
      const item = currentDataTable[key]
      tableTitle.innerText = item.name

      // 创建 Tab 按钮
      const tabButton = document.createElement("button")
      tabButton.className = "db-tab-button"
      tabButton.innerText = item.view.name || item.name
      tabButton.dataset.tabId = key
      tabButton.onclick = () => {
        // 仅在当前 dataTableEl 内查找
        const allTabs = tabsContainer.querySelectorAll(".db-tab-button")
        const allTabContents = tabContentsContainer.querySelectorAll(".db-tab-content")

        allTabs.forEach(btn => btn.classList.remove("active"))
        allTabContents.forEach(content => content.classList.remove("active"))

        tabButton.classList.add("active")
        document.getElementById(`db-content-${key}`)?.classList.add("active")
      }
      tabsContainer.appendChild(tabButton)

      // 创建表格内容
      const tabContent = document.createElement("div")
      tabContent.className = "db-tab-content"
      tabContent.id = `db-content-${key}`
      tabContent.style.display = "none"

      const table = document.createElement("table")
      table.className = "db-data-table"

      // 创建表头
      const thead = document.createElement("thead")
      const headerRow = document.createElement("tr")
      item.view.columns.forEach((col:any) => {
        const th = document.createElement("th")
        th.innerText = col.name || ""
        headerRow.appendChild(th)
      })
      thead.appendChild(headerRow)
      table.appendChild(thead)

      // 创建表格主体
      const tbody = document.createElement("tbody")
      item.view.rows.forEach((row:any) => {
        const tr = document.createElement("tr")
        item.view.columns.forEach((col:any, colIndex:number) => {
          const td = document.createElement("td")
          const cell = row.cells[colIndex]

          td.innerText = cell?.value?.block?.content || ""
          tr.appendChild(td)
        })
        tbody.appendChild(tr)
      })
      table.appendChild(tbody)

      tabContent.appendChild(table)
      tabContentsContainer.appendChild(tabContent)
    }

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
