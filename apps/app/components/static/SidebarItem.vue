<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<!--suppress ALL -->
<template>
  <div class="sidebar-item" :style="{ paddingLeft: depth * 2 + 'px' }">
    <div class="item-title" @click="toggle">
      <span v-if="item.children.length" class="toggle-icon">
        <el-icon>
          <template v-if="isExpanded">
            <ArrowDown />
          </template>
          <template v-else>
            <ArrowUp />
          </template>
        </el-icon>
      </span>
      <span v-else class="toggle-icon">
        <el-icon><Minus /></el-icon>
      </span>
      <router-link :to="`/x/${item.id}`" class="item-link">
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
        @update-expanded-ids="emitUpdateExpandedIds"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowDown, ArrowUp, Minus } from "@element-plus/icons-vue"

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  depth: {
    type: Number,
    default: 1,
  },
  expandedIds: {
    type: Array,
    default: () => [],
  },
  maxDepth: {
    type: Number,
    default: -1,
  },
  allExpanded: Boolean,
})

// 定义触发事件的接口
const emit = defineEmits(["select", "update-expanded-ids"])

const isExpanded = ref(false)

// 更新展开状态
const updateIsExpanded = () => {
  if (props.allExpanded) {
    isExpanded.value = true
  } else {
    isExpanded.value = props.expandedIds.includes(props.item.id)
  }
}

onMounted(() => {
  updateIsExpanded()
})

watch(
  () => props.expandedIds,
  () => {
    updateIsExpanded()
  },
  { immediate: true }
)

watch(
  () => props.allExpanded,
  () => {
    updateIsExpanded()
  },
  { immediate: true }
)

const emitUpdateExpandedIds = (newExpandedIds: any[]) => {
  emit("update-expanded-ids", newExpandedIds)
}

// 切换展开/收起状态
const toggle = () => {
  isExpanded.value = !isExpanded.value
  const id = props.item.id
  if (isExpanded.value) {
    // 触发事件，传递展开项的ID
    emit("update-expanded-ids", [...props.expandedIds, id])
  } else {
    emit(
      "update-expanded-ids",
      props.expandedIds.filter((itemId) => itemId !== id)
    )
  }
}

const handleSelect = (item: any) => {
  emit("select", item)
}
</script>

<style lang="stylus" scoped>
.sidebar-item
  padding 4px
  font-size 14px
  color #333
  cursor pointer
  transition background-color 0.3s
  // 禁用父级元素的 hover 效果
  //pointer-events none
  &:hover
    background-color #f0f0f0

.item-title
  display flex
  align-items center
  cursor pointer  // 使得标题部分本身可点击
  //&:hover
  //  background-color #f0f0f0
  //// 启用标题的 hover 效果
  //pointer-events auto

.toggle-icon
  margin-right 6px
  margin-top 2px
  ::v-deep(.el-icon)
    width 0.62rem
    height 0.62rem

.item-link
  text-decoration none
  color #1890ff

.nested-items
  padding-left 16px
</style>
