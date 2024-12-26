/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import {BrowserUtil, SiyuanDevice} from "zhi-device"
import {useRoute} from "vue-router"
import {useStaticSettingStore} from "~/stores/useStaticSettingStore"
import {useColorMode} from "@vueuse/core"
import {HLJS_VERSION, SIYUAN_VERSION} from "~/utils/Constants"
import {useAppBase} from "~/composables/useAppBase"

// 创建日志记录器
const logger = createAppLogger("use-theme-mode")

/**
 * 注意：静态模式不能查询，只能通过参数传递进来
 */
export const useStaticThemeMode = async () => {
  // 获取颜色模式和运行时配置
  const color = useColorMode()
  const {query} = useRoute()
  const {appBase} = useAppBase()
  const {getStaticSetting} = useStaticSettingStore()

  // 在 mounted 生命周期中处理加载后逻辑
  onMounted(() => {
    // 检测浏览器不是暗黑模式，根据媒介查询
    const win = SiyuanDevice.siyuanWindow()
    const isDarkMode = !BrowserUtil.hasNodeEnv() && win.matchMedia("(prefers-color-scheme: dark)").matches
    if (isDarkMode) {
      setThemeMode(true)
    }
  })

  // computes
  // 获取颜色模式并暴露 computed 属性
  const colorMode = computed({
    get: () => {
      return color.value === "dark"
    },
    set: (value) => {
      color.value = value ? "dark" : "light"
    },
  })

  // methods
  // 切换暗黑模式
  const toggleDark = async () => {
    colorMode.value = !colorMode.value
    switchMode()
  }

  const setting = await getStaticSetting()
  const siyuanV = SIYUAN_VERSION
  const hljsV = HLJS_VERSION
  const siyuanLightTheme = (query.lightTheme ?? setting.theme?.lightTheme ?? "Zhihu") as string
  const siyuanDarkTheme = (query.darkTheme ?? setting.theme?.darkTheme ?? "Zhihu") as string
  const siyuanThemeV = (query.themeVersion ?? setting.theme?.themeVersion ?? "0.1.2") as string
  const detectedMode = (color as any).preference == "system" ? "light" : (color as any).preference
  const isDarkMode = detectedMode === "dark"
  useHead({
    htmlAttrs: {
      lang: "zh_CN",
      "data-theme-mode": detectedMode,
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
  const switchMode = () => {
    const isDarkMode = color.value === "dark"
    setThemeMode(isDarkMode)
  }

  // 设置主题模式
  const setThemeMode = (isDarkMode: boolean) => {
    if (isDarkMode) {
      document.body.style.backgroundColor = "unset"
    } else {
      document.body.style.backgroundColor = "#f5f5f5"
    }
    if (BrowserUtil.isInBrowser) {
      setCssAndThemeMode(isDarkMode)
      // 记录日志
      logger.debug(isDarkMode ? "Browser Dark Mode" : "Browser Light Mode")
      logger.info(`Auto set mode, isDark => ${isDarkMode}`)
    }
    (color as any).preference = isDarkMode ? "dark" : "light"
  }

  // 根据浏览器模式设置 CSS 和主题模式
  const setCssAndThemeMode = (isDarkMode: boolean) => {
    // 默认主题适配
    const themeDefaultStyle = document.querySelector("#themeDefaultStyle") as any
    if (themeDefaultStyle) {
      themeDefaultStyle.href =
        appBase + `resources/appearance/themes/${isDarkMode ? "midnight" : "daylight"}/theme.css?v=${siyuanV}`
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
    // customCss: [
    //     {
    //       name: "custom.css",
    //       content: "body { background-color: #f5f5f5; }",
    //     },
    //   ],
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

  return {colorMode, toggleDark}
}
