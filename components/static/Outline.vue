<template>
  <div class="outline">
    <ul>
      <li v-for="item in outlineItems" :key="item.id" @click="scrollToSection(item.id)">
        <span>{{ item.title }}</span>
        <Outline
          v-if="item.children && item.depth < maxDepth"
          :outline-items="item.children"
          :max-depth="maxDepth"
          @scroll-to-section="scrollToSection"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { type PropType } from "vue"

interface OutlineItem {
  id: string
  title: string
  depth: number
  children?: OutlineItem[]
}

const props = defineProps({
  outlineItems: {
    type: Array as PropType<OutlineItem[]>,
    required: true,
  },
  maxDepth: {
    type: Number,
    default: 3,
  },
})

const emit = defineEmits(["scroll-to-section"])

const scrollToSection = (id: string) => {
  emit("scroll-to-section", id)
}
</script>

<style lang="stylus" scoped>
.outline
  width 200px
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

    &:hover
      background-color #e0e0e0

    &.active
      background-color #e0e0e0

    span
      margin-left 10px

  ul ul
    margin-left 20px
</style>
