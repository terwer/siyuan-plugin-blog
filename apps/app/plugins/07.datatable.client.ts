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

  const getDate = (cell: any, dt: any, isNotTime:boolean) => {
    if (!dt) {
      return ""
    }
    if (isNotTime) {
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
          const isNotTime = cell?.value?.date?.isNotTime ?? false
          if (cell?.value?.date?.hasEndDate) {
            const dt1 = cell?.value?.date?.content
            const dt2 = cell?.value?.date?.content2
            const content = getDate(cell, dt1, isNotTime)
            const content2 = getDate(cell, dt2, isNotTime)
            return `${content} ~ ${content2}`
          } else {
            const dt = cell?.value?.date?.content
            return getDate(cell, dt, isNotTime)
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
        case "checkbox":
          const checked = cell?.value?.checkbox.checked
          // 生成 checkbox
          return `<input type="checkbox" ${checked ? "checked" : ""} disabled>`
        case "url":
          if (StrUtil.isEmptyString(cell?.value?.url?.content)) {
            return ""
          }
          return `<a href="${cell?.value?.url?.content}" target="_blank">${cell?.value?.url?.content}</a>`
        case "email":
          if (StrUtil.isEmptyString(cell?.value?.email?.content)) {
            return ""
          }
          return `<a href="mailto:${cell?.value?.email?.content}">${cell?.value?.email?.content}</a>`
        case "phone":
          if (StrUtil.isEmptyString(cell?.value?.phone?.content)) {
            return ""
          }
          const phoneContent = cell?.value?.phone?.content
          return `
            <div class="db-phone-button-group">
              <span class="db-phone-icon">📞</span>
              <span class="db-phone-label"> </span>
              <span class="db-phone-value">${phoneContent}</span>
            </div>
          `
        case "template":
          return cell?.value?.template?.content || ""
        case "relation":
          return ""
        case "rollup":
          return cell?.value?.rollup?.content || ""
        case "created":
          const isNotTimeForCreated = cell?.value?.created?.isNotTime ?? false
          if (cell?.value?.created?.hasEndDate) {
            const dt1 = cell?.value?.created?.content
            const dt2 = cell?.value?.created?.content2
            const content = getDate(cell, dt1, isNotTimeForCreated)
            const content2 = getDate(cell, dt2, isNotTimeForCreated)
            return `${content} ~ ${content2}`
          } else {
            const dt = cell?.value?.created?.content
            return getDate(cell, dt, isNotTimeForCreated)
          }
        case "updated":
          const isNotTimeForUpdated = cell?.value?.updated?.isNotTime ?? false
          if (cell?.value?.updated?.hasEndDate) {
            const dt1 = cell?.value?.updated?.content
            const dt2 = cell?.value?.updated?.content2
            const content = getDate(cell, dt1, isNotTimeForUpdated)
            const content2 = getDate(cell, dt2, isNotTimeForUpdated)
            return `${content} ~ ${content2}`
          } else {
            const dt = cell?.value?.updated?.content
            return getDate(cell, dt, isNotTimeForUpdated)
          }
      }
    } catch (e) {
      logger.error("getCellContent error", e)
      return ""
    }
  }

  const SUPPORTED_VIEW_TYPES = ["table", "list", "gallery", "kanban", "calendar"]

  const resolveViewType = (item: any) => {
    const listed = item?.views?.find((view: any) => view.id === item?.view?.id)
    return listed?.type || item?.viewType || item?.view?.type || "unknown"
  }

  const setSafeHtml = (element: HTMLElement, html: string) => {
    element.innerHTML = html || ""
  }

  const setSafeCellContent = (element: HTMLElement, cell: any) => {
    const plainTypes = ["block", "text", "number", "date", "created", "updated"]
    if (plainTypes.includes(cell?.valueType)) {
      element.textContent = getCellContent(cell) || ""
      return
    }
    setSafeHtml(element, getCellContent(cell))
  }

  const getCardValue = (card: any, field: any) => {
    return (card?.values || []).find((value: any) => {
      return value?.keyID === field?.id || value?.value?.keyID === field?.id
    })
  }

  const createCard = (card: any, fields: any[], className: string) => {
    const article = document.createElement("article")
    article.className = className
    article.setAttribute("data-card-id", card?.id || "")

    if (card?.coverURL) {
      const cover = document.createElement("img")
      cover.className = "db-view-card-cover"
      cover.src = card.coverURL
      cover.alt = ""
      article.appendChild(cover)
    }

    const body = document.createElement("div")
    body.className = "db-view-card-body"
    fields.forEach((field: any) => {
      const value = getCardValue(card, field)
      if (!value) {
        return
      }
      const row = document.createElement("div")
      row.className = "db-view-card-field"
      const label = document.createElement("span")
      label.className = "db-view-card-label"
      label.textContent = field.name || ""
      const content = document.createElement("span")
      content.className = "db-view-card-value"
      setSafeCellContent(content, { valueType: value.valueType, value: value.value })
      row.append(label, content)
      body.appendChild(row)
    })
    article.appendChild(body)
    return article
  }

  const renderTable = (container: HTMLElement, view: any) => {
    const table = document.createElement("table")
    table.className = "db-data-table"
    const thead = document.createElement("thead")
    const headerRow = document.createElement("tr")
    ;(view?.columns || []).forEach((column: any) => {
      const th = document.createElement("th")
      th.textContent = column.name || ""
      headerRow.appendChild(th)
    })
    thead.appendChild(headerRow)
    table.appendChild(thead)

    const tbody = document.createElement("tbody")
    ;(view?.rows || []).forEach((row: any) => {
      const tr = document.createElement("tr")
      ;(view?.columns || []).forEach((_column: any, index: number) => {
        const td = document.createElement("td")
        setSafeCellContent(td, row.cells?.[index])
        tr.appendChild(td)
      })
      tbody.appendChild(tr)
    })
    table.appendChild(tbody)
    container.appendChild(table)
  }

  const renderList = (container: HTMLElement, view: any) => {
    const list = document.createElement("ol")
    list.className = "db-data-list"
    ;(view?.rows || []).forEach((row: any) => {
      const item = document.createElement("li")
      item.className = "db-data-list-item"
      ;(row.cells || []).forEach((cell: any, index: number) => {
        const value = document.createElement("span")
        value.className = "db-data-list-value"
        value.setAttribute("data-column-index", String(index))
        setSafeCellContent(value, cell)
        item.appendChild(value)
      })
      list.appendChild(item)
    })
    container.appendChild(list)
  }

  const renderGallery = (container: HTMLElement, view: any) => {
    const gallery = document.createElement("div")
    gallery.className = "db-data-gallery"
    ;(view?.cards || []).forEach((card: any) => {
      gallery.appendChild(createCard(card, view?.fields || [], "db-view-card db-view-gallery-card"))
    })
    container.appendChild(gallery)
  }

  const renderKanban = (container: HTMLElement, view: any) => {
    const board = document.createElement("div")
    board.className = "db-data-kanban"
    const groups = view?.groups?.length ? view.groups : [{ name: "", cards: view?.cards || [], fields: view?.fields || [] }]
    groups.forEach((group: any) => {
      const column = document.createElement("section")
      column.className = "db-view-kanban-column"
      const heading = document.createElement("h3")
      heading.className = "db-view-kanban-heading"
      const groupText = group.groupValue?.text?.content || group.name || ""
      heading.textContent = groupText === "_@default@_" ? "未分类" : groupText
      column.appendChild(heading)
      const cards = document.createElement("div")
      cards.className = "db-view-kanban-cards"
      ;(group.cards || []).forEach((card: any) => {
        cards.appendChild(createCard(card, group.fields || view?.fields || [], "db-view-card db-view-kanban-card"))
      })
      column.appendChild(cards)
      board.appendChild(column)
    })
    container.appendChild(board)
  }

  const renderCalendar = (container: HTMLElement, view: any) => {
    const calendar = document.createElement("div")
    calendar.className = "db-data-calendar"
    const dateKeyID = view?.calendar?.dateKeyID
    const columns = view?.columns || []
    const dateIndex = columns.findIndex((column: any) => column.id === dateKeyID)
    const groups = new Map<string, any[]>()
    ;(view?.rows || []).forEach((row: any) => {
      const dateCell = dateIndex >= 0 ? row.cells?.[dateIndex] : row.cells?.find((cell: any) => cell.valueType === "date")
      const dateLabel = getCellContent(dateCell) || "未设置日期"
      const values = groups.get(dateLabel) || []
      values.push(row)
      groups.set(dateLabel, values)
    })
    groups.forEach((rows, dateLabel) => {
      const section = document.createElement("section")
      section.className = "db-view-calendar-day"
      const heading = document.createElement("h3")
      heading.className = "db-view-calendar-heading"
      heading.textContent = dateLabel
      section.appendChild(heading)
      const list = document.createElement("ul")
      list.className = "db-view-calendar-items"
      rows.forEach((row: any) => {
        const item = document.createElement("li")
        item.className = "db-view-calendar-item"
        const primary = row.cells?.find((cell: any) => cell.valueType === "block" || cell.valueType === "text")
        setSafeCellContent(item, primary || { valueType: "text", value: { text: { content: row.id || "" } } })
        list.appendChild(item)
      })
      section.appendChild(list)
      calendar.appendChild(section)
    })
    if (!groups.size) {
      const empty = document.createElement("p")
      empty.className = "db-view-empty"
      empty.textContent = "暂无日期数据"
      calendar.appendChild(empty)
    }
    container.appendChild(calendar)
  }

  const renderUnsupported = (container: HTMLElement, type: string, item: any) => {
    const fallback = document.createElement("div")
    fallback.className = "db-view-unsupported"
    fallback.setAttribute("role", "status")
    fallback.textContent = `暂不支持数据库视图类型：${type || "unknown"}（${item?.view?.name || "未命名视图"}）`
    container.appendChild(fallback)
  }

  const renderView = (container: HTMLElement, item: any) => {
    const type = resolveViewType(item)
    container.dataset.viewType = type
    switch (type) {
      case "table":
        renderTable(container, item.view)
        break
      case "list":
        renderList(container, item.view)
        break
      case "gallery":
        renderGallery(container, item.view)
        break
      case "kanban":
        renderKanban(container, item.view)
        break
      case "calendar":
        renderCalendar(container, item.view)
        break
      default:
        renderUnsupported(container, type, item)
    }
  }

  const createDataViews = (dataTableEl: HTMLElement, currentDataTable: any) => {
    const dataTableId = dataTableEl.getAttribute("data-av-id")
    if (!dataTableId) {
      return
    }

    const tabsContainer = document.createElement("div")
    tabsContainer.id = `db-tabs-${dataTableId}`
    tabsContainer.className = "db-tabs"
    const tabContentsContainer = document.createElement("div")
    tabContentsContainer.id = `db-tab-contents-${dataTableId}`
    tabContentsContainer.className = "db-tab-contents"
    dataTableEl.append(tabsContainer, tabContentsContainer)

    const activate = (viewId: string) => {
      tabsContainer.querySelectorAll(".db-tab-button").forEach(button => button.classList.remove("active"))
      tabContentsContainer.querySelectorAll(".db-tab-content").forEach(content => content.classList.remove("active"))
      tabsContainer.querySelector(`[data-tab-id="${viewId}"]`)?.classList.add("active")
      tabContentsContainer.querySelector(`[data-view-id="${viewId}"]`)?.classList.add("active")
    }

    ;(currentDataTable.order || []).forEach((viewId: string) => {
      const item = currentDataTable[viewId]
      if (!item) {
        return
      }
      const type = resolveViewType(item)
      const tabButton = document.createElement("button")
      tabButton.type = "button"
      tabButton.className = "db-tab-button"
      tabButton.dataset.tabId = viewId
      tabButton.dataset.viewType = type
      tabButton.textContent = item.view?.name || item.name || type
      tabButton.onclick = () => activate(viewId)
      tabsContainer.appendChild(tabButton)

      const tabContent = document.createElement("section")
      tabContent.className = "db-tab-content"
      tabContent.dataset.viewId = viewId
      tabContent.dataset.viewType = type
      tabContent.setAttribute("aria-label", tabButton.textContent)
      renderView(tabContent, item)
      tabContentsContainer.appendChild(tabContent)
    })

    const firstViewId = currentDataTable.order?.[0]
    if (firstViewId) {
      activate(firstViewId)
    }
  }

  vueApp.directive("db", {
    mounted (el) {
      const dataTableStr = el.getAttribute("data-dataviews")
      if (StrUtil.isEmptyString(dataTableStr)) {
        return
      }
      const dataTableDatas = JsonUtil.safeParse<any>(dataTableStr, {} as any)
      const dataTables = el.querySelectorAll("div[data-av-type]")
      dataTables.forEach((dataTableEl: any) => {
        const dataTableId = dataTableEl.getAttribute("data-av-id")
        const dataAvType = dataTableEl.getAttribute("data-av-type")
        if (!dataTableId || !SUPPORTED_VIEW_TYPES.includes(dataAvType)) {
          return
        }
        const currentDataTable = dataTableDatas[dataTableId]
        if (!currentDataTable || dataTableEl.dataset.dbRendered === "true") {
          return
        }
        dataTableEl.dataset.dbRendered = "true"
        createDataViews(dataTableEl, currentDataTable)
        addClientAssetsPrefix(dataTableEl)
      })
    },
  })
})
