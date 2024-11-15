<template>
  <div>
    <div class="outline-title">
      <a class="outline-title-link"> {{ "文档大纲" }} </a>
    </div>
    <div v-for="(item, index) in outlineData" :key="index">
      <outline-item :item="item" :max-depth="maxDepth" :root-level="getRootLevel(item)" :is-root="true" />
    </div>
  </div>
</template>

<script setup>
import OutlineItem from "~/components/static/OutlineItem.vue"

const props = defineProps({
  outlineData: {
    type: Array,
    required: true,
  },
  maxDepth: {
    type: Number,
    default: -1,
  },
})

const getRootLevel = () => {
  if (props.outlineData.length === 0) return 1 // 如果数据为空，返回默认级别 1

  const levels = props.outlineData.map((item) => getItemLevel(item))
  const uniqueLevels = new Set(levels)

  if (uniqueLevels.size === 1) {
    // 所有项的级别相同，返回该级别
    return levels[0]
  } else {
    // 返回最小的级别
    return Math.min(...levels)
  }
}
const getItemLevel = (item) => {
  const level = parseInt(item.subType.replace("h", ""), 10)
  return isNaN(level) ? 1 : level // 默认级别为1
}

onMounted(() => {})
</script>

<style lang="stylus" scoped>
.outline-title
  margin-bottom 0.5rem
  .outline-title-link
    text-decoration none
    color #333
    font-weight 600
</style>
