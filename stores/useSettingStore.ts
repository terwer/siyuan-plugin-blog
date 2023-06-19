import { defineStore } from "pinia"
import AppConfig from "~/app.config"
import { createAppLogger } from "~/common/appLogger"
import { useCommonStorageAsync } from "~/stores/common/useCommonStorageAsync"

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

  /**
   * 修改配置
   *
   * @param setting - 需要修改的配置
   */
  const updateSetting = async (setting: Partial<typeof AppConfig>) => {
    logger.info("update setting=>", setting)
    await commonStore.set(setting)
    settingRef.value = { ...settingRef.value, ...setting }
  }

  return { getSetting, updateSetting }
})
