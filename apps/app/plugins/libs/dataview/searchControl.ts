// 等待普通输入停顿；输入法候选词只有确认上屏后才进入搜索。
const QUERY_SETTLE_MS = 250

export const createDatabaseSearchControl = (
  icon: (name: string) => string,
  initialQuery: string,
  onSearch: (query: string) => void,
) => {
  const button = document.createElement("button")
  button.type = "button"
  button.className = "ariaLabel block__icon"
  button.dataset.type = "av-search-icon"
  button.dataset.position = "8south"
  button.setAttribute("aria-label", "搜索")
  button.innerHTML = icon("iconSearch")

  const search = document.createElement("div")
  search.className = "fn__flex av__search db-view-search"
  const input = document.createElement("div")
  input.className = "b3-text-field b3-text-field--text db-view-search-input"
  input.contentEditable = "plaintext-only"
  input.dataset.type = "av-search"
  input.setAttribute("role", "searchbox")
  input.setAttribute("aria-label", "搜索数据库")
  input.textContent = initialQuery
  const clear = document.createElement("button")
  clear.type = "button"
  clear.className = "b3-form__icon-clear db-view-search-clear"
  clear.setAttribute("aria-label", "清空搜索")
  clear.innerHTML = icon("iconCloseRound")
  search.append(input, clear)

  let composing = false
  let applied = initialQuery
  let pending: number | undefined
  const read = () => (input.textContent ?? "").trim()
  const showInput = (open: boolean) => {
    search.hidden = !open
    button.setAttribute("aria-expanded", String(open))
  }
  const refreshClear = () => { clear.hidden = !read() }
  const cancelPending = () => {
    window.clearTimeout(pending)
    pending = undefined
  }
  const commit = () => {
    const query = read()
    if (composing || !input.isConnected || query === applied) return
    applied = query
    onSearch(query)
  }
  const schedule = () => {
    cancelPending()
    refreshClear()
    pending = window.setTimeout(commit, QUERY_SETTLE_MS)
  }
  const open = () => {
    showInput(true)
    input.focus({ preventScroll: true })
  }

  showInput(Boolean(initialQuery))
  refreshClear()
  button.addEventListener("click", event => {
    event.preventDefault()
    event.stopPropagation()
    open()
  })
  input.addEventListener("compositionstart", () => {
    composing = true
    cancelPending()
  })
  const finishOnBlur = () => {
    if (composing) return
    if (!read()) showInput(false)
    cancelPending()
    refreshClear()
    commit()
  }
  input.addEventListener("compositionend", () => {
    composing = false
    if (document.activeElement === input) schedule()
    else finishOnBlur()
  })
  input.addEventListener("input", event => {
    if (!composing && !(event as InputEvent).isComposing) schedule()
  })
  input.addEventListener("beforeinput", event => {
    if (!composing && (event.inputType === "insertParagraph" || event.inputType === "insertLineBreak")) event.preventDefault()
  })
  input.addEventListener("keydown", event => {
    if (composing || event.isComposing) return
    if (event.key === "Enter") event.preventDefault()
    if (event.key === "Escape") {
      event.preventDefault()
      input.blur()
      button.focus({ preventScroll: true })
    }
  })
  input.addEventListener("blur", finishOnBlur)
  clear.addEventListener("pointerdown", event => event.preventDefault())
  clear.addEventListener("click", event => {
    event.stopPropagation()
    cancelPending()
    input.textContent = ""
    refreshClear()
    open()
    commit()
  })
  return { button, search }
}
