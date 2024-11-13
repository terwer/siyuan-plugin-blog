<template>
  <div class="sidebar">
    <button class="expand-collapse-btn" @click="toggleAll">
      {{ props.allExpanded ? t("page.sidebar.expand.all") : t("page.sidebar.collapse.all") }}
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

<script setup lang="ts">
import { computed, defineEmits, defineProps, watch } from "vue"
import SidebarItem from "~/components/static/SidebarItem.vue"

const { t } = useI18n()

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
const buildTree = (list: any[], parentId = "", depth = 1): any => {
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
  const itemData = props.treeData
  return itemData && itemData.length > 0 ? buildTree(itemData) : []
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

onMounted(() => {})
</script>

<style lang="stylus" scoped>
//.sidebar
//  background-color #f0f0f0

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
</style>
