import type { SortField, ViewSort } from "~/utils/databaseViewFilter"
import { icon } from "./native"

type SortOption = readonly [string, string]

export const openDatabaseSortMenu = (
  anchor: HTMLButtonElement,
  getAnchor: () => HTMLButtonElement | null,
  fields: SortField[],
  rules: ViewSort[],
  onChange: () => void,
  onClose: () => void,
) => {
  const zh = document.documentElement.lang.toLowerCase().startsWith("zh")
  const t = (cn: string, en: string) => zh ? cn : en
  const title = t("排序", "Sort")
  const menu = document.createElement("div")
  menu.className = "b3-menu db-view-sort-menu"
  menu.setAttribute("popover", "manual")
  menu.setAttribute("role", "dialog")
  menu.setAttribute("aria-label", title)
  const lifecycle = new AbortController()
  const fieldById = new Map(fields.map(field => [field.id, field]))
  const handles: HTMLButtonElement[] = []
  let dropRow: HTMLElement | null = null
  let grab: { pointerId: number; index: number; startY: number; to: number } | null = null

  const button = (className: string, text: string, symbol: string) => {
    const element = document.createElement("button")
    element.type = "button"
    element.className = className
    element.innerHTML = icon(symbol)
    if (text) element.append(document.createTextNode(text))
    return element
  }
  const select = (className: string, label: string, options: SortOption[], value: string, change: (value: string) => void) => {
    const element = document.createElement("select")
    element.className = `b3-select ${className}`
    element.setAttribute("aria-label", label)
    for (const [id, name] of options) element.add(new Option(name, id))
    element.value = value
    element.addEventListener("change", () => change(element.value))
    return element
  }
  const position = () => {
    const r = (getAnchor() ?? anchor).getBoundingClientRect()
    menu.style.left = `${Math.max(8, Math.min(r.right, innerWidth - 8) - menu.offsetWidth)}px`
    const below = r.bottom + 4
    const above = r.top - 4 - menu.offsetHeight
    menu.style.top = `${Math.max(8, Math.min(below + menu.offsetHeight <= innerHeight - 8 || above < 8 ? below : above, innerHeight - menu.offsetHeight - 8))}px`
  }
  const dispose = (restoreFocus = false) => {
    lifecycle.abort()
    menu.remove()
    const updated = getAnchor()
    updated?.setAttribute("aria-expanded", "false")
    if (restoreFocus) updated?.focus({ preventScroll: true })
    onClose()
  }
  const update = () => {
    onChange()
    getAnchor()?.setAttribute("aria-expanded", "true")
    position()
  }
  const reorder = (from: number, to: number) => {
    if (to < 0 || to >= rules.length || to === from) return
    const [rule] = rules.splice(from, 1)
    rules.splice(to, 0, rule)
    update()
    render()
    handles[to]?.focus({ preventScroll: true })
  }
  const endDrag = (id: number, commit: boolean) => {
    if (grab?.pointerId !== id) return
    const { index, to } = grab
    dropRow?.removeAttribute("data-sort-drop")
    dropRow = null
    grab = null
    if (commit) reorder(index, to)
  }

  const render = () => {
    handles.length = 0
    const heading = document.createElement("div")
    heading.className = "db-view-filter-heading"
    const back = button("block__icon", "", "iconLeft")
    back.setAttribute("aria-label", t("关闭排序", "Close sort"))
    back.addEventListener("click", () => dispose(true))
    const caption = document.createElement("span")
    caption.textContent = title
    heading.append(back, caption)
    const items = document.createElement("div")
    items.className = "b3-menu__items db-view-sort-items"
    const fieldOptions: SortOption[] = fields.map(field => [field.id, field.name])
    const directions: SortOption[] = [["asc", t("升序", "Ascending")], ["desc", t("降序", "Descending")]]
    const dates: SortOption[] = [["start", t("开始时间", "Start date")], ["end", t("结束时间", "End date")]]

    rules.forEach((rule, index) => {
      const row = document.createElement("div")
      const isDate = fieldById.get(rule.fieldId)?.type === "date"
      row.dataset.sortIndex = String(index)
      row.className = "db-view-sort-row" + (isDate ? " db-view-sort-row--date" : "")
      const handle = button("block__icon db-view-sort-handle", "", "iconDrag")
      handle.setAttribute("aria-label", t(`调整第 ${index + 1} 条排序优先级`, `Reorder sort rule ${index + 1}`))
      handle.setAttribute("aria-keyshortcuts", "ArrowUp ArrowDown")
      if (rules.length > 1) {
        handle.addEventListener("keydown", (e) => {
          if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return
          e.preventDefault()
          reorder(index, index + (e.key === "ArrowUp" ? -1 : 1))
        })
        handle.addEventListener("pointerdown", (e) => {
          if (!e.isPrimary || e.button !== 0) return
          grab = { pointerId: e.pointerId, index, startY: e.clientY, to: index }
          handle.setPointerCapture(e.pointerId)
        })
        handle.addEventListener("pointermove", (e) => {
          if (grab?.pointerId !== e.pointerId || Math.abs(e.clientY - grab.startY) < 4) return
          const target = document.elementFromPoint(e.clientX, e.clientY)?.closest<HTMLElement>("[data-sort-index]")
          if (!target || !menu.contains(target)) return
          const to = Number(target.dataset.sortIndex)
          dropRow?.removeAttribute("data-sort-drop")
          dropRow = to === index ? null : target
          dropRow?.setAttribute("data-sort-drop", to < index ? "before" : "after")
          grab.to = to
        })
        handle.addEventListener("pointerup", (e) => endDrag(e.pointerId, true))
        handle.addEventListener("pointercancel", (e) => endDrag(e.pointerId, false))
        handle.addEventListener("lostpointercapture", (e) => endDrag(e.pointerId, false))
      } else {
        handle.disabled = true
      }
      handles.push(handle)
      const controls = document.createElement("div")
      controls.className = "db-view-sort-controls"
      const available = fieldOptions.filter(([id]) => id === rule.fieldId || !rules.some(other => other.fieldId === id && other !== rule))
      const field = select("db-view-sort-field", t("排序字段", "Sort field"), available, rule.fieldId, (value) => {
        rule.fieldId = value
        delete rule.datePart
        update()
        render()
        menu.querySelectorAll<HTMLSelectElement>(".db-view-sort-field")[index]?.focus({ preventScroll: true })
      })
      controls.appendChild(field)
      if (isDate) controls.appendChild(select("db-view-sort-date", t("日期端点", "Date endpoint"), dates, rule.datePart ?? "start", (value) => {
        rule.datePart = value === "end" ? "end" : "start"
        update()
      }))
      controls.appendChild(select("db-view-sort-direction", t("排序方向", "Sort direction"), directions, rule.direction, (value) => {
        rule.direction = value === "desc" ? "desc" : "asc"
        update()
      }))
      const remove = button("block__icon db-view-sort-remove", "", "iconTrashcan")
      remove.setAttribute("aria-label", t(`删除第 ${index + 1} 条排序条件`, `Remove sort rule ${index + 1}`))
      remove.addEventListener("click", () => {
        rules.splice(index, 1)
        update()
        render()
        const next = menu.querySelectorAll<HTMLSelectElement>(".db-view-sort-field")[Math.min(index, rules.length - 1)]
        ;(next ?? menu.querySelector<HTMLButtonElement>(".db-view-sort-add"))?.focus({ preventScroll: true })
      })
      row.append(handle, controls, remove)
      items.appendChild(row)
    })
    const unused = fields.find(field => !rules.some(rule => rule.fieldId === field.id))
    const add = button("b3-menu__item db-view-sort-action db-view-sort-add", t("添加排序条件", "Add sort condition"), "iconAdd")
    add.disabled = !unused
    add.addEventListener("click", () => {
      if (!unused) return
      rules.push({ fieldId: unused.id, direction: "asc" })
      update()
      render()
      menu.querySelectorAll<HTMLSelectElement>(".db-view-sort-field")[rules.length - 1]?.focus({ preventScroll: true })
    })
    items.appendChild(add)
    if (rules.length) {
      const clear = button("b3-menu__item db-view-sort-action", t("清空排序规则", "Clear sort rules"), "iconTrashcan")
      clear.addEventListener("click", () => {
        rules.length = 0
        update()
        render()
        menu.querySelector<HTMLButtonElement>(".db-view-sort-add")?.focus({ preventScroll: true })
      })
      items.appendChild(clear)
    } else if (!fields.length) {
      const status = document.createElement("p")
      status.className = "db-view-filter-status"
      status.textContent = t("当前视图没有可排序的字段", "This view has no sortable fields")
      items.appendChild(status)
    }
    menu.replaceChildren(heading, items)
    position()
  }

  anchor.setAttribute("aria-expanded", "true")
  document.body.appendChild(menu)
  menu.showPopover()
  render()
  menu.querySelector<HTMLButtonElement>(".db-view-sort-add:not(:disabled), .db-view-filter-heading button")?.focus({ preventScroll: true })
  document.addEventListener("pointerdown", (event) => {
    if (!menu.contains(event.target as Node) && !getAnchor()?.contains(event.target as Node)) dispose()
  }, { signal: lifecycle.signal })
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || event.defaultPrevented) return
    event.preventDefault()
    dispose(true)
  }, { signal: lifecycle.signal })
  window.addEventListener("resize", position, { signal: lifecycle.signal })
  window.addEventListener("scroll", position, { signal: lifecycle.signal, passive: true })
  return dispose
}
