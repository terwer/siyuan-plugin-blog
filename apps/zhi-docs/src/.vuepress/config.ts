import { defineUserConfig } from "vuepress"
import theme from "./theme.js"

export default defineUserConfig({
  base: "/",

  dest: "src/.vuepress/dist",

  locales: {
    "/": {
      lang: "en-US",
      title: "Zhi docs",
      description: "Docs for zhi framework",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "Zhi文档",
      description: "zhi 框架的文档",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
})
