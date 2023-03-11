import eslint from "vite-plugin-eslint"

const isDev = process.env.NODE_ENV === "development"
const appBase = isDev ? "/" : "/appearance/themes/zhi/apps/blog/dist/"
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
    plugins: [eslint()],
  },
  app: {
    baseURL: appBase,
  },
})
