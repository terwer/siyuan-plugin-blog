<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2025 Terwer, Inc. <https://terwer.space/>
  -
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup lang="ts">
import { defineProps, computed } from "vue"
import MintlifyMenuItem from "./MintlifyMenuItem.vue"

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

// 检查是否有子菜单
const hasChildren = computed(() => {
  return props.menu.children && props.menu.children.length > 0
})
</script>

<template>
  <!-- 有子菜单的项 -->
  <div v-if="hasChildren" class="mintlify-sub-menu" :class="{ 'is-active': isActive }">
    <MintlifyMenuItem
      :link="props.menu.link"
      :text="props.menu.name"
      :from-doc-tree="true"
    />
    <div class="mintlify-sub-menu-children">
      <MintlifySidebarMenu
        v-for="child in props.menu.children || []"
        :key="child.id"
        :menu="child"
        :active-index="activeIndex"
      />
    </div>
  </div>

  <!-- 没有子菜单的项 -->
  <div v-else class="mintlify-menu-item" :class="{ 'is-active': isActive }">
    <MintlifyMenuItem
      :link="props.menu.link"
      :text="props.menu.name"
      :from-doc-tree="true"
    />
  </div>
</template>

<style scoped lang="stylus">
.mintlify-sub-menu
  position relative
  margin-bottom 4px

.mintlify-menu-item
  padding 4px 8px
  border-radius 4px
  cursor pointer
  transition all 0.2s ease

  &:hover
    background-color rgba(30, 64, 175, 0.1)
    color #1e40af

.is-active
  color #1e40af !important
  background-color rgba(30, 64, 175, 0.1) !important
  font-weight 600

.mintlify-sub-menu-children
  margin-top 4px
  padding-left 16px

// Dark mode styles
html[data-theme-mode="dark"] &
  .mintlify-menu-item
    &:hover
      background-color rgba(51, 153, 255, 0.1)

  .is-active
    color #3399ff !important
    background-color rgba(51, 153, 255, 0.1) !important
</style>