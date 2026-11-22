type ViewType = "table" | "list" | "gallery" | "kanban" | "calendar"

const escapeHtml = (value: unknown) => String(value ?? "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#39;")

export const normalizeDataTable = (value: any, id: string) => {
  if (value && Array.isArray(value.order)) {
    const ids: string[] = [...new Set<string>(value.order)].filter(viewId => value[viewId] && typeof value[viewId] === "object")
    if (!ids.length) return null
    const metadata = ids.map(viewId => value[viewId]).find(entry => Array.isArray(entry.views))?.views
    const orderedIds: string[] = Array.isArray(metadata)
      ? metadata.map(view => view.id).filter(viewId => ids.includes(viewId))
      : []
    const order = [...new Set([...orderedIds, ...ids])]
    const first = value[order[0]]
    const name = value.name ?? (first.view ? first.name : "") ?? ""
    const normalized = { ...value, order, name }
    for (const viewId of order) {
      const entry = value[viewId]
      const wrapped = entry.view && typeof entry.view === "object"
      const view = wrapped ? entry.view : entry
      const meta = metadata?.find((candidate: any) => candidate.id === viewId)
      normalized[viewId] = {
        ...view,
        id: viewId,
        viewType: entry.viewType || view.viewType || meta?.type || view.type,
        name: meta?.name ?? view.name,
        desc: meta?.desc ?? view.desc,
      }
    }
    return normalized
  }
  if (value && value.viewType === "table" && Array.isArray(value.columns) && Array.isArray(value.rows)) {
    const viewId = String(value.viewID || value.id || `${id}:legacy-table`)
    const meta = value.views?.find?.((item: any) => item.id === viewId)
    return { order: [viewId], name: value.name, [viewId]: { ...value, id: viewId, name: meta?.name } }
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
  const title = table.name || "未命名数据库"
  const viewCount = table.order.length
  return `<div class="db-view-ssr-placeholder" data-db-ssr-placeholder="true" role="img" aria-label="数据库：${escapeHtml(title)}"><span class="db-view-ssr-placeholder-icon" aria-hidden="true">▦</span><span class="db-view-ssr-placeholder-content"><strong>数据库</strong><span>${escapeHtml(title)}</span><small>${viewCount} 个视图 · ${escapeHtml(viewLabel(firstView))}</small></span></div>`
}

export const renderDatabaseViewsSsr = (html: string, dataViews: any) => {
  if (!html || !dataViews || typeof dataViews !== "object") return html
  let output = html
  for (const [id, raw] of Object.entries(dataViews)) {
    const table = normalizeDataTable(raw, id)
    if (!table) continue
    const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    // 只替换数据库的空内容槽，保留块外层和属性栏的原始层级。
    const pattern = new RegExp(`(<div\\b[^>]*\\sdata-av-id="${escaped}"[^>]*>\\s*)<div\\b[^>]*>\\s*</div>(?=\\s*<div class="protyle-attr")`)
    output = output.replace(pattern, (_, opening) => `${opening}${renderDatabasePlaceholder(table)}`)
  }
  return output
}
