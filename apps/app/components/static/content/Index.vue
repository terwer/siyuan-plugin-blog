<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup lang="ts">
import type AppConfig from "~/app.config"

const props = defineProps<{ post: any, setting: typeof AppConfig }>()
</script>

<template>
  <el-container
    :class="{ 'main-container': true, 'headed-container': props.setting?.showHeader }"
  >
    <static-content-left
      :post="props.post"
      :setting="props.setting"
    />
    <el-main class="main">
      <static-content-main :post="props.post" :setting="props.setting" />
    </el-main>
    <static-content-right :post="props.post" :setting="props.setting" />
  </el-container>
</template>

<style scoped lang="stylus">
@import "../../../assets/css/theme/index.styl"

.main-container
  margin 20px 0
.headed-container
  top $navbarHeight
.main
  padding 0
  margin 0
</style>
