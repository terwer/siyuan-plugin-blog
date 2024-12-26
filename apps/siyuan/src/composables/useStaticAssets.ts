import * as cheerio from "cheerio"
import {createAppLogger} from "../utils/appLogger.ts"
import {useSiyuanApi} from "./useSiyuanApi.ts"

export const useStaticAssets = () => {
  const logger = createAppLogger("use-static-assets")
  const {kernelApi} = useSiyuanApi()
  
  const downloadAssetsToPublic = async (html: string, saveFolder: string) => {
    try {
      const baseUrl = window.location.origin

      // 使用 cheerio 加载 HTML 代码
      const $ = cheerio.load(html)
      const images = $("img")
      for (const image of images) {
        const src = image.attribs["src"]
        const imageUrl = [baseUrl, src].join("/")
        const toFilepath = [saveFolder, src].join("/")
        logger.info(`download image ${imageUrl} to ${toFilepath}`)

        // eslint-disable-next-line no-await-in-loop
        const blob = await getImageBlob(imageUrl)
        // eslint-disable-next-line no-await-in-loop
        await kernelApi.putFile(`${toFilepath}`, new Blob([blob]))
      }
    } catch (e) {
      logger.error("download assets to public error, image will not show properly", e)
    }
  }

  // =========================================================================
  const getImageBlob = async (url: string) => {
    try {
      const response = await fetch(url)
      return await response.blob()
    } catch (e: any) {
      logger.error("image read error", e)
      return ""
    }
  }

  return {downloadAssetsToPublic}
}