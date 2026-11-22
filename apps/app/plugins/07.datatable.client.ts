/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2025 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import { StrUtil } from "zhi-common"
import { useStaticClientAssets } from "~/plugins/libs/renderer/useStaticClientAssets"
import { useBaseUrl } from "~/plugins/libs/renderer/useClientBaseUrl"
import {
  filterViewSnapshot,
  getFilterFields,
  resultCount,
  type FilterField,
  type ViewFilter,
} from "~/utils/databaseViewFilter"
import { mountNativeAv, parseDataViews, SUPPORTED_VIEW_TYPES } from "~/plugins/libs/dataview/native"

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
  const { getHome } = useBaseUrl()

  const resolveViewType = (item: any) => {
    const listed = item?.views?.find((view: any) => view.id === item?.view?.id)
    return listed?.type || item?.viewType || item?.view?.type || "unknown"
  }

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
        }
  }

  let activePanel: HTMLElement | null = null

  const closeActivePanel = () => {
    activePanel?.remove()
    activePanel = null
  }

  const createFilterPanel = (
    anchor: HTMLElement,
    fields: FilterField[],
    onApply: (filter: ViewFilter | null) => void,
  ) => {
    closeActivePanel()
    const locale = filterLocale()
    const panel = document.createElement("div")
    panel.className = "b3-menu db-view-filter"
    panel.setAttribute("role", "dialog")
    panel.setAttribute("aria-label", locale.label)
    panel.style.position = "fixed"
    panel.style.zIndex = "10"

    const title = document.createElement("div")
    title.className = "b3-menu__title"
    const label = document.createElement("span")
    label.className = "b3-menu__label"
    label.textContent = locale.label
    title.appendChild(label)
    panel.appendChild(title)

    const items = document.createElement("div")
    items.className = "b3-menu__items db-view-filter-items"
    panel.appendChild(items)

    const fieldLabel = document.createElement("label")
    fieldLabel.className = "b3-menu__item db-view-filter-field"
    const fieldText = document.createElement("span")
    fieldText.textContent = locale.field
    const fieldSelect = document.createElement("select")
    fieldSelect.className = "b3-select"
    fields.forEach((field: FilterField) => {
      const option = document.createElement("option")
      option.value = field.id
      option.textContent = field.name
      fieldSelect.appendChild(option)
    })
    fieldLabel.append(fieldText, fieldSelect)

    const operatorLabel = document.createElement("label")
    operatorLabel.className = "b3-menu__item db-view-filter-field"
    const operatorText = document.createElement("span")
    operatorText.textContent = locale.operator
    const operatorSelect = document.createElement("select")
    operatorSelect.className = "b3-select"
    operatorLabel.append(operatorText, operatorSelect)

    const valueLabel = document.createElement("label")
    valueLabel.className = "b3-menu__item db-view-filter-field db-view-filter-value"
    const valueText = document.createElement("span")
    valueText.textContent = locale.value
    const valueInput = document.createElement("input")
    valueInput.className = "b3-text-field"
    valueLabel.append(valueText, valueInput)

    const status = document.createElement("p")
    status.className = "db-view-filter-status"
    status.setAttribute("role", "status")
    status.setAttribute("aria-live", "polite")

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

    const currentField = () => fields.find((field: FilterField) => field.id === fieldSelect.value) || fields[0]
    const syncOperators = () => {
      const field = currentField()
      operatorSelect.replaceChildren()
      field.operators.forEach((operator) => {
        const option = document.createElement("option")
        option.value = operator
        option.textContent = locale[operator] || operator
        operatorSelect.appendChild(option)
      })
      valueInput.type = field.type === "date" ? "date" : field.type === "number" ? "number" : "text"
      valueInput.setAttribute("aria-label", `${locale.value} · ${field.name}`)
    }

    const submit = () => {
      const field = currentField()
      const operator = operatorSelect.value as ViewFilter["operator"]
      const query = valueInput.value.trim()
      if (!query || !field.operators.includes(operator)) {
        status.textContent = locale.invalid
        return
      }
      onApply({ fieldId: field.id, operator, query })
      closeActivePanel()
    }

    fieldSelect.addEventListener("change", syncOperators)
    apply.addEventListener("click", submit)
    valueInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault()
        submit()
      }
    })
    reset.addEventListener("click", () => {
      valueInput.value = ""
      status.textContent = ""
      onApply(null)
      closeActivePanel()
    })

    items.append(fieldLabel, operatorLabel, valueLabel, actions, status)
    document.body.appendChild(panel)

    const rect = anchor.getBoundingClientRect()
    panel.style.left = `${Math.max(8, Math.min(rect.left, window.innerWidth - panel.offsetWidth - 8))}px`
    panel.style.top = `${rect.bottom + 4}px`
    syncOperators()
    activePanel = panel
    return panel
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

    const activeFilters = new Map<string, ViewFilter | null>()
    const currentViewId = dataTableEl.getAttribute("custom-sy-av-view") || currentDataTable.order?.[0]
    if (!currentViewId) {
      return
    }

    const render = (viewId: string) => {
      const item = currentDataTable[viewId]
      if (!item) {
        return
      }
      const type = resolveViewType(item)
      if (!SUPPORTED_VIEW_TYPES.includes(type)) {
        renderUnsupported(dataTableEl, type, item)
        return
      }
      const filter = activeFilters.get(viewId) || null
      const filtered = filter ? filterViewSnapshot(item.view, type, filter) : item.view
      const renderItem = {
        ...currentDataTable,
        id: dataTableId,
        view: filtered,
        viewID: viewId,
        viewType: type,
        [viewId]: { ...item, view: filtered },
      }
      mountNativeAv(dataTableEl, renderItem, {
        onActivate: (nextViewId: string) => render(nextViewId),
        onOpen: (blockId: string) => {
          const config = JSON.parse(window.localStorage.getItem("static.app.config.json") || "{}")
          const docPath = config?.docPath || "s"
          window.open(`${getHome()}/${docPath}/${encodeURIComponent(blockId)}`, "_blank", "noopener,noreferrer")
        },
        onFilter: (anchor: HTMLElement) => {
          const fields = getFilterFields(item.view, type)
          const locale = filterLocale()
          if (!fields.length) {
            const message = document.createElement("p")
            message.className = "db-view-filter-status"
            message.setAttribute("role", "status")
            message.setAttribute("aria-live", "polite")
            message.textContent = locale.noFields
            dataTableEl.appendChild(message)
            return
          }
          createFilterPanel(anchor, fields, (nextFilter) => {
            activeFilters.set(viewId, nextFilter)
            render(viewId)
            if (nextFilter && resultCount(filterViewSnapshot(item.view, type, nextFilter), type) === 0) {
              const empty = document.createElement("p")
              empty.className = "db-view-empty"
              empty.textContent = locale.noResults
              dataTableEl.appendChild(empty)
            }
          })
        },
      })
      logger.debug("native database view rendered", dataTableId, viewId, type)
    }

    render(currentViewId)
  }

  vueApp.directive("db", {
    mounted (el) {
      const dataTableStr = el.getAttribute("data-dataviews")
      if (StrUtil.isEmptyString(dataTableStr)) {
        return
      }
      const dataTableDatas = parseDataViews(dataTableStr)
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
