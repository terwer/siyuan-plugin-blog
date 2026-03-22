<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup lang="ts">
import type AppConfig from "~/app.config"
import MintlifySidebarMenu from "~/components/static/content/left/MintlifySidebarMenu.vue"

const props = defineProps<{ post: any, setting: typeof AppConfig }>()

const route = useRoute()
const logger = createAppLogger("left-sidebar")
const { t } = useI18n()

// 初始化文档树
const treeData = TreeUtils.addParentIds(props.post.docTree)
// 默认选中
const activeIndex = props.post.postid
// 检查是否从文档树过来
const isFromDocTree = computed(() => {
  return route.query.from === 'docTree'
})

// 默认展开的节点
const expandedIds = computed(() => {
  const currentId = props.post.postid
  const ids = [currentId]

  // 如果从文档树过来，添加所有父节点ID
  if (isFromDocTree.value) {
    const docTreeMap = new Map(props.post.docTree.map((item: any) => [item.id, item]))
    let parentId = docTreeMap.get(currentId)?.parentId

    // 添加所有父节点
    while (parentId) {
      ids.push(parentId)
      parentId = docTreeMap.get(parentId)?.parentId
    }
  }

  return ids
})
const maxDepth = props.post?.docTreeLevel ?? 3
const defaultDocPath = props.setting.docPath ?? "x"

// 构建树形数据（仅用于渲染，不应用深度限制，因为后端已处理）
const buildTreeForRendering = (list: any[], parentId: string, depth: number = 0): any[] => {
  if (!list || !Array.isArray(list)) {
    return []
  }

  return list
    .filter((item: any) => item.parentId === parentId)
    .map((item: any) => {
      const children = buildTreeForRendering(list, item.id, depth + 1)

      return {
        ...item,
        link: `/${defaultDocPath}/${item.id}`,
        depth: depth,
        children: children.length > 0 ? children : undefined
      }
    })
}

// 计算属性 items，用于构建树形结构
const items = computed(() => {
  const itemData = treeData
  if (itemData && itemData.length > 0) {
    // 补全缺失的父节点
    const nodeMap = new Map(itemData.map(node => [node.id, node]))

    // 找出所有缺失的父节点
    const missingParents = new Set()
    itemData.forEach(node => {
      if (node.parentId && !nodeMap.has(node.parentId)) {
        missingParents.add(node.parentId)
      }
    })

    // 为缺失的父节点创建占位节点
    missingParents.forEach(parentId => {
      const placeholderNode = {
        id: parentId,
        parentId: "",
        name: `文档路径`,
        type: "placeholder",
        children: []
      }
      nodeMap.set(parentId, placeholderNode)
    })

    const completedData = Array.from(nodeMap.values())

    // 根节点的 parentId 应该是空字符串
    // 找到所有没有父节点的根节点（parentId 为空或在数据中找不到父节点）
    const rootNodes = completedData.filter(item => {
      return !item.parentId || !completedData.find(x => x.id === item.parentId)
    })

    // 如果有多个根节点，我们需要找到真正的根（parentId 为空的）
    const trueRoot = rootNodes.find(node => !node.parentId) || rootNodes[0]
    const parentId = trueRoot?.parentId || ""

    logger.info("found parentId=>", parentId)
    return buildTreeForRendering(completedData, parentId, 0)
  } else {
    return []
  }
})

</script>

<template>
  <div class="mintlify-sidebar-container">
    <!-- 顶部标题 -->
    <div class="mintlify-sidebar-header">
      {{ t("static.docTree") }}
    </div>
    <!-- 菜单部分 -->
    <div class="mintlify-sidebar-menu">
      <MintlifySidebarMenu v-for="menu in items" :key="menu.id" :menu="menu" :active-index="activeIndex" />
    </div>
  </div>
</template>

<style lang="stylus">
.mintlify-sidebar-container
  background-color #ffffff
  border-right 1px solid #eaeaea
  overflow-y auto
  min-width 240px
  max-width 320px
  height 100%
  font-family 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
  box-shadow 2px 0 6px rgba(0, 0, 0, 0.05)

  // Dark mode support
  html[data-theme-mode="dark"] &
    background-color #1e1e1e
    border-color #3a3a3a

.mintlify-sidebar-header
  padding 10px 16px
  font-size 12px
  font-weight 600
  color #6b7280
  text-transform uppercase
  letter-spacing 0.5px
  margin 0
  border-bottom 1px solid #eaeaea
  position sticky
  top 0
  background-color inherit
  z-index 10

.mintlify-sidebar-menu
  border none
  padding 16px

// Scrollbar styling
::-webkit-scrollbar
  width 6px

::-webkit-scrollbar-track
  background transparent

::-webkit-scrollbar-thumb
  background-color rgba(0, 0, 0, 0.15)
  border-radius 3px

html[data-theme-mode="dark"] ::-webkit-scrollbar-thumb
  background-color rgba(255, 255, 255, 0.2)
</style>