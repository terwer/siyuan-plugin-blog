const isDev = process.env.NODE_ENV === "development"
const isVercelBuild = process.env.BUILD_TYPE === "vercel"
let appBase = "/appearance/themes/zhi/apps/blog/dist/"
if (isDev || isVercelBuild) {
  appBase = "/"
}
console.log("isVercelBuild=>", isVercelBuild)
console.log("isDev=>", isDev)
console.log("appBase=>", appBase)

export default defineNuxtConfig({
  modules: ["@nuxt/content"],
  content: {
    // https://content.nuxtjs.org/api/configuration
  },
  typescript: {
    shim: false,
    strict: true,
    typeCheck: true,
  },
  // vite: {
  //   build: {
  //     minify: false,
  //   },
  // },
  app: {
    baseURL: appBase,
  },
  runtimeConfig: {
    public: {
      VITE_LOG_LEVEL: "INFO",
      VITE_DEBUG_MODE: false,
    },
  },
  // nitro: {
  //   serveStatic: !isDev,
  // },
  css: ["@/assets/vdoing/styles/index.styl"],
})
