const isDev = process.env.NODE_ENV === "development"
const appBase = "/"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {enabled: true},
  app: {
    baseURL: appBase,
  },
  nitro: {
    preset: "cloudflare_pages",
  },
  // 环境变量
  runtimeConfig: {
    public: {
      defaultType: process.env.NUXT_PUBLIC_DEFAULT_TYPE ?? "cloudflare",
      siyuanApiUrl: process.env.NUXT_PUBLIC_SIYUAN_API_URL ?? "http://127.0.0.1:6806",
      providerMode: process.env.NUXT_PUBLIC_PROVIDER_MODE ?? "false",
      providerUrl: process.env.NUXT_PUBLIC_PROVIDER_URL ?? "http://127.0.0.1:8000",
    },
  },
  compatibilityDate: "2024-11-01",
})
