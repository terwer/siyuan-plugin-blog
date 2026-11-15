import * as cheerio from "cheerio"
import { providerAssetUrl } from "./viewerUrls"

/** Normalize only render-time legacy references, never persisted document data. */
export const documentMedia = <T extends Record<string, any>>(post: T, publicBase: string): T => {
  const rendered = structuredClone(post)
  const $ = cheerio.load(rendered.editorDom ?? "", {}, false)
  $("img").each((_, image) => {
    const src = $(image).attr("src") ?? ""
    const url = providerAssetUrl(src, publicBase)
    if (url !== src) $(image).attr("src", url)
  })
  rendered.editorDom = $.html()
  const visit = (value: any) => {
    if (!value || typeof value !== "object") return
    if (value.valueType === "mAsset" && Array.isArray(value.value?.mAsset)) {
      for (const asset of value.value.mAsset) {
        if (asset.type === "image") asset.content = providerAssetUrl(asset.content ?? "", publicBase)
      }
    }
    for (const child of Object.values(value)) if (child && typeof child === "object") visit(child)
  }
  visit(rendered.dataViews)
  return rendered
}
