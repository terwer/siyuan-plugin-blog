<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2025 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup lang="ts">
import { defineProps, computed, ref } from "vue"
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

// 引用 MenuItem 组件
const menuItemRef = ref<InstanceType<typeof MenuItem> | null>(null)

// 处理菜单项点击，触发子组件的跳转逻辑
const handleMenuClick = () => {
  // 调用 MenuItem 的跳转方法
  menuItemRef.value?.handleItemClick()
}
</script>

<template>
  <el-sub-menu
    v-if="props.menu.children?.length"
    :index="props.menu.id"
    :class="{ 'is-active': isActive }"
  >
    <template #title>
      <div class="menu-item-wrapper" @click.stop="handleMenuClick">
        <MenuItem ref="menuItemRef" :link="props.menu.link" :text="props.menu.name" :from-doc-tree="true" />
      </div>
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
    :class="{ 'is-active': isActive, 'menu-item-fullwidth': true }"
    @click.stop="handleMenuClick"
  >
    <MenuItem ref="menuItemRef" :link="props.menu.link" :text="props.menu.name" :from-doc-tree="true" />
  </el-menu-item>
</template>

<style scoped lang="stylus">
// 菜单项包装器，占满整个可点击区域
.menu-item-wrapper
  display flex
  align-items center
  width 100%
  height 100%

// 让 el-menu-item 的内容占满整个区域，同时保留左侧缩进
:deep(.menu-item-fullwidth)
  position relative
  // 保留 Element Plus 默认的 padding 用于左侧缩进
  // 但让内部内容通过负 margin 覆盖整个点击区域
  > div
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    display flex
    align-items center
    padding-left 20px

// 高亮当前激活的菜单项
:deep(.is-active)
  background-color var(--el-menu-hover-bg-color) !important
  color var(--el-color-primary) !important

  // 确保子菜单标题也高亮
  .el-sub-menu__title
    background-color var(--el-menu-hover-bg-color) !important
    color var(--el-color-primary) !important
</style>
