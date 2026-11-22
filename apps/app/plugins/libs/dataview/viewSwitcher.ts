import { icon } from "./native"

export type AvViewOption = { id: string; name: string; iconName: string; type: string; pageSize?: number; desc?: string }

export const openDatabaseViewSwitcher = (
  anchor: HTMLButtonElement,
  views: AvViewOption[],
  activeId: string,
  onSelect: (id: string) => void,
  onClose: () => void,
) => {
  const menu = document.createElement("div")
  menu.className = "b3-menu db-view-switcher"
  menu.setAttribute("popover", "manual")
  menu.setAttribute("role", "dialog")
  menu.setAttribute("aria-label", "切换视图")
  const lifecycle = new AbortController()
  const position = () => {
    const rect = anchor.getBoundingClientRect()
    const below = rect.bottom + 4
    const above = rect.top - menu.offsetHeight - 4
    menu.style.left = `${Math.max(8, Math.min(rect.left, innerWidth - menu.offsetWidth - 8))}px`
    menu.style.top = `${Math.max(8, Math.min(below + menu.offsetHeight <= innerHeight - 8 || above < 8 ? below : above, innerHeight - menu.offsetHeight - 8))}px`
  }
  const dispose = (focus = false) => {
    lifecycle.abort()
    menu.remove()
    anchor.setAttribute("aria-expanded", "false")
    if (focus && anchor.isConnected) anchor.focus({ preventScroll: true })
    onClose()
  }
  const input = document.createElement("input")
  input.type = "search"
  input.className = "b3-text-field db-view-switcher-search"
  input.setAttribute("aria-label", "搜索视图")
  input.placeholder = "搜索…"
  const title = document.createElement("div")
  title.className = "db-view-switcher-heading"
  title.textContent = "显示视图"
  const entries = document.createElement("div")
  entries.className = "b3-menu__items db-view-switcher-items"
  const empty = document.createElement("p")
  empty.className = "db-view-filter-status"
  empty.textContent = "没有匹配的视图"
  empty.setAttribute("role", "status")
  empty.hidden = true
  const buttons = views.map(view => {
    const button = document.createElement("button")
    button.type = "button"
    button.dataset.viewId = view.id
    button.className = "b3-menu__item db-view-switcher-item"
    if (view.id === activeId) {
      button.classList.add("b3-menu__item--current")
      button.setAttribute("aria-current", "true")
    }
    button.innerHTML = icon(view.iconName)
    const name = document.createElement("span")
    name.className = "b3-menu__label fn__ellipsis"
    name.textContent = view.name
    button.appendChild(name)
    button.addEventListener("click", () => {
      dispose()
      onSelect(view.id)
    })
    entries.appendChild(button)
    return { button, name: view.name.toLocaleLowerCase() }
  })
  const filter = () => {
    const query = input.value.trim().toLocaleLowerCase()
    for (const { button, name } of buttons) button.hidden = !name.includes(query)
    empty.hidden = buttons.some(({ button }) => !button.hidden)
    position()
  }
  input.addEventListener("input", event => { if (!(event as InputEvent).isComposing) filter() })
  input.addEventListener("compositionend", filter)
  menu.addEventListener("keydown", event => {
    if (event.isComposing || !["ArrowDown", "ArrowUp", "Enter"].includes(event.key)) return
    const visible = buttons.filter(({ button }) => !button.hidden)
    if (!visible.length) return
    const current = visible.findIndex(({ button }) => button === document.activeElement)
    if (event.key === "Enter") {
      if (current >= 0) {
        event.preventDefault()
        visible[current].button.click()
      }
      return
    }
    if (current < 0 && event.key === "ArrowUp") return
    event.preventDefault()
    const next = current + (event.key === "ArrowDown" ? 1 : -1)
    if (next < 0) input.focus()
    else visible[Math.min(next, visible.length - 1)].button.focus()
  })
  menu.append(input, title, entries, empty)
  anchor.setAttribute("aria-expanded", "true")
  document.body.appendChild(menu)
  menu.showPopover()
  position()
  input.focus({ preventScroll: true })
  document.addEventListener("pointerdown", event => {
    if (!menu.contains(event.target as Node) && !anchor.contains(event.target as Node)) dispose()
  }, { signal: lifecycle.signal })
  document.addEventListener("keydown", event => {
    if (event.isComposing || event.key !== "Escape" || event.defaultPrevented) return
    event.preventDefault()
    dispose(true)
  }, { signal: lifecycle.signal })
  window.addEventListener("resize", position, { signal: lifecycle.signal })
  window.addEventListener("scroll", position, { signal: lifecycle.signal, passive: true })
  return dispose
}
