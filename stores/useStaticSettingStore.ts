import AppConfig from "~/app.config"
import { createAppLogger } from "~/common/appLogger"
import { useSiyuanApi } from "~/composables/api/useSiyuanApi"
import { JsonUtil } from "zhi-common"
import { useAuthModeFetch } from "~/composables/useAuthModeFetch"
import { useProviderMode } from "~/composables/useProviderMode"

/**
 * 设置配置存储
 * https://pinia.vuejs.org/ssr/nuxt.html
 */
export const useStaticSettingStore = () => {
  const logger = createAppLogger("use-static-setting-store")
  const staticSettingFile = "static.app.config.json"
  const { kernelApi } = useSiyuanApi()
  const env = useRuntimeConfig()
  const { fetchConfig } = useAuthModeFetch()
  const { providerMode } = useProviderMode()
  /**
   * 获取配置
   */
  const getStaticSetting = async (): Promise<typeof AppConfig> => {
    console.log("env.public", env.public)
    const resText = await fetchConfig(staticSettingFile, providerMode)
    logger.debug("get static setting text", resText)
    const setting = JsonUtil.safeParse<typeof AppConfig>(resText, {} as typeof AppConfig)
    logger.debug("get static setting from store", setting)
    return setting
  }

  /**
   * 修改配置
   *
   * @param setting - 需要修改的配置
   */
  const updateStaticSetting = async (setting: Partial<typeof AppConfig>) => {
    logger.debug("update static setting=>", setting)
    const settingFile = `/data/public/siyuan-blog/${staticSettingFile}`
    const sJson = JSON.stringify(setting) ?? "{}"
    await kernelApi.saveTextData(settingFile, sJson)
    logger.debug("inited static setting in public dir", sJson)
  }

  return { getStaticSetting, updateStaticSetting }
}
