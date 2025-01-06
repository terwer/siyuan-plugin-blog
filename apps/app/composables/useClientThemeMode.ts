/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import { BrowserUtil } from "zhi-device"
import { useRoute } from "vue-router"
import { useColorMode } from "@vueuse/core"
import { HLJS_VERSION, SIYUAN_VERSION } from "~/utils/Constants"
import { useAppBase } from "~/composables/useAppBase"
import type AppConfig from "~/app.config"

// 创建日志记录器
const logger = createAppLogger("use-theme-mode")

/**
 * 注意：静态模式不能查询，只能通过参数传递进来
 */
export const useClientThemeMode = (setting: typeof AppConfig) => {
  // 获取颜色模式和运行时配置
  const { store } = useColorMode()
  const { query } = useRoute()
  const { appBase } = useAppBase()

  // 在 mounted 生命周期中处理加载后逻辑
  onBeforeMount(() => {
  })

  // computes
  // 获取颜色模式并暴露 computed 属性
  const colorMode = computed({
    get: () => {
      return store.value === "dark"
    },
    set: (value) => {
      store.value = value ? "dark" : "light"
    },
  })

  // methods
  // 切换暗黑模式
  const toggleDark = () => {
    colorMode.value = !colorMode.value
    setThemeMode()
  }

  const siyuanV = SIYUAN_VERSION
  const hljsV = HLJS_VERSION
  const siyuanLightTheme = (query.lightTheme ?? setting.theme?.lightTheme ?? "Zhihu") as string
  const siyuanDarkTheme = (query.darkTheme ?? setting.theme?.darkTheme ?? "Zhihu") as string
  const siyuanThemeV = (query.themeVersion ?? setting.theme?.themeVersion ?? "0.1.2") as string
  const isDarkMode = colorMode.value
  useHead({
    htmlAttrs: {
      lang: "zh_CN",
      "data-theme-mode": isDarkMode ? "dark" : "light",
      "data-light-theme": siyuanLightTheme,
      "data-dark-theme": siyuanDarkTheme,
    },
    link: [
      {
        rel: "stylesheet",
        id: "themeDefaultStyle",
        href: `${appBase}resources/appearance/themes/${isDarkMode ? "midnight" : "daylight"}/theme.css?v=${siyuanV}`,
      },
      ...(siyuanLightTheme !== "daylight" && siyuanDarkTheme !== "midlight"
        ? [
            {
              rel: "stylesheet",
              id: "themeStyle",
              href: `${appBase}resources/appearance/themes/${
              isDarkMode ? siyuanDarkTheme : siyuanLightTheme
            }/theme.css?v=${siyuanThemeV}`,
            },
          ]
        : []),
      {
        rel: "stylesheet",
        id: "protyleHljsStyle",
        href: `${appBase}resources/stage/protyle/js/highlight.js/styles/vs${
          isDarkMode ? "2015" : ""
        }.min.css?v=${hljsV}`,
      },
    ],
    style: [
      ...(setting.customCss
        ? setting.customCss.map((css: any) => ({
          id: css.name,
          children: css.content,
        }))
        : []),
    ],
  })

  // ==================================================
  // private methods
  // ==================================================
  // 设置主题模式
  const setThemeMode = () => {
    // 服务端不渲染
    if (BrowserUtil.isInBrowser) {
      const isDarkMode = store.value === "dark"
      setCssAndThemeMode(isDarkMode)
      // 记录日志
      logger.info(isDarkMode ? "Browser Dark Mode" : "Browser Light Mode")
    }
  }

  // 根据浏览器模式设置 CSS 和主题模式
  const setCssAndThemeMode = (isDarkMode: boolean) => {
    // 默认主题适配
    const themeDefaultStyle = document.querySelector("#themeDefaultStyle") as any
    if (themeDefaultStyle) {
      themeDefaultStyle.href =
        appBase + `resources/appearance/themes/${isDarkMode ? "midnight" : "daylight"}/theme.css?v=${siyuanV}`
    }

    // 当前主题适配
    const themeStyle = document.querySelector("#themeStyle") as any
    if (themeStyle) {
      themeStyle.href = `${appBase}resources/appearance/themes/${
        isDarkMode ? siyuanDarkTheme : siyuanLightTheme
      }/theme.css?v=${siyuanThemeV}`
    }

    // 代码块适配
    const protyleHljsStyle = document.querySelector("#protyleHljsStyle") as any
    if (protyleHljsStyle) {
      protyleHljsStyle.href =
        appBase + `resources/stage/protyle/js/highlight.js/styles/vs${isDarkMode ? "2015" : ""}.min.css?v=${hljsV}`
    }
    // 颜色模式属性
    document.documentElement.dataset.themeMode = isDarkMode ? "dark" : "light"

    // 自定义样式适配
    setCustomCss()
  }

  const setCustomCss = () => {
    // 自定义样式适配
    const customCss = setting.customCss
    if (customCss) {
      for (const css of customCss) {
        const style = document.createElement("style")
        style.id = css.name
        style.innerHTML = css.content
        document.head.appendChild(style)
      }
    }
  }

  return { colorMode, toggleDark }
}
