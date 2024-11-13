<template>
  <div class="app-layout">
    <aside class="sidebar-container">
      <sidebar
        :tree-data="treeData"
        :max-depth="maxDepth"
        :all-expanded="allExpanded"
        :expanded-ids="expandedIds"
        @update-expanded-ids="handleUpdateExpandedIds"
        @update-all-expanded="handleUpdateAllExpanded"
      />
    </aside>
    <main class="main">main</main>
    <aside class="outline">
      <Outline :items="outlineItems" />
    </aside>
  </div>
</template>

<script setup lang="ts">
import Outline from "~/components/static/Outline.vue"
import Sidebar from "~/components/static/Sidebar.vue"

const treeData = ref([])
const maxDepth = ref(6)
const allExpanded = ref(false)
const defaultExpandedIds = ref(["3"])
const expandedIds = ref([] as any)
const outlineItems = ref()

// 处理 expandedIds 的更新
const handleUpdateExpandedIds = (newExpandedIds: number[]) => {
  expandedIds.value = newExpandedIds
}

// 处理 allExpanded 的更新
const handleUpdateAllExpanded = (newAllExpanded: boolean) => {
  allExpanded.value = newAllExpanded
}

// 生成大纲
const generateOutline = (item: any) => {
  return item.children || []
}

treeData.value = TreeUtils.addParentIds([
  { id: "1", parentId: null, name: "Section 1" },
  { id: "2", parentId: "1", name: "Subsection 1.1" },
  { id: "3", parentId: "1", name: "Subsection 1.2" },
  { id: "4", parentId: null, name: "Section 2" },
  { id: "5", parentId: "4", name: "Subsection 2.1" },
  { id: "6", parentId: "3", name: "Subsection 1.2.1" },
  { id: "7", parentId: "3", name: "Subsection 1.2.2" },
])
outlineItems.value = [
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
]

// 初始化
expandedIds.value = TreeUtils.chainExpandedIds(treeData.value, defaultExpandedIds.value)

onMounted(() => {
  console.log("outlineItems=>", outlineItems.value)
})
</script>

<style lang="stylus" scoped>
.app-layout
  display flex
  height 100vh

.sidebar-container
  min-width 180px
  max-width 300px
  background-color #fafafa
  border-right 1px solid #f0f0f0
  overflow-y auto
  box-shadow 4px 0 6px rgba(0, 0, 0, 0.1)
  padding 16px

.main
  flex 1
  overflow-y auto
  padding 16px

.outline
  width 240px
  overflow-y auto
  padding 16px
  border-left 1px solid #f0f0f0
</style>
