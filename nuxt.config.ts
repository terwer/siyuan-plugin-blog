const getAppBase = (isSiyuanBuild: boolean, isDev: boolean, isVercelBuild: boolean): string => {
  if (isSiyuanBuild) {
    return "/plugins/siyuan-blog/"
  } else if (isVercelBuild) {
    return "/"
  } else {
    // static
    return "/dist/"
  }
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // https://nuxt.com/docs/guide/concepts/typescript#nuxttsconfigjson
  typescript: {
    strict: true,
  },

  devtools: {
    enabled: true,
  },

  // https://nuxt.com/docs/guide/going-further/custom-routing#hash-mode-spa
  ssr: false,
  router: {
    options: {
      hashMode: true,
    },
  },
})
