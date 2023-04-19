import { defineConfig } from "astro/config"
import node from "@astrojs/node"
import vercel from "@astrojs/vercel/serverless"

const isVercelBuild = process.env.BUILD_TYPE === "vercel"
const isSiyuanBuild = process.env.BUILD_TYPE === "siyuan"

const distDir = isSiyuanBuild
  ? "/Users/terwer/Documents/mydocs/SiYuanWorkspace/public/conf/appearance/themes/zhi/server/blog"
  : "./dist"

console.log("isSiyuanBuild=>", isSiyuanBuild)
console.log("isVercelBuild=>", isVercelBuild)

// https://astro.build/config
export default defineConfig({
  outDir: distDir,
  // 注释掉 output 可以构建成纯静态页面
  output: "server",
  // https://docs.astro.build/en/guides/integrations-guide/vercel/
  // https://docs.astro.build/en/guides/integrations-guide/node/#standalone
  adapter: isVercelBuild
    ? vercel()
    : node({
      mode: "standalone",
      // middleware 可配合express
      // mode: "middleware"
    }),
})
