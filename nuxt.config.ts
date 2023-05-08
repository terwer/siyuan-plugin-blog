const isDev = process.env.NODE_ENV === "development"
const isVercelBuild = process.env.BUILD_TYPE === "vercel"
const isSiyuanBuild = process.env.BUILD_TYPE === "siyuan"
const isSsr = isDev || isVercelBuild

const ssrPreset = isVercelBuild ? "vercel" : isDev ? "node-server" : undefined
const ssrServeStatic = isSiyuanBuild

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
