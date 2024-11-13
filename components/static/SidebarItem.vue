<template>
  <div class="sidebar-item" :style="{ paddingLeft: depth * 16 + 'px' }">
    <div class="item-title" @click="toggle">
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
        @update-expanded-ids="emitUpdateExpandedIds"
      />
    </div>
  </div>
</template>

<script setup>
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

const emitUpdateExpandedIds = (newExpandedIds) => {
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

const handleSelect = (item) => {
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

  &:hover
    background-color #f0f0f0

.item-title
  display flex
  align-items center

.toggle-icon
  margin-right 8px

.item-link
  text-decoration none
  color #1890ff

.nested-items
  padding-left 16px
</style>
