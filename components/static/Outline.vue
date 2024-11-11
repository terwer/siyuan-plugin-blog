<template>
  <div class="outline">
    <OutlineItem v-for="(item, index) in filteredOutline" :key="index" :item="item" :max-depth="maxDepth" />
  </div>
</template>

<script setup>
import OutlineItem from "./OutlineItem.vue"

const props = defineProps({
  items: Array,
  maxDepth: {
    type: Number,
    default: 6,
  },
})

const filteredOutline = computed(() => {
  // 过滤掉超过 maxDepth 的标题
  const filterItems = (items, depth = 1) =>
    items
      .filter((item) => depth <= props.maxDepth)
      .map((item) => ({
        ...item,
        children: filterItems(item.children || [], depth + 1),
      }))
  return filterItems(props.items)
})
</script>

<style lang="stylus" scoped>
.outline
  padding 10px
  background-color #fafafa
  border-left 1px solid #f0f0f0
</style>
