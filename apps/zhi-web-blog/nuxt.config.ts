const isDev = process.env.NODE_ENV === "development"
console.log("isDev=>", isDev)

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
  css: ["~/assets/vdoing/styles/index.styl"],
  ssr: false,
  nitro: {
    // preset: isVercelBuild ? "vercel" : "node-server",
    // 开启之后将进行静态伺服
    serveStatic: !isDev,
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
