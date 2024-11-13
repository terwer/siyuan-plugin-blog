<script setup lang="ts">
import { defineProps, defineEmits, computed, watch } from "vue"
import SidebarItem from "~/components/static/SidebarItem.vue"

const props = defineProps({
  treeData: {
    type: Array,
    required: true,
  },
  maxDepth: {
    type: Number,
    default: -1, // -1 表示不限制深度
  },
  allExpanded: {
    type: Boolean,
    default: false,
  },
  expandedIds: {
    type: Array,
    default: () => [],
  },
})

// 定义 emit 用于更新父组件的状态
const emit = defineEmits(["update-expanded-ids", "update-all-expanded"])

// 构建树形数据
const buildTree = (list: any[], parentId = null, depth = 1): any => {
  if (!list || !Array.isArray(list)) return []

  return list
    .filter((item: any) => item.parentId === parentId)
    .map((item: any) => ({
      ...item,
      depth,
      children: depth < props.maxDepth ? buildTree(list, item.id, depth + 1) : [],
    }))
}

// 计算属性 items，用于构建树形结构
const items = computed(() => {
  return props.treeData && props.treeData.length > 0 ? buildTree(props.treeData) : []
})

// 监听 expandedIds 变化并向父组件 emit 更新
watch(
  () => props.expandedIds,
  (newExpandedIds) => {
    emit("update-expanded-ids", newExpandedIds)
  }
)

// 监听 allExpanded 变化并向父组件 emit 更新
watch(
  () => props.allExpanded,
  (newAllExpanded) => {
    emit("update-all-expanded", newAllExpanded)
  }
)

// 切换展开/收起所有项
const toggleAll = () => {
  const newAllExpanded = !props.allExpanded
  emit("update-all-expanded", newAllExpanded)

  const newExpandedIds = newAllExpanded ? items.value.map((item: any) => item.id) : []
  emit("update-expanded-ids", newExpandedIds)
}
</script>

<template>
  <div class="sidebar">
    <button class="expand-collapse-btn" @click="toggleAll">
      {{ props.allExpanded ? "Collapse All" : "Expand All" }}
    </button>
    <sidebar-item
      v-for="item in items"
      :key="item.id"
      :item="item"
      :expanded-ids="props.expandedIds"
      :max-depth="props.maxDepth"
      :all-expanded="props.allExpanded"
      @update-expanded-ids="(newExpandedIds) => emit('update-expanded-ids', newExpandedIds)"
    />
  </div>
</template>

<style lang="stylus" scoped>
.sidebar-item
  padding 10px
  font-size 14px
  color #333
  cursor pointer
  transition background-color 0.3s

  &:hover
    background-color #f0f0f0

.item-title
  display flex
  align-items center

.expand-collapse-btn
  width 100%
  padding 12px
  margin-bottom 6px
  background-color #1890ff
  color white
  border none
  cursor pointer
  text-align center
  border-radius 4px
  font-size 14px
  transition background-color 0.3s

  &:hover
    background-color #40a9ff

.toggle-icon
  margin-right 8px

.item-link
  text-decoration none
  color #1890ff

.nested-items
  padding-left 16px
</style>
