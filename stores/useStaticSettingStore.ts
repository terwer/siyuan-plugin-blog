import AppConfig from "~/app.config"
import { createAppLogger } from "~/common/appLogger"
import { useSiyuanApi } from "~/composables/api/useSiyuanApi"
import { JsonUtil } from "zhi-common"

/**
 * 设置配置存储
 * https://pinia.vuejs.org/ssr/nuxt.html
 */
export const useStaticSettingStore = () => {
  const logger = createAppLogger("use-static-setting-store")
  const staticSettingFile = "static.app.config.json"
  const { kernelApi } = useSiyuanApi()

  const fetchText = async (fileUrl: string) => {
    const res = await fetch(fileUrl)
    return await res.text()
  }

  /**
   * 获取配置
   */
  const getStaticSetting = async (): Promise<typeof AppConfig> => {
    const shareTypeFetchFile = `/public/siyuan-blog/${staticSettingFile}`
    const resText = await fetchText(shareTypeFetchFile)
    logger.info("get static setting text from store", resText)
    const setting = JsonUtil.safeParse<typeof AppConfig>(resText, {} as typeof AppConfig)
    logger.info("get static setting from store", setting)
    return setting
  }

  /**
   * 修改配置
   *
   * @param setting - 需要修改的配置
   */
  const updateStaticSetting = async (setting: Partial<typeof AppConfig>) => {
    logger.info("update static setting=>", setting)
    const shareTypeFile = `/data/public/siyuan-blog/${staticSettingFile}`
    const sJson = JSON.stringify(setting) ?? "{}"
    await kernelApi.saveTextData(shareTypeFile, sJson)
    logger.info("inited static setting in public dir", sJson)
  }

  return { getStaticSetting, updateStaticSetting }
}
