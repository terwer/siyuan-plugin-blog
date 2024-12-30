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
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-main>Main</el-main>
    <el-aside width="200px">Aside</el-aside>
  </el-container>
</template>

<style scoped lang="stylus">

</style>