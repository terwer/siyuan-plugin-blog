<template>
  <ul>
    <li v-for="subItem in item.children" :key="subItem.id" @click="selectItem(subItem)">
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
</script>

<style lang="stylus" scoped>
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
