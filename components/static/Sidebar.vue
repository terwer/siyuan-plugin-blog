<template>
  <div class="sidebar">
    <ul>
      <li v-for="item in items" :key="item.id" @click="toggleItem(item.id)">
        {{ item.name }}
        <ul v-if="isOpen(item.id) && (depth < maxDepth || maxDepth === -1)">
          <SidebarItem
            :item="item"
            :open-items="openItems"
            :depth="depth + 1"
            :max-depth="maxDepth"
            @item-selected="selectItem"
          />
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue"
import { PropType } from "vue"
import SidebarItem from "./SidebarItem.vue"

const props = defineProps({
  modelValue: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  items: {
    type: Array as PropType<{ id: string; name: string; children?: { id: string; name: string; children?: any }[] }[]>,
    default: () => [],
  },
  defaultOpen: {
    type: String,
    default: undefined,
  },
  maxDepth: {
    type: Number,
    default: -1, // -1 表示不限制深度
  },
})

const emit = defineEmits(["update:modelValue", "itemSelected"])

const openItems = ref(props.modelValue)

const depth = 0 // 初始化 depth 为 0

const isOpen = (id: string) => openItems.value.includes(id)

const toggleItem = (id: string) => {
  if (isOpen(id)) {
    openItems.value = openItems.value.filter((i) => i !== id)
  } else {
    openItems.value.push(id)
  }
}

const selectItem = (item: { name: string; content: string }) => {
  emit("itemSelected", item)
}

const openAllParents = (id: string, path: string[]) => {
  for (let i = path.length - 1; i >= 0; i--) {
    const parentId = path[i]
    if (!openItems.value.includes(parentId)) {
      openItems.value.push(parentId)
    }
  }
  if (!openItems.value.includes(id)) {
    openItems.value.push(id)
  }
}

const findPathToId = (id: string, items: any[], path: string[]): string[] | null => {
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (item.id === id) {
      return [...path, item.id]
    }
    if (item.children && item.children.length > 0) {
      const childPath = findPathToId(id, item.children, [...path, item.id])
      if (childPath) {
        return childPath
      }
    }
  }
  return null
}

watch(
  () => props.defaultOpen,
  (newVal) => {
    if (newVal !== undefined) {
      const path = findPathToId(newVal, props.items, [])
      if (path) {
        openAllParents(newVal, path)
      }
    }
  },
  { immediate: true }
)

watch(openItems, (newVal) => {
  emit("update:modelValue", newVal)
})
</script>

<style lang="stylus" scoped>
.sidebar
  width 250px
  background-color #f4f4f9
  padding 15px

  ul
    list-style-type none
    padding 0

  li
    cursor pointer
    padding 8px 0
    border-bottom 1px solid #ddd

    &:hover
      background-color #e0e0e0
</style>
