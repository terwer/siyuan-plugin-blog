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
  id: string;
  name: string;
  link: string;
  depth: number;
  children?: MenuData[]; // 子菜单可选
}

const props = defineProps<{ menu: MenuData, maxDepth: number }>()
</script>

<template>
  <el-sub-menu
    v-if="props.menu.children?.length && props.menu.depth < props.maxDepth"
    :index="props.menu.id"
  >
    <template #title>
      <MenuItem :link="props.menu.link" :text="props.menu.name" />
    </template>
    <SidebarMenu
      v-for="child in props.menu.children || []"
      :key="child.id"
      :menu="child"
      :max-depth="props.maxDepth"
    />
  </el-sub-menu>
  <el-menu-item v-else :index="props.menu.id">
    <MenuItem :link="props.menu.link" :text="props.menu.name" />
  </el-menu-item>
</template>
