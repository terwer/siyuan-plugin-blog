import en_US from "~/locales/en_US"
import zh_CN from "~/locales/zh_CN"

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "zh_CN",
  messages: {
    zh_CN,
    en_US,
  },
}))
