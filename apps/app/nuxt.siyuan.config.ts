import AutoImport from "unplugin-auto-import/vite"
import { fileURLToPath } from "node:url"
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
const appBase = "/plugins/siyuan-blog/app/"
const staticV = generateDynamicV()
const createAsyncStylesheetLink = (href: string) =>
  ({
    rel: "stylesheet",
    href,
    media: "print",
    onload: "this.onload=null;this.media='all'",
  }) as any

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: isDev },

  alias: {
    "~/components/ai-assistant/AIPanel.vue": fileURLToPath(new URL("./components/ai-assistant/AIPanelDisabled.vue", import.meta.url)),
  },

  components: [
    {
      path: "~/components",
      ignore: ["**/ai-assistant/**"],
    },
  ],

  modules: ["@nuxtjs/i18n", "@element-plus/nuxt", "@pinia/nuxt", "@element-plus/nuxt"],

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

  // https://nuxt.com/docs/guide/going-further/custom-routing#hash-mode-spa
  ssr: false,
  router: {
    options: {
      hashMode: true,
    },
  },

  vite: {
    define: {
      __ENABLE_AI_ASSISTANT__: "false",
      __SIYUAN_SPA_TARGET__: "true",
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
      title: "在线分享",
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
        // { rel: "preconnect", href: "https://static-rs-terwer.oss-cn-beijing.aliyuncs.com" },
        // 预加载关键字体文件
        // {
        //   rel: "preload",
        //   as: "font",
        //   href: appBase + "libs/fonts/fzbw/方正北魏楷书简体.woff2",
        //   type: "font/woff2",
        //   crossorigin: "anonymous",
        // },
        createAsyncStylesheetLink(appBase + "libs/fonts/vdoing_font.css?v=" + staticV),
        {
          rel: "stylesheet",
          href: appBase + "resources/stage/build/export/base.css?v=" + staticV,
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
        ]
        : [
        ],
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
      defaultType: "siyuan",
      siyuanApiUrl: "",
      providerMode: "false",
      providerUrl: "",
      viewerCapabilities: {
        aiAssistant: false,
      },
    },
  },

  compatibilityDate: "2024-11-01",
})
