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
const appBase = process.env.NUXT_APP_BASE_URL || "/"
const staticV = generateDynamicV()

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  $env: {
    "self-hosted": {
      srcDir:".", ssr:true, devtools:{enabled:false}, devServer:{port:4000},
      nitro:{preset:"node-server"},
      runtimeConfig:{public:{connectionSync:true,providerMode:"true",viewerCapabilities:{aiAssistant:false}}},
    },
  },
  devtools: { enabled: isDev },

  // 自托管部署时由 Nitro 直接提供 gzip/brotli 静态资源
  nitro: {
    compressPublicAssets: true,
  },

  modules: ["@nuxtjs/i18n", "@element-plus/nuxt", "@pinia/nuxt"],

  i18n: {
    defaultLocale: "zh_CN",
    fallbackLocale: "zh_CN",
    locales: [
      { code: "en_US", name: "English", file: "en_US.json" },
      { code: "zh_CN", name: "Chinese", file: "zh_CN.json" }
    ],
    strategy: "no_prefix",
    detectBrowserLanguage: false,
  },

  // 生产环境为字体文件增加长缓存；开发环境不启用，避免调试时被缓存干扰
  routeRules: isDev
    ? {}
    : {
        "/libs/fonts/LXGWWenkai/**": {
          headers: { "Cache-Control": "public, max-age=31536000, immutable" },
        },
        "/libs/fonts/opensans/**": {
          headers: { "Cache-Control": "public, max-age=31536000, immutable" },
        },
        "/libs/fonts/fzbw/**": {
          headers: { "Cache-Control": "public, max-age=31536000, immutable" },
        },
      },

  app: {
    baseURL: appBase,
    head: {
      title: "在线分享",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      htmlAttrs: {
        lang: "zh_CN",
        "data-theme-mode": "light",
        "data-light-theme": "Zhihu",
        "data-dark-theme": "Zhihu",
      },
      // https://nuxt.com/docs/api/configuration/nuxt-config#head
      script: isDev
        ? [
          {
            src: appBase + "libs/eruda/eruda.js",
          },
          {
            children: "eruda.init();console.log('eruda inited');",
          } as any,
        ]
        : [
        ],
    },
  },

  vite: {
    define: {
      __ENABLE_AI_ASSISTANT__: "true",
      __SIYUAN_SPA_TARGET__: "false",
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

  // 环境变量
  runtimeConfig: {
    providerInternalUrl: "",
    // Private 配置（仅在服务端可用）
    aiBaseUrl: process.env.NUXT_AI_BASE_URL ?? "https://api.openai.com",
    aiApiKey: process.env.NUXT_AI_API_KEY ?? "",
    aiModel: process.env.NUXT_AI_MODEL ?? "gpt-3.5-turbo",
    // Public 配置（客户端可用）
    public: {
      connectionSync: false,
      defaultType: process.env.NUXT_PUBLIC_DEFAULT_TYPE ?? "node",
      siyuanApiUrl: process.env.NUXT_PUBLIC_SIYUAN_API_URL ?? "http://127.0.0.1:6806",
      providerMode: process.env.NUXT_PUBLIC_PROVIDER_MODE ?? "false",
      providerUrl: process.env.NUXT_PUBLIC_PROVIDER_URL ?? "http://127.0.0.1:8086",
      viewerCapabilities: {
        aiAssistant: true,
      },
    },
  },

  compatibilityDate: "2025-07-15",
})
