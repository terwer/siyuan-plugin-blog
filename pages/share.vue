<script setup lang="ts">
import { useSettingStore } from "~/stores/useSettingStore"

const { t } = useI18n()
const { getSetting } = useSettingStore()

const setting = await getSetting()
const title = `${t("blog.share")} - ${t("blog.share.options")}`
const seoMeta = {
  title: title,
  ogTitle: title,
} as any
useSeoMeta(seoMeta)
</script>

<template>
  <div>share window</div>
</template>

<style scoped></style>
