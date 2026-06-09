<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup lang="ts">
const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  toggleSidebar: [state:boolean]
}>()

const toggleSidebar = () => {
  emit("toggleSidebar", !props.visible)
}
</script>

<template>
  <div
    :class="{'sidebar-button': true, 'sidebar-button-active': props.visible, 'sidebar-button-hidden': !props.visible}"
    title="目录"
    @click="toggleSidebar"
  >
    <svg
      class="icon"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      viewBox="0 0 448 512"
    >
      <path
        fill="currentColor"
        d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"
        class
      />
    </svg>
  </div>
</template>

<style scoped lang="stylus">
@import "../../../../assets/css/theme/index.styl"

.sidebar-button
  cursor pointer
  display none
  width 1.25rem
  height 1.25rem
  position absolute
  padding 0.6rem
  top 0.6rem
  left 1rem
  @media (max-width $MQMobile)
    display block
  .icon
    display block
    width 1.25rem
    height 1.25rem
@media (min-width ($MQMobile + 1px))
  $mobileSidebarWidth = $sidebarWidth * 0.82
  .sidebar-button
    width 40px
    height 40px
    display inline-block
    position fixed
    left 0
    //top ($navbarHeight + 1rem)
    top 1.2rem
    text-align center
    line-height 44px
    margin 5px 8px
    color #888
    border-radius 50%
    padding 0
    // transition left 0.2s ease
    transition all .2s
    &:hover
      background $accentColor
      color #fff
      box-shadow 0 0 6px $accentColor
    .icon
      display inline
      width 1rem
      height 1rem

.sidebar-button-active
  left 14.5rem
  z-index 99
  background: var(--b3-protyle-inline-link-color);
  color #dcdcdc
  box-shadow: 0 0 6px var(--b3-protyle-inline-link-color);

@media (max-width: 768px)
  .sidebar-button
    position fixed
    top calc(50% - 84px)
    left auto
    right 8px
    transform none
    margin 0
    background var(--b3-theme-background, var(--el-bg-color, #fff))
    border 1px solid var(--b3-border-color, var(--el-border-color-light, rgba(0, 0, 0, 0.08)))
    box-shadow 0 2px 8px rgba(0, 0, 0, 0.08)
    z-index 4201

  .sidebar-button-active
    left auto
    right 8px
    z-index 4201
</style>
