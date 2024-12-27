/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import {computed, ref} from "vue"
import {useSiyuanApi} from "../composables/useSiyuanApi.ts"
import {createAppLogger} from "../utils/appLogger.ts"
import {useCommonStorageAsync} from "./common/useCommonStorageAsync.ts"
import {AppConfig} from "../app.config.ts";

/**
 * 设置配置存储
 * https://pinia.vuejs.org/ssr/nuxt.html
 */
export const useSettingStore = () => {
  const logger = createAppLogger("use-setting-store")
  const storageKey = "/data/public/siyuan-blog/static.app.config.json"
  const initialValue = AppConfig
  const {commonStore} = useCommonStorageAsync<typeof AppConfig>(storageKey, initialValue)
  const settingRef = ref<typeof AppConfig | null>(null)
  const {kernelApi} = useSiyuanApi()

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
      logger.info("Loaded setting from remote api")
      return setting ?? {} as typeof AppConfig
    }
    logger.info("Loaded setting from cached.")
    return settingRef.value ?? {} as typeof AppConfig
  }

  const updateSetting = async (setting: Partial<typeof AppConfig>) => {
    logger.info("update public setting=>", setting)
    // 设置额外信息
    const newSetting = (await setExtraSettingData(setting, setting)) as typeof AppConfig
    settingRef.value = {...settingRef.value, ...newSetting}
    await commonStore.set(newSetting)
  }

  const setExtraSettingData = async (setting: Partial<typeof AppConfig>, data: Record<string, unknown>) => {
    logger.info("update extra setting data=>", data)
    try {
      const customCss = await kernelApi.siyuanRequest("/api/snippet/getSnippet", {type: "css", enabled: 2})
      logger.info("get custom css", customCss)
      if (customCss.snippets) {
        setting.customCss = customCss.snippets
      }
    } catch (e) {
      logger.error("get custom css error", e)
    }
    return setting
  }

  return {getSetting, updateSetting}
}
