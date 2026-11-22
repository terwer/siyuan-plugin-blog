export type RecordField = { id: string; name: string; type: string; icon?: string }
type RecordCell = { keyID?: string; value?: any; valueType?: string; type?: string }
type RecordRow = { id: string; cells?: RecordCell[]; values?: RecordCell[] }
type RecordGroup = { fields?: RecordField[]; cards?: RecordRow[] }
type RecordView = { viewType: string; columns?: RecordField[]; rows?: RecordRow[]; fields?: RecordField[]; cards?: RecordRow[]; groups?: RecordGroup[] }

export type DatabaseRecordDetail = {
  id: string
  databaseName: string
  title: string
  fields: { field: RecordField; cell: RecordCell | undefined }[]
}

const cellKey = (cell?: RecordCell) => cell?.keyID || cell?.value?.keyID

export const readDatabaseRowCell = (row: RecordRow, columns: RecordField[], fieldId: string) => {
  const keyed = row.cells?.find(cell => cellKey(cell) === fieldId)
  if (keyed) return keyed
  const index = columns.findIndex(column => column.id === fieldId)
  const positional = index < 0 ? undefined : row.cells?.[index]
  // 早期表格快照可能没有字段标识，按该快照未折叠的原始列顺序读取。
  return positional && !cellKey(positional) ? positional : undefined
}

export const readDatabaseCardCell = (card: RecordRow, fieldId: string) => card.values?.find(cell => cellKey(cell) === fieldId)

type Source = { viewId: string; fields: RecordField[]; record: RecordRow; layout: "row" | "card" }

export const resolveDatabaseRecordDetail = (table: any, viewId: string, recordId: string): DatabaseRecordDetail | null => {
  if (!recordId) return null
  const sources: Source[] = []
  const ids = table.order as string[]
  const order = [...ids.filter(id => table[id]?.viewType === "table"), ...ids.filter(id => table[id]?.viewType !== "table")]
  for (const id of order) {
    const view: RecordView = table[id]
    if (!view) continue
    if (view.viewType === "table" || view.viewType === "list" || view.viewType === "calendar") {
      const record = view.rows?.find(row => row.id === recordId)
      if (record) sources.push({ viewId: id, fields: view.columns ?? [], record, layout: "row" })
    } else if (view.viewType === "gallery" || view.viewType === "kanban") {
      const collections = view.viewType === "kanban" ? view.groups ?? [] : [view]
      for (const collection of collections) {
        const record = collection.cards?.find(card => card.id === recordId)
        if (record) sources.push({ viewId: id, fields: collection.fields ?? view.fields ?? [], record, layout: "card" })
      }
    }
  }
  const fields = new Map<string, RecordField>()
  for (const source of sources) for (const field of source.fields) {
    if (field?.id && !fields.has(field.id)) fields.set(field.id, field)
  }
  if (!fields.size) return null

  // 同一条记录按字段 ID 汇集，当前视图已发布的值优先；字段顺序使用数据库的表格列顺序。
  const cells = new Map<string, RecordCell>()
  const preferred = [...sources.filter(source => source.viewId === viewId), ...sources.filter(source => source.viewId !== viewId)]
  for (const source of preferred) for (const field of source.fields) {
    if (!field?.id || cells.has(field.id)) continue
    const cell = source.layout === "row"
      ? readDatabaseRowCell(source.record, source.fields, field.id)
      : readDatabaseCardCell(source.record, field.id)
    if (cell) cells.set(field.id, cell)
  }
  const primary = [...fields.values()].find(field => field.type === "block")
  const primaryCell = primary ? cells.get(primary.id) : undefined
  const value = primaryCell?.value ?? primaryCell
  const title = value?.block?.content || value?.content || "未命名条目"
  return {
    id: recordId,
    databaseName: table.name || "未命名数据库",
    title,
    fields: [...fields.values()].map(field => ({ field, cell: cells.get(field.id) })),
  }
}
