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

const logger = createAppLogger("left-sidebar")
const { t } = useI18n()

// 初始化文档树
const treeData = TreeUtils.addParentIds(props.post.docTree)
// 默认选中
const activeIndex = props.post.postid
// 默认展开的节点
const expandedIds = TreeUtils.chainExpandedIds(treeData, [props.post.postid])
const maxDepth = props.post?.docTreeLevel ?? 3
const defaultDocPath = props.setting.docPath ?? "x"
// 构建树形数据
const buildTree = (list: any[], parentId: string, depth = 1): any => {
  if (!list || !Array.isArray(list)) {
    return []
  }

  return list
    .filter((item: any) => item.parentId === parentId)
    .map((item: any) => ({
      ...item,
      depth,
      link: `/${defaultDocPath}/${item.id}`,
      children: depth < maxDepth ? buildTree(list, item.id, depth + 1) : [],
    }))
}
// 计算属性 items，用于构建树形结构
const items = computed(() => {
  const itemData = treeData
  if (itemData && itemData.length > 0) {
    let parentId = ""
    // 没有父亲的当做父节点
    itemData.forEach((item: any) => {
      if (!itemData.find((x: any) => x.id === item.parentId)) {
        parentId = item.parentId
      }
    })

    logger.info("found parentId=>", parentId)
    return buildTree(itemData, parentId)
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
      <SidebarMenu v-for="menu in items" :key="menu.id" :menu="menu" :max-depth="maxDepth" />
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
