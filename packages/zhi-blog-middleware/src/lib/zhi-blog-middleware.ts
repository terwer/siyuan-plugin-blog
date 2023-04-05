import { handler as ssrHandler } from "../../../../dist/packages/zhi-blog-astro/dist/server/entry.mjs"
// import { handler as ssrHandler } from "/Users/terwer/Documents/mydocs/zhi/dist/packages/zhi-blog-astro/dist/server/entry.mjs"
import express from "express"

function initHttpService() {
    const app = express()
    app.use(express.static("/Users/terwer/Documents/mydocs/zhi/dist/packages/zhi-blog-astro/dist/client"))
    app.use(ssrHandler)

    app.listen(8080)
}
export function zhiBlogMiddleware(): string {
    initHttpService()
    return "zhi-blog-middleware"
}
