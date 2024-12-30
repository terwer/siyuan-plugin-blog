<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2023-2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup lang="ts">
import {StrUtil} from "zhi-common"

definePageMeta({
  layout: "default",
})

const {t} = useI18n()
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
