<script setup lang="ts">
import { useSettingStore } from "~/stores/useSettingStore"
import { StrUtil } from "zhi-common"

definePageMeta({
  layout: "default",
})

const { t } = useI18n()
const { getSetting } = useSettingStore()

const setting = await getSetting()
const title = `${setting?.siteTitle ?? t("blog.site.title")} - ${setting?.siteSlogan ?? t("blog.site.slogan")}`
const seoMeta = {
  title: title,
  ogTitle: title,
  description: setting?.siteDescription,
  ogDescription: setting?.siteDescription,
} as any
useSeoMeta(seoMeta)

const homePageId = setting?.homePageId ?? undefined

// methods
const goSetting = async () => {
  await navigateTo("/setting")
}
</script>

<template>
  <div v-if="StrUtil.isEmptyString(homePageId)">
    <el-empty :description="t('blog.index.no.home')">
      <el-button type="primary" @click="goSetting">{{ t("blog.index.goto.set.home") }}</el-button>
    </el-empty>
  </div>
  <div v-else>
    <default-detail :page-id="homePageId" :override-seo="true" />
  </div>
</template>

<style scoped></style>
