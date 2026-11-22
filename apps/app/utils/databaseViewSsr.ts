type ViewType = "table" | "list" | "gallery" | "kanban" | "calendar"

const escapeHtml = (value: unknown) => String(value ?? "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#39;")

const cellValue = (cell: any): any => cell?.value !== undefined ? cell.value : cell
const cellText = (cell: any): string => {
  const value = cellValue(cell)
  if (!value) return ""
  const type = cell?.valueType || value?.valueType
  if (type === "number") return String(value?.number?.formattedContent ?? value?.number?.content ?? value?.content ?? "")
  if (type === "date" || type === "created" || type === "updated") return String(value?.date?.formattedContent ?? value?.date?.content ?? value?.content ?? "")
  if (type === "select" || type === "mSelect") {
    const values = value?.select || value?.mSelect || value
    return Array.isArray(values) ? values.map((item: any) => item?.content || "").join(", ") : String(values?.content || "")
  }
  if (type === "mAsset") return (value?.mAsset || []).map((item: any) => item?.name || item?.content || "").join(", ")
  return String(value?.text?.content ?? value?.content ?? value?.block?.content ?? "")
}

const fieldName = (field: any, index: number) => field?.name || field?.content || `字段 ${index + 1}`
const tableColumns = (view: any) => (view?.columns || []).filter((field: any) => !field?.hidden)
const renderTable = (view: any) => {
  const columns = tableColumns(view)
  const rows = view?.rows || []
  if (!rows.length) return '<div class="db-view-empty" role="status">当前视图暂无数据</div>'
  return `<div class="av__scroll"><div class="av__body db-ssr-table"><div class="av__row av__row--header"><div class="av__colsticky"></div>${columns.map((field: any, index: number) => `<div class="av__cell av__cell--header" data-col-id="${escapeHtml(field?.id)}"><span class="av__celltext">${escapeHtml(fieldName(field, index))}</span></div>`).join("")}</div>${rows.map((row: any) => `<div class="av__row" data-id="${escapeHtml(row?.id)}"><div class="av__colsticky"></div>${columns.map((field: any) => { const index=(view?.columns || []).findIndex((item: any) => item?.id===field?.id); return `<div class="av__cell" data-col-id="${escapeHtml(field?.id)}"><span class="av__celltext">${escapeHtml(cellText(row?.cells?.[index]))}</span></div>` }).join("")}</div>`).join("")}</div></div>`
}
const renderList = (view: any) => renderTable(view)
const renderGallery = (view: any) => {
  const fields=view?.fields || []
  const cards=view?.cards || []
  if (!cards.length) return '<div class="db-view-empty" role="status">当前视图暂无数据</div>'
  return `<div class="av__body"><div class="av__gallery">${cards.map((card: any) => `<article class="av__gallery-item" data-id="${escapeHtml(card?.id)}">${fields.map((field: any, index: number) => { const value=(card?.values || []).find((item: any) => item?.keyID===field?.id || item?.value?.keyID===field?.id); return `<div class="av__gallery-field"><span class="av__celltext">${escapeHtml(cellText(value))}</span></div>` }).join("")}</article>`).join("")}</div></div>`
}
const renderKanban = (view: any) => {
  const groups=view?.groups || []
  if (!groups.length) return '<div class="db-view-empty" role="status">当前视图暂无数据</div>'
  return `<div class="av__body"><div class="av__kanban">${groups.map((group: any) => `<section class="av__kanban-group"><div class="av__group-title"><span class="av__group-name">${escapeHtml(group?.name || group?.groupValue?.text?.content || "未分组")}</span></div><div class="av__gallery av__gallery--small">${(group?.cards || []).map((card: any) => `<article class="av__gallery-item" data-id="${escapeHtml(card?.id)}">${escapeHtml(card?.name || card?.title || "")}</article>`).join("")}</div></section>`).join("")}</div></div>`
}
const renderCalendar = (view: any) => {
  const rows=view?.rows || []
  if (!rows.length) return '<div class="db-view-empty" role="status">当前视图暂无数据</div>'
  return renderTable(view)
}
const renderView = (view: any, type: ViewType) => type === "list" ? renderList(view) : type === "gallery" ? renderGallery(view) : type === "kanban" ? renderKanban(view) : type === "calendar" ? renderCalendar(view) : renderTable(view)
const normalizeTable = (value: any, id: string) => {
  if (value && Array.isArray(value.order)) {
    const normalized = { ...value }
    value.order.forEach((viewId: string) => {
      const entry = value[viewId]
      if (!entry || typeof entry !== "object") return
      const view = entry.view && typeof entry.view === "object" ? entry.view : entry
      normalized[viewId] = {
        ...view,
        id: entry.viewID || view.id || viewId,
        viewType: entry.viewType || view.viewType || view.type,
        name: entry.name || view.name,
        desc: entry.desc || view.desc,
      }
    })
    return normalized
  }
  if (value && value.viewType === "table" && Array.isArray(value.columns) && Array.isArray(value.rows)) {
    const viewId=String(value.viewID || value.id || `${id}:legacy-table`)
    return { order:[viewId], [viewId]:value }
  }
  return null
}
const renderDatabase = (table: any) => {
  const firstId=table.order[0]
  const view=table[firstId]
  const type=(view?.viewType || "table") as ViewType
  const tabs=table.order.map((id: string) => `<span class="layout-tab-bar item${id===firstId ? " item--focus" : ""}" data-av-type="${escapeHtml(table[id]?.viewType || "unknown")}">${escapeHtml(table[id]?.name || table[id]?.viewType || "视图")}</span>`).join("")
  return `<div class="av__header"><div class="fn__flex av__views"><div class="layout-tab-bar fn__flex">${tabs}</div><div class="fn__space"></div><span class="block__icon" aria-label="筛选">筛选</span><span class="block__icon" aria-label="搜索">搜索</span></div><div class="av__title" contenteditable="false" data-readonly-title="true">${escapeHtml(view?.name || "未命名数据库")}</div></div>${renderView(view,type)}`
}
export const renderDatabaseViewsSsr = (html: string, dataViews: any) => {
  if (!html || !dataViews || typeof dataViews !== "object") return html
  let output=html
  for (const [id, raw] of Object.entries(dataViews)) {
    const table=normalizeTable(raw,id)
    if (!table) continue
    const escaped=id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    const pattern=new RegExp(`(<div[^>]*data-av-id="${escaped}"[^>]*>)([\\s\\S]*?)(</div>\\s*<div class="protyle-attr")`)
    output=output.replace(pattern, `$1${renderDatabase(table)}$3`)
  }
  return output
}
