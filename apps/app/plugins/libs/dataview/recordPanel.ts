import type { DatabaseRecordDetail } from "~/utils/databaseRecordDetail"
import { fieldIcon, icon, renderCellValue } from "./native"

export const openDatabaseRecordPanel = (
  detail: DatabaseRecordDetail,
  opener: HTMLElement,
  onClose: () => void,
  prepareAssets: (panel: HTMLElement) => void,
) => {
  const panel = document.createElement("aside")
  panel.className = "db-view-detail protyle-db-row"
  panel.setAttribute("role", "dialog")
  panel.setAttribute("aria-labelledby", "db-view-detail-title")
  panel.setAttribute("popover", "manual")
  panel.dataset.recordId = detail.id
  panel.dataset.pageId = opener.closest<HTMLElement>("[data-page-id]")?.dataset.pageId ?? ""
  const lifecycle = new AbortController()
  const dispose = (restoreFocus = false) => {
    lifecycle.abort()
    panel.remove()
    if (restoreFocus && opener.isConnected) opener.focus({ preventScroll: true })
    onClose()
  }
  const header = document.createElement("header")
  header.className = "db-view-detail-header"
  const title = document.createElement("h2")
  title.id = "db-view-detail-title"
  title.className = "protyle-db-row__title"
  title.innerHTML = icon("iconDatabase")
  title.append(document.createTextNode(detail.title))
  const close = document.createElement("button")
  close.type = "button"
  close.className = "block__icon db-view-detail-close"
  close.setAttribute("aria-label", "关闭详情")
  close.innerHTML = icon("iconCloseRound")
  close.addEventListener("click", () => dispose(true))
  header.append(title, close)

  const body = document.createElement("section")
  body.className = "db-view-detail-body"
  const database = document.createElement("div")
  database.className = "db-view-detail-database"
  database.innerHTML = icon("iconDatabase")
  database.append(document.createTextNode(detail.databaseName))
  body.appendChild(database)

  const properties = document.createElement("dl")
  for (const { field, cell } of detail.fields) {
    const property = document.createElement("div")
    property.className = "db-view-detail-field"
    property.dataset.fieldId = field.id
    const label = document.createElement("dt")
    label.className = "db-view-detail-label"
    label.innerHTML = icon(fieldIcon(field))
    label.append(document.createTextNode(field.name))
    const content = document.createElement("dd")
    content.className = "db-view-detail-value"
    if (!renderCellValue(content, cell, field, false)) {
      content.textContent = "—"
      content.setAttribute("data-empty", "true")
    }
    property.append(label, content)
    properties.appendChild(property)
  }
  body.appendChild(properties)
  panel.append(header, body)
  document.body.appendChild(panel)
  prepareAssets(panel)
  panel.showPopover()
  close.focus({ preventScroll: true })
  document.addEventListener("keydown", event => {
    if (event.key !== "Escape" || event.defaultPrevented) return
    event.preventDefault()
    dispose(true)
  }, { signal: lifecycle.signal })
  return dispose
}
