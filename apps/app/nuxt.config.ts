import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"

const generateDynamicV = () => {
  const now = new Date()
  const year = now.getFullYear().toString()
  const month = (now.getMonth() + 1).toString().padStart(2, "0")
  const day = now.getDate().toString().padStart(2, "0")
  const hour = now.getHours().toString().padStart(2, "0")
  const minute = now.getMinutes().toString().padStart(2, "0")
  return year + month + day + hour + minute
}

const isDev = process.env.NODE_ENV === "development"
const appBase = "/plugins/siyuan-blog/app/"
const staticV = generateDynamicV()

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: isDev },

  modules: ["@nuxtjs/i18n", "@element-plus/nuxt", "@pinia/nuxt", "@element-plus/nuxt"],

  i18n: {
    defaultLocale: "zh_CN",
    locales: [
      { code: "en_US", name: "English", file: "en_US.json" },
      { code: "zh_CN", name: "Chinese", file: "zh_CN.json" }
    ],
    strategy: "no_prefix",
    detectBrowserLanguage: false,
  },

  // https://nuxt.com/docs/guide/going-further/custom-routing#hash-mode-spa
  ssr: false,
  router: {
    options: {
      hashMode: true,
    },
  },

  vite: {
    define: {
      "process.env.DEV_MODE": `"${isDev}"`,
      "process.env.APP_BASE": `"${appBase}"`,
      "process.env.SSR": "\"false\"",
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ]
  },

  css: ["~/assets/css/index.styl"],

  elementPlus: {
    /** Options */
    themes: ["dark"],
  },

  app: {
    baseURL: appBase,
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      htmlAttrs: {
        lang: "zh_CN",
        "data-theme-mode": "light",
        "data-light-theme": "Zhihu",
        "data-dark-theme": "Zhihu",
      },
      link: [
        { rel: "stylesheet", href: appBase + "libs/fonts/webfont.css?v=" + staticV },
        { rel: "stylesheet", href: appBase + "libs/fonts/vdoing_font.css?v=" + staticV },
        {
          rel: "stylesheet",
          href: appBase + "resources/stage/build/app/base.css?v=" + staticV,
        },
        {
          rel: "stylesheet",
          href: appBase + "libs/katex/0.16.10/katex.min.css?v=" + staticV,
          crossorigin: "anonymous",
        },
      ],
      // https://nuxt.com/docs/api/configuration/nuxt-config#head
      script: isDev
        ? [
            {
              src: appBase + "libs/eruda/eruda.js",
            },
            {
              children: "eruda.init();console.log('eruda inited');",
            } as any,
            {
              defer: true,
              src: appBase + "libs/katex/0.16.10/katex.min.js",
            },
            {
              defer: true,
              src: appBase + "resources/stage/protyle/js/echarts/echarts.min.js",
            },
          ]
        : [
            {
              defer: true,
              src: appBase + "libs/katex/0.16.10/katex.min.js",
            },
            {
              defer: true,
              src: appBase + "resources/stage/protyle/js/echarts/echarts.min.js",
            },
          ],
    },
  },

  // 环境变量
  runtimeConfig: {
    public: {
      defaultType: "siyuan",
      siyuanApiUrl: "",
      providerMode: "false",
      providerUrl: "",
    },
  },

  compatibilityDate: "2024-11-01",
})
