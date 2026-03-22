<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup lang="ts">
import { useColorMode } from "@vueuse/core"
import { debounce } from "lodash-unified"

const emit = defineEmits<{
  toggleThemeMode:[key: "auto"|"light"|"dark"]
}>()

const props = defineProps<{defaultMode?: "auto"|"light"|"dark"}>()

const formData = reactive({
  // 返回顶部
  threshold: 100,
  scrollTop: 0,

  // 评论
  showCommentBut: false,
  commentTop: 0,

  // 主题模式
  showModeBox: false,
  currentMode: "",
  modeList: [
    // {
    //   name: "跟随系统",
    //   icon: "icon-zidong",
    //   KEY: "auto"
    // },
    {
      name: "浅色模式",
      icon: "icon-rijianmoshi",
      KEY: "light"
    },
    {
      name: "深色模式",
      icon: "icon-yejianmoshi",
      KEY: "dark"
    },
  ],
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

const scrollToComment = () => {
  // window.scrollTo({ top: formData.commentTop, behavior: "smooth" })
  // formData._textareaEl = document.querySelector(formData.COMMENT_SELECTOR_1 + " textarea") || document.querySelector(formData.COMMENT_SELECTOR_2 + " input") || document.querySelector(formData.COMMENT_SELECTOR_3 + " textarea")
  // if (formData._textareaEl && getScrollTop() !== formData._recordScrollTop) {
  //   document.addEventListener("scroll", formData._handleListener)
  // } else if (formData._textareaEl && getScrollTop() === _recordScrollTop) {
  //   _handleFocus()
  // }
}

const getCommentTop = () => {
  // setTimeout(() => {
  //   let commentEl = document.querySelector(formData.COMMENT_SELECTOR_1) || document.querySelector(formData.COMMENT_SELECTOR_2) || document.querySelector(formData.COMMENT_SELECTOR_3)
  //   if (commentEl) {
  //     formData.showCommentBut = props.post.comment !== false
  //     formData.commentTop = commentEl.offsetTop - 58
  //   }
  // }, 500)
}

// 获取实际的主题模式（将 auto 转换为 light/dark）
const getActualMode = (mode: string): "light" | "dark" => {
  if (mode === "auto") {
    // 检测系统主题偏好
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  }
  return mode as "light" | "dark"
}

// 使用 vueuse 的 color mode store
const { store: colorModeStore } = useColorMode()

const toggleMode = (key: string) => {
  formData.currentMode = key
  if (key === "auto") {
    // auto 模式：检测系统主题并设置实际值
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const actualMode = systemPrefersDark ? "dark" : "light"
    colorModeStore.value = actualMode
    // 刷新页面以应用新主题
    window.location.reload()
  } else {
    // light/dark 模式：直接设置
    colorModeStore.value = key
    emit("toggleThemeMode", key)
  }
}

onMounted(() => {
  formData.scrollTop = getScrollTop()
  window.addEventListener("scroll", debounce(() => {
    formData.scrollTop = getScrollTop()
  }, 100), true)

  // 设置初始模式
  const initialMode = props.defaultMode ?? "auto"
  formData.currentMode = initialMode
  
  // 如果初始是 auto，检测系统主题并刷新
  if (initialMode === "auto") {
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const actualMode = systemPrefersDark ? "dark" : "light"
    colorModeStore.value = actualMode
    // 刷新页面以应用新主题
    window.location.reload()
    return
  }
  
  // 监听系统主题变化
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
  mediaQuery.addEventListener("change", (e) => {
    // 自动同步系统主题变化
    const newMode = e.matches ? "dark" : "light"
    colorModeStore.value = newMode
    emit("toggleThemeMode", newMode)
  })
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
      <!--
      <div
        v-show="formData.showCommentBut"
        title="去评论"
        class="button blur go-to-comment iconfont icon-pinglun"
        @click="scrollToComment"
      />
      -->
      <div
        title="主题模式"
        class="button blur theme-mode-but iconfont icon-zhuti"
        @mouseenter="()=>{formData.showModeBox=true}"
        @mouseleave="()=>{formData.showModeBox=false}"
        @click="()=>{formData.showModeBox=true}"
      >
        <transition name="mode">
          <ul
            v-show="formData.showModeBox"
            ref="modeBox"
            class="select-box"
            @click.stop
            @touchstart.stop
          >
            <li
              v-for="item in formData.modeList"
              :key="item.KEY"
              class="iconfont"
              :class="[item.icon, { active: item.KEY === formData.currentMode }]"
              @click="toggleMode(item.KEY)"
            >
              &nbsp;{{ item.name }}
            </li>
          </ul>
        </transition>
      </div>
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
