<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<template>
  <div class="sidebar">
    <div class="sidebar-expand-toggle" @click="toggleAll">
      <el-icon v-if="props.allExpanded" :title="t('page.sidebar.collapse.all')">
        <ZoomOut />
      </el-icon>
      <el-icon v-else :title="t('page.sidebar.expand.all')">
        <ZoomIn />
      </el-icon>
    </div>
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
import { ZoomIn, ZoomOut } from "@element-plus/icons-vue"

const logger = createAppLogger("static-sidebar")
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
const buildTree = (list: any[], parentId: string, depth = 1): any => {
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
  if (itemData && itemData.length > 0) {
    let parentId = ""
    // 没有父亲的当做父节点
    itemData.forEach((item: any) => {
      if (!itemData.find((x: any) => x.id === item.parentId)) {
        parentId = item.parentId
      }
    })

    logger.info("found parentId=>", parentId)
    return buildTree(itemData, parentId)
  } else {
    return []
  }
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
.sidebar
  position relative
  padding 6px
  background-color #f0f0f0

.sidebar-expand-toggle
  position absolute
  top 6px
  right 6px
  cursor pointer
  display flex
  align-items center
  justify-content center
  width 24px
  height 24px
  background-color #d9d9d9
  color #606060
  border-radius 50%
  box-shadow 0 1px 4px rgba(0, 0, 0, 0.1)
  transition all 0.3s

  &:hover
    background-color #bfbfbf
    color #404040
</style>
