import { DateUtil, JsonUtil, StrUtil } from "zhi-common"

export const SUPPORTED_VIEW_TYPES = ["table", "list", "gallery", "kanban", "calendar"]

const VIEW_ICONS: Record<string, string> = {
  table: "iconTable",
  list: "iconList",
  gallery: "iconGallery",
  kanban: "iconBoard",
  calendar: "iconCalendar",
}

const TYPE_ICONS: Record<string, string> = {
  block: "iconKey",
  text: "iconAlignLeft",
  number: "iconNumber",
  date: "iconCalendar",
  created: "iconCalendar",
  updated: "iconCalendar",
  select: "iconListItem",
  mSelect: "iconList",
  mAsset: "iconImage",
  asset: "iconImage",
  checkbox: "iconCheck",
  url: "iconLink",
  email: "iconEmail",
  phone: "iconPhone",
  template: "iconTemplate",
  relation: "iconRelation",
  rollup: "iconRollup",
}

const ICON_TAGS =
  "iconTable iconList iconGallery iconBoard iconCalendar iconAdd iconEye iconFilter iconFocus iconSort iconSearch iconSettings iconDown iconImage iconNumber iconAlignLeft iconKey iconOpen iconRefresh iconMore iconCopy iconFile iconUncheck iconLeft iconRight iconInbox iconDrag iconCloseRound iconCheck iconAttr iconTrashcan iconListItem iconLink iconEmail iconPhone iconTemplate iconRelation iconRollup iconInbox"

export const icon = (name: string) => `<svg><use xlink:href="#${name}"></use></svg>`

const tag = <K extends keyof HTMLElementTagNameMap>(name: K, className?: string) => {
  const element = document.createElement(name)
  if (className) {
    element.className = className
  }
  return element
}

const appendIcon = (parent: Element, name: string, className?: string) => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  if (className) {
    svg.setAttribute("class", className)
  }
  const use = document.createElementNS("http://www.w3.org/2000/svg", "use")
  use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", `#${name}`)
  svg.appendChild(use)
  parent.appendChild(svg)
  return svg
}

const createSvg = (className: string, name?: string) => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  if (className) {
    svg.setAttribute("class", className)
  }
  if (name) {
    const use = document.createElementNS("http://www.w3.org/2000/svg", "use")
    use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", `#${name}`)
    svg.appendChild(use)
  }
  return svg
}

const SAFE_COVER_TAGS = new Set(["DIV", "P", "SPAN", "BR", "IMG", "A", "EM", "STRONG", "CODE"])
const SAFE_COVER_ATTRIBUTES = new Set(["class", "data-type", "data-node-id", "data-subtype", "alt", "title", "src", "href", "target", "rel"])

const setSafeCellContent = (target: HTMLElement, source: unknown) => {
  if (typeof source !== "string" || !source.trim()) {
    return
  }
  const parsed = new DOMParser().parseFromString(source, "text/html")
  const appendNode = (node: Node, parent: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      parent.appendChild(document.createTextNode(node.textContent || ""))
      return
    }
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return
    }
    const sourceElement = node as HTMLElement
    const tagName = sourceElement.tagName.toUpperCase()
    if (["SCRIPT", "STYLE", "IFRAME", "OBJECT", "EMBED", "FORM", "INPUT", "BUTTON"].includes(tagName)) {
      return
    }
    const output = document.createElement(SAFE_COVER_TAGS.has(tagName) ? tagName.toLowerCase() : "span")
    for (const attribute of Array.from(sourceElement.attributes)) {
      const name = attribute.name.toLowerCase()
      if (!SAFE_COVER_ATTRIBUTES.has(name)) {
        continue
      }
      const value = attribute.value
      if ((name === "src" || name === "href") && /^(?:javascript|data):/i.test(value.trim())) {
        continue
      }
      output.setAttribute(attribute.name, value)
    }
    parent.appendChild(output)
    for (const child of Array.from(sourceElement.childNodes)) {
      appendNode(child, output)
    }
  }
  for (const child of Array.from(parsed.body.childNodes)) {
    appendNode(child, target)
  }
}

const setAttrs = (element: HTMLElement, attrs: Record<string, string | number | boolean | null | undefined>) => {
  Object.entries(attrs).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return
    }
    element.setAttribute(key, String(value))
  })
}

const resolveViewType = (item: any) => String(item?.viewType || "unknown")

const viewMeta = (item: any, _viewId: string) => item

const resolveCell = (cell: any) => {
  if (cell?.value !== undefined) {
    return {
      id: cell?.id || cell?.value?.id,
      value: cell.value,
      valueType: cell.valueType || cell.value?.type,
      color: cell.color,
      bgColor: cell.bgColor,
    }
  }
  return {
    id: cell?.id,
    value: cell,
    valueType: cell?.type,
    color: cell?.color,
    bgColor: cell?.bgColor,
  }
}

const dateText = (value: any) => {
  if (!value) {
    return ""
  }
  const isNotTime = value.isNotTime ?? false
  const format = (timestamp: any) => {
    if (!timestamp) {
      return ""
    }
    return isNotTime ? DateUtil.formatTimestampToZhDate(timestamp, false) : DateUtil.formatTimestampToZh(timestamp, true)
  }
  if (value.hasEndDate) {
    return `${format(value.content)} ~ ${format(value.content2)}`
  }
  return value.formattedContent || format(value.content)
}

const jsonValue = (value: any) => {
  try {
    return JSON.stringify(value)
  } catch (error) {
    return ""
  }
}

const appendCopyAction = (cell: HTMLElement, text = "") => {
  const button = tag("button", "av__cell-action ariaLabel")
  button.type = "button"
  setAttrs(button, {
    "data-position": "4north",
    "aria-label": "复制",
    "data-type": "copy",
  })
  button.innerHTML = icon("iconCopy")
  ;(button as any).__copyText = text
  cell.appendChild(button)
}

const appendRowActions = (cellprimary: HTMLElement, primary: any, detail?: any) => {
  const actions = tag("span", "av__row-actions")
  const open = tag("button", "av__row-action av__cell-action ariaLabel")
  open.type = "button"
  setAttrs(open, {
    "data-position": "4north",
    "aria-label": "查看详情",
    "data-type": "av-row-open",
  })
  open.innerHTML = icon("iconOpen")
  open.dataset.blockId = primary?.id || ""
  ;(open as any).__detail = detail || primary
  actions.appendChild(open)

  const update = tag("button", "av__row-action av__cell-action ariaLabel")
  update.type = "button"
  setAttrs(update, {
    "data-position": "4north",
    "aria-label": primary?.isDetached ? "绑定" : "换绑",
    "data-type": "av-row-update",
  })
  update.innerHTML = icon(primary?.isDetached ? "iconRef" : "iconRefresh")
  actions.appendChild(update)

  const more = tag("button", "av__row-action av__row-more av__cell-action ariaLabel")
  more.type = "button"
  setAttrs(more, {
    "data-position": "4north",
    "aria-label": "更多",
    "aria-haspopup": "menu",
    "data-type": "av-row-more",
  })
  more.innerHTML = icon("iconMore")
  actions.appendChild(more)
  cellprimary.appendChild(actions)
}

const renderSelectText = (cell: HTMLElement, cellValue: any, color: any, bgColor: any) => {
  const chip = tag("span", "b3-chip")
  chip.textContent = cellValue?.content || ""
  const colorIndex = String(cellValue?.color || color || "")
  if (/^\d+$/.test(colorIndex)) {
    chip.dataset.color = colorIndex
    chip.style.backgroundColor = `var(--b3-font-background${colorIndex})`
    chip.style.color = `var(--b3-font-color${colorIndex})`
  } else if (color || bgColor) {
    chip.style.color = color || ""
    chip.style.backgroundColor = bgColor || ""
  }
  cell.appendChild(chip)
}

const renderCellValue = (cell: HTMLElement, rawCell: any, field: any) => {
  const resolved = resolveCell(rawCell)
  const value = resolved.value
  const valueType = resolved.valueType || field?.type
  if (!value || value.isNotEmpty === false) {
    return false
  }
  switch (valueType) {
    case "block": {
      const blockContent = value.content || value.block?.content || ""
      if (!blockContent && !value.block) {
        return false
      }
      const primary = tag("span", "av__primary-container")
      const cellprimary = tag("span", "av__cellprimary")
      const emoji = tag("span", "b3-menu__avemoji")
      emoji.setAttribute("data-unicode", "")
      emoji.innerHTML = icon(value.isDetached ? "iconLine" : "iconFile")
      const ref = tag("span", "av__celltext")
      setAttrs(ref, {
        "data-type": "block-ref",
        "data-id": value.id || "",
        "data-subtype": value.refSubtype || "d",
      })
      ref.textContent = blockContent
      cellprimary.append(emoji, ref)
      appendRowActions(cellprimary, value)
      primary.appendChild(cellprimary)
      cell.appendChild(primary)
      appendCopyAction(cell, valueToText(rawCell))
      return true
    }
    case "number": {
      const number = value.number || value
      if (number?.content === undefined || number?.content === null || number?.content === "") {
        return false
      }
      const text = tag("span", "av__celltext")
      text.setAttribute("data-content", String(number.content))
      text.textContent = number.formattedContent || String(number.content)
      cell.appendChild(text)
      appendCopyAction(cell, valueToText(rawCell))
      return true
    }
    case "date":
    case "created":
    case "updated": {
      const date = value.date || value.created || value.updated || value
      if (!date?.content) {
        return false
      }
      const text = tag("span", "av__celltext")
      text.setAttribute("data-value", jsonValue(date))
      text.textContent = dateText(date)
      cell.appendChild(text)
      appendCopyAction(cell, valueToText(rawCell))
      return true
    }
    case "select":
    case "mSelect": {
      const select = value.select || value.mSelect
      const items = Array.isArray(select) ? select : select ? [select] : []
      if (!items.length) {
        return false
      }
      items.forEach((item: any) => {
        renderSelectText(cell, item, resolved.color, resolved.bgColor)
      })
      appendCopyAction(cell, valueToText(rawCell))
      return true
    }
    case "mAsset": {
      const assets = value.mAsset || value.asset || []
      if (!Array.isArray(assets) || !assets.length) {
        return false
      }
      assets.forEach((item: any) => {
        if (item.type === "image") {
          const image = tag("img", "av__cellassetimg")
          image.src = item.content || ""
          image.alt = item.name || "image"
          image.title = item.name || ""
          cell.appendChild(image)
        } else {
          const link = tag("a", "av__celltext av__celltext--url")
          link.href = item.content || ""
          link.textContent = item.name || item.content || ""
          link.target = "_blank"
          link.rel = "noopener noreferrer"
          cell.appendChild(link)
        }
      })
      return true
    }
    case "checkbox": {
      const checkbox = tag("span", "av__checkbox")
      checkbox.innerHTML = icon(value.checked ? "iconCheck" : "iconUncheck")
      cell.appendChild(checkbox)
      return true
    }
    case "url": {
      if (StrUtil.isEmptyString(value.content)) {
        return false
      }
      const link = tag("a", "av__celltext av__celltext--url")
      link.href = value.content
      link.textContent = value.content
      link.target = "_blank"
      link.rel = "noopener noreferrer"
      cell.appendChild(link)
      return true
    }
    case "email":
    case "phone":
    case "template": {
      const text = value.content || ""
      if (StrUtil.isEmptyString(text)) {
        return false
      }
      const span = tag("span", "av__celltext")
      span.textContent = text
      cell.appendChild(span)
      appendCopyAction(cell, valueToText(rawCell))
      return true
    }
    case "relation":
    case "rollup": {
      const text = value.content || value.text?.content || ""
      if (StrUtil.isEmptyString(text)) {
        return false
      }
      const span = tag("span", "av__celltext")
      span.textContent = text
      cell.appendChild(span)
      return true
    }
    default: {
      const text = value.content || value.text?.content || ""
      if (StrUtil.isEmptyString(text)) {
        return false
      }
      const span = tag("span", "av__celltext")
      span.textContent = text
      cell.appendChild(span)
      appendCopyAction(cell, valueToText(rawCell))
      return true
    }
  }
}

export const fieldIcon = (field: any) => {
  return field?.icon ? field.icon : TYPE_ICONS[field?.type] || "iconAlignLeft"
}

const createCell = (rawCell: any, field: any, className = "av__cell") => {
  const cell = tag("div", className)
  const resolved = resolveCell(rawCell)
  setAttrs(cell, {
    "data-id": resolved.id || "",
    "data-col-id": field?.id || resolved.value?.keyID || "",
    "data-field-id": className.includes("gallery") ? field?.id || "" : undefined,
    "data-wrap": String(field?.wrap ?? false),
    "data-dtype": field?.type || resolved.valueType || "",
    "data-date-format": "",
    "data-detached": resolved.value?.isDetached ? "true" : undefined,
    "data-align": field?.align || "",
    "aria-label": field?.name || "",
    "data-position": className.includes("gallery") ? "5west" : undefined,
  })
  const width = field?.width || "200px"
  cell.style.width = width
  const hasValue = renderCellValue(cell, rawCell, field)
  return { cell, hasValue }
}

const createViewTabs = (item: any, activeViewId: string, onActivate: (viewId: string) => void) => {
  const bar = tag("div", "layout-tab-bar fn__flex")
  ;(item?.order || []).forEach((viewId: string) => {
    const entry = item?.[viewId]
    const view = entry?.view || entry
    if (!view) {
      return
    }
    const meta = viewMeta(entry, viewId)
    const type = resolveViewType(item?.[viewId])
    const tab = tag("div", `ariaLabel item${viewId === activeViewId ? " item--focus" : ""}`)
    tab.setAttribute("draggable", "true")
    setAttrs(tab, {
      "data-position": "north",
      "data-av-type": type,
      "data-id": viewId,
      "data-page": meta?.pageSize || 50,
      "data-desc": meta?.desc || "",
    })
    const graphic = createSvg("item__graphic", VIEW_ICONS[type] || "iconTable")
    const text = tag("span", "item__text")
    text.textContent = meta?.name || type
    tab.append(graphic, text)
    tab.addEventListener("click", () => onActivate(viewId))
    bar.appendChild(tab)
  })
  return bar
}

const createToolbar = (
  item: any,
  activeViewId: string,
  onFilter: (anchor: HTMLElement) => void,
  onSort: (anchor: HTMLElement) => void,
  onSearch: (query: string) => void,
  onActivate: (viewId: string) => void,
) => {
  const views = tag("div", "fn__flex av__views")

  const selection = tag("div", "av__selection-toolbar")
  const count = tag("span", "av__selection-count")
  selection.appendChild(count)
  views.appendChild(selection)

  views.appendChild(createViewTabs(item, activeViewId, onActivate))

  views.appendChild(tag("div", "fn__space"))

  const addView = tag("span", "block__icon ariaLabel")
  setAttrs(addView, { "data-type": "av-add", "data-position": "8south", "aria-label": "添加视图" })
  addView.innerHTML = icon("iconAdd")
  views.appendChild(addView)

  views.appendChild(tag("div", "fn__flex-1"))

  const switcher = tag("span", "ariaLabel block__icon av__views-switcher--all")
  setAttrs(switcher, { "data-type": "av-switcher", "aria-label": "所有视图", "data-position": "8south" })
  switcher.innerHTML = `${icon("iconEye")}<span class="fn__space"></span><small>${item?.order?.length || 0}/${item?.order?.length || 0}</small>`
  views.appendChild(switcher)

  views.appendChild(tag("div", "fn__space"))

  const filter = tag("button", "ariaLabel block__icon av__readonly-filter")
  filter.type = "button"
  setAttrs(filter, { "data-type": "av-filter", "aria-label": "筛选", "aria-haspopup": "dialog", "aria-expanded": "false", "data-position": "8south" })
  filter.innerHTML = icon("iconFilter")
  filter.addEventListener("click", (event) => {
    event.preventDefault()
    event.stopPropagation()
    onFilter(filter)
  })
  views.appendChild(filter)

  views.appendChild(tag("div", "fn__space"))

  const contextFilter = tag("span", "ariaLabel block__icon")
  setAttrs(contextFilter, { "data-type": "av-context-filter", "aria-label": "上下文筛选", "data-position": "8south" })
  contextFilter.innerHTML = icon("iconFocus")
  views.appendChild(contextFilter)

  views.appendChild(tag("div", "fn__space"))

  const sort = tag("span", "ariaLabel block__icon av__readonly-sort")
  setAttrs(sort, { "data-type": "av-sort", "aria-label": "临时排序", "data-position": "8south" })
  sort.innerHTML = icon("iconSort")
  sort.addEventListener("click", (event) => {
    event.preventDefault()
    event.stopPropagation()
    onSort(sort)
  })
  views.appendChild(sort)

  views.appendChild(tag("div", "fn__space"))

  const searchButton = tag("button", "ariaLabel block__icon")
  searchButton.type = "button"
  setAttrs(searchButton, { "data-type": "av-search-icon", "aria-label": "搜索", "data-position": "8south" })
  searchButton.innerHTML = icon("iconSearch")
  views.appendChild(searchButton)

  const search = tag("div", "fn__flex av__search")
  search.style.position = "relative"
  const input = tag("div", "b3-text-field b3-text-field--text")
  input.setAttribute("contenteditable", "plaintext-only")
  input.setAttribute("data-type", "av-search")
  input.setAttribute("placeholder", "搜索...")
  input.setAttribute("role", "searchbox")
  input.setAttribute("aria-label", "搜索")
  input.style.width = "0"
  input.style.paddingLeft = "0"
  input.style.paddingRight = "0"
  const clear = createSvg("b3-form__icon-clear ariaLabel fn__none", "iconCloseRound")
  clear.setAttribute("aria-label", "清空")
  clear.style.height = "28px"
  clear.style.width = "1em"
  search.append(input, clear)
  views.appendChild(search)
  const openSearch = () => {
    input.style.width = "160px"
    input.style.paddingLeft = "8px"
    input.style.paddingRight = "24px"
    input.classList.add("av__search-input--active")
    input.focus()
  }
  searchButton.addEventListener("click", (event) => {
    event.preventDefault()
    event.stopPropagation()
    openSearch()
  })
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault()
      onSearch(input.textContent || "")
      return
    }
    if (event.key === "Escape") {
      input.textContent = ""
      onSearch("")
      input.blur()
    }
  })
  clear.addEventListener("click", (event) => {
    event.preventDefault()
    input.textContent = ""
    onSearch("")
    openSearch()
  })

  views.appendChild(tag("div", "fn__space"))

  const more = tag("span", "ariaLabel block__icon")
  setAttrs(more, { "data-type": "av-more", "aria-label": "设置", "data-position": "8south" })
  more.innerHTML = icon("iconSettings")
  views.appendChild(more)

  views.appendChild(tag("div", "fn__space"))

  const newGroup = tag("div", "av__new fn__flex")
  const addMore = tag("button", "b3-button")
  addMore.type = "button"
  addMore.setAttribute("data-type", "av-add-more")
  addMore.textContent = "新建"
  const addTemplate = tag("button", "b3-button ariaLabel")
  addTemplate.type = "button"
  setAttrs(addTemplate, { "data-type": "av-add-template", "data-position": "8south", "aria-label": "模板" })
  addTemplate.innerHTML = icon("iconDown")
  newGroup.append(addMore, addTemplate)
  views.appendChild(newGroup)

  return views
}

const createHeader = (
  item: any,
  currentViewId: string,
  onFilter: (anchor: HTMLElement) => void,
  onSort: (anchor: HTMLElement) => void,
  onSearch: (query: string) => void,
  onActivate: (viewId: string) => void,
) => {
  const meta = item?.view || {}
  const header = tag("div", "av__header")
  setAttrs(header, {
    "data-default-template-id": "",
    "data-current-view-id": currentViewId,
    "data-view-count": item?.order?.length || 0,
    "data-view-ids": (item?.order || []).join(","),
  })
  header.appendChild(createToolbar(item, currentViewId, onFilter, onSort, onSearch, onActivate))

  const title = tag("div", "av__title")
  title.setAttribute("contenteditable", "false")
  title.setAttribute("spellcheck", "false")
  title.setAttribute("data-title", "")
  title.setAttribute("data-readonly-title", "true")
  title.setAttribute("data-tip", "未命名数据库")
  if (!StrUtil.isEmptyString(item?.name)) {
    title.textContent = item.name
  }
  if (!meta.hideAttrViewName) {
    header.appendChild(title)
  }
  return header
}

const createUtilRow = () => {
  const util = tag("div", "av__row--util")
  const sticky = tag("div", "av__colsticky")
  const add = tag("button", "b3-button av__button")
  add.type = "button"
  setAttrs(add, { "data-type": "av-add-bottom" })
  add.innerHTML = `${icon("iconAdd")}<span>添加条目</span>`
  sticky.appendChild(add)
  sticky.appendChild(tag("span", "fn__space"))
  const load = tag("button", "b3-button av__button fn__none")
  load.type = "button"
  setAttrs(load, { "data-type": "av-load-more" })
  load.innerHTML = `${icon("iconArrowDown")}<span>加载更多</span><svg data-type="set-page-size" data-size="50">${icon("iconMore")}</svg>`
  sticky.appendChild(load)
  util.appendChild(sticky)
  return util
}

const createCalcFooter = (columns: any[]) => {
  const footer = tag("div", "av__row--footer")
  columns.forEach((column: any) => {
    const calc = tag("div", "av__calc")
    setAttrs(calc, {
      "data-col-id": column?.id || "",
      "data-dtype": column?.type || "",
      "data-operator": "",
    })
    calc.style.width = column?.width || "200px"
    calc.innerHTML = `${icon("iconDown")}<small>计算</small>`
    footer.appendChild(calc)
  })
  return footer
}

const renderTableBody = (view: any) => {
  const body = tag("div", "av__body")
  body.setAttribute("data-group-id", "")
  body.setAttribute("data-page-size", String(view?.pageSize || 50))
  body.style.float = "left"

  const header = tag("div", "av__row av__row--header")
  const headerSticky = tag("div", "av__colsticky")
  const firstCol = tag("div", "av__firstcol")
  firstCol.innerHTML = icon("iconUncheck")
  headerSticky.appendChild(firstCol)
  header.appendChild(headerSticky)

  const columns = (view?.columns || []).filter((column: any) => !column.hidden)
  columns.forEach((column: any) => {
    const { cell } = createCell(null, column, "av__cell av__cell--header")
    cell.textContent = ""
    cell.setAttribute("draggable", "true")
    setAttrs(cell, {
      "data-col-id": column.id,
      "data-icon": column.icon || "",
      "data-dtype": column.type,
      "data-wrap": String(column.wrap ?? false),
      "data-pin": String(column.pin ?? false),
      "data-freeze": "false",
      "data-desc": column.desc || "",
      "data-align": column.align || "",
      "data-position": "north",
    })
    const headerIcon = createSvg("av__cellheadericon", fieldIcon(column))
    const label = tag("span", "av__celltext fn__flex-1")
    label.textContent = column.name || ""
    const widthDrag = tag("div", "av__widthdrag")
    cell.append(headerIcon, label, widthDrag)
    header.appendChild(cell)
  })

  const icons = tag("div", "block__icons")
  icons.style.minHeight = "auto"
  icons.setAttribute("data-pinindex", "-1")
  const more = tag("div", "block__icon block__icon--show")
  more.setAttribute("data-type", "av-header-more")
  more.innerHTML = icon("iconMore")
  const space = tag("div", "fn__space")
  const addField = tag("div", "block__icon block__icon--show ariaLabel")
  setAttrs(addField, { "aria-label": "添加字段", "data-type": "av-header-add", "data-position": "4south" })
  addField.innerHTML = icon("iconAdd")
  icons.append(more, space, addField)
  header.appendChild(icons)
  body.appendChild(header)

  ;(view?.rows || []).forEach((row: any, rowIndex: number) => {
    const tr = tag("div", "av__row")
    setAttrs(tr, { "data-index": rowIndex, "data-id": row.id })
    const sticky = tag("div", "av__colsticky")
    const first = tag("div", "av__firstcol")
    first.innerHTML = `${icon("iconUncheck")}<div class="av__freeze-drag ariaLabel" data-position="east" aria-label="拖拽调整冻结范围"></div>`
    sticky.appendChild(first)
    tr.appendChild(sticky)
    columns.forEach((column: any, columnIndex: number) => {
      const rawCell = row.cells?.[columnIndex]
      const { cell } = createCell(rawCell, column)
      if (cell.dataset.id === undefined) {
        cell.removeAttribute("data-id")
      }
      tr.appendChild(cell)
    })
    const rowActions = tag("div", "av__cell av__row-detail-cell")
    appendRowActions(rowActions, { id: row.id }, { record: row, fields: view.columns || [], type: "table" })
    tr.appendChild(rowActions)
    body.appendChild(tr)
  })

  body.appendChild(createUtilRow())
  body.appendChild(createCalcFooter(columns))
  return body
}

const renderListBody = (view: any) => {
  const body = tag("div", "av__body")
  body.setAttribute("data-group-id", "")
  body.setAttribute("data-page-size", String(view?.pageSize || 50))
  body.style.float = "left"

  const columns = (view?.columns || []).filter((column: any) => !column.hidden)
  const primary = columns.find((column: any) => column.type === "block") || columns[0]
  const visibleColumns = primary ? [primary] : []

  const header = tag("div", "av__row av__row--header")
  const sticky = tag("div", "av__colsticky")
  const first = tag("div", "av__firstcol")
  first.innerHTML = icon("iconUncheck")
  sticky.appendChild(first)
  header.appendChild(sticky)
  visibleColumns.forEach((column: any) => {
    const { cell } = createCell(null, column, "av__cell av__cell--header")
    cell.textContent = ""
    cell.setAttribute("draggable", "true")
    setAttrs(cell, {
      "data-col-id": column.id,
      "data-icon": column.icon || "",
      "data-dtype": column.type,
      "data-wrap": String(column.wrap ?? false),
      "data-pin": String(column.pin ?? false),
      "data-freeze": "false",
      "data-desc": column.desc || "",
      "data-align": column.align || "",
      "data-position": "north",
    })
    const headerIcon = createSvg("av__cellheadericon", fieldIcon(column))
    const label = tag("span", "av__celltext fn__flex-1")
    label.textContent = column.name || ""
    cell.append(headerIcon, label, tag("div", "av__widthdrag"))
    header.appendChild(cell)
  })
  const icons = tag("div", "block__icons")
  icons.style.minHeight = "auto"
  icons.setAttribute("data-pinindex", "-1")
  const more = tag("div", "block__icon block__icon--show")
  more.setAttribute("data-type", "av-header-more")
  more.innerHTML = icon("iconMore")
  const addField = tag("div", "block__icon block__icon--show ariaLabel")
  setAttrs(addField, { "aria-label": "添加字段", "data-type": "av-header-add", "data-position": "4south" })
  addField.innerHTML = icon("iconAdd")
  icons.append(more, tag("div", "fn__space"), addField)
  header.appendChild(icons)
  body.appendChild(header)

  ;(view?.rows || []).forEach((row: any, rowIndex: number) => {
    const tr = tag("div", "av__row")
    setAttrs(tr, { "data-index": rowIndex, "data-id": row.id })
    const sticky = tag("div", "av__colsticky")
    const first = tag("div", "av__firstcol")
    first.innerHTML = icon("iconUncheck")
    sticky.appendChild(first)
    tr.appendChild(sticky)
    visibleColumns.forEach((column: any) => {
      const columnIndex = (view?.columns || []).findIndex((item: any) => item.id === column.id)
      const rawCell = row.cells?.[columnIndex]
      const { cell } = createCell(rawCell, column)
      cell.setAttribute("aria-label", column.name || "")
      cell.setAttribute("data-position", "north")
      tr.appendChild(cell)
    })
    const rowActions = tag("div", "av__cell av__row-detail-cell")
    appendRowActions(rowActions, { id: row.id }, { record: row, fields: view.columns || [], type: "table" })
    tr.appendChild(rowActions)
    body.appendChild(tr)
  })

  body.appendChild(createUtilRow())
  body.appendChild(createCalcFooter(visibleColumns))
  return body
}

const createCard = (card: any, fields: any[], className: string, showCover = true) => {
  const article = tag("div", className)
  setAttrs(article, {
    "data-id": card?.id || "",
    "data-index": card?.index,
    draggable: "true",
  })

  if (showCover) {
    const cover = tag("div", "av__gallery-cover av__gallery-cover--0")
    const content = tag("div", "av__gallery-content")
    content.setAttribute("inert", "")
    if (card?.coverContent) {
      setSafeCellContent(content, card.coverContent)
    } else if (card?.coverURL) {
      const image = tag("img")
      image.src = card.coverURL
      image.alt = ""
      content.appendChild(image)
    }
    cover.append(content, tag("div"))
    article.appendChild(cover)
  }

  const fieldList = tag("div", "av__gallery-fields")
  fields.forEach((field: any) => {
    const value = (card?.values || []).find((item: any) => {
      return item?.keyID === field?.id || item?.value?.keyID === field?.id
    })
    const { cell, hasValue } = createCell(value, field, "av__cell")
    cell.setAttribute("data-position", "5west")
    cell.setAttribute("aria-label", field?.name || "")
    cell.setAttribute("data-field-id", field?.id || "")
    const wrapper = tag("div", `av__gallery-field${field?.type === "block" ? " av__gallery-field--full-row" : ""}`)
    wrapper.setAttribute("data-empty", String(!hasValue))
    if (!hasValue) {
      const tip = tag("div", "av__gallery-tip")
      appendIcon(tip, fieldIcon(field))
      const label = tag("span")
      label.textContent = `编辑 ${field?.name || ""}`
      tip.appendChild(label)
      wrapper.appendChild(tip)
    }
    wrapper.appendChild(cell)
    fieldList.appendChild(wrapper)
  })
  article.appendChild(fieldList)
  const detailActions = tag("div", "av__card-detail-actions")
  appendRowActions(detailActions, card, { record: card, fields, type: "card" })
  article.appendChild(detailActions)
  return article
}

const createGalleryBody = (view: any) => {
  const body = tag("div", "av__body")
  body.setAttribute("data-group-id", "")
  body.setAttribute("data-page-size", String(view?.pageSize || 50))

  const gallery = tag("div", "av__gallery")
  gallery.style.setProperty("--b3-av-card-width", `${view?.cardWidth || 260}px`)
  gallery.style.setProperty("--b3-av-card-aspect-ratio", String(view?.cardAspectRatioValue || 1.7777777777777777))
  if (view?.cardSize === 0) {
    gallery.classList.add("av__gallery--small")
  }
  ;(view?.cards || []).forEach((card: any, index: number) => {
    const item = createCard({ ...card, index }, view?.fields || [], "av__gallery-item")
    gallery.appendChild(item)
  })

  const actions = tag("div", "av__gallery-actions")
  const edit = tag("span", "protyle-icon protyle-icon--first ariaLabel")
  setAttrs(edit, { "data-position": "4north", "aria-label": "显示空字段", "data-type": "av-gallery-edit" })
  edit.innerHTML = icon("iconEdit")
  const more = tag("span", "protyle-icon protyle-icon--last ariaLabel")
  setAttrs(more, { "data-position": "4north", "aria-label": "更多", "data-type": "av-gallery-more" })
  more.innerHTML = icon("iconMore")
  actions.append(edit, more)
  gallery.appendChild(actions)

  body.appendChild(gallery)
  return body
}

const isDefaultGroup = (value: string) => value === "_@default@_" || value === ""

const createKanbanBody = (view: any) => {
  const body = tag("div", "av__body")
  body.setAttribute("data-group-id", "")
  body.setAttribute("data-page-size", String(view?.pageSize || 50))

  const kanban = tag("div", "av__kanban")
  kanban.setAttribute("data-group-options", "[]")
  kanban.style.setProperty("--b3-av-card-width", `${view?.cardWidth || 260}px`)
  kanban.style.setProperty("--b3-av-card-aspect-ratio", String(view?.cardAspectRatioValue || 1.7777777777777777))

  ;(view?.groups || []).forEach((group: any) => {
    const section = tag("div", "av__kanban-group")
    setAttrs(section, {
      "data-group-id": group?.id || "",
      "data-previous-group-id": group?.previousGroupId || "",
    })
    if (group?.groupKey?.id && group?.groupValue) {
      section.setAttribute(
        "data-group-config",
        jsonValue({
          field: group.groupKey.id,
          method: group?.groupValue?.type === "text" ? 0 : 0,
          order: group?.groupKey?.order ?? 3,
          hideEmpty: false,
        }),
      )
    }
    if (group?.fillColBackgroundColor) {
      section.style.backgroundColor = group.fillColBackgroundColor
    }

    const title = tag("div", "av__group-title")
    title.setAttribute("draggable", "true")
    const name = tag("span", "av__group-name fn__ellipsis")
    name.style.whiteSpace = "nowrap"
    const rawName = group?.name || group?.groupValue?.text?.content || ""
    const displayName = isDefaultGroup(rawName)
      ? `${group?.groupKey?.name || "分组"} 为空`
      : rawName
    if (!isDefaultGroup(rawName) && group?.groupValue?.color) {
      renderSelectText(name, { content: displayName, color: group.groupValue.color }, "", "")
    } else {
      name.textContent = displayName
    }
    const counter = tag("span", "av__group-counter ariaLabel")
    counter.setAttribute("data-position", "north")
    counter.setAttribute("aria-label", "条目数")
    counter.textContent = String(group?.cardCount ?? group?.cards?.length ?? 0)
    const flex = tag("span", "fn__flex-1")
    const add = tag("span", "av__group-icon av__group-icon--hover ariaLabel")
    setAttrs(add, { "data-type": "av-add-top", "data-position": "north", "aria-label": "添加条目" })
    add.innerHTML = icon("iconAdd")
    title.append(name, counter, flex, add)
    section.appendChild(title)

    const groupBody = tag("div", "av__body")
    setAttrs(groupBody, {
      "data-group-id": group?.id || "",
      "data-page-size": String(group?.pageSize || 50),
      "data-dtype": group?.groupKey?.type || "",
      "data-content": group?.groupValue?.text?.content || "",
    })
    const gallery = tag("div", "av__gallery av__gallery--small")
    gallery.style.setProperty("--b3-av-card-width", `${group?.cardWidth || view?.cardWidth || 260}px`)
    gallery.style.setProperty(
      "--b3-av-card-aspect-ratio",
      String(group?.cardAspectRatioValue || view?.cardAspectRatioValue || 1.7777777777777777),
    )
    ;(group?.cards || []).forEach((card: any, index: number) => {
      gallery.appendChild(createCard({ ...card, index }, group?.fields || view?.fields || [], "av__gallery-item", false))
    })
    const actions = tag("div", "av__gallery-actions")
    const edit = tag("span", "protyle-icon protyle-icon--first ariaLabel")
    setAttrs(edit, { "data-position": "4north", "aria-label": "显示空字段", "data-type": "av-gallery-edit" })
    edit.innerHTML = icon("iconEdit")
    const more = tag("span", "protyle-icon protyle-icon--last ariaLabel")
    setAttrs(more, { "data-position": "4north", "aria-label": "更多", "data-type": "av-gallery-more" })
    more.innerHTML = icon("iconMore")
    actions.append(edit, more)
    gallery.appendChild(actions)
    groupBody.appendChild(gallery)
    section.appendChild(groupBody)

    kanban.appendChild(section)
  })

  body.appendChild(kanban)
  return body
}

const WEEKDAYS = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
const dayStamp = (date: Date) => startOfDay(date)
const addDays = (date: Date, days: number) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + days)

const isoWeek = (date: Date) => {
  const utc = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const day = utc.getUTCDay() || 7
  utc.setUTCDate(utc.getUTCDate() + 4 - day)
  const yearStart = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1))
  return Math.ceil(((utc.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
}

const weekStartDate = (date: Date, weekStart: number) => {
  const day = date.getDay()
  const offset = (day - weekStart + 7) % 7
  return addDays(date, -offset)
}

const padMonth = (date: Date) => `${date.getFullYear()}年${date.getMonth() + 1}月`

const dayLabel = (date: Date) => {
  return date.getDate() === 1 ? `${date.getMonth() + 1}月1日` : String(date.getDate())
}

const dayTitle = (date: Date) => `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`

const calendarDate = (rawCell: any) => {
  const resolved = resolveCell(rawCell)
  const date = resolved.value?.date || resolved.value
  if (!date?.content) {
    return null
  }
  return date
}

const renderCalendarItem = (row: any, primaryField: any, dateValue: any, startIndex: number, span: number) => {
  const item = tag("div", "av__calendar-item av__calendar-item--start av__calendar-item--end")
  setAttrs(item, {
    role: "button",
    tabindex: "0",
    "data-calendar-item": row?.id || "",
    "data-id": row?.id || "",
  })
  item.style.gridColumn = `${startIndex + 1}/span ${span}`
  item.style.gridRow = "1"
  const dateTextValue = dateText(dateValue)
  item.title = `${primaryField?.value || ""}\n${dateTextValue}`

  const startResize = tag("span", "av__calendar-resize av__calendar-resize--start")
  setAttrs(startResize, { "data-calendar-resize": "start", title: "拖动调整开始日期" })
  const move = tag("span", "av__calendar-move")
  setAttrs(move, { "data-calendar-move": "", title: "移动" })
  move.innerHTML = icon("iconDrag")
  const content = tag("div", "av__calendar-item-content")
  const field = tag("div", "av__calendar-field")
  setAttrs(field, {
    "data-field-id": primaryField?.id || "",
    "data-col-id": primaryField?.id || "",
    "data-dtype": primaryField?.type || "block",
    "data-align": "",
    "data-wrap": "false",
    title: primaryField?.name || "",
  })
  const resolved = resolveCell(primaryField?.cell)
  renderCellValue(field, primaryField?.cell, primaryField)
  if (!field.childNodes.length) {
    const spanText = tag("span", "av__celltext")
    spanText.textContent = resolved.value?.content || ""
    field.appendChild(spanText)
  }
  content.appendChild(field)
  const endResize = tag("span", "av__calendar-resize av__calendar-resize--end")
  setAttrs(endResize, { "data-calendar-resize": "end", title: "拖动调整结束日期" })
  item.append(startResize, move, content, endResize)
  return item
}

const renderCalendarBody = (view: any, mode: "month" | "week") => {
  const wrapper = tag("div", "av__calendar")
  wrapper.setAttribute("contenteditable", "false")

  const calendar = view?.calendar || {}
  const weekStart = calendar.weekStart ?? 1
  const dateKeyID = calendar.dateKeyID
  const columns = view?.columns || []
  const dateIndex = columns.findIndex((column: any) => column.id === dateKeyID)
  const primaryIndex = columns.findIndex((column: any) => column.type === "block")
  const now = new Date()

  const toolbar = tag("div", "av__calendar-toolbar")
  const label = tag("span", "av__calendar-label")
  label.textContent = padMonth(now)
  const controls = tag("div", "av__calendar-controls")
  const undated = tag("button", "block__icon block__icon--show ariaLabel fn__none")
  undated.type = "button"
  setAttrs(undated, {
    "data-calendar-undated-toggle": "",
    "data-position": "8south",
    "aria-label": "无日期",
    "aria-expanded": "false",
  })
  undated.innerHTML = icon("iconInbox")
  const previous = tag("button", "block__icon block__icon--show ariaLabel")
  previous.type = "button"
  setAttrs(previous, { "data-calendar-action": "previous", "data-position": "8south", "aria-label": "上一个" })
  previous.innerHTML = icon("iconLeft")
  const today = tag("button", "b3-button b3-button--cancel av__calendar-today ariaLabel")
  today.type = "button"
  setAttrs(today, { "data-calendar-action": "today", "data-position": "8south", "aria-label": "今天" })
  today.textContent = "今天"
  const next = tag("button", "block__icon block__icon--show ariaLabel")
  next.type = "button"
  setAttrs(next, { "data-calendar-action": "next", "data-position": "8south", "aria-label": "下一个" })
  next.innerHTML = icon("iconRight")
  const jump = tag("button", "block__icon block__icon--show ariaLabel")
  jump.type = "button"
  setAttrs(jump, {
    "data-calendar-action": "jump",
    "data-position": "8south",
    "aria-label": "跳转到日期或 ISO 周",
  })
  jump.innerHTML = icon("iconCalendar")
  const modeSelect = tag("select", "b3-select")
  setAttrs(modeSelect, { "data-calendar-mode": "", "aria-label": "日历" })
  const monthOption = tag("option")
  monthOption.value = "month"
  monthOption.textContent = "月"
  monthOption.selected = mode === "month"
  const weekOption = tag("option")
  weekOption.value = "week"
  weekOption.textContent = "周"
  weekOption.selected = mode === "week"
  modeSelect.append(monthOption, weekOption)
  controls.append(undated, previous, today, next, jump, modeSelect)
  toolbar.append(label, controls)
  wrapper.appendChild(toolbar)

  const undatedPanel = tag("div", "b3-menu av__calendar-undated-panel fn__none")
  setAttrs(undatedPanel, { "data-calendar-undated-panel": "", role: "dialog", "aria-label": "无日期" })
  const undatedHead = tag("div", "av__calendar-undated-head")
  const undatedLabel = tag("span", "b3-menu__label")
  undatedLabel.textContent = "无日期"
  undatedHead.appendChild(undatedLabel)
  const undatedSearch = tag("div", "av__calendar-undated-search")
  const searchInput = tag("input", "b3-text-field")
  searchInput.type = "search"
  setAttrs(searchInput, {
    "data-calendar-undated-search": "",
    "aria-label": "搜索",
    placeholder: "搜索...",
  })
  undatedSearch.appendChild(searchInput)
  const undatedHint = tag("div", "av__calendar-undated-hint ft__on-surface")
  undatedHint.textContent = "拖动条目到日期，或选中条目后点选日期"
  const undatedList = tag("div", "b3-menu__items av__calendar-undated-list")
  undatedList.setAttribute("data-calendar-undated-list", "")
  const undatedMore = tag("button", "b3-button b3-button--cancel av__calendar-undated-more fn__none")
  undatedMore.type = "button"
  undatedMore.textContent = "加载更多"
  undatedPanel.append(undatedHead, undatedSearch, undatedHint, undatedList, undatedMore)
  wrapper.appendChild(undatedPanel)

  const scroll = tag("div", "av__calendar-scroll")
  scroll.setAttribute("data-prevent-swipe", "true")
  const weekdays = tag("div", "av__calendar-weekdays")
  const weekLabel = tag("div", "av__calendar-week-label fn__ellipsis")
  weekLabel.title = "ISO 周"
  weekLabel.textContent = "周"
  weekdays.appendChild(weekLabel)
  const orderedWeekdays = WEEKDAYS.slice((weekStart + 6) % 7).concat(WEEKDAYS.slice(0, (weekStart + 6) % 7))
  orderedWeekdays.forEach((day) => {
    const cell = tag("div")
    cell.textContent = day
    weekdays.appendChild(cell)
  })
  scroll.appendChild(weekdays)

  const grid = tag("div", "av__body av__calendar-grid")
  grid.setAttribute("data-group-id", "")
  grid.style.setProperty("--av-calendar-saturday", "5")
  grid.style.setProperty("--av-calendar-sunday", "6")

  const events = (view?.rows || [])
    .map((row: any) => {
      const rawCell = dateIndex >= 0 ? row.cells?.[dateIndex] : null
      const dateValue = calendarDate(rawCell)
      if (!dateValue) {
        return null
      }
      return {
        row,
        dateValue,
        start: new Date(dateValue.content),
        end: new Date(dateValue.hasEndDate && dateValue.content2 ? dateValue.content2 : dateValue.content),
        primaryCell: row.cells?.[primaryIndex >= 0 ? primaryIndex : 0],
      }
    })
    .filter(Boolean)

  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0)
  const firstWeek = weekStartDate(monthStart, weekStart)
  const lastWeek = weekStartDate(monthEnd, weekStart)

  if (mode === "month") {
    for (let cursor = new Date(firstWeek); cursor <= lastWeek; cursor = addDays(cursor, 7)) {
      const weekRow = tag("div", "av__calendar-week-row")
      const weekNumber = tag("span", "av__calendar-week-number")
      weekNumber.title = `ISO 周 ${cursor.getFullYear()}-W${String(isoWeek(cursor)).padStart(2, "0")}`
      weekNumber.textContent = String(isoWeek(cursor))
      weekRow.appendChild(weekNumber)

      const week = tag("div", "av__calendar-week")
      week.setAttribute("data-calendar-week", String(dayStamp(cursor)))
      const days = tag("div", "av__calendar-days")
      for (let index = 0; index < 7; index += 1) {
        const date = addDays(cursor, index)
        const outside = date.getMonth() !== now.getMonth()
        const day = tag("div", `av__calendar-day${outside ? " av__calendar-day--outside" : ""}`)
        day.setAttribute("data-calendar-day", String(dayStamp(date)))
        const number = tag("span")
        number.title = dayTitle(date)
        number.textContent = dayLabel(date)
        const add = tag("button", "block__icon")
        add.type = "button"
        add.setAttribute("data-calendar-add", String(dayStamp(date)))
        add.setAttribute("aria-label", "添加条目")
        add.innerHTML = icon("iconAdd")
        day.append(number, add)
        days.appendChild(day)
      }
      week.appendChild(days)

      const eventLayer = tag("div", "av__calendar-events")
      const weekEvents = events.filter((event: any) => {
        return event.start >= cursor && event.start < addDays(cursor, 7)
      })
      const maxRows = Math.max(1, weekEvents.length)
      eventLayer.style.gridTemplateRows = `repeat(${maxRows},auto)`
      weekEvents.forEach((event: any, index: number) => {
        const startIndex = Math.max(0, Math.min(6, Math.floor((event.start.getTime() - cursor.getTime()) / 86400000)))
        const endIndex = Math.max(startIndex, Math.min(6, Math.floor((event.end.getTime() - cursor.getTime()) / 86400000)))
        const item = renderCalendarItem(
          event.row,
          { ...columns[primaryIndex] || columns[0], cell: event.primaryCell, value: resolveCell(event.primaryCell).value?.content },
          event.dateValue,
          startIndex,
          endIndex - startIndex + 1,
        )
        item.style.gridRow = String(index + 1)
        eventLayer.appendChild(item)
      })
      week.appendChild(eventLayer)
      weekRow.appendChild(week)
      grid.appendChild(weekRow)
    }
  } else {
    const weekRow = tag("div", "av__calendar-week-row")
    const weekNumber = tag("span", "av__calendar-week-number")
    weekNumber.title = `ISO 周 ${now.getFullYear()}-W${String(isoWeek(now)).padStart(2, "0")}`
    weekNumber.textContent = String(isoWeek(now))
    weekRow.appendChild(weekNumber)
    const week = tag("div", "av__calendar-week")
    const start = weekStartDate(now, weekStart)
    week.setAttribute("data-calendar-week", String(dayStamp(start)))
    const days = tag("div", "av__calendar-days")
    for (let index = 0; index < 7; index += 1) {
      const date = addDays(start, index)
      const day = tag("div", "av__calendar-day")
      day.setAttribute("data-calendar-day", String(dayStamp(date)))
      const number = tag("span")
      number.title = dayTitle(date)
      number.textContent = dayLabel(date)
      const add = tag("button", "block__icon")
      add.type = "button"
      add.setAttribute("data-calendar-add", String(dayStamp(date)))
      add.setAttribute("aria-label", "添加条目")
      add.innerHTML = icon("iconAdd")
      day.append(number, add)
      days.appendChild(day)
    }
    week.appendChild(days)
    const eventLayer = tag("div", "av__calendar-events")
    const weekEvents = events.filter((event: any) => event.start >= start && event.start < addDays(start, 7))
    eventLayer.style.gridTemplateRows = `repeat(${Math.max(1, weekEvents.length)},auto)`
    weekEvents.forEach((event: any, index: number) => {
      const startIndex = Math.max(0, Math.min(6, Math.floor((event.start.getTime() - start.getTime()) / 86400000)))
      const endIndex = Math.max(startIndex, Math.min(6, Math.floor((event.end.getTime() - start.getTime()) / 86400000)))
      const item = renderCalendarItem(
        event.row,
        { ...columns[primaryIndex] || columns[0], cell: event.primaryCell, value: resolveCell(event.primaryCell).value?.content },
        event.dateValue,
        startIndex,
        endIndex - startIndex + 1,
      )
      item.style.gridRow = String(index + 1)
      eventLayer.appendChild(item)
    })
    week.appendChild(eventLayer)
    weekRow.appendChild(week)
    grid.appendChild(weekRow)
  }

  scroll.appendChild(grid)
  wrapper.appendChild(scroll)
  return wrapper
}

const renderBody = (item: any, view: any, type: string) => {
  switch (type) {
    case "table":
      return renderTableBody(view)
    case "list":
      return renderListBody(view)
    case "gallery":
      return createGalleryBody(view)
    case "kanban":
      return createKanbanBody(view)
    case "calendar":
      return renderCalendarBody(view, "month")
    default:
      return null
  }
}

export const renderNativeView = (item: any, view: any, type: string) => {
  if (type === "calendar") {
    const container = tag("div")
    container.appendChild(renderCalendarBody(view, "month"))
    return container
  }
  const body = renderBody(item, view, type)
  if (!body) {
    return null
  }
  if (type === "gallery" || type === "kanban") {
    const container = tag("div")
    container.appendChild(body)
    return container
  }
  const scroll = tag("div", "av__scroll")
  scroll.appendChild(body)
  return scroll
}

const hasViewShape = (view: any, type: string) => {
  if (!view || typeof view !== "object") return false
  if (type === "gallery") return Array.isArray(view.cards)
  if (type === "kanban") return Array.isArray(view.groups)
  if (type === "calendar") return Boolean(view.calendar) || Array.isArray(view.rows)
  return Array.isArray(view.rows) && Array.isArray(view.columns)
}

const isEmptyView = (view: any, type: string) => {
  if (type === "gallery") return view.cards.length === 0
  if (type === "kanban") return !view.groups.some((group: any) => (group?.cards || []).length > 0)
  return (view.rows || []).length === 0
}

const renderInvalidView = (type: string) => {
  const empty = tag("div", "db-view-error")
  empty.setAttribute("role", "alert")
  empty.textContent = `数据库视图数据结构无效：${type}`
  empty.dataset.viewType = type
  return empty
}

const renderEmptyView = (type: string) => {
  const empty = tag("div", "db-view-empty")
  empty.setAttribute("role", "status")
  empty.setAttribute("aria-live", "polite")
  empty.textContent = "当前视图暂无数据"
  empty.dataset.viewType = type
  return empty
}

const enforceReadOnly = (target: HTMLElement) => {
  const writeSelectors = [
    '[data-type="av-add"]',
    '[data-type="av-add-more"]',
    '[data-type="av-add-template"]',
    '[data-type="av-row-update"]',
    '[data-type="av-row-more"]',
    '[data-type="av-header-more"]',
    '[data-type="av-header-add"]',
    '[data-type="av-gallery-edit"]',
    '[data-type="av-gallery-more"]',
    '[data-type="av-add-top"]',
    '[data-type="av-add-bottom"]',
    '[data-type="av-more"]',
    '[data-calendar-add]'
  ].join(",")
  target.querySelectorAll(writeSelectors).forEach((element) => element.remove())
  target.querySelectorAll('[draggable="true"]').forEach((element) => element.removeAttribute("draggable"))
}

export const mountNativeAv = (
  target: HTMLElement,
  item: any,
  options: { onFilter: (anchor: HTMLElement) => void; onSort: (anchor: HTMLElement) => void; onSearch: (query: string) => void; onActivate: (viewId: string) => void; onOpen?: (detail: any) => void; onCopy?: (text: string) => void },
) => {
  const currentViewId = item?.view?.id || item?.viewID || item?.order?.[0]
  const type = resolveViewType(item)
  target.className = "av"
  target.setAttribute("contenteditable", "false")
  target.setAttribute("data-readonly-sort", "")
  setAttrs(target, {
    "data-av-id": item?.id || "",
    "data-av-type": type,
    "data-type": "NodeAttributeView",
    "data-render": "true",
    "custom-sy-av-view": currentViewId,
    "custom-sy-av-visible-views": (item?.order || []).join(","),
  })
  target.dataset.viewType = type

  const header = createHeader(item, currentViewId, options.onFilter, options.onSort, options.onSearch, options.onActivate)
  const body = !hasViewShape(item?.view, type)
    ? renderInvalidView(type)
    : isEmptyView(item.view, type)
      ? renderEmptyView(type)
      : renderNativeView(item, item.view, type)
  const containerClass = type === "gallery" || type === "kanban" || type === "calendar"
    ? "av__container fn__block"
    : "av__container"
  const container = tag("div", containerClass)
  container.append(header, body || renderEmptyView(type))
  target.replaceChildren(container)
  enforceReadOnly(target)
  target.querySelectorAll('[data-type="copy"]').forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault()
      event.stopPropagation()
      const text = String((button as any).__copyText || "")
      options.onCopy?.(text)
    })
  })
  target.querySelectorAll('[data-type="av-row-open"]').forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault()
      event.stopPropagation()
      const blockId = (button as HTMLElement).dataset.blockId || ""
      const detail = (button as any).__detail || { record: { id: blockId }, fields: [], type: "row" }
      if (blockId || detail?.record) options.onOpen?.(detail)
    })
  })
  return target
}

export const valueToText = (cell: any) => {
  const resolved = resolveCell(cell)
  const value = resolved.value
  switch (resolved.valueType) {
    case "block":
      return value?.content || ""
    case "number":
      return value?.formattedContent || value?.content || ""
    case "date":
    case "created":
    case "updated":
      return dateText(value?.date || value?.created || value?.updated || value)
    case "select":
    case "mSelect": {
      const select = value?.select || value?.mSelect
      const items = Array.isArray(select) ? select : select ? [select] : []
      return items.map((item: any) => item.content || "").join(", ")
    }
    default:
      return value?.content || value?.text?.content || ""
  }
}

export const parseDataViews = (value: string) => JsonUtil.safeParse<any>(value, null)
