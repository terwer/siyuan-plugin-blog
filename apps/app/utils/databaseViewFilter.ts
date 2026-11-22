export type FilterOperator = "contains" | "equals" | "gt" | "gte" | "lt" | "lte" | "before" | "after" | "notContains" | "notEquals" | "empty" | "notEmpty"
export type DatabaseViewType = "table" | "list" | "gallery" | "kanban" | "calendar"

export type ViewFilter = {
  fieldId: string
  operator: FilterOperator
  query: string
  datePart?: "start" | "end"
  dateMode?: "specific" | "relative"
}

export type FilterGroup = {
  kind: "group"
  join: "and" | "or"
  rules: (ViewFilter | FilterGroup)[]
}

export type ViewSort = {
  fieldId: string
  direction: "asc" | "desc"
  datePart?: "start" | "end"
}

export type FilterField = {
  id: string
  name: string
  type: string
  operators: FilterOperator[]
  icon?: string
}

const textOperators: FilterOperator[] = ["contains", "notContains", "equals", "notEquals", "empty", "notEmpty"]
const numberOperators: FilterOperator[] = ["equals", "notEquals", "gt", "gte", "lt", "lte", "empty", "notEmpty"]
const dateOperators: FilterOperator[] = ["equals", "notEquals", "before", "after", "empty", "notEmpty"]

export const operatorsForCellType = (type: string): FilterOperator[] => {
  switch (type) {
    case "number":
      return numberOperators
    case "date":
    case "created":
    case "updated":
      return dateOperators
    case "text":
    case "block":
    case "url":
    case "email":
    case "phone":
    case "template":
    case "select":
    case "mSelect":
      return textOperators
    default:
      return []
  }
}

export const getFilterFields = (view: any, type: DatabaseViewType): FilterField[] => {
  const source = type === "gallery" || type === "kanban" ? view?.fields : view?.columns
  return (source || [])
    .filter((field: any) => field && field.id)
    .map((field: any) => ({
      id: field.id,
      name: field.name || field.id,
      type: field.type || "text",
      operators: operatorsForCellType(field.type),
      icon: field.icon,
    }))
    .filter((field: FilterField) => field.operators.length > 0)
}

const selectText = (value: any): string => {
  if (Array.isArray(value)) {
    return value.map((item) => selectText(item)).filter(Boolean).join(", ")
  }
  if (value == null) {
    return ""
  }
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value)
  }
  return String(value.content ?? value.name ?? value.text?.content ?? "")
}

export const normalizeCellValue = (cell: any): string | number | boolean | null => {
  const value = cell?.value ?? cell
  switch (cell?.valueType ?? value?.type) {
    case "number":
      return value?.number?.isNotEmpty === false || value?.number?.content == null ? null : Number(value.number.content)
    case "date":
      return value?.date?.isNotEmpty === false || value?.date?.content == null ? null : Number(value.date.content)
    case "created":
      return value?.created?.content == null ? null : Number(value.created.content)
    case "updated":
      return value?.updated?.content == null ? null : Number(value.updated.content)
    case "checkbox":
      return Boolean(value?.checkbox?.checked)
    case "select":
      return selectText(value?.select) || null
    case "mSelect":
      return selectText(value?.mSelect) || null
    case "block":
      return value?.block?.content ?? value?.content ?? null
    case "text":
      return value?.text?.content || null
    case "url":
      return value?.url?.content || null
    case "email":
      return value?.email?.content || null
    case "phone":
      return value?.phone?.content || null
    case "template":
      return value?.template?.content || null
    case "mAsset":
      return selectText(value?.mAsset) || null
    default:
      return null
  }
}

const compareNumber = (left: number, right: number, operator: FilterOperator): boolean => {
  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    return false
  }
  switch (operator) {
    case "equals":
      return left === right
    case "notEquals":
      return left !== right
    case "gt":
      return left > right
    case "gte":
      return left >= right
    case "lt":
      return left < right
    case "lte":
      return left <= right
    default:
      return false
  }
}

export const filterNeedsValue = (operator: FilterOperator) => operator !== "empty" && operator !== "notEmpty"
const isEmptyValue = (value: unknown) => value == null || value === "" || (typeof value === "number" && !Number.isFinite(value))

export const matchesCell = (cell: any, operator: FilterOperator, query: string): boolean => {
  const value = normalizeCellValue(cell)
  if (operator === "empty") return isEmptyValue(value)
  if (operator === "notEmpty") return !isEmptyValue(value)
  if (isEmptyValue(value) || !query.trim()) return false
  if (typeof value === "number") return compareNumber(value, Number(query), operator)
  const text = String(value).toLowerCase()
  const target = query.trim().toLowerCase()
  if (operator === "contains") return text.includes(target)
  if (operator === "notContains") return !text.includes(target)
  if (operator === "equals") return text === target
  if (operator === "notEquals") return text !== target
  return false
}

const localDay = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`

export const matchesDate = (cell: any, operator: FilterOperator, query: string, datePart = "start", dateMode = "specific"): boolean => {
  const source = cell?.value ?? cell
  const value = datePart === "end" ? (source?.date?.hasEndDate ? source.date.content2 : null) : normalizeCellValue(cell)
  if (operator === "empty") return isEmptyValue(value)
  if (operator === "notEmpty") return !isEmptyValue(value)
  if (isEmptyValue(value)) return false
  const date = new Date(Number(value))
  if (!Number.isFinite(date.getTime())) return false
  let target = query
  if (dateMode === "relative") {
    if (!/^-?\d+$/.test(query)) return false
    const today = new Date()
    today.setDate(today.getDate() + Number(query))
    if (!Number.isFinite(today.getTime())) return false
    target = localDay(today)
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(target)) return false
  const day = localDay(date)
  if (operator === "equals") return day === target
  if (operator === "notEquals") return day !== target
  if (operator === "before") return day < target
  if (operator === "after") return day > target
  return false
}

const findRowCell = (row: any, view: any, fieldId: string) => {
  const direct = (row?.cells || []).find((cell: any) => cell?.value?.keyID === fieldId || cell?.keyID === fieldId)
  if (direct) {
    return direct
  }
  const index = (view?.columns || []).findIndex((column: any) => column.id === fieldId)
  return index >= 0 ? row?.cells?.[index] : null
}

const findCardCell = (card: any, fieldId: string) => {
  return (card?.values || []).find((cell: any) => cell?.value?.keyID === fieldId || cell?.keyID === fieldId) || null
}

const compileFilter = (root: ViewFilter | FilterGroup, fields: Map<string, FilterField>): ((cell: (id: string) => any) => boolean) | null => {
  if ("kind" in root) {
    const rules = root.rules.map(rule => compileFilter(rule, fields)).filter(rule => rule !== null)
    if (!rules.length) return null
    return getCell => root.join === "and" ? rules.every(rule => rule(getCell)) : rules.some(rule => rule(getCell))
  }
  const field = fields.get(root.fieldId)
  if (!field?.operators.includes(root.operator) || (filterNeedsValue(root.operator) && !root.query.trim())) return null
  if (["date", "created", "updated"].includes(field.type)) {
    return getCell => matchesDate(getCell(field.id), root.operator, root.query, root.datePart, root.dateMode)
  }
  return getCell => matchesCell(getCell(field.id), root.operator, root.query)
}

export const filterViewSnapshot = (view: any, type: DatabaseViewType, filter: ViewFilter | FilterGroup | null): any => {
  if (!filter) return view
  const match = compileFilter(filter, new Map(getFilterFields(view, type).map(field => [field.id, field])))
  if (!match) return view
  if (type === "table" || type === "list" || type === "calendar") {
    return { ...view, rows: (view?.rows || []).filter((row: any) => match(id => findRowCell(row, view, id))) }
  }
  const filterCards = (cards: any[]) => cards.filter(card => match(id => findCardCell(card, id)))
  if (type === "gallery") return { ...view, cards: filterCards(view?.cards || []) }
  if (type === "kanban") return {
    ...view, groups: (view?.groups || []).map((group: any) => ({ ...group, cards: filterCards(group?.cards || []) })),
  }
  return view
}

export const resultCount = (view: any, type: DatabaseViewType): number => {
  if (type === "gallery") return view?.cards?.length || 0
  if (type === "kanban") return (view?.groups || []).reduce((total: number, group: any) => total + (group.cards?.length || 0), 0)
  return view?.rows?.length || 0
}

export type SortField = { id: string; name: string; type: string }

export const getSortFields = (view: any, type: DatabaseViewType): SortField[] => {
  const source: SortField[] = (type === "gallery" || type === "kanban" ? view?.fields : view?.columns) || []
  const supported = source.filter(field => field?.id && (operatorsForCellType(field.type).length > 0 || field.type === "checkbox"))
  return [...supported.filter(field => field.type === "block"), ...supported.filter(field => field.type !== "block")]
}

const sortCollator = new Intl.Collator("zh-CN", { numeric: true, sensitivity: "base" })

const sortValue = (cell: any, rule: ViewSort, field: SortField) => {
  if (field.type === "date" && rule.datePart === "end") {
    const date = (cell?.value ?? cell)?.date
    return date?.hasEndDate && date.content2 != null ? Number(date.content2) : null
  }
  return normalizeCellValue(cell)
}

const compareSortValues = (
  left: string | number | boolean | null, right: string | number | boolean | null, direction: ViewSort["direction"],
): number => {
  if (isEmptyValue(left)) return isEmptyValue(right) ? 0 : 1
  if (isEmptyValue(right)) return -1
  const difference = typeof left === "number" && typeof right === "number" || typeof left === "boolean" && typeof right === "boolean"
    ? Number(left) - Number(right)
    : sortCollator.compare(String(left), String(right))
  return direction === "desc" ? -difference : difference
}

const matchesSearch = (cell: any, query: string): boolean => {
  const value = normalizeCellValue(cell)
  return value != null && String(value).toLocaleLowerCase().includes(query.toLocaleLowerCase())
}

const rowMatchesSearch = (row: any, query: string): boolean => (row?.cells || []).some((cell: any) => matchesSearch(cell, query))
const cardMatchesSearch = (card: any, query: string): boolean => (card?.values || []).some((cell: any) => matchesSearch(cell, query))

export const searchViewSnapshot = (view: any, type: DatabaseViewType, query: string): any => {
  const normalized = String(query || "").trim()
  if (!normalized) return view
  if (type === "table" || type === "list" || type === "calendar") {
    return { ...view, rows: (view?.rows || []).filter((row: any) => rowMatchesSearch(row, normalized)) }
  }
  if (type === "gallery") {
    return { ...view, cards: (view?.cards || []).filter((card: any) => cardMatchesSearch(card, normalized)) }
  }
  if (type === "kanban") {
    return {
      ...view,
      groups: (view?.groups || []).map((group: any) => ({
        ...group,
        cards: (group?.cards || []).filter((card: any) => cardMatchesSearch(card, normalized)),
      })),
    }
  }
  return view
}

export const sortViewSnapshot = (view: any, type: DatabaseViewType, sorts: readonly ViewSort[]): any => {
  if (!sorts.length) return view
  const fields = new Map(getSortFields(view, type).map(field => [field.id, field]))
  const active = sorts.flatMap(rule => {
    const field = fields.get(rule.fieldId)
    return field ? [{ rule, field }] : []
  })
  if (!active.length) return view

  const sortItems = (items: any[], resolve: (item: any, fieldId: string) => any) => items
    .map((item, index) => ({ item, index, values: active.map(({ rule, field }) => sortValue(resolve(item, field.id), rule, field)) }))
    .sort((left, right) => {
      for (let index = 0; index < active.length; index++) {
        const result = compareSortValues(left.values[index], right.values[index], active[index].rule.direction)
        if (result) return result
      }
      return left.index - right.index
    })
    .map(result => result.item)

  if (type === "table" || type === "list" || type === "calendar") {
    return { ...view, rows: sortItems(view?.rows || [], (row, fieldId) => findRowCell(row, view, fieldId)) }
  }
  if (type === "gallery") return { ...view, cards: sortItems(view?.cards || [], findCardCell) }
  if (type === "kanban") return {
    ...view, groups: (view?.groups || []).map((group: any) => ({ ...group, cards: sortItems(group?.cards || [], findCardCell) })),
  }
  return view
}
