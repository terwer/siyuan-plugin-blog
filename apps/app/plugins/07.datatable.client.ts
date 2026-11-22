/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2025 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import { openDatabaseFilterMenu } from "~/plugins/libs/dataview/filterMenu"
import { normalizeDataTable } from "~/utils/databaseViewSsr"
import { StrUtil } from "zhi-common"
import { useStaticClientAssets } from "~/plugins/libs/renderer/useStaticClientAssets"
import {
  filterViewSnapshot,
  getFilterFields,
  searchViewSnapshot,
  sortViewSnapshot,
  type FilterField,
  type FilterGroup,
  type ViewSort,
} from "~/utils/databaseViewFilter"
import { mountNativeAv, parseDataViews, SUPPORTED_VIEW_TYPES, valueToText } from "~/plugins/libs/dataview/native"

/**
 * 数据库插件
 * https://github.com/nuxt/nuxt/issues/13382
 * client = browser only
 *
 * @author terwer
 * @version 1.0.0
 * @since 0.0.1
 */
let activeDetailPanel: HTMLElement | null = null

const closeDetailPanel = () => {
  activeDetailPanel?.remove()
  activeDetailPanel = null
}

const showDetailPanel = (detail: any) => {
  closeDetailPanel()
  const panel = document.createElement("aside")
  panel.className = "db-view-detail"
  panel.setAttribute("role", "dialog")
  panel.setAttribute("aria-label", "查看详情")

  const header = document.createElement("header")
  header.className = "db-view-detail-header"
  const title = document.createElement("strong")
  title.textContent = detail?.record?.name || detail?.record?.title || "查看详情"
  const close = document.createElement("button")
  close.type = "button"
  close.className = "db-view-detail-close"
  close.setAttribute("aria-label", "关闭详情")
  close.textContent = "×"
  close.addEventListener("click", closeDetailPanel)
  header.append(title, close)
  panel.appendChild(header)

  const fields = detail?.fields || []
  const record = detail?.record || {}
  const values = detail?.type === "card" ? (record.values || []) : (record.cells || [])
  const body = document.createElement("div")
  body.className = "db-view-detail-body"
  fields.filter((field: any) => !field?.hidden).forEach((field: any, index: number) => {
    const value = detail?.type === "card"
      ? values.find((item: any) => item?.keyID === field?.id || item?.value?.keyID === field?.id)
      : values[(record.columns || fields).findIndex((item: any) => item?.id === field?.id) >= 0 ? (record.columns || fields).findIndex((item: any) => item?.id === field?.id) : index]
    const row = document.createElement("div")
    row.className = "db-view-detail-field"
    const label = document.createElement("div")
    label.className = "db-view-detail-label"
    label.textContent = field?.name || `字段 ${index + 1}`
    const content = document.createElement("div")
    content.className = "db-view-detail-value"
    content.textContent = valueToText(value) || "—"
    row.append(label, content)
    body.appendChild(row)
  })
  panel.appendChild(body)
  document.body.appendChild(panel)
  activeDetailPanel = panel
}

let activeToast: HTMLElement | null = null

const showToast = (message: string, kind: "success" | "error" = "success") => {
  activeToast?.remove()
  const toast = document.createElement("div")
  toast.className = `db-view-toast db-view-toast--${kind}`
  toast.setAttribute("role", "status")
  toast.textContent = message
  document.body.appendChild(toast)
  activeToast = toast
  window.setTimeout(() => {
    if (activeToast === toast) {
      toast.remove()
      activeToast = null
    }
  }, 1800)
}

const copyText = async (text: string) => {
  if (!text) {
    showToast("没有可复制的内容", "error")
    return
  }
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
    } else {
      const textarea = document.createElement("textarea")
      textarea.value = text
      textarea.style.position = "fixed"
      textarea.style.opacity = "0"
      document.body.appendChild(textarea)
      textarea.select()
      if (!document.execCommand("copy")) throw new Error("copy failed")
      textarea.remove()
    }
    showToast("已复制")
  } catch {
    showToast("复制失败，请检查浏览器权限", "error")
  }
}

export default defineNuxtPlugin(({ vueApp }) => {
  const logger = createAppLogger("datatable-client-plugin")
  const { addClientAssetsPrefix } = useStaticClientAssets()

  const resolveViewType = (item: any) => String(item?.viewType || "unknown")

  const filterLocale = () => {
    const zh = (document.documentElement.lang || "").toLowerCase().startsWith("zh")
    return zh
      ? {
          label: "筛选",
          field: "字段",
          operator: "条件",
          value: "值",
          apply: "应用",
          reset: "重置",
          results: "匹配条目",
          noResults: "没有匹配条目",
          invalid: "筛选条件无效",
          unsupported: "当前视图没有可用的本地筛选字段",
          contains: "包含",
          equals: "等于",
          gt: "大于",
          gte: "大于等于",
          lt: "小于",
          lte: "小于等于",
          before: "早于",
          after: "晚于",
          empty: "暂无数据",
          noFields: "当前视图没有可用的本地筛选字段",
          sort: "排序",
          direction: "方向",
          ascending: "升序",
          descending: "降序",
        }
      : {
          label: "Filter",
          field: "Field",
          operator: "Operator",
          value: "Value",
          apply: "Apply",
          reset: "Reset",
          results: "Matches",
          noResults: "No matching entries",
          invalid: "Invalid filter",
          unsupported: "No local filterable fields are available for this view",
          contains: "contains",
          equals: "equals",
          gt: "greater than",
          gte: "greater than or equal",
          lt: "less than",
          lte: "less than or equal",
          before: "before",
          after: "after",
          empty: "No data",
          noFields: "No local filterable fields are available for this view",
          sort: "Sort",
          direction: "Direction",
          ascending: "Ascending",
          descending: "Descending",
        }
  }

  let activePanel: HTMLElement | null = null
  let closeFilter: (() => void) | null = null

  const closeActivePanel = () => {
    activePanel?.remove()
    activePanel = null
  }

  const createSortPanel = (anchor: HTMLElement, fields: FilterField[], onApply: (sort: ViewSort | null) => void) => {
    closeFilter?.()
    closeActivePanel()
    const locale = filterLocale()
    const panel = document.createElement("div")
    panel.className = "b3-menu db-view-filter db-view-sort"
    panel.setAttribute("role", "dialog")
    panel.setAttribute("aria-label", locale.sort)
    panel.style.position = "fixed"
    panel.style.zIndex = "10"

    const title = document.createElement("div")
    title.className = "b3-menu__title"
    const label = document.createElement("span")
    label.className = "b3-menu__label"
    label.textContent = locale.sort
    title.appendChild(label)
    panel.appendChild(title)

    const items = document.createElement("div")
    items.className = "b3-menu__items db-view-filter-items"
    const fieldLabel = document.createElement("label")
    fieldLabel.className = "b3-menu__item db-view-filter-field"
    const fieldText = document.createElement("span")
    fieldText.textContent = locale.field
    const fieldSelect = document.createElement("select")
    fieldSelect.className = "b3-select"
    fields.forEach((field) => {
      const option = document.createElement("option")
      option.value = field.id
      option.textContent = field.name
      fieldSelect.appendChild(option)
    })
    fieldLabel.append(fieldText, fieldSelect)

    const directionLabel = document.createElement("label")
    directionLabel.className = "b3-menu__item db-view-filter-field"
    const directionText = document.createElement("span")
    directionText.textContent = locale.direction
    const directionSelect = document.createElement("select")
    directionSelect.className = "b3-select"
    for (const [value, text] of [["asc", locale.ascending], ["desc", locale.descending]] as const) {
      const option = document.createElement("option")
      option.value = value
      option.textContent = text
      directionSelect.appendChild(option)
    }
    directionLabel.append(directionText, directionSelect)

    const actions = document.createElement("div")
    actions.className = "db-view-filter-actions"
    const apply = document.createElement("button")
    apply.type = "button"
    apply.className = "b3-button b3-button--outline"
    apply.textContent = locale.apply
    const reset = document.createElement("button")
    reset.type = "button"
    reset.className = "b3-button b3-button--cancel"
    reset.textContent = locale.reset
    actions.append(apply, reset)
    apply.addEventListener("click", () => {
      onApply({ fieldId: fieldSelect.value, direction: directionSelect.value as ViewSort["direction"] })
      closeActivePanel()
    })
    reset.addEventListener("click", () => {
      onApply(null)
      closeActivePanel()
    })
    items.append(fieldLabel, directionLabel, actions)
    panel.appendChild(items)
    document.body.appendChild(panel)
    const rect = anchor.getBoundingClientRect()
    panel.style.left = `${Math.max(8, Math.min(rect.left, window.innerWidth - panel.offsetWidth - 8))}px`
    panel.style.top = `${rect.bottom + 4}px`
    activePanel = panel
  }

  const renderUnsupported = (container: HTMLElement, type: string, item: any) => {
    container.className = "db-view-unsupported"
    container.dataset.viewType = type || "unknown"
    container.textContent = `暂不支持数据库视图类型：${type || "unknown"}（${item?.view?.name || "未命名视图"}）`
  }

  const createDataViews = (dataTableEl: HTMLElement, currentDataTable: any) => {
    const dataTableId = dataTableEl.getAttribute("data-av-id")
    if (!dataTableId) {
      return
    }

    const activeFilters = new Map<string, FilterGroup>()
    const activeSorts = new Map<string, ViewSort | null>()
    const activeSearches = new Map<string, string>()
    const publishedViewId = dataTableEl.getAttribute("custom-sy-av-view")
    const currentViewId = currentDataTable.order?.length === 1 ? currentDataTable.order[0] : publishedViewId || currentDataTable.order?.[0]
    if (!currentViewId || !currentDataTable.order?.includes(currentViewId)) {
      renderUnsupported(dataTableEl, "invalid", { view: { name: "缺少有效视图顺序" } })
      return
    }

    const render = (viewId: string) => {
      const item = currentDataTable[viewId]
      if (!item || typeof item !== "object") {
        renderUnsupported(dataTableEl, "invalid", { view: { name: "缺少真实视图数据" } })
        return
      }
      const type = resolveViewType(item)
      if (!SUPPORTED_VIEW_TYPES.includes(type)) {
        renderUnsupported(dataTableEl, type, item)
        return
      }
      const filter = activeFilters.get(viewId) || null
      const sort = activeSorts.get(viewId) || null
      const search = activeSearches.get(viewId) || ""
      const filtered = filter ? filterViewSnapshot(item, type, filter) : item
      const searched = search ? searchViewSnapshot(filtered, type, search) : filtered
      const arranged = sort ? sortViewSnapshot(searched, type, sort) : searched
      const renderItem = {
        ...currentDataTable,
        id: dataTableId,
        view: arranged,
        viewID: viewId,
        viewType: type,
        [viewId]: { ...arranged, viewType: type, id: viewId, name: item.name, desc: item.desc },
      }
      mountNativeAv(dataTableEl, renderItem, {
        onActivate: (nextViewId: string) => {
          closeFilter?.()
          closeActivePanel()
          render(nextViewId)
        },
        onOpen: (detail: any) => showDetailPanel(detail),
        onCopy: (text: string) => { void copyText(text) },
        onSort: (anchor: HTMLElement) => {
          const fields = getFilterFields(item, type)
          if (!fields.length) {
            showToast(filterLocale().noFields, "error")
            return
          }
          createSortPanel(anchor, fields, (nextSort) => {
            activeSorts.set(viewId, nextSort)
            render(viewId)
          })
        },
        onSearch: (query: string) => {
          activeSearches.set(viewId, query.trim())
          render(viewId)
        },
        onFilter: (anchor: HTMLElement) => {
          if (closeFilter) { closeFilter(); return }
          closeActivePanel()
          const root = filter || { kind: "group", join: "and", rules: [] }
          activeFilters.set(viewId, root)
          const getAnchor = () => dataTableEl.querySelector<HTMLButtonElement>('button[data-type="av-filter"]')
          closeFilter = openDatabaseFilterMenu(anchor as HTMLButtonElement, getAnchor, getFilterFields(item, type), root,
            () => render(viewId), () => { closeFilter = null })
        },
      })
      logger.debug("native database view rendered", dataTableId, viewId, type)
    }

    render(currentViewId)
  }

  vueApp.directive("db", {
    beforeUnmount() {
      closeFilter?.()
      closeActivePanel()
    },
    mounted (el) {
      const dataTableStr = el.getAttribute("data-dataviews")
      if (StrUtil.isEmptyString(dataTableStr)) {
        return
      }
      const dataTableDatas = parseDataViews(dataTableStr)
      if (!dataTableDatas || typeof dataTableDatas !== "object") {
        el.querySelectorAll("div[data-av-type]").forEach((dataTableEl: any) => {
          renderUnsupported(dataTableEl, "invalid", { view: { name: "数据库数据解析失败" } })
        })
        return
      }
      const dataTables = el.querySelectorAll("div[data-av-type]")
      dataTables.forEach((dataTableEl: any) => {
        const dataTableId = dataTableEl.getAttribute("data-av-id")
        const dataAvType = dataTableEl.getAttribute("data-av-type")
        if (!dataTableId || !SUPPORTED_VIEW_TYPES.includes(dataAvType)) {
          return
        }
        const currentDataTable = normalizeDataTable(dataTableDatas[dataTableId], dataTableId)
        if (dataTableEl.dataset.dbRendered === "true") {
          return
        }
        if (!currentDataTable) {
          renderUnsupported(dataTableEl, "invalid", { view: { name: "数据库数据解析失败" } })
          dataTableEl.dataset.dbRendered = "true"
          return
        }
        dataTableEl.dataset.dbRendered = "true"
        createDataViews(dataTableEl, currentDataTable)
        addClientAssetsPrefix(dataTableEl)
      })
    },
  })
})
