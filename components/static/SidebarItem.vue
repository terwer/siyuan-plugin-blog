<template>
  <ul>
    <li
      v-for="subItem in item.children"
      :key="subItem.id"
      :title="subItem.id"
      :class="{ open: isOpen(subItem.id) }"
      @click="selectItem(subItem)"
    >
      <span class="icon" :class="{ 'icon-folder': subItem.children, 'icon-file': !subItem.children }"></span>
      {{ subItem.name }}
      <ul v-if="subItem.children && subItem.children.length > 0 && (depth < maxDepth || maxDepth === -1)">
        <SidebarItem
          :item="subItem"
          :open-items="openItems"
          :depth="depth + 1"
          :max-depth="maxDepth"
          @item-selected="selectItem"
        />
      </ul>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { type PropType } from "vue"

const props = defineProps({
  item: {
    type: Object as PropType<{ id: string; name: string; children?: { id: string; name: string; children?: any }[] }>,
    required: true,
  },
  openItems: {
    type: Array as PropType<string[]>,
    required: true,
  },
  depth: {
    type: Number,
    required: true,
  },
  maxDepth: {
    type: Number,
    default: -1, // -1 表示不限制深度
  },
})

const emit = defineEmits(["itemSelected"])

const selectItem = (item: any) => {
  emit("itemSelected", item)
}

const isOpen = (id: string) => props.openItems.includes(id)
</script>

<style lang="stylus" scoped>
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
