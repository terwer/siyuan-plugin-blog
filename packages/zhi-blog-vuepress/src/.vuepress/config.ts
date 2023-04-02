import { defineUserConfig } from "vuepress"
import theme from "./theme.js"

export default defineUserConfig({
  base: "/",

  dest: "dist/packages/zhi-blog-vuepress",

  locales: {
    "/": {
      lang: "en-US",
      title: "Seek gold",
      description: "Find new piece of tech",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "浅海拾贝",
      description: "寻找未知的技术拼图",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
})
