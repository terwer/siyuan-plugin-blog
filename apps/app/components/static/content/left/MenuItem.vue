<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2025 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<template>
  <div class="menu-item-content" :data-doc-id="props.dataDocId" @click.stop="handleItemClick">
    <el-tooltip v-if="shouldShowTooltip" :content="text" effect="dark" trigger="hover" placement="right">
      <span class="menu-title">{{ displayText }}</span>
    </el-tooltip>
    <span v-else class="menu-title" :class="statusClass">{{ displayText }}</span>
    <span v-if="showPasswordBadge" class="status-badge password-badge">(有密码)</span>
    <span v-if="showExpiredBadge" class="status-badge expired-badge">(已过期)</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  link: string;
  text: string;
  fromDocTree?: boolean; // 是否从文档树过来
  isShared?: boolean; // 是否已分享
  hasPassword?: boolean; // 是否有密码
  isExpired?: boolean; // 是否已过期
  dataDocId?: string; // 文档 ID，用于精确查找激活项
}

const props = defineProps<Props>()

// 中文字符计为 1，其他字符计为 0.5
const calculateTextLength = (text: string) => {
  let length = 0
  for (const char of text) {
    length += /[\u4E00-\u9FA5]/.test(char) ? 1 : 0.5
  }
  return length
}

// 根据限制截取文本
const MAX_LENGTH = 20 // 汉字上限 20，英文字符约 40
const shouldShowTooltip = computed(() => calculateTextLength(props.text) > MAX_LENGTH)
const truncatedText = computed(() => {
  if (!shouldShowTooltip.value) { return props.text }
  let length = 0
  let result = ""
  for (const char of props.text) {
    length += /[\u4E00-\u9FA5]/.test(char) ? 1 : 0.5
    if (length > MAX_LENGTH) { break }
    result += char
  }
  return result + "..."
})

// 未分享的文档显示为占位节点
const displayText = computed(() => {
  if (props.isShared === false) {
    return "..."
  }
  return shouldShowTooltip.value ? truncatedText.value : props.text
})

// 状态徽章显示控制
const showPasswordBadge = computed(() => props.hasPassword === true && props.isShared === true)
const showExpiredBadge = computed(() => props.isExpired === true && props.isShared === true)

// 状态样式类
const statusClass = computed(() => ({
  'text-warning': props.hasPassword === true && props.isShared === true,
  'text-danger': props.isExpired === true && props.isShared === true
}))

// 是否可点击（未分享的文档不可点击）
const isClickable = computed(() => props.isShared !== false)

// 暴露给父组件调用
const handleItemClick = async () => {
  // 未分享的文档 - 直接返回，不执行任何操作
  if (props.isShared === false) {
    return
  }

  // 3. 已过期的文档 - 提示并阻止跳转
  if (props.isExpired === true) {
    ElMessage.error('该文档已过期，无法访问')
    return
  }

  // 2. 有密码的文档 - confirm 确认
  if (props.hasPassword === true) {
    try {
      await ElMessageBox.confirm(
        '当前文档需要密码验证，是否继续访问？',
        '密码保护',
        {
          confirmButtonText: '继续访问',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
      // 用户确认，继续跳转
    } catch {
      // 用户取消，阻止跳转
      return
    }
  }

  let finalLink = props.link

  // 如果是从文档树过来的链接，添加查询参数
  if (props.fromDocTree) {
    const url = new URL(finalLink, window.location.origin)
    url.searchParams.set('from', 'docTree')
    finalLink = url.pathname + url.search
  }

  await navigateTo(finalLink)
}

// 暴露方法给父组件
defineExpose({
  handleItemClick
})
</script>

<style scoped lang="stylus">
.menu-item-content
  display flex
  align-items center
  width 100%
  height 100%
  min-height 36px /* 更紧凑 */
  cursor pointer
  // 扩展点击区域到左侧，覆盖 el-menu-item 的 padding 区域
  margin-left -16px /* 调整对齐 */
  padding-left 16px

// 不可点击的节点样式
.not-clickable
  cursor default
  pointer-events none

.menu-title
  display inline-block
  overflow hidden
  white-space nowrap
  text-overflow ellipsis
  word-break break-word
  max-width 200px
  font-size 12.5px /* 更小的字体 */
  line-height 1.4 /* 更紧凑的行高 */

// 状态颜色
.text-warning
  color #E6A23C !important

.text-danger
  color #F56C6C !important

// 状态徽章
.status-badge
  font-size 11px
  margin-left 4px

.password-badge
  color #E6A23C

.expired-badge
  color #F56C6C
</style>
