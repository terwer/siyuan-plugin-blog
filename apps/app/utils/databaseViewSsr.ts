type ViewType = "table" | "list" | "gallery" | "kanban" | "calendar"

const escapeHtml = (value: unknown) => String(value ?? "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#39;")

/**
 * 只识别当前 share-pro 1.19.0 的多视图快照，以及上线前的旧单表快照。
 * SSR 不把数据库内部表格直接拼进正文，避免首屏出现未加载思源样式的裸表格。
 */
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
    const viewId = String(value.viewID || value.id || `${id}:legacy-table`)
    return { order: [viewId], [viewId]: value }
  }
  return null
}

const viewLabel = (view: any) => {
  const type = String(view?.viewType || view?.type || "数据库视图")
  const labels: Record<string, string> = {
    table: "表格",
    list: "列表",
    gallery: "卡片",
    kanban: "看板",
    calendar: "日历",
  }
  return labels[type] || "数据库视图"
}

const renderDatabasePlaceholder = (table: any) => {
  const firstView = table[table.order[0]] || {}
  const title = firstView.name || "未命名数据库"
  const viewCount = table.order.length
  return `<div class="db-view-ssr-placeholder" data-db-ssr-placeholder="true" role="img" aria-label="数据库：${escapeHtml(title)}"><span class="db-view-ssr-placeholder-icon" aria-hidden="true">▦</span><span class="db-view-ssr-placeholder-content"><strong>数据库</strong><span>${escapeHtml(title)}</span><small>${viewCount} 个视图 · ${escapeHtml(viewLabel(firstView))}</small></span></div>`
}

export const renderDatabaseViewsSsr = (html: string, dataViews: any) => {
  if (!html || !dataViews || typeof dataViews !== "object") return html
  let output = html
  for (const [id, raw] of Object.entries(dataViews)) {
    const table = normalizeTable(raw, id)
    if (!table) continue
    const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    const pattern = new RegExp(`(<div[^>]*data-av-id="${escaped}"[^>]*>)[\\s\\S]*?(</div>\\s*<div class="protyle-attr")`)
    output = output.replace(pattern, `$1${renderDatabasePlaceholder(table)}$2`)
  }
  return output
}
