import { defineUserConfig } from "vuepress"
import theme from "./theme"
import { registerComponentsPlugin } from "@vuepress/plugin-register-components"
import { path } from "@vuepress/utils"
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default defineUserConfig({
    base: "/",

    dest: "dist/packages/zhi-blog-vuepress",

    alias: [
        {
            "@LinkLayout": path.resolve(path.dirname(""), "components/LinkLayout.vue"),
        },
    ],

    plugins: [
        // 注册组件
        registerComponentsPlugin({
            // componentsDir写法，该文件夹下的组件都会被注册为Vue组件。
            componentsDir: path.resolve(__dirname, "./components"),
        }),
        // 文档搜索
        searchProPlugin({
            // 配置选项
        }),
    ],

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
