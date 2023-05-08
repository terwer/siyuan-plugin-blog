/*
 * MIT License
 *
 * Copyright (c) 2023. Terwer
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

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

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
