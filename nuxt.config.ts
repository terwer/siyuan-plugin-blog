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
  // content
  // https://content.nuxtjs.org/guide/writing/content-directory

  // meilisearch
  // https://github.com/xlanex6/nuxt-meilisearch
  // https://docs.meilisearch.com/learn/getting_started/quick_start.html

  // unplugin-icons
  // https://github.com/antfu/unplugin-icons
  modules: ["@nuxt/content", "nuxt-meilisearch", ["unplugin-icons/nuxt", {}]],
  content: {
    // https://content.nuxtjs.org/api/configuration
  },
  typescript: {
    shim: false,
    strict: true,
    typeCheck: true,
    tsConfig: {
      extends: "../tsconfig.base.json",
    },
  },
  vite: {
    build: {
      minify: !isDev,
    },
  },
  app: {
    baseURL: appBase,
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
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
  css: ["~/assets/vdoing/styles/index.styl"],
  meilisearch: {
    hostUrl: "http://localhost:3000/api/middleware/meilisearch",
    // hostUrl: "http://localhost:7700",
    searchApiKey: "<your_search_key>",
    adminApiKey: "<your_admin_key>",
    instantSearch: true, // default true
    serverSideUsage: true, // default false
    // optional
    clientOptions: {
      placeholderSearch: true, // default
      paginationTotalHits: 50, // default
      finitePagination: true, // default
      primaryKey: undefined, // default
      keepZeroFacets: false, // default
    },
  },
})
