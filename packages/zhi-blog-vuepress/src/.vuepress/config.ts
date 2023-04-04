import { defineUserConfig } from "vuepress"
import theme from "./theme.js"

export default defineUserConfig({
    base: "/",

    dest: "dist/packages/zhi-blog-vuepress",

    locales: {
        "/": {
            lang: "zh-CN",
            title: "浅海拾贝",
            description: "寻找未知的技术拼图",
        },
        "/hk/": {
            lang: "zh-TW",
            title: "淺海拾貝",
            description: "尋找未知的技術拼圖",
        },
        "/en/": {
            lang: "en-US",
            title: "Seek gold",
            description: "Find new piece of tech",
        },
    },

    theme,

    // Enable it with pwa
    // shouldPrefetch: false,
})
