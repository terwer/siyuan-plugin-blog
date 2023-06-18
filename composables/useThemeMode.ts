/*
 * Copyright (c) 2023, Terwer . All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Terwer designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Terwer in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Terwer, Shenzhen, Guangdong, China, youweics@163.com
 * or visit www.terwer.space if you need additional information or have any
 * questions.
 */

import { BrowserUtil } from "zhi-device"
import { createAppLogger } from "~/common/appLogger"
import { useSettingStore } from "~/stores/useSettingStore"
import AppConfig from "~/app.config"

export const useThemeMode = async () => {
  // 创建日志记录器
  const logger = createAppLogger("use-theme-mode")
  // 获取颜色模式和运行时配置
  const color = useColorMode()
  const env = useRuntimeConfig()
  const { getSetting, updateSetting } = useSettingStore()

  // 在 mounted 生命周期中设置主题模式
  onMounted(() => {
    const isDark = color.value === "dark"
    setThemeMode(isDark, true)
  })

  // =============================================================================================================
  // Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(),
  // make sure to register lifecycle hooks before the first await statement
  // =============================================================================================================
  const setting = await getSetting()

  // 根据浏览器模式设置 CSS 和主题模式
  const setCssAndThemeMode = (isDarkMode: boolean) => {
    const version = "11.5.0"
    const protyleHljsStyle = document.querySelector("#protyleHljsStyle") as any
    protyleHljsStyle.href = `${process.env.APP_BASE}resources/stage/protyle/js/highlight.js/styles/vs${
      isDarkMode ? "2015" : ""
    }.min.css?v=${version}`
    document.documentElement.dataset.themeMode = isDarkMode ? "dark" : "light"
  }

  // 设置主题模式
  const setThemeMode = (isDarkMode: boolean, isDelay = false) => {
    // 更新前端
    if (BrowserUtil.isInBrowser) {
      // 使用 setTimeout 确保在 CSS 加载完成后再执行函数
      const waitTime = parseInt(env.public.waitTime ?? 500)
      if (isDelay) {
        setTimeout(() => {
          setCssAndThemeMode(isDarkMode)
          // 记录日志
          logger.debug(isDarkMode ? "Browser Dark Mode" : "Browser Light Mode")
          logger.info(`Auto set mode, isDark => ${isDarkMode}`)
        }, waitTime)
      } else {
        setCssAndThemeMode(isDarkMode)
        // 记录日志
        logger.debug(isDarkMode ? "Browser Dark Mode" : "Browser Light Mode")
        logger.info(`Auto set mode, isDark => ${isDarkMode}`)
      }
    }
    color.preference = isDarkMode ? "dark" : "light"
  }

  // 获取颜色模式并暴露 computed 属性
  const colorMode = computed({
    get: () => {
      return color.value === "dark"
    },
    set: (value) => {
      setThemeMode(value)
    },
  })

  // 切换暗黑模式
  const toggleDark = async () => {
    colorMode.value = !colorMode.value

    // 更新用户设置
    const newSetting: typeof AppConfig = {
      ...setting,
      ...{
        theme: {
          mode: colorMode.value ? "dark" : "light",
        },
      },
    }
    await updateSetting(newSetting)
  }

  useHead({
    htmlAttrs: {
      "data-theme-mode": setting.theme?.mode,
      "data-light-theme": setting.theme?.lightTheme,
      "data-dark-theme": setting.theme?.darkTheme,
    },
  })

  return { colorMode, toggleDark }
}
