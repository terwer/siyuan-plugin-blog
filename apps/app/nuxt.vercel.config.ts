const isDev = process.env.NODE_ENV === "development"
const appBase = "/"

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

  app: {
    baseURL: appBase,
  },

  nitro: {
    preset: "vercel",
  },

  // 环境变量
  runtimeConfig: {
    public: {
      defaultType: process.env.NUXT_PUBLIC_DEFAULT_TYPE ?? "vercel",
      siyuanApiUrl: process.env.NUXT_PUBLIC_SIYUAN_API_URL ?? "http://127.0.0.1:6806",
      providerMode: process.env.NUXT_PUBLIC_PROVIDER_MODE ?? "false",
      providerUrl: process.env.NUXT_PUBLIC_PROVIDER_URL ?? "http://127.0.0.1:8000",
    },
  },

  compatibilityDate: "2024-11-01",
})
