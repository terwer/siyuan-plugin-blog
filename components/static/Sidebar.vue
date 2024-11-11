<template>
  <div class="sidebar">
    <ul>
      <li
        v-for="item in items"
        :key="item.id"
        :title="item.id"
        :class="{ open: isOpen(item.id) }"
        @click="toggleItem(item.id)"
      >
        <span class="icon" :class="{ 'icon-folder': item.children, 'icon-file': !item.children }"></span>
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
import { type PropType, ref, watch } from "vue"
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
  box-shadow 2px 0 5px rgba(0, 0, 0, 0.1)

  ul
    list-style-type none
    padding 0

  li
    cursor pointer
    padding 8px 16px
    border-bottom 1px solid #ddd
    transition background-color 0.3s

    &.open
      background-color #e0e0e0

    &:hover
      background-color #e0e0e0

    .icon
      display inline-block
      width 16px
      height 16px
      margin-right 8px
      background-size contain
      background-repeat no-repeat

    .icon-folder
      background-image url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 0h-4l-2-2H4v12h16V6z"/></svg>')

    .icon-file
      background-image url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>')
</style>
