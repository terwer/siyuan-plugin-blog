<!--
  PostMeta - 文档元信息栏
  设计参考：飞书文档、FlowUs、语雀的标题下方元信息区域
  - 显示发布/更新日期、阅读时长
  - AI 功能入口按钮
  - 完全独立模块，Main.vue 仅做一行调用
-->

<script setup lang="ts">
import { Calendar, Clock, Reading } from "@element-plus/icons-vue"
import { useReadingTime } from "~/composables/useReadingTime"

const props = defineProps<{
  post: any
}>()

const { t, locale } = useI18n()

// ========== 阅读时间 ==========
const htmlSource = computed(() => props.post?.editorDom ?? "")
const { readingTime } = useReadingTime(htmlSource)
const readingText = computed(() =>
  locale.value.startsWith("zh") ? readingTime.value.displayTextZh : readingTime.value.displayTextEn
)

// ========== 日期显示 ==========
const formatDate = (dateStr: string | number | undefined): string => {
  if (!dateStr) return ""
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return ""
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

const publishDate = computed(() => formatDate(props.post?.date ?? props.post?.dateCreated))
const updateDate = computed(() => formatDate(props.post?.dateUpdated ?? props.post?.updated))

// 只显示更新日期（若与发布日期相同则不重复显示）
const showUpdateDate = computed(() =>
  updateDate.value && updateDate.value !== publishDate.value
)
</script>

<template>
  <div class="post-meta">
    <!-- 左侧：日期 + 阅读时间 -->
    <div class="meta-left">
      <!-- 发布日期 -->
      <span v-if="publishDate" class="meta-item">
        <el-icon class="meta-icon">
          <Calendar />
        </el-icon>
        <span class="meta-text">{{ publishDate }}</span>
      </span>

      <!-- 更新日期（仅在不同时显示，用时钟图标，不用铅笔） -->
      <span v-if="showUpdateDate" class="meta-item meta-item--updated">
        <el-icon class="meta-icon">
          <Clock />
        </el-icon>
        <span class="meta-text">{{ updateDate }}</span>
      </span>

      <!-- 分隔线 -->
      <span v-if="publishDate" class="meta-divider" aria-hidden="true" />

      <!-- 阅读时间 -->
      <span class="meta-item">
        <el-icon class="meta-icon">
          <Reading />
        </el-icon>
        <span class="meta-text">{{ readingText }}</span>
      </span>
    </div>

    <!-- 右侧：预留功能按钮区域 -->
    <div class="meta-actions">
      <!-- AI 按钮已移至右侧悬浮按钮组，与大纲按钮垂直排列 -->
    </div>
  </div>
</template>

<style lang="stylus" scoped>
/* ===== 元信息容器 ===== */
.post-meta
  display flex
  align-items center
  justify-content space-between
  padding 8px 32px 12px
  /* 与标题/正文的左右边距保持一致（32px） */
  gap 12px
  flex-wrap wrap

/* ===== 左侧元数据 ===== */
.meta-left
  display flex
  align-items center
  gap 12px
  flex-wrap wrap

.meta-item
  display inline-flex
  align-items center
  gap 4px
  font-size 12.5px
  color var(--text-color-secondary, #8a8f99)
  letter-spacing 0.01em
  line-height 1.4
  white-space nowrap

.meta-item--updated
  opacity 0.8

.meta-icon
  font-size 13px
  flex-shrink 0
  vertical-align middle
  margin-top -1px

.meta-text
  font-variant-numeric tabular-nums

.meta-divider
  display inline-block
  width 1px
  height 12px
  background currentColor
  opacity 0.2
  vertical-align middle

/* ===== 右侧功能按钮 ===== */
.meta-actions
  display flex
  align-items center
  justify-content center
  gap 6px
  /* 确保与左侧元信息垂直对齐 */
  height 100%

.action-btn
  display inline-flex
  align-items center
  gap 5px
  padding 4px 10px
  border-radius 6px
  border 1px solid var(--border-color, rgba(0, 0, 0, 0.1))
  background transparent
  cursor pointer
  font-size 12px
  font-family inherit
  color var(--text-color-secondary, #8a8f99)
  line-height 1.4
  transition all 0.18s ease
  white-space nowrap
  /* 与 Element Plus 按钮视觉层级一致 */
  -webkit-appearance none

.action-btn:hover
  background var(--el-fill-color-light, rgba(0, 0, 0, 0.04))
  color var(--text-color-primary, #1f2329)
  border-color var(--el-border-color, rgba(0, 0, 0, 0.15))

.action-btn:active
  transform scale(0.97)

/* ===== 暗色模式适配 ===== */
:global(.dark) .post-meta,
:global([data-theme-mode="dark"]) .post-meta
  .meta-item
    color rgba(255, 255, 255, 0.45)
  
  .action-btn
    border-color rgba(255, 255, 255, 0.1)
    color rgba(255, 255, 255, 0.45)
  
  .action-btn:hover
    background rgba(255, 255, 255, 0.06)
    color rgba(255, 255, 255, 0.82)
    border-color rgba(255, 255, 255, 0.18)

/* ===== 移动端适配 ===== */
@media (max-width: 768px)
  .post-meta
    padding 6px clamp(8px, 2.8vw, 12px) 10px
    gap 8px
  
  .meta-left
    gap 8px
</style>
