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
import SidebarMenu from "~/components/static/content/left/SidebarMenu.vue"

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
  if (isFromDocTree.value) {
    // 从文档树过来，展开所有相关节点
    return TreeUtils.chainExpandedIds(treeData, [props.post.postid])
  }
  // 默认情况，保持原有行为（展开当前文档路径）
  return TreeUtils.chainExpandedIds(treeData, [props.post.postid])
})
const maxDepth = props.post?.docTreeLevel ?? 3
const defaultDocPath = props.setting.docPath ?? "x"

// 构建树形数据（仅用于渲染，不应用深度限制，因为后端已处理）
const buildTreeForRendering = (list: any[], parentId: string): any[] => {
  if (!list || !Array.isArray(list)) {
    return []
  }

  return list
    .filter((item: any) => item.parentId === parentId)
    .map((item: any) => ({
      ...item,
      link: `/${defaultDocPath}/${item.id}`,
      children: buildTreeForRendering(list, item.id),
    }))
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
    return buildTreeForRendering(completedData, parentId)
  } else {
    return []
  }
})

</script>

<template>
  <el-scrollbar class="sidebar-container">
    <!-- 顶部标题 -->
    <div class="sidebar-header">
      {{ t("static.docTree") }}
    </div>
    <!-- 菜单部分 -->
    <el-menu class="sidebar-menu" :default-openeds="expandedIds" :default-active="activeIndex">
      <SidebarMenu v-for="menu in items" :key="menu.id" :menu="menu" :active-index="activeIndex" />
    </el-menu>
  </el-scrollbar>
</template>

<style lang="stylus">
:root
  --el-menu-item-height 40px
</style>
<style scoped lang="stylus">
.sidebar-container
  min-width 220px
  max-width 250px
  border-right 1px solid var(--el-menu-border-color)

.sidebar-header
  margin-top: 20px
  font-size 16px
  font-weight bold
  //text-align center
  margin-left 20px
  padding 10px 0
  //border-bottom 1px solid var(--el-menu-border-color)

.sidebar-menu
  border none
:deep(ul[role="menu"])
  li.is-active:not(.is-opened)
    background-color var(--el-menu-hover-bg-color)
    //&:hover
    //  background-color unset
</style>
