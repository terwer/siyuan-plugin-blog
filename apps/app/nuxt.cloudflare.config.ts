import AutoImport from "unplugin-auto-import/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import Components from "unplugin-vue-components/vite"

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
const appBase = "/"
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
        // 预连接到 CDN（减少 DNS + TLS 握手时间）
        { rel: "preconnect", href: "https://at.alicdn.com" },
        // 预加载关键字体文件
        // {
        //   rel: "preload",
        //   as: "font",
        //   href: appBase + "libs/fonts/fzbw/方正北魏楷书简体.woff2",
        //   type: "font/woff2",
        //   crossorigin: "anonymous",
        // },
        { rel: "stylesheet", href: appBase + "libs/fonts/webfont.css?v=" + staticV },
        { rel: "stylesheet", href: appBase + "libs/fonts/lxgw_font.css?v=" + staticV },
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
            src: appBase + "libs/lute/lute.min.js",
          },
        ]
        : [
          {
            defer: true,
            src: appBase + "libs/katex/0.16.10/katex.min.js",
          },
          {
            defer: true,
            src: appBase + "libs/lute/lute.min.js",
          },
        ],
    },
  },

  vite: {
    define: {
      "process.env.DEV_MODE": `"${isDev}"`,
      "process.env.APP_BASE": `"${appBase}"`,
      "process.env.SSR": "\"true\"",
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

  nitro: {
    preset: "cloudflare_pages",
    externals: {
      traceAlias: {
        "@sxzz/popperjs-es": "@popperjs/core",
      },
    },
  },

  // 环境变量
  runtimeConfig: {
    // Private 配置（仅在服务端可用）
    aiBaseUrl: process.env.NUXT_AI_BASE_URL ?? "https://api.openai.com",
    aiApiKey: process.env.NUXT_AI_API_KEY ?? "",
    aiModel: process.env.NUXT_AI_MODEL ?? "gpt-3.5-turbo",
    // Public 配置（客户端可用）
    public: {
      defaultType: process.env.NUXT_PUBLIC_DEFAULT_TYPE ?? "cloudflare",
      siyuanApiUrl: process.env.NUXT_PUBLIC_SIYUAN_API_URL ?? "http://127.0.0.1:6806",
      providerMode: process.env.NUXT_PUBLIC_PROVIDER_MODE ?? "false",
      providerUrl: process.env.NUXT_PUBLIC_PROVIDER_URL ?? "http://127.0.0.1:8000",
    },
  },

  compatibilityDate: "2024-11-01",
})
