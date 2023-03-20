import Showdown from "showdown"

const converter = new Showdown.Converter()

/**
 * 渲染Markdown
 * @param md
 */
export function renderHTML(md: string) {
  return converter.makeHtml(md)
}
