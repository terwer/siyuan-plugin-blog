export type FilterOperator = "contains" | "equals" | "gt" | "gte" | "lt" | "lte" | "before" | "after"
export type DatabaseViewType = "table" | "list" | "gallery" | "kanban" | "calendar"

export type ViewFilter = {
  fieldId: string
  operator: FilterOperator
  query: string
}

export type ViewSort = {
  fieldId: string
  direction: "asc" | "desc"
}

export type FilterField = {
  id: string
  name: string
  type: string
  operators: FilterOperator[]
}

const textOperators: FilterOperator[] = ["contains", "equals"]
const numberOperators: FilterOperator[] = ["equals", "gt", "gte", "lt", "lte"]
const dateOperators: FilterOperator[] = ["equals", "before", "after"]

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
      return value?.number?.isNotEmpty === false ? null : Number(value?.number?.content ?? 0)
    case "date":
      return value?.date?.isNotEmpty === false ? null : Number(value?.date?.content ?? 0)
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
      return value?.block?.content || null
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

const normalizeQuery = (operator: FilterOperator, query: string): string | number | boolean | null => {
  if (query == null || String(query).trim() === "") {
    return null
  }
  if (operator === "equals" || operator === "gt" || operator === "gte" || operator === "lt" || operator === "lte") {
    const number = Number(query)
    return Number.isFinite(number) && String(number) === String(Number(query)) ? number : query
  }
  return query
}

const compareNumber = (left: number, right: number, operator: FilterOperator): boolean => {
  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    return false
  }
  switch (operator) {
    case "equals":
    case "eq":
      return left === right
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

export const matchesCell = (cell: any, operator: FilterOperator, query: string): boolean => {
  const value = normalizeCellValue(cell)
  if (value == null || query == null || String(query).trim() === "") {
    return false
  }
  if (typeof value === "number") {
    const numberQuery = Number(query)
    if (!Number.isFinite(numberQuery)) {
      return false
    }
    if (operator === "equals" || operator === "gt" || operator === "gte" || operator === "lt" || operator === "lte") {
      return compareNumber(value, numberQuery, operator)
    }
  }
  const text = String(value).toLowerCase()
  const target = String(query).trim().toLowerCase()
  if (operator === "contains") {
    return text.includes(target)
  }
  if (operator === "equals") {
    return text === target || Number(text) === Number(target)
  }
  if (operator === "before" || operator === "after") {
    return false
  }
  return false
}

export const matchesDate = (cell: any, operator: FilterOperator, query: string): boolean => {
  const value = normalizeCellValue(cell)
  const dateValue = typeof value === "number" ? value : Date.parse(String(query))
  const dateQuery = Date.parse(`${query}T00:00:00Z`)
  if (!Number.isFinite(dateValue) || !Number.isFinite(dateQuery)) {
    return false
  }
  if (operator === "equals") {
    return new Date(dateValue).toISOString().slice(0, 10) === new Date(dateQuery).toISOString().slice(0, 10)
  }
  if (operator === "before") {
    return dateValue < dateQuery
  }
  if (operator === "after") {
    return dateValue > dateQuery
  }
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

const matchesTypedCell = (cell: any, field: FilterField, filter: ViewFilter): boolean => {
  if (field.type === "date" || field.type === "created" || field.type === "updated") {
    return matchesDate(cell, filter.operator, filter.query)
  }
  return matchesCell(cell, filter.operator, filter.query)
}

export const filterViewSnapshot = (view: any, type: DatabaseViewType, filter: ViewFilter | null): any => {
  if (!filter || !filter.fieldId || !filter.query) {
    return view
  }
  const field = getFilterFields(view, type).find((item) => item.id === filter.fieldId)
  if (!field || !field.operators.includes(filter.operator)) {
    return view
  }
  if (type === "table" || type === "list" || type === "calendar") {
    return { ...view, rows: (view?.rows || []).filter((row: any) => matchesTypedCell(findRowCell(row, view, field.id), field, filter)) }
  }
  if (type === "gallery") {
    return { ...view, cards: (view?.cards || []).filter((card: any) => matchesTypedCell(findCardCell(card, field.id), field, filter)) }
  }
  if (type === "kanban") {
    return {
      ...view,
      groups: (view?.groups || []).map((group: any) => ({
        ...group,
        cards: (group?.cards || []).filter((card: any) => matchesTypedCell(findCardCell(card, field.id), field, filter)),
      })),
    }
  }
  return view
}

export const resultCount = (view: any, type: DatabaseViewType): number => {
  if (type === "gallery") return view?.cards?.length || 0
  if (type === "kanban") return (view?.groups || []).reduce((total: number, group: any) => total + (group.cards?.length || 0), 0)
  return view?.rows?.length || 0
}

const compareSortValues = (left: any, right: any): number => {
  const leftValue = normalizeCellValue(left)
  const rightValue = normalizeCellValue(right)
  if (leftValue == null && rightValue == null) return 0
  if (leftValue == null) return 1
  if (rightValue == null) return -1
  if (typeof leftValue === "number" && typeof rightValue === "number") return leftValue - rightValue
  return String(leftValue).localeCompare(String(rightValue), "zh-CN", { numeric: true, sensitivity: "base" })
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

export const sortViewSnapshot = (view: any, type: DatabaseViewType, sort: ViewSort | null): any => {
  if (!sort?.fieldId) return view
  const fields = type === "gallery" || type === "kanban" ? view?.fields || [] : view?.columns || []
  const fieldIndex = fields.findIndex((field: any) => field?.id === sort.fieldId)
  if (fieldIndex < 0) return view
  const compare = (left: any, right: any) => {
    const leftCell = left?.cells?.[fieldIndex] || findCardCell(left, sort.fieldId)
    const rightCell = right?.cells?.[fieldIndex] || findCardCell(right, sort.fieldId)
    const result = compareSortValues(leftCell, rightCell)
    return sort.direction === "desc" ? -result : result
  }
  if (type === "table" || type === "list" || type === "calendar") {
    return { ...view, rows: [...(view?.rows || [])].sort(compare) }
  }
  if (type === "gallery") {
    return { ...view, cards: [...(view?.cards || [])].sort(compare) }
  }
  if (type === "kanban") {
    return { ...view, groups: (view?.groups || []).map((group: any) => ({ ...group, cards: [...(group?.cards || [])].sort(compare) })) }
  }
  return view
}
