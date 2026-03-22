/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import { useColorMode } from "@vueuse/core"
import { useRoute } from "vue-router"
import { BrowserUtil } from "zhi-device"
import type AppConfig from "~/app.config"
import { useAppBase } from "~/composables/useAppBase"
import { HLJS_VERSION, SIYUAN_VERSION } from "~/utils/Constants"

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
    // 处理 auto 模式：检测系统主题并设置实际值
    if (store.value === "auto") {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      const actualMode = systemPrefersDark ? "dark" : "light"
      // 将 auto 转换为实际的 light/dark
      store.value = actualMode
      logger.info("Auto mode detected, setting to:", actualMode)
      // 刷新页面以应用新主题
      window.location.reload()
      return
    }
    // 初始化主题模式
    setThemeMode()
    // 监听系统主题变化（仅在需要时重新检测）
    watchSystemThemeChange()
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
  // 获取实际的主题模式（处理 auto 情况）
  const getActualThemeMode = (): boolean => {
    if (store.value === "auto") {
      // 根据系统偏好返回实际模式
      return window.matchMedia("(prefers-color-scheme: dark)").matches
    }
    return store.value === "dark"
  }

  // 设置主题模式
  const setThemeMode = () => {
    // 服务端不渲染
    if (BrowserUtil.isInBrowser) {
      const isDarkMode = getActualThemeMode()
      setCssAndThemeMode(isDarkMode)
      // 记录日志
      logger.info(isDarkMode ? "Browser Dark Mode" : "Browser Light Mode", "store:", store.value)
    }
  }

  // 监听系统主题变化
  const watchSystemThemeChange = () => {
    if (BrowserUtil.isInBrowser) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      mediaQuery.addEventListener("change", (e) => {
        // 自动同步系统主题变化
        const newMode = e.matches ? "dark" : "light"
        store.value = newMode
        setCssAndThemeMode(e.matches)
        logger.info("System theme changed, switching to:", newMode)
      })
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
    // 颜色模式属性 - 关键：确保 Element Plus 能正确响应
    const actualMode = isDarkMode ? "dark" : "light"
    document.documentElement.dataset.themeMode = actualMode
    
    // 同步设置 html class，确保 Element Plus 暗色模式正确应用
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
      document.documentElement.classList.remove("light")
    } else {
      document.documentElement.classList.add("light")
      document.documentElement.classList.remove("dark")
    }

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
