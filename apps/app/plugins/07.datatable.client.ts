/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2025 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import { openDatabaseSortMenu } from "~/plugins/libs/dataview/sortMenu"
import { openDatabaseFilterMenu } from "~/plugins/libs/dataview/filterMenu"
import { normalizeDataTable } from "~/utils/databaseViewSsr"
import { StrUtil } from "zhi-common"
import { useStaticClientAssets } from "~/plugins/libs/renderer/useStaticClientAssets"
import {
  filterViewSnapshot,
  getFilterFields,
  getSortFields,
  searchViewSnapshot,
  sortViewSnapshot,
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

  let closeFilter: (() => void) | null = null
  let closeSort: (() => void) | null = null

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
    const activeSorts = new Map<string, ViewSort[]>()
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
        hasFilter: Boolean(filter?.rules.length),
        hasSort: Boolean(sort?.length),
        onActivate: (nextViewId: string) => {
          closeFilter?.()
          closeSort?.()
          render(nextViewId)
        },
        onOpen: (detail: any) => showDetailPanel(detail),
        onCopy: (text: string) => { void copyText(text) },
        onSort: (anchor: HTMLButtonElement) => {
          if (closeSort) { closeSort(); return }
          closeFilter?.()
          const rules = sort ?? []
          activeSorts.set(viewId, rules)
          const getAnchor = () => dataTableEl.querySelector<HTMLButtonElement>('button[data-type="av-sort"]')
          closeSort = openDatabaseSortMenu(anchor, getAnchor, getSortFields(item, type), rules, () => {
            const scrollLeft = dataTableEl.querySelector('.av__scroll')?.scrollLeft ?? 0
            render(viewId)
            const scroll = dataTableEl.querySelector('.av__scroll')
            if (scroll) scroll.scrollLeft = scrollLeft
          }, () => { closeSort = null })
        },
        onSearch: (query: string) => {
          activeSearches.set(viewId, query.trim())
          render(viewId)
        },
        onFilter: (anchor: HTMLElement) => {
          if (closeFilter) { closeFilter(); return }
          closeSort?.()
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
      closeSort?.()
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
