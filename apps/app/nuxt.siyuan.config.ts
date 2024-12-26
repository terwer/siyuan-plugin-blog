const isDev = process.env.NODE_ENV === "development"
const appBase = "/plugins/siyuan-blog/app/"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {enabled: true},

  modules: ["@nuxtjs/i18n"],

  i18n: {
    locales: ["en_US", "zh_CN"],
    defaultLocale: "zh_CN",
    strategy: "no_prefix",
    detectBrowserLanguage: false,
    vueI18n: "./i18n.ts"
  },

  // https://nuxt.com/docs/guide/going-further/custom-routing#hash-mode-spa
  ssr: false,
  router: {
    options: {
      hashMode: true,
    },
  },

  app: {
    baseURL: appBase,
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
