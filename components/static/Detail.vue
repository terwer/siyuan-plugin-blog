<template>
  <div class="app-layout">
    <aside class="sidebar">
      <button class="expand-collapse-btn" @click="toggleAll">
        {{ allExpanded ? "Collapse All" : "Expand All" }}
      </button>
      <SidebarItem
        v-for="item in items"
        :key="item.id"
        :item="item"
        :expanded-ids="expandedIds"
        :max-depth="3"
        :all-expanded="allExpanded"
        @update-expanded-ids="updateExpandedIds"
        @select="handleSelect"
      />
    </aside>
    <main class="main">main</main>
    <aside class="outline">
      <Outline :items="outlineItems" />
    </aside>
  </div>
</template>

<script setup lang="ts">
import SidebarItem from "~/components/static/SidebarItem.vue"
import Outline from "~/components/static/Outline.vue"

const treeData = ref([])

const defaultExpandedIds = ref(["5", "7"])
const expandedIds = ref([] as any)
const maxDepth = ref(6)
const allExpanded = ref(false)
const currentItem = ref(null)

const outlineItems = ref()

// 构建树形数据
const buildTree = (list: any[], parentId = null, depth = 1): any => {
  if (!list || !Array.isArray(list)) return []

  return list
    .filter((item: any) => item.parentId === parentId)
    .map((item: any) => {
      return {
        ...item,
        depth,
        children: depth < maxDepth.value ? buildTree(list, item.id, depth + 1) : [],
      }
    })
}

const items = computed(() => {
  return Array.isArray(treeData.value) && treeData.value.length > 0 ? buildTree(treeData.value) : []
})

const addParentIds = (data: any) => {
  const map = new Map()

  data.forEach((item: any) => map.set(item.id, item))

  function getParentIds(item: any) {
    const parentIds = []
    let parent = map.get(item.parentId)
    while (parent) {
      parentIds.unshift(parent.id)
      parent = map.get(parent.parentId)
    }
    return parentIds
  }

  data.forEach((item: any) => {
    item.parentIds = getParentIds(item)
  })
  return data
}

// 更新展开的项
const updateExpandedIds = (newExpandedIds: any) => {
  expandedIds.value = newExpandedIds
}

// 处理项的选择
const handleSelect = (item: any) => {
  currentItem.value = item
  outlineItems.value = generateOutline(item)
}

// 生成大纲
const generateOutline = (item: any) => {
  return item.children || []
}

// 切换所有项的展开/收起
const toggleAll = () => {
  allExpanded.value = !allExpanded.value
  expandedIds.value = allExpanded.value ? treeData.value.map((item: any) => item.id) : []
}

const chainExpandedIds = (expandedIds: string[]): string[] => {
  // 获取所有 parentIds，同时包括 expandedIds 中的 ID，并去重
  const parentIds = [
    ...new Set(
      treeData.value
        .filter((item: any) => expandedIds.includes(item.id))
        .map((item: any) => item.parentIds)
        // 扁平化 parentIds 数组
        .flat()
    ),
    // 将 expandedIds 中的 ID 加入结果
    ...expandedIds,
  ]

  // 去重并按升序排序
  return [...new Set(parentIds)].sort()
}

// Initialize tree data
treeData.value = addParentIds([
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

onMounted(() => {
  expandedIds.value = chainExpandedIds(defaultExpandedIds.value)
  console.warn("expandedIds=>", expandedIds.value)

  console.log("outlineItems=>", outlineItems.value)
})
</script>

<style lang="stylus" scoped>
.app-layout {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 250px;
  background-color: #fafafa;
  border-right: 1px solid #f0f0f0;
  overflow-y: auto;
}

.expand-collapse-btn {
  width: 100%;
  padding: 10px;
  background-color: #1890ff;
  color: white;
  border: none;
  cursor: pointer;
  text-align: center;
}

.main {
  flex: 1;
  overflow-y: auto;
}

.outline {
  width: 200px;
  overflow-y: auto;
}
</style>
