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

const isDev = process.env.NODE_ENV === "development"
const isVercelBuild = process.env.BUILD_TYPE === "vercel"
const isSiyuanBuild = process.env.BUILD_TYPE === "siyuan"

const appBase = getAppBase(isSiyuanBuild, isDev, isVercelBuild)
const isSsr = isDev || isVercelBuild

const ssrPreset = isVercelBuild ? "vercel" : isDev ? "node-server" : undefined
const ssrServeStatic = isSiyuanBuild

console.log("isVercelBuild=>", isVercelBuild)
console.log("isSiyuanBuild=>", isSiyuanBuild)
console.log("appBase=>", appBase)
console.log("isSsr=>", isSsr)
console.log("ssrPreset=>", ssrPreset)
console.log("ssrServeStatic=>", ssrServeStatic)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // https://nuxt.com/docs/guide/concepts/typescript#nuxttsconfigjson
  typescript: {
    strict: true,
  },

  devtools: {
    enabled: true,
  },

  app: {
    baseURL: appBase,
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      // link: [{ rel: "stylesheet", href: appBase + "lib/webfont/webfont.css?v=" + staticV }],
      // script: [
      //   {
      //     src: appBase + "lib/lute/lute-1.7.5-20230410.min.js?v=" + staticV,
      //     body: true,
      //   },
      // ],
    },
  },

  // https://nuxt.com/docs/guide/going-further/custom-routing#hash-mode-spa
  ssr: isSsr,
  // https://nuxt.com/docs/guide/going-further/custom-routing#hash-mode-spa
  router: {
    options: {
      hashMode: !isSsr,
    },
  },
  nitro: {
    preset: ssrPreset,
    // 开启之后将进行静态伺服
    serveStatic: ssrServeStatic,
  },
})
