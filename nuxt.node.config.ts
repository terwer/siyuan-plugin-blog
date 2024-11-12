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
const appBase = "/"
const staticV = generateDynamicV()

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // https://nuxt.com/docs/guide/concepts/typescript#nuxttsconfigjson
  typescript: {
    strict: true,
  },

  devtools: {
    enabled: false,
  },

  // build modules
  modules: ["@vueuse/nuxt", "@nuxtjs/i18n", "@element-plus/nuxt", "@nuxtjs/color-mode", "@pinia/nuxt", "@nuxt/image"],

  // vueuse
  vueuse: {
    ssrHandlers: true,
  },

  i18n: {
    vueI18n: "./i18n.ts",
  },

  // colorMode
  // 格式是 `class="light-${classSuffix}"`，为空是 `class="light"`
  colorMode: {
    classSuffix: "",
  },

  image: {},

  vite: {
    define: {
      "process.env.DEV_MODE": `"${isDev}"`,
      "process.env.APP_BASE": `"${appBase}"`,
      "process.env.SSR": `"true"`,
    },
    plugins: [],
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern",
          silenceDeprecations: ["mixed-decls", "color-functions", "global-builtin", "import", "new-global"],
        },
      },
    },
  },

  elementPlus: {
    icon: "ElIcon",
    importStyle: "scss",
    themes: ["dark"],
  },

  css: ["~/assets/siyuan/style.styl", "~/assets/siyuan/index.styl"],

  app: {
    baseURL: appBase,
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      htmlAttrs: {
        lang: "zh_CN",
        "data-theme-mode": "light",
        "data-light-theme": "Zhihu",
        "data-dark-theme": "Zhihu",
      },
      link: [
        { rel: "stylesheet", href: appBase + "libs/fonts/webfont.css?v=" + staticV },
        {
          rel: "stylesheet",
          href: appBase + "resources/stage/build/app/base.css?v=" + staticV,
        },
        {
          rel: "stylesheet",
          href: appBase + "libs/katex/0.16.10/katex.min.css?v=" + staticV,
          crossorigin: "anonymous",
        },
      ],
      // https://nuxt.com/docs/api/configuration/nuxt-config#head
      script: isDev
        ? [
            {
              src: appBase + "libs/eruda/eruda.js",
            },
            {
              children: "eruda.init();console.log('eruda inited');",
            },
            {
              defer: true,
              src: appBase + "libs/katex/0.16.10/katex.min.js",
            },
          ]
        : [
            {
              defer: true,
              src: appBase + "libs/katex/0.16.10/katex.min.js",
            },
          ],
    },
  },

  // 环境变量
  runtimeConfig: {
    siyuanAuthToken: process.env.NUXT_SIYUAN_AUTH_TOKEN,
    siyuanCookie: process.env.NUXT_SIYUAN_COOKIE,
    public: {
      defaultType: process.env.NUXT_PUBLIC_DEFAULT_TYPE ?? "siyuan",
      siyuanApiUrl: process.env.NUXT_PUBLIC_SIYUAN_API_URL ?? "http://127.0.0.1:6806",
      waitTime: process.env.NUXT_PUBLIC_WAIT_TIME,
      providerMode: process.env.NUXT_PUBLIC_PROVIDER_MODE ?? "false",
      providerUrl: process.env.NUXT_PUBLIC_PROVIDER_URL ?? "http://127.0.0.1:8000",
    },
  },

  compatibilityDate: "2024-09-02",
})
