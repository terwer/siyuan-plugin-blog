<script setup lang="ts">
import { useSettingStore } from "~/stores/useSettingStore"

const { t } = useI18n()
const { getSetting } = useSettingStore()

const setting = await getSetting()
const seoMeta = {
  title: `${setting?.siteTitle ?? t("blog.site.title")} -${setting?.siteSlogan ?? t("blog.site.slogan")}`,
  ogTitle: t("syp.about"),
  description: t("syp.about.desc"),
  ogDescription: t("syp.about.desc"),
} as any
useSeoMeta(seoMeta)

// methods
const goSetting = async () => {
  await navigateTo("/setting")
}
</script>

<template>
  <div>
    <el-empty :description="t('blog.index.no.home')">
      <el-button type="primary" @click="goSetting">{{ t("blog.index.goto.set.home") }}</el-button>
    </el-empty>
  </div>
</template>

<style scoped></style>
