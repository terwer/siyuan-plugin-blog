<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2025 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup lang="ts">
import { defineProps } from "vue"
import MenuItem from "./MenuItem.vue"

interface MenuData {
  index: string;
  title: string;
  children?: MenuData[]; // 子菜单可选
}

const props = defineProps<{ menu: MenuData }>()
</script>

<template>
  <el-sub-menu v-if="props.menu.children?.length" :index="props.menu.index">
    <template #title>
      <MenuItem :text="props.menu.title" />
    </template>
    <SidebarMenu
      v-for="child in props.menu.children || []"
      :key="child.index"
      :menu="child"
    />
  </el-sub-menu>
  <el-menu-item v-else :index="props.menu.index">
    <MenuItem :text="props.menu.title" />
  </el-menu-item>
</template>
