const isDev = process.env.NODE_ENV === "development"
const isSiyuanBuild = process.env.BUILD_TYPE === "siyuan"
const isVercelBuild = process.env.BUILD_TYPE === "vercel"

const appBase = isSiyuanBuild
  ? "/appearance/themes/zhi/web/blog/"
  : isDev || isVercelBuild
  ? "/"
  : "/zhi/apps/zhi-web-blog/dist/"
const distDir = isSiyuanBuild
  ? "/Users/terwer/Documents/mydocs/SiYuanWorkspace/public/conf/appearance/themes/zhi/web/blog"
  : "./dist"
const isSsr = isVercelBuild
// const ssrPreset = isVercelBuild ? "vercel" : isDev ? "node-server" : undefined
// const ssrServeStatic = isSiyuanBuild
const staticV = "202304191333"

console.log("isDev=>", isDev)
console.log("appBase=>", appBase)
console.log("isSiyuanBuild=>", isSiyuanBuild)
console.log("isVercelBuild=>", isVercelBuild)
console.log("isSsr=>", isSsr)
// console.log("ssrPreset=>", ssrPreset)
// console.log("ssrServeStatic=>", ssrServeStatic)

// https://nuxt.com/docs/api/configuration/nuxt-config
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
  app: {
    baseURL: appBase,
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [{ rel: "stylesheet", href: appBase + "lib/webfont/webfont.css?v=" + staticV }],
      // script: [
      //   {
      //     src: appBase + "lib/lute/lute-1.7.5-20230410.min.js?v=" + staticV,
      //     body: true,
      //   },
      // ],
    },
  },
  css: ["~/assets/vdoing/styles/index.styl"],
  runtimeConfig: {
    // default type
    VITE_DEFAULT_TYPE: "siyuan",
    // siyuan
    VITE_SIYUAN_API_URL: "",
    VITE_SIYUAN_AUTH_TOKEN: "",
    // WordPress
    VITE_WORDPRESS_API_URL: "",
    VITE_WORDPRESS_USERNAME: "",
    VITE_WORDPRESS_PASSWORD: "",
    public: {
      VITE_STATIC_VERSION: staticV,
      VITE_APP_BASE: appBase,
      VITE_LOG_LEVEL: "INFO",
      VITE_DEBUG_MODE: false,
      // 保证思源笔记内部在 SPA 的情况下默认可用
      VITE_SIYUAN_API_URL: "",
    },
  },
  ssr: isSsr,
  // https://nuxt.com/docs/guide/going-further/custom-routing#hash-mode-spa
  router: {
    options: {
      hashMode: true,
    },
  },
  nitro: {
    output: {
      publicDir: distDir,
    },
    //   preset: ssrPreset,
    //   // 开启之后将进行静态伺服
    //   serveStatic: ssrServeStatic,
  },
  meilisearch: {
    // hostUrl: process.env.MEILISEARCH_ENDPOINT ?? "http://localhost:3000/api/endpoint/meilisearch",
    // /Users/terwer/Documents/code/meilisearch/meilisearch-macos-amd64
    hostUrl: "http://localhost:7700",
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
