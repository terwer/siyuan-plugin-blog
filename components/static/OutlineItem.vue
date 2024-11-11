<template>
  <div :style="{ paddingLeft: (item.level - 1) * 16 + 'px' }" class="outline-item">
    <a @click.prevent="scrollToSection(item.id)" class="item-link">
      {{ item.title }}
    </a>
    <div v-if="item.children && item.level < maxDepth" class="nested-items">
      <OutlineItem v-for="(child, index) in item.children" :key="index" :item="child" :max-depth="maxDepth" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: Object,
  maxDepth: Number,
})

const scrollToSection = (id) => {
  const element = document.getElementById(id)
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
  cursor pointer // 改为 pointer
  transition color 0.2s // 增加渐变效果

.item-link:hover
  color #1890ff
  font-weight bold

.nested-items
  margin-left 10px
</style>
