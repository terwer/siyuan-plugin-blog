<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2023-2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup lang="ts">
import { isPublicConfigurationError } from "~/utils/publicConnection"
import { StrUtil } from "zhi-common"
import type AppConfig from "~/app.config"
import { useStaticSettingStore } from "~/stores/useStaticSettingStore"

// https://github.com/nuxt/nuxt/issues/15346
// 由于布局是个宏，不能动态设置了，因此只能写死

const nuxtApp=useNuxtApp()
const { t } = useI18n()
const { applyLocale } = useAppLocale()
const requestURL = useRequestURL()
const { getStaticSetting } = useStaticSettingStore(requestURL)
const logger = createAppLogger("static-home-page")

const { data: setting, pending: isLoading } = await useAsyncData<typeof AppConfig>('viewer-static-setting', async () => {
  try {
    const value = await getStaticSetting()
    await applyLocale(value?.lang)
    return value
  } catch (e) {
    if (isPublicConfigurationError(e)) {
      nuxtApp.runWithContext(() => showError(e))
    }
    logger.error("load static setting failed", e)
    throw e
  }
}, { default: () => ({} as typeof AppConfig) })

const title = computed(() => {
  if (isLoading.value) {
    return undefined
  }

  return `${setting.value?.siteTitle ?? t("blog.site.title")} - ${setting.value?.siteSlogan ?? t("blog.site.slogan")}`
})
useHead(() => {
  const meta = [] as Array<Record<string, string>>
  const description = setting.value?.siteDescription ?? ""

  if (description) {
    meta.push({ name: "description", content: description })
    meta.push({ property: "og:description", content: description })
  }

  if (title.value) {
    meta.push({ property: "og:title", content: title.value })
  }

  return {
    title: title.value,
    meta,
  }
})

const homePageId = computed(() => setting.value?.homePageId ?? undefined)
</script>

<template>
  <el-container v-if="isLoading">
    <el-main>
      <el-skeleton :rows="8" animated />
    </el-main>
  </el-container>
  <el-container v-else-if="StrUtil.isEmptyString(homePageId)">
    <static-header :setting="setting" />
    <el-main>
      <el-empty :description="t('blog.index.no.home')">
        <el-alert type="warning" :description="t('blog.index.goto.set.home.static')" :closable="false" />
      </el-empty>
    </el-main>
    <static-footer :setting="setting" />
  </el-container>
  <static-home v-else :page-id="homePageId" :setting="setting" />
</template>

<style lang="stylus" scoped>
</style>
