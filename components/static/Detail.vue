<template>
  <div class="app-layout">
    <aside class="sidebar">
      <button class="expand-collapse-btn" @click="toggleAll">
        {{ allExpanded ? "Collapse All" : "Expand All" }}
      </button>
      <SidebarItem
        v-for="(item, index) in nestedTreeData"
        :key="index"
        :item="item"
        :expanded-ids="expandedIds"
        :all-expanded="allExpanded"
        :max-depth="maxDepth"
        @select="handleSelect"
      />
    </aside>
    <main class="main">main</main>
    <aside class="outline">
      <Outline :items="outlineItems" />
    </aside>
  </div>
</template>

<script setup>
import SidebarItem from "~/components/static/SidebarItem.vue"
import Outline from "~/components/static/Outline.vue"

const treeData = ref([
  { id: "1", parentId: null, name: "Section 1" },
  { id: "2", parentId: "1", name: "Subsection 1.1" },
  { id: "3", parentId: "1", name: "Subsection 1.2" },
  { id: "4", parentId: null, name: "Section 2" },
  { id: "5", parentId: "4", name: "Subsection 2.1" },
  { id: "6", parentId: "3", name: "Subsection 1.2.1" },
  { id: "7", parentId: "3", name: "Subsection 1.2.2" },
])

const expandedIds = ref([])
const maxDepth = ref(3)
const allExpanded = ref(false)
const currentItem = ref(null)
const outlineItems = ref([
  { id: "section-1", title: "Introduction", level: 1 },
  {
    id: "section-1-1",
    title: "What is Vue",
    level: 2,
    children: [
      { id: "section-1-1-1", title: "Vue Basics", level: 3 },
      {
        id: "section-1-1-2",
        title: "Vue Lifecycle",
        level: 3,
        children: [{ id: "section-1-1-2-1", title: "Lifecycle Hooks", level: 4 }],
      },
    ],
  },
  {
    id: "section-2",
    title: "Advanced Topics",
    level: 1,
    children: [
      { id: "section-2-1", title: "Reactivity", level: 2 },
      {
        id: "section-2-2",
        title: "Composition API",
        level: 2,
        children: [{ id: "section-2-2-1", title: "Setup Function", level: 3 }],
      },
    ],
  },
])

const buildTree = (list, parentId = null, depth = 1) => {
  return list
    .filter((item) => item.parentId === parentId)
    .map((item) => ({
      ...item,
      depth,
      children: depth < maxDepth.value ? buildTree(list, item.id, depth + 1) : [],
    }))
}

const nestedTreeData = computed(() => buildTree(treeData.value))

const handleSelect = (item) => {
  currentItem.value = item
  outlineItems.value = generateOutline(item)
}

const generateOutline = (item) => {
  return item.children || []
}

// 控制所有项的展开/收起
const toggleAll = () => {
  allExpanded.value = !allExpanded.value
  expandedIds.value = allExpanded.value ? treeData.value.map((item) => item.id) : []
}
</script>

<style lang="stylus" scoped>
.app-layout
  display flex
  height 100vh

.sidebar
  width 250px
  background-color #fafafa
  border-right 1px solid #f0f0f0
  overflow-y auto

.expand-collapse-btn
  width 100%
  padding 10px
  background-color #1890ff
  color white
  border none
  cursor pointer
  text-align center

.main
  flex 1
  overflow-y auto

.outline
  width 200px
  overflow-y auto
</style>
