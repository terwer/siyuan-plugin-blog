const getAppBase = (isSiyuanBuild: boolean, isNodeBuild: boolean, isVercelBuild: boolean, isDev: boolean): string => {
  if (isSiyuanBuild) {
    return "/plugins/siyuan-blog/"
  } else if (isVercelBuild) {
    return "/"
  } else if (isNodeBuild) {
    return "/"
  } else if (isDev) {
    return "/"
  } else {
    // static
    return "/dist/"
  }
}

const generateDynamicV = () => {
  const now = new Date()
  const year = now.getFullYear().toString()
  const month = (now.getMonth() + 1).toString().padStart(2, "0")
  const day = now.getDate().toString().padStart(2, "0")
  const hour = now.getHours().toString().padStart(2, "0")
  const minute = now.getMinutes().toString().padStart(2, "0")
  return year + month + day + hour + minute
}

const isDev = process.env.NODE_ENV === "development"
const isVercelBuild = process.env.BUILD_TYPE === "vercel"
const isNodeBuild = process.env.BUILD_TYPE === "node"
const isSiyuanBuild = process.env.BUILD_TYPE === "siyuan"
const debugMode = process.env.DEBUG_MODE === "true" || isDev

const appBase = getAppBase(isSiyuanBuild, isNodeBuild, isVercelBuild, isDev)
const isSsr = isNodeBuild || isVercelBuild

const ssrPreset = isVercelBuild ? "vercel" : isNodeBuild ? "node-server" : undefined
const ssrServeStatic = isSiyuanBuild

const staticV = generateDynamicV()
console.log("staticV=>", staticV)
console.log("isDev=>", isDev)
console.log("debugMode=>", debugMode)
console.log("isVercelBuild=>", isVercelBuild)
console.log("isNodeBuild=>", isNodeBuild)
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

  vite: {
    plugins: [],
  },

  app: {
    baseURL: appBase,
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [{ rel: "stylesheet", href: appBase + "lib/fonts/webfont.css?v=" + staticV }],
      // https://nuxt.com/docs/api/configuration/nuxt-config#head
      script: debugMode
        ? [
            //   {
            //     src: appBase + "lib/lute/lute-1.7.5-20230410.min.js?v=" + staticV,
            //     body: true,
            //   },
            {
              src: appBase + "libs/eruda/eruda.js",
            },
            {
              children: "eruda.init();console.log('eruda inited');",
            },
          ]
        : [
            //   {
            //     src: appBase + "lib/lute/lute-1.7.5-20230410.min.js?v=" + staticV,
            //     body: true,
            //   },
          ],
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
