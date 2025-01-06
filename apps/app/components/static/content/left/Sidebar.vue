<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup lang="ts">
import { ref } from "vue"
import type AppConfig from "~/app.config"
import SidebarMenu from "~/components/static/content/left/SidebarMenu.vue"

const props = defineProps<{ post: any, setting: typeof AppConfig }>()

const { t } = useI18n()

interface MenuData {
  index: string;
  title: string;
  children?: MenuData[];
}

const menuData = ref<MenuData[]>([
  {
    index: "1",
    title: "Navigator One.也是坑很成才分手的方式地方都是粉丝的方式地方",
    children: [
      { index: "1-1", title: "Option 1" },
      {
        index: "1-2",
        title: "Option 2。选项很长也有可能是啥放松放松的蛋糕的哥哥哥峰哥峰哥发豆腐干豆腐",
      },
    ],
  },
  {
    index: "2",
    title: "Navigator Two",
    children: [
      { index: "2-1", title: "Option 1" },
      { index: "2-2", title: "Option 2" },
    ],
  },
  {
    index: "3",
    title: "Navigator Three",
    children: [
      { index: "3-1", title: "Option 1" },
      { index: "3-2", title: "Option 2" },
    ],
  },
])
</script>

<template>
  <el-scrollbar class="sidebar-container">
    <!-- 顶部标题 -->
    <div class="sidebar-header">
      {{ t("static.outline") }}
    </div>
    <!-- 菜单部分 -->
    <el-menu class="sidebar-menu" :default-openeds="['1', '3']">
      <SidebarMenu v-for="menu in menuData" :key="menu.index" :menu="menu" />
    </el-menu>
  </el-scrollbar>
</template>

<style scoped lang="stylus">
.sidebar-container
  max-width 250px
  border-right 1px solid var(--el-menu-border-color)

.sidebar-header
  font-size 16px
  font-weight bold
  text-align center
  padding 10px 0
  border-bottom 1px solid var(--el-menu-border-color)

.sidebar-menu
  border none
</style>

<style scoped lang="stylus">
.sidebar-container
  max-width 250px
  border-right 1px solid var(--el-menu-border-color)

.sidebar-menu
  border none
</style>
