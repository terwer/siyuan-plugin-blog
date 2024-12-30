<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup lang="ts">
import { debounce } from "lodash-unified"

const formData = reactive({
  threshold: 100,
  scrollTop: 0
})

const showToTop = computed(() => {
  return formData.scrollTop > formData.threshold
})

const scrollToTop = () => {
  // window.scrollTo({ top: 0, behavior: "smooth" })
  document.body.scrollTo({ top: 0, behavior: "smooth" })
  formData.scrollTop = 0
}

const getScrollTop = () => {
  return window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop || 0
}

onMounted(() => {
  formData.scrollTop = getScrollTop()
  window.addEventListener("scroll", debounce(() => {
    formData.scrollTop = getScrollTop()
  }, 100), true)
})
</script>

<template>
  <div class="buttons">
    <client-only>
      <transition name="fade">
        <div
          v-show="showToTop"
          title="返回顶部"
          class="button blur go-to-top iconfont icon-fanhuidingbu"
          @click="scrollToTop"
        />
      </transition>
    </client-only>
  </div>
</template>

<style scoped lang="stylus">
@import "../../assets/css/theme/index.styl"

.yellowBorder
  // border: #FFE089 1px solid!important
  border-radius 5px
  box-shadow 0 0 15px #FFE089 !important

.buttons
  position fixed
  right 2rem
  bottom 2.5rem
  z-index 11
  @media (max-width $MQNarrow)
    right 1rem
    bottom 1.5rem

  .button
    width 2.2rem
    height 2.2rem
    line-height 2.2rem
    border-radius 50%
    box-shadow 0 2px 6px rgba(0, 0, 0, 0.15)
    margin-top 0.9rem
    text-align center
    cursor pointer
    transition all 0.5s
    background var(--blurBg)

    &.hover
      background $accentColor
      box-shadow 0 0 15px $accentColor

      &:before
        color #fff
    @media (any-hover hover)
      &:hover
        background $accentColor
        box-shadow 0 0 15px $accentColor

        &:before
          color #fff

    .select-box
      margin 0
      padding 0.8rem 0
      position absolute
      bottom 0rem
      right 1.5rem
      background var(--mainBg)
      border 1px solid var(--borderColor)
      width 120px
      border-radius 6px
      box-shadow 0 0 15px rgba(255, 255, 255, 0.2)

      li
        list-style none
        line-height 2rem
        font-size 0.95rem

        &:hover
          color $accentColor

        &.active
          background-color rgba(150, 150, 150, 0.2)
          color $accentColor

.mode-enter-active, .mode-leave-active
  transition all 0.3s

.mode-enter, .mode-leave-to
  opacity 0
  transform scale(0.8)

.fade-enter-active, .fade-leave-active
  transition opacity 0.2s

.fade-enter, .fade-leave-to
  opacity 0
</style>
