<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2025 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<template>
  <div class="menu-item-content" @click.stop="handleItemClick">
    <el-tooltip v-if="shouldShowTooltip" :content="text" effect="dark" trigger="hover" placement="right">
      <span class="menu-title">{{ truncatedText }}</span>
    </el-tooltip>
    <span v-else class="menu-title">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"

interface Props {
  link: string;
  text: string;
  fromDocTree?: boolean; // 是否从文档树过来
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

// 暴露给父组件调用
const handleItemClick = async () => {
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
  min-height 40px
  cursor pointer
  // 扩展点击区域到左侧，覆盖 el-menu-item 的 padding 区域
  margin-left -20px
  padding-left 20px

.menu-title
  display inline-block
  overflow hidden
  white-space nowrap
  text-overflow ellipsis
  word-break break-word
  max-width 200px
</style>
