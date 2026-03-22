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
import { computed, ref } from "vue"

const props = defineProps<{
  link: string
  text: string
  fromDocTree?: boolean
}>()

const route = useRoute()
const router = useRouter()

const isActive = computed(() => {
  if (!props.fromDocTree) {
    return route.path === props.link
  }
  return false
})

const handleClick = () => {
  if (props.fromDocTree) {
    // 从文档树点击，添加查询参数
    router.push({
      path: props.link,
      query: { from: "docTree" }
    })
  } else {
    router.push(props.link)
  }
}

// Hover 状态管理
const isHovered = ref(false)
const showTooltip = ref(false)

const handleMouseEnter = () => {
  isHovered.value = true
  // 延迟显示 tooltip，避免快速移动时闪烁
  setTimeout(() => {
    if (isHovered.value) {
      showTooltip.value = true
    }
  }, 300)
}

const handleMouseLeave = () => {
  isHovered.value = false
  showTooltip.value = false
}
</script>

<template>
  <a
    :href="link"
    class="mintlify-menu-link"
    :class="{ 'is-active': isActive }"
    @click.prevent="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    :title="text"
  >
    {{ text }}

    <!-- Tooltip 显示完整文本 -->
    <div
      v-if="showTooltip && text.length > 20"
      class="menu-tooltip"
    >
      {{ text }}
    </div>
  </a>
</template>

<style scoped lang="stylus">
.mintlify-menu-link
  color var(--mintlify-sidebar-text)
  text-decoration none
  display block
  width 100%
  height 100%
  padding 0 8px
  transition color 0.2s ease
  white-space nowrap
  overflow hidden
  text-overflow ellipsis
  position relative

  &:hover
    color var(--mintlify-sidebar-text-hover)

  &.is-active
    color var(--mintlify-sidebar-active-text) !important
    font-weight 600

  // Dark mode styles
  html[data-theme-mode="dark"] &
    color var(--mintlify-sidebar-text)
    &:hover
      color var(--mintlify-sidebar-text-hover)
    &.is-active
      color var(--mintlify-sidebar-active-text) !important

// Tooltip 样式
.menu-tooltip
  position absolute
  top -28px
  left 0
  background-color rgba(0, 0, 0, 0.8)
  color white
  padding 4px 8px
  border-radius 4px
  font-size 12px
  white-space nowrap
  z-index 1001
  pointer-events none
  max-width 280px
  word-break break-word
</style>