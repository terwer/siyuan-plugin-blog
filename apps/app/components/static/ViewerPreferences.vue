<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2026 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup lang="ts">
import { Setting } from "@element-plus/icons-vue"

const props = defineProps<{
  siteLinkHoverPreviewEnabled?: boolean
  sitePostMetaEnabled?: boolean
  themeMenuOpen?: boolean
}>()

const emit = defineEmits<{
  open: []
}>()

const { preferences, setLinkHoverPreview, setPostMeta } = useViewerPreferences()

const HINT_SHOWN_KEY = "siyuan-blog-viewer-preferences-hint-shown"

const isClientMounted = ref(false)
const showPanel = ref(false)
const showHint = ref(false)
const buttonRef = ref<HTMLElement | null>(null)
const hintStyle = ref<Record<string, string>>({})
let hintTimer: number | null = null

// 站点没有开启对应能力时，不在偏好面板里显示这一项
const siteLinkHoverPreviewEnabled = computed(() => props.siteLinkHoverPreviewEnabled !== false)
const sitePostMetaEnabled = computed(() => props.sitePostMetaEnabled !== false)

const linkHoverPreviewEnabled = computed({
  get: () => preferences.linkHoverPreview,
  set: (enabled: boolean) => setLinkHoverPreview(enabled),
})

const postMetaEnabled = computed({
  get: () => preferences.postMeta,
  set: (enabled: boolean) => setPostMeta(enabled),
})

const updateHintPosition = () => {
  const rect = buttonRef.value?.getBoundingClientRect()
  if (!rect) {
    return
  }

  hintStyle.value = {
    left: `${rect.right + 12}px`,
    bottom: `${Math.max(16, window.innerHeight - rect.bottom)}px`,
  }
}

const hideHint = () => {
  showHint.value = false
  if (hintTimer) {
    window.clearTimeout(hintTimer)
    hintTimer = null
  }
  window.removeEventListener("resize", updateHintPosition)
}

// 面板显示时立刻隐藏提示，避免提示盖住设置面板
watch(showPanel, (visible) => {
  if (visible) {
    hideHint()
  }
})

const togglePanel = () => {
  hideHint()
  showPanel.value = !showPanel.value
  if (showPanel.value) {
    emit("open")
  }
}

const openPanelFromHint = () => {
  hideHint()
  showPanel.value = true
  emit("open")
}

// 主题菜单和偏好面板同在左下角，避免两个浮层叠在一起
watch(
  () => props.themeMenuOpen,
  (open) => {
    if (open) {
      showPanel.value = false
      hideHint()
    }
  }
)

onMounted(() => {
  isClientMounted.value = true

  // 移动端不显示偏好按钮，也不显示提示
  if (window.matchMedia("(max-width: 768px)").matches) {
    return
  }

  if (!siteLinkHoverPreviewEnabled.value && !sitePostMetaEnabled.value) {
    return
  }

  try {
    if (window.localStorage.getItem(HINT_SHOWN_KEY) === "true") {
      return
    }
  } catch {
    // 本地存储不可用时仍然展示一次
  }

  hintTimer = window.setTimeout(() => {
    try {
      window.localStorage.setItem(HINT_SHOWN_KEY, "true")
    } catch {
      // 本地存储不可用时每次访问展示一次
    }

    showHint.value = true
    nextTick(updateHintPosition)
    window.addEventListener("resize", updateHintPosition)

    hintTimer = window.setTimeout(() => {
      hideHint()
    }, 4500)
  }, 600)
})

onUnmounted(() => {
  hideHint()
})
</script>

<template>
  <div class="preferences-entry">
    <div
      ref="buttonRef"
      class="button blur preferences-but"
      role="button"
      tabindex="0"
      title="阅读偏好"
      aria-label="阅读偏好"
      :aria-expanded="showPanel"
      @click.stop="togglePanel"
      @keydown.enter.prevent="togglePanel"
      @keydown.space.prevent="togglePanel"
    >
      <el-icon class="preferences-icon"><Setting /></el-icon>
    </div>

    <transition name="mode">
      <div
        v-if="isClientMounted && showPanel"
        class="preferences-panel"
        role="dialog"
        aria-label="阅读偏好"
        @click.stop
        @touchstart.stop
      >
        <div class="preferences-title">阅读偏好</div>

        <label v-if="siteLinkHoverPreviewEnabled" class="preference-row">
          <span class="preference-name">链接悬浮预览</span>
          <el-switch v-model="linkHoverPreviewEnabled" size="small" />
        </label>

        <label v-if="sitePostMetaEnabled" class="preference-row">
          <span class="preference-name">文档信息栏</span>
          <el-switch v-model="postMetaEnabled" size="small" />
        </label>

        <div v-if="!siteLinkHoverPreviewEnabled && !sitePostMetaEnabled" class="preference-empty">
          当前分享没有可调整的阅读偏好
        </div>
      </div>
    </transition>

    <Teleport to="body">
      <transition name="hint">
        <div
          v-if="isClientMounted && showHint"
          class="preferences-hint"
          :style="hintStyle"
          role="status"
          @click.stop="openPanelFromHint"
        >
          在这里可以调整阅读偏好啦。
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<style scoped lang="stylus">
@import "../../assets/css/theme/index.styl"

.preferences-entry
  position relative

.preferences-but
  display flex
  align-items center
  justify-content center
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
  color #bbb

  @media (any-hover hover)
    &:hover
      background $accentColor
      box-shadow 0 0 15px $accentColor
      color #fff

  &:focus-visible
    outline 2px solid $accentColor
    outline-offset 2px

.preferences-icon
  font-size 16px

.preferences-panel
  position absolute
  bottom 0
  left 2.8rem
  width 200px
  max-width calc(100vw - 4rem)
  padding 12px 14px
  box-sizing border-box
  background var(--mainBg)
  border 1px solid var(--borderColor)
  border-radius 6px
  box-shadow 0 0 15px rgba(255, 255, 255, 0.2)
  color var(--textColor)
  text-align left
  z-index 20

.preferences-title
  margin-bottom 10px
  font-size 14px
  font-weight 600

.preference-row
  display flex
  align-items center
  justify-content space-between
  gap 10px
  cursor pointer

  & + .preference-row
    margin-top 9px

.preference-name
  font-size 13px
  white-space nowrap

.preference-empty
  font-size 12px
  color var(--textColor)
  opacity 0.75

.preferences-hint
  position fixed
  z-index 60
  max-width 240px
  padding 8px 12px
  box-sizing border-box
  background var(--mainBg)
  border 1px solid var(--borderColor)
  border-radius 6px
  box-shadow 0 0 15px rgba(255, 255, 255, 0.2)
  color var(--textColor)
  font-size 12px
  line-height 1.5
  white-space nowrap
  cursor pointer

  &::before
    content ""
    position absolute
    left -5px
    top 50%
    width 8px
    height 8px
    margin-top -4px
    background var(--mainBg)
    border-left 1px solid var(--borderColor)
    border-bottom 1px solid var(--borderColor)
    transform rotate(45deg)

.hint-enter-active, .hint-leave-active
  transition opacity 0.2s

.hint-enter, .hint-leave-to
  opacity 0

.mode-enter-active, .mode-leave-active
  transition all 0.3s

.mode-enter, .mode-leave-to
  opacity 0
  transform scale(0.8)

@media (max-width: 768px)
  .preferences-entry
    display none
</style>
