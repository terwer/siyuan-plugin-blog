<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup lang="ts">
// import { useSettingStore } from "~/stores/useSettingStore"
import {StrUtil} from "zhi-common"

definePageMeta({
  layout: "default",
})

const {t} = useI18n()
// const { getSetting } = useSettingStore()
//
// const setting = await getSetting()
// const title = `${setting?.siteTitle ?? t("blog.site.title")} - ${setting?.siteSlogan ?? t("blog.site.slogan")}`
// const seoMeta = {
//   title: title,
//   ogTitle: title,
//   description: setting?.siteDescription,
//   ogDescription: setting?.siteDescription,
// } as any
// useSeoMeta(seoMeta)

// const homePageId = setting?.homePageId ?? undefined
const homePageId = undefined

// methods
const goSetting = async () => {
  await navigateTo("/setting")
}
</script>

<template>
  <el-container>
    <el-main>
      <div v-if="StrUtil.isEmptyString(homePageId)">
        <el-empty :description="t('blog.index.no.home')">
          <el-button type="primary" @click="goSetting">{{ t("blog.index.goto.set.home") }}</el-button>
        </el-empty>
      </div>
      <div v-else>
        <public-home :page-id="homePageId"/>
      </div>
    </el-main>
  </el-container>
</template>

<style scoped></style>
