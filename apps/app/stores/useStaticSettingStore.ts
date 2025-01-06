import { JsonUtil } from "zhi-common"
import AppConfig from "~/app.config"
import { useAuthModeFetch } from "~/composables/useAuthModeFetch"
import { useProviderMode } from "~/composables/useProviderMode"

/**
 * 设置配置存储
 * https://pinia.vuejs.org/ssr/nuxt.html
 */
export const useStaticSettingStore = () => {
  const logger = createAppLogger("use-static-setting-store")
  const staticSettingFile = "static.app.config.json"
  const { fetchConfig } = useAuthModeFetch()
  const { providerMode } = useProviderMode()
  /**
   * 获取配置
   */
  const getStaticSetting = async (): Promise<typeof AppConfig> => {
    const resText = await fetchConfig(staticSettingFile, providerMode)
    logger.debug("get static setting text", resText)
    const setting = JsonUtil.safeParse<typeof AppConfig>(resText, {} as typeof AppConfig)
    logger.debug("get static setting from store", setting)
    return setting
  }

  return { getStaticSetting }
}
