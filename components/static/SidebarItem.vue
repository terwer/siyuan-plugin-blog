<template>
  <div class="sidebar-item" :style="{ paddingLeft: depth * 16 + 'px' }">
    <div @click="toggle" class="item-title">
      <span v-if="item.children.length" class="toggle-icon">
        {{ isExpanded ? "▼" : "▶" }}
      </span>
      <router-link :to="`/document/${item.id}`" class="item-link">
        {{ item.name }}
      </router-link>
    </div>
    <div v-if="isExpanded && item.children.length && depth < maxDepth" class="nested-items">
      <SidebarItem
        v-for="(child, index) in item.children"
        :key="index"
        :item="child"
        :depth="depth + 1"
        :expanded-ids="expandedIds"
        :all-expanded="allExpanded"
        :max-depth="maxDepth"
        @select="handleSelect"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue"
import { defineProps, defineEmits } from "vue"

const props = defineProps({
  item: Object,
  depth: {
    type: Number,
    default: 1,
  },
  expandedIds: Array,
  maxDepth: Number,
  allExpanded: Boolean,
})

const emit = defineEmits(["select"])
const isExpanded = ref(false)

// 控制展开状态
watch(
  () => props.expandedIds,
  (newIds) => {
    isExpanded.value = newIds.includes(props.item.id)
  },
  { immediate: true }
)

watch(
  () => props.allExpanded,
  (newValue) => {
    isExpanded.value = newValue
  },
  { immediate: true }
)

const toggle = () => {
  isExpanded.value = !isExpanded.value
  const id = props.item.id
  if (isExpanded.value && !props.expandedIds.includes(id)) {
    props.expandedIds.push(id)
  } else if (!isExpanded.value) {
    const index = props.expandedIds.indexOf(id)
    if (index > -1) props.expandedIds.splice(index, 1)
  }
}

const handleSelect = (item) => {
  emit("select", item)
}
</script>

<style lang="stylus" scoped>
.sidebar-item
  cursor pointer

.item-title
  display flex
  align-items center

.toggle-icon
  font-weight bold
  margin-right 8px

.item-link
  color #000
  text-decoration none

.item-link:hover
  color #1890ff
  text-decoration underline

.nested-items
  margin-left 10px
</style>
