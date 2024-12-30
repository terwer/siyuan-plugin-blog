<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2023-2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup lang="ts">
import {useStaticSettingStore} from "~/stores/useStaticSettingStore"
import {StrUtil} from "zhi-common"

// https://github.com/nuxt/nuxt/issues/15346
// 由于布局是个宏，不能动态设置了，因此只能写死

const {t} = useI18n()
const {getStaticSetting} = useStaticSettingStore()

const setting = await getStaticSetting()
const title = `${setting?.siteTitle ?? t("blog.site.title")} - ${setting?.siteSlogan ?? t("blog.site.slogan")}`
const seoMeta = {
  title: title,
  ogTitle: title,
  description: setting?.siteDescription,
  ogDescription: setting?.siteDescription,
} as any
useSeoMeta(seoMeta)

const homePageId = setting?.homePageId ?? undefined
</script>

<template>
  <el-container v-if="StrUtil.isEmptyString(homePageId)">
    <el-header>
      <static-header :setting="setting"/>
    </el-header>
    <el-main>
      <el-empty :description="t('blog.index.no.home')">
        <el-alert type="warning" :description="t('blog.index.goto.set.home.static')" :closable="false"></el-alert>
      </el-empty>
    </el-main>
    <el-footer>
      <static-footer :setting="setting"/>
    </el-footer>
  </el-container>
  <static-home v-else :page-id="homePageId" :setting="setting"/>
</template>

<style lang="stylus" scoped>
</style>
