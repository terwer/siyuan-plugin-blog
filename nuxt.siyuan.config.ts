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
const appBase = "/plugins/siyuan-blog/"
const staticV = generateDynamicV()

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // https://nuxt.com/docs/guide/concepts/typescript#nuxttsconfigjson
  typescript: {
    strict: true,
  },

  devtools: {
    enabled: true,
  },

  // build modules
  modules: ["@vueuse/nuxt", "@nuxtjs/i18n-edge", "@element-plus/nuxt", "@nuxtjs/color-mode"],

  // vueuse
  vueuse: {
    ssrHandlers: true,
  },

  i18n: {
    vueI18n: "./i18n.ts",
  },

  // colorMode
  colorMode: {
    classSuffix: "",
  },

  vite: {
    define: {
      "process.env.DEV_MODE": `"${isDev}"`,
      "process.env.APP_BASE": `"${appBase}"`,
    },
    plugins: [],
  },

  // https://github.com/element-plus/element-plus-nuxt-starter/blob/main/nuxt.config.ts
  elementPlus: {
    icon: "ElIcon",
    importStyle: "scss",
    themes: ["dark"],
  },

  // https://nuxt.com/docs/guide/going-further/custom-routing#hash-mode-spa
  ssr: false,
  router: {
    options: {
      hashMode: true,
    },
  },

  css: ["~/assets/siyuan/style.styl", "~/assets/siyuan/index.styl"],

  app: {
    baseURL: appBase,
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      htmlAttrs: {
        lang: "zh_CN",
        "data-theme-mode": "dark",
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
          id: "themeDefaultStyle",
          href: appBase + "resources/appearance/themes/midnight/theme.css?v=2.9.1",
        },
        {
          rel: "stylesheet",
          id: "themeStyle",
          href: appBase + "resources/appearance/themes/Zhihu/theme.css?v=0.0.6",
        },
        {
          rel: "stylesheet",
          id: "protyleHljsStyle",
          href: appBase + "resources/stage/protyle/js/highlight.js/styles/vs2015.min.css?v=11.5.0",
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
          ]
        : [],
    },
  },

  // 环境变量
  runtimeConfig: {
    siyuanAuthToken: process.env.NUXT_SIYUAN_AUTH_TOKEN,
    public: {
      defaultType: process.env.NUXT_PUBLIC_DEFAULT_TYPE,
      siyuanApiUrl: process.env.NUXT_PUBLIC_SIYUAN_API_URL,
      waitTime: process.env.NUXT_PUBLIC_WAIT_TIME,
    },
  },
})
