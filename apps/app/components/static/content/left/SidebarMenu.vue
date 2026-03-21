<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2025 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup lang="ts">
import { defineProps, computed } from "vue"
import MenuItem from "./MenuItem.vue"

interface MenuData {
  id: string;
  name: string;
  link: string;
  depth: number;
  children?: MenuData[]; // 子菜单可选
}

const props = defineProps<{ menu: MenuData, activeIndex?: string }>()

const isActive = computed(() => {
  return props.menu.id === props.activeIndex
})
</script>

<template>
  <el-sub-menu
    v-if="props.menu.children?.length"
    :index="props.menu.id"
    :class="{ 'is-active': isActive }"
  >
    <template #title>
      <MenuItem :link="props.menu.link" :text="props.menu.name" />
    </template>
    <SidebarMenu
      v-for="child in props.menu.children || []"
      :key="child.id"
      :menu="child"
      :active-index="activeIndex"
    />
  </el-sub-menu>
  <el-menu-item
    v-else
    :index="props.menu.id"
    :class="{ 'is-active': isActive }"
  >
    <MenuItem :link="props.menu.link" :text="props.menu.name" />
  </el-menu-item>
</template>

<style scoped lang="stylus">
// 高亮当前激活的菜单项
:deep(.is-active)
  background-color var(--el-menu-hover-bg-color) !important
  color var(--el-color-primary) !important

  // 确保子菜单标题也高亮
  .el-sub-menu__title
    background-color var(--el-menu-hover-bg-color) !important
    color var(--el-color-primary) !important
</style>
