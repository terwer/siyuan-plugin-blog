<template>
  <div :style="{ marginLeft: (getItemLevel(item) - 1) * 16 + 'px' }" class="outline-item">
    <!-- 第一级 -->
    <div v-if="getItemLevel(item) === 1" class="nested-items">
      <a class="item-link" @click.prevent="scrollToSection(item.id)"> {{ item.name }} </a>
      <div v-if="getItemLevel(item) < maxDepth">
        <outline-item v-for="(child, index) in item.blocks" :key="index" :item="child" :max-depth="maxDepth" />
      </div>
    </div>

    <!-- 其他级别且有子项 -->
    <div v-else-if="Array.isArray(item.children) && item.children.length > 0" class="nested-items">
      <a class="item-link" @click.prevent="scrollToSection(item.id)"> {{ item.content }} </a>
      <div v-if="getItemLevel(item) < maxDepth">
        <outline-item v-for="(child, index) in item.children" :key="index" :item="child" :max-depth="maxDepth" />
      </div>
    </div>

    <!-- 无子项 -->
    <div v-else>
      <div v-if="getItemLevel(item) < maxDepth">
        <a class="item-link" @click.prevent="scrollToSection(item.id)"> {{ item.content }} </a>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  maxDepth: {
    type: Number,
    default: -1,
  },
})

const getItemLevel = (item) => {
  const level = parseInt(item.subType.replace("h", ""), 10)
  console.log(`level:${level}=>`, item)
  return isNaN(level) ? 1 : level // 默认级别为1
}

const scrollToSection = (id) => {
  // 使用 querySelector 根据 data-node-id 属性查找元素
  const element = document.querySelector(`[data-node-id="${id}"]`)
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" })
    // 使标题稍微高于屏幕中心
    window.scrollBy(0, -20) // 调整这个偏移量以适应具体需求
  }
}
</script>

<style lang="stylus" scoped>
.outline-item
  margin-bottom 8px

.item-link
  color #333
  text-decoration none
  cursor pointer
  transition color 0.2s

.item-link:hover
  color #1890ff
  font-weight bold

.nested-items
  margin-left 10px
</style>
