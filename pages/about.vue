<script setup lang="ts">
import { useSettingStore } from "~/stores/useSettingStore"

definePageMeta({
  layout: "default",
})

const { t } = useI18n()
const { getSetting } = useSettingStore()

const setting = await getSetting()
const title = `${t("syp.about")} - ${setting?.siteTitle ?? t("blog.site.title")}`
const seoMeta = {
  title: title,
  ogTitle: title,
  description: t("syp.about.desc"),
  ogDescription: t("syp.about.desc"),
} as any
useSeoMeta(seoMeta)
</script>

<template>
  <div id="about">
    <h1>👨🏻 关于我</h1>
    <p>大家好，我是 <nuxt-link to="https://blog.terwer.space" target="_blank">terwer</nuxt-link> ， 一个后端老菜鸟。</p>
    <p>{{ setting.siteDescription }}</p>
    <div class="sep"></div>

    <h1>🏹 技能</h1>
    <p>熟悉Java、Spring、Spring Cloud、Vue、React、Python 的拼写</p>
    <p>了解 Linux、windows、macOS 的开关机方式</p>
    <p>精通 Git 的 pull 和 push，并注册了 GitHub 帐号刷了一些 star</p>
    <div class="sep"></div>

    <h1>✉️ 联系</h1>
    <p>WeChat or QQ: 1035136784</p>
    <p>Email: youweics@163.com</p>
    <p>GitHub: <nuxt-link to="https://github.com/terwer" target="_blank">https://github.com/terwer</nuxt-link></p>
  </div>
</template>

<style lang="stylus" scoped>
#about
  h1
    font-size 32px
  p
    padding 8px 0
    font-size 16px
    a
      color var(--el-color-primary)
      cursor pointer
  img
    width 25%
    height 25%
  .sep
    margin-top 20px
</style>
