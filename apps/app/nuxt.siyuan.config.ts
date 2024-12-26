const isDev = process.env.NODE_ENV === "development"
const appBase = "/plugins/siyuan-blog/app/"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {enabled: true},
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
