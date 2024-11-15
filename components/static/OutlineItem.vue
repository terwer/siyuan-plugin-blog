<template>
  <div :style="{ marginLeft: getFirstMargin(item) + 'px' }" class="outline-item">
    <!-- 第一级 -->
    <div v-if="getItemLevel(item) === 1 || isRoot" class="nested-items">
      <a class="item-link" @click.prevent="scrollToSection(item.id)">
        {{ adjustItemName(item.name) }}
      </a>
      <div v-if="getItemLevel(item) < maxDepth">
        <outline-item v-for="(child, index) in item.blocks" :key="index" :item="child" :max-depth="maxDepth" />
      </div>
    </div>

    <!-- 其他级别且有子项 -->
    <div v-else-if="Array.isArray(item.children) && item.children.length > 0" class="nested-items">
      <a class="item-link" @click.prevent="scrollToSection(item.id)">
        {{ adjustItemName(item.content) }}
      </a>
      <div v-if="getItemLevel(item) < maxDepth">
        <outline-item v-for="(child, index) in item.children" :key="index" :item="child" :max-depth="maxDepth" />
      </div>
    </div>

    <!-- 无子项 -->
    <div v-else>
      <div v-if="getItemLevel(item) < maxDepth">
        <a class="item-link" @click.prevent="scrollToSection(item.id)">
          {{ adjustItemName(item.content) }}
        </a>
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
  isRoot: {
    type: Boolean,
    default: false,
  },
  rootLevel: {
    type: Number,
    default: 1,
  },
})

const getFirstMargin = (item) => {
  const level = getItemLevel(item)
  if (props.rootLevel === 1) {
    return (level - 1) * 16
  } else {
    return (level - props.rootLevel + 1) * 16
  }
}

const adjustItemName = (name) => {
  // &nbsp;处理、换行符处理、:：处理
  let adjustedName = name
    .replace(/&nbsp;/g, " ")
    .replace(/\n/g, " ")
    .replace(/：/g, "")
    .replace(/:/g, "")
    .replace(/,/g, "")

  // 处理 HTML 标签，保留标签内的文本
  adjustedName = adjustedName.replace(/<[^>]+>/g, (match) => {
    const textContent = match.match(/>([\s\S]*?)</)
    return textContent ? textContent[1] : ""
  })

  return adjustedName
}

const getItemLevel = (item) => {
  const level = parseInt(item.subType.replace("h", ""), 10)
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
