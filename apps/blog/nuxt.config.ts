const isDev = process.env.NODE_ENV === "development"
const isVercelBuild = process.env.BUILD_TYPE === "vercel"
let appBase = "/appearance/themes/zhi/apps/blog/dist/"
if (isDev || isVercelBuild) {
  appBase = "/"
}
console.log("isVercelBuild=>", isVercelBuild)
console.log("isDev=>", isDev)
console.log("appBase=>", appBase)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    shim: false,
    strict: true,
    typeCheck: true,
  },
  vite: {
    build: {
      minify: false,
    },
  },
  app: {
    baseURL: appBase,
  },
  runtimeConfig: {
    public: {
      VITE_LOG_LEVEL: "INFO",
      VITE_DEBUG_MODE: false,
    },
  },
  nitro: {
    serveStatic: !isDev,
  },
})
