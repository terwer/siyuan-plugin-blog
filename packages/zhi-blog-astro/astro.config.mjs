import { defineConfig } from "astro/config"
import node from "@astrojs/node"

export default defineConfig({
    outDir: "../../dist/packages/zhi-blog-astro",
    // 注释掉 output 可以构建成纯静态页面
    output: "server",
    // https://docs.astro.build/en/guides/integrations-guide/vercel/
    // https://docs.astro.build/en/guides/integrations-guide/node/#standalone
    adapter: node({
        // mode: "standalone"
        // middleware 可配合express
        mode: "middleware",
    }),
})
