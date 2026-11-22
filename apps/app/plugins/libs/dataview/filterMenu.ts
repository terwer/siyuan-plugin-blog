import { filterNeedsValue, type FilterField, type FilterGroup, type FilterOperator, type ViewFilter } from "~/utils/databaseViewFilter"
import { fieldIcon, icon } from "./native"

type MenuChoice = { label: string; icon?: string; action: () => void }
const isDateField = (field: FilterField) => ["date", "created", "updated"].includes(field.type)

export const openDatabaseFilterMenu = (
  anchor: HTMLButtonElement,
  getAnchor: () => HTMLButtonElement | null,
  fields: FilterField[],
  root: FilterGroup,
  onChange: () => void,
  onClose: () => void,
) => {
  const zh = document.documentElement.lang.toLowerCase().startsWith("zh")
  const t = (cn: string, en: string) => zh ? cn : en
  const label = t("筛选", "Filter")
  const operators: Record<FilterOperator, string> = {
    contains: t("包含", "Contains"), notContains: t("不包含", "Does not contain"),
    equals: t("等于", "Equals"), notEquals: t("不等于", "Does not equal"),
    gt: t("大于", "Greater than"), gte: t("大于等于", "At least"), lt: t("小于", "Less than"), lte: t("小于等于", "At most"),
    before: t("早于", "Before"), after: t("晚于", "After"), empty: t("为空", "Is empty"), notEmpty: t("不为空", "Is not empty"),
  }
  const menu = document.createElement("div")
  menu.className = "b3-menu db-view-filter db-view-filter-menu"
  menu.setAttribute("popover", "manual")
  menu.setAttribute("role", "dialog")
  menu.setAttribute("aria-label", label)
  const lifecycle = new AbortController()
  let popup: HTMLElement | null = null
  let popupAnchor: HTMLElement | null = null
  let focusNewValue = false

  const makeButton = (text: string, className: string, symbol?: string) => {
    const button = document.createElement("button")
    button.type = "button"
    button.className = className
    if (symbol) {
      const graphic = document.createElement("span")
      graphic.className = "db-view-filter-icon"
      graphic.setAttribute("aria-hidden", "true")
      graphic.innerHTML = icon(symbol)
      button.appendChild(graphic)
    }
    if (text) button.appendChild(document.createTextNode(text))
    return button
  }
  const position = () => {
    const rect = (getAnchor() || anchor).getBoundingClientRect()
    menu.style.left = `${Math.max(8, Math.min(rect.right - menu.offsetWidth, innerWidth - menu.offsetWidth - 8))}px`
    menu.style.top = `${Math.max(8, rect.bottom + 4 + menu.offsetHeight <= innerHeight - 8 ? rect.bottom + 4 : rect.top - 4 - menu.offsetHeight)}px`
  }
  const closePopup = (focus = false) => {
    popup?.remove()
    popup = null
    popupAnchor?.setAttribute("aria-expanded", "false")
    if (focus) popupAnchor?.focus()
    popupAnchor = null
  }
  const dispose = (focus = false) => {
    closePopup()
    lifecycle.abort()
    menu.remove()
    const button = getAnchor()
    button?.setAttribute("aria-expanded", "false")
    if (focus) button?.focus()
    onClose()
  }
  const showChoices = (trigger: HTMLButtonElement, name: string, choices: MenuChoice[]) => {
    closePopup()
    popupAnchor = trigger
    trigger.setAttribute("aria-expanded", "true")
    const list = document.createElement("div")
    popup = list
    list.className = "b3-menu db-view-filter-picker"
    list.setAttribute("popover", "manual")
    list.setAttribute("role", "group")
    list.setAttribute("aria-label", name)
    for (const { label, icon: symbol, action } of choices) {
      const button = makeButton(label, "b3-menu__item db-view-filter-choice", symbol)
      button.addEventListener("click", () => { closePopup(); action() })
      list.appendChild(button)
    }
    document.body.appendChild(list)
    list.showPopover()
    const rect = trigger.getBoundingClientRect()
    list.style.left = `${Math.max(8, Math.min(rect.left, innerWidth - list.offsetWidth - 8))}px`
    list.style.top = `${Math.max(8, rect.bottom + list.offsetHeight <= innerHeight - 8 ? rect.bottom : rect.top - list.offsetHeight)}px`
    list.querySelector("button")?.focus({ preventScroll: true })
  }
  const dropdown = (text: string, accessibleName: string, action: (button: HTMLButtonElement) => void, symbol?: string, menuItem = false) => {
    const button = makeButton(text, menuItem ? "b3-menu__item db-view-filter-choice" : "b3-text-field db-view-filter-select", symbol)
    const arrow = document.createElement("span")
    arrow.className = "db-view-filter-icon"
    arrow.setAttribute("aria-hidden", "true")
    arrow.innerHTML = icon("iconDown")
    button.appendChild(arrow)
    button.setAttribute("aria-label", accessibleName)
    button.setAttribute("aria-expanded", "false")
    button.addEventListener("click", () => popupAnchor === button ? closePopup(true) : action(button))
    return button
  }
  const refresh = () => {
    onChange()
    getAnchor()?.setAttribute("aria-expanded", "true")
    render()
  }
  const chooseField = (button: HTMLButtonElement, choose: (field: FilterField) => void) => showChoices(button, t("选择字段", "Choose a field"), fields.map(field => ({
    label: field.name, icon: fieldIcon(field), action: () => choose(field),
  })))
  const newRule = (field: FilterField): ViewFilter => ({ fieldId: field.id, operator: field.operators[0], query: "" })
  const setChoice = <T extends string>(button: HTMLButtonElement, name: string, options: [T, string][], set: (value: T) => void) => {
    showChoices(button, name, options.map(([value, label]) => ({ label, action: () => { set(value); refresh() } })))
  }
  const renderGroup = (group: FilterGroup): HTMLElement => {
    const container = document.createElement("div")
    container.className = "db-view-filter-rules"
    group.rules.forEach((rule, index) => {
      const row = document.createElement("div")
      row.className = "db-view-filter-rule"
      if (index === 0) {
        const when = document.createElement("span")
        when.textContent = t("当", "When")
        row.appendChild(when)
      } else if (index === 1) {
        const choices: [FilterGroup["join"], string][] = [["and", t("且", "And")], ["or", t("或", "Or")]]
        row.appendChild(dropdown(choices.find(([id]) => id === group.join)![1], t("连接方式", "Match conditions"), button => setChoice(button, t("连接方式", "Match conditions"), choices, join => { group.join = join })))
      } else {
        const conjunction = document.createElement("span")
        conjunction.textContent = group.join === "and" ? t("且", "And") : t("或", "Or")
        row.appendChild(conjunction)
      }
      const controls = document.createElement("div")
      controls.className = "db-view-filter-controls"
      if ("kind" in rule) {
        const nested = renderGroup(rule)
        nested.classList.add("db-view-filter-group")
        controls.appendChild(nested)
      } else {
        const field = fields.find(field => field.id === rule.fieldId)
        if (!field) return
        controls.appendChild(dropdown(field.name, `${t("字段", "Field")}：${field.name}`, button => chooseField(button, selected => {
          group.rules[index] = newRule(selected)
          focusNewValue = true
          refresh()
        }), fieldIcon(field)))
        if (isDateField(field)) {
          const datePart: [NonNullable<ViewFilter["datePart"]>, string][] = [["start", t("开始时间", "Start date")], ["end", t("结束时间", "End date")]]
          const dateMode: [NonNullable<ViewFilter["dateMode"]>, string][] = [["specific", t("具体时间", "Specific date")], ["relative", t("相对时间", "Relative date")]]
          if (field.type === "date") controls.appendChild(dropdown(rule.datePart === "end" ? datePart[1][1] : datePart[0][1], t("日期范围", "Date endpoint"), button => setChoice(button, t("日期范围", "Date endpoint"), datePart, value => { rule.datePart = value })))
          if (filterNeedsValue(rule.operator)) controls.appendChild(dropdown(rule.dateMode === "relative" ? dateMode[1][1] : dateMode[0][1], t("时间类型", "Date type"), button => setChoice(button, t("时间类型", "Date type"), dateMode, value => { rule.dateMode = value; rule.query = "" })))
        }
        controls.appendChild(dropdown(operators[rule.operator], t("条件", "Operator"), button => setChoice(button, t("条件", "Operator"), field.operators.map(operator => [operator, operators[operator]]), operator => { rule.operator = operator })))
        if (filterNeedsValue(rule.operator)) {
          const input = document.createElement("input")
          const relative = isDateField(field) && rule.dateMode === "relative"
          input.className = "b3-text-field db-view-filter-value-input"
          input.type = isDateField(field) && !relative ? "date" : field.type === "number" || relative ? "number" : "text"
          if (input.type === "number") input.step = relative ? "1" : "any"
          input.value = rule.query
          input.setAttribute("aria-label", t("筛选值", "Filter value") + `：${field.name}`)
          if (relative) input.placeholder = t("相对今天的天数（0 为今天）", "Days from today (0 = today)")
          input.addEventListener("input", () => { rule.query = input.value; onChange(); getAnchor()?.setAttribute("aria-expanded", "true") })
          controls.appendChild(input)
          if (focusNewValue && rule.query === "") {
            focusNewValue = false
            queueMicrotask(() => input.focus({ preventScroll: true }))
          }
        }
      }
      const remove = makeButton("", "block__icon db-view-filter-remove", "iconTrashcan")
      remove.setAttribute("aria-label", t("删除条件", "Remove condition"))
      remove.addEventListener("click", () => { group.rules.splice(index, 1); refresh() })
      row.append(controls, remove)
      container.appendChild(row)
    })
    if (fields.length) {
      const addRuleLabel = t("添加筛选条件", "Add filter condition")
      const addGroupLabel = t("添加筛选条件分组", "Add filter group")
      container.appendChild(dropdown(addRuleLabel, addRuleLabel, button => showChoices(button, addRuleLabel, [
        { label: addRuleLabel, icon: "iconAdd", action: () => chooseField(button, field => { group.rules.push(newRule(field)); focusNewValue = true; refresh() }) },
        { label: addGroupLabel, icon: "iconList", action: () => { group.rules.push({ kind: "group", join: "and", rules: [] }); refresh() } },
      ]), "iconAdd", true))
    }
    return container
  }
  const render = () => {
    const heading = document.createElement("div")
    heading.className = "db-view-filter-heading"
    const back = makeButton("", "block__icon", "iconLeft")
    back.setAttribute("aria-label", t("关闭筛选", "Close filter"))
    back.addEventListener("click", () => dispose(true))
    const title = document.createElement("span")
    title.textContent = label
    heading.append(back, title)
    const body = document.createElement("div")
    body.className = "b3-menu__items db-view-filter-body"
    body.appendChild(renderGroup(root))
    if (root.rules.length) {
      const clear = makeButton(t("清空筛选规则", "Clear filters"), "b3-menu__item db-view-filter-choice", "iconTrashcan")
      clear.addEventListener("click", () => { root.rules.length = 0; refresh(); menu.querySelector<HTMLButtonElement>('.db-view-filter-rules button')?.focus() })
      body.appendChild(clear)
    }
    const status = document.createElement("p")
    status.className = "db-view-filter-status"
    status.setAttribute("role", "status")
    status.setAttribute("aria-live", "polite")
    if (!fields.length) status.textContent = t("当前视图没有可筛选的字段", "No filterable fields in this view")
    body.appendChild(status)
    menu.replaceChildren(heading, body)
    position()
  }
  anchor.setAttribute("aria-expanded", "true")
  document.body.appendChild(menu)
  menu.showPopover()
  render()
  menu.querySelector<HTMLButtonElement>(".db-view-filter-rules button, .db-view-filter-heading button")?.focus({ preventScroll: true })
  document.addEventListener("pointerdown", event => {
    const target = event.target as Node
    if (getAnchor()?.contains(target)) return
    if (menu.contains(target)) { if (popup && !popupAnchor?.contains(target)) closePopup(); return }
    if (!popup?.contains(target)) dispose()
  }, { signal: lifecycle.signal })
  document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return
    event.preventDefault()
    if (popup) closePopup(true)
    else dispose(true)
  }, { signal: lifecycle.signal })
  window.addEventListener("resize", () => { closePopup(); position() }, { signal: lifecycle.signal })
  window.addEventListener("scroll", () => { closePopup(); position() }, { signal: lifecycle.signal })
  return dispose
}
