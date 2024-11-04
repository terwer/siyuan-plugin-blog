import { defineStore } from "pinia"
import AppConfig from "~/app.config"
import { createAppLogger } from "~/common/appLogger"
import { useCommonStorageAsync } from "~/stores/common/useCommonStorageAsync"
import { useStaticSettingStore } from "~/stores/useStaticSettingStore"
import { useCommonShareType } from "~/composables/useCommonShareType"
import { useSiyuanApi } from "~/composables/api/useSiyuanApi"

/**
 * 设置配置存储
 * https://pinia.vuejs.org/ssr/nuxt.html
 */
export const useSettingStore = defineStore("setting", () => {
  const logger = createAppLogger("use-setting-store")
  const storageKey = "/data/storage/petal/siyuan-blog/app.config.json"
  const initialValue = AppConfig
  const { commonStore } = useCommonStorageAsync<typeof AppConfig>(storageKey, initialValue)
  const settingRef = ref<typeof AppConfig | null>(null)
  const { kernelApi } = useSiyuanApi()

  const { isPrivateShare } = useCommonShareType()
  const { updateStaticSetting } = useStaticSettingStore()

  const getSettingRef = computed(async () => {
    const setting = await commonStore.get()
    logger.info("get data from setting=>", setting)
    settingRef.value = setting
    return setting
  })

  /**
   * 获取配置
   */
  const getSetting = async (): Promise<typeof AppConfig> => {
    if (settingRef.value === null) {
      logger.info("Setting not initialized. Initializing now...")
      // 如果设置还没有被初始化，则调用 getSettingRef 函数
      const setting = getSettingRef.value
      logger.info(`Loaded setting from remote api`)
      return setting ?? {}
    }
    logger.info(`Loaded setting from cached.`)
    return settingRef.value ?? {}
  }

  const updatePublicSetting = async (setting: Partial<typeof AppConfig>) => {
    logger.info("update public setting=>", setting)
    await commonStore.set(setting)
  }

  const setExtraSettingData = async (setting: Partial<typeof AppConfig>, data: Record<string, unknown>) => {
    logger.info("update extra setting data=>", data)
    try {
      const customCss = await kernelApi.siyuanRequest("/api/snippet/getSnippet", { type: "css", enabled: 2 })
      logger.info("get custom css", customCss)
      if (customCss.snippets) {
        setting.customCss = customCss.snippets
      }
    } catch (e) {
      logger.error("get custom css error", e)
    }
    return setting
  }

  /**
   * 修改配置
   *
   * @param setting - 需要修改的配置
   */
  const updateSetting = async (setting: Partial<typeof AppConfig>) => {
    logger.info("update setting=>", setting)
    // 设置额外信息
    setting = await setExtraSettingData(setting, setting)
    settingRef.value = { ...settingRef.value, ...setting }

    const isPrivate = await isPrivateShare()
    if (isPrivate) {
      // 授权码模式写入配置
      await updateStaticSetting(setting)
    } else {
      await updatePublicSetting(setting)
    }
  }

  return { getSetting, updateSetting }
})
