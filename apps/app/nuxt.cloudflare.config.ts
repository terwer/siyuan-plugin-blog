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
  compatibilityDate: "2024-11-01",
})
