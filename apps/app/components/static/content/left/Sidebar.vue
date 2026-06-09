<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";
import type AppConfig from "~/app.config";
import SidebarMenu from "~/components/static/content/left/SidebarMenu.vue";

const props = defineProps<{ post: any, setting: typeof AppConfig }>()

const route = useRoute()
const logger = createAppLogger("left-sidebar")
const { t } = useI18n()

// 引用 el-scrollbar 组件
const scrollbarRef = ref<any>(null)

// 滚动到当前激活的菜单项
const scrollToActiveItem = (attempt = 0) => {
  const maxAttempts = 10
  const activeId = activeIndex.value

  nextTick(() => {
    setTimeout(() => {
      const scrollbar = scrollbarRef.value
      if (!scrollbar) {
        logger.warn("scrollbar not found")
        return
      }

      const wrap = scrollbar.wrapRef
      if (!wrap) {
        logger.warn("scrollbar wrap not found")
        return
      }

      // 使用精确的 ID 选择器查找当前文档对应的菜单项
      // 优先查找带有 data-doc-id 属性的元素
      let activeElement = document.querySelector(`[data-doc-id="${activeId}"]`) as HTMLElement

      // 如果没找到，尝试查找 el-menu-item 或 el-sub-menu 中 index 匹配的元素
      if (!activeElement) {
        activeElement = document.querySelector(`.sidebar-menu .el-menu-item[index="${activeId}"]`) as HTMLElement
      }
      if (!activeElement) {
        activeElement = document.querySelector(`.sidebar-menu .el-sub-menu[index="${activeId}"]`) as HTMLElement
      }

      // 如果仍然没找到，使用原来的备选方案（查找 is-active）
      if (!activeElement) {
        // 优先查找叶子节点（有 href 的）
        activeElement = document.querySelector(`.sidebar-menu .el-menu-item.is-active [href*="${activeId}"]`) as HTMLElement
      }
      if (!activeElement) {
        activeElement = document.querySelector(`.sidebar-menu .el-menu-item.is-active`) as HTMLElement
      }
      
      if (!activeElement) {
        logger.warn("active element not found, attempt:", attempt)
        if (attempt < maxAttempts) {
          // 重试，等待菜单展开
          scrollToActiveItem(attempt + 1)
        }
        return
      }
      
      // 获取元素相对于 wrap 的位置
      const elementRect = activeElement.getBoundingClientRect()
      const wrapRect = wrap.getBoundingClientRect()
      
      // 计算元素当前相对于 wrap 顶部的偏移
      const elementRelativeTop = elementRect.top - wrapRect.top
      const elementHeight = activeElement.offsetHeight
      const wrapHeight = wrap.clientHeight
      
      // 如果元素已经在可视区域内且接近中央，不需要滚动
      const isInViewport = elementRelativeTop >= 0 && elementRelativeTop + elementHeight <= wrapHeight
      const viewportCenter = wrapHeight / 2
      const elementCenter = elementRelativeTop + elementHeight / 2
      const isNearCenter = Math.abs(elementCenter - viewportCenter) < elementHeight
      
      if (isInViewport && isNearCenter && attempt > 0) {
        logger.info("element already in viewport center, skip scrolling")
        return
      }
      
      // 计算需要滚动的距离：使元素居中
      const scrollOffset = elementRelativeTop - (wrapHeight / 2) + (elementHeight / 2)
      const targetScrollTop = wrap.scrollTop + scrollOffset
      
      // 边界检查
      const maxScrollTop = wrap.scrollHeight - wrapHeight
      const finalScrollTop = Math.max(0, Math.min(targetScrollTop, maxScrollTop))
      
      logger.info("scrolling to:", finalScrollTop, "element top:", elementRelativeTop, "wrap height:", wrapHeight, "attempt:", attempt)
      
      // 使用 Element Plus 的 scrollTo 方法
      scrollbar.scrollTo({
        top: finalScrollTop,
        behavior: 'smooth'
      })
      
      // 再次验证滚动是否成功
      setTimeout(() => {
        const newRect = activeElement!.getBoundingClientRect()
        const newRelativeTop = newRect.top - wrapRect.top
        const isNowVisible = newRelativeTop >= 0 && newRelativeTop + elementHeight <= wrapHeight
        
        if (!isNowVisible && attempt < maxAttempts) {
          logger.info("element not visible after scroll, retrying...")
          scrollToActiveItem(attempt + 1)
        }
      }, 500)
    }, 300 + attempt * 100) // 递增延迟
  })
}

// 组件挂载后执行滚动
onMounted(() => {
  scrollToActiveItem()
})

// 初始化文档树
const treeData = TreeUtils.addParentIds(props.post.docTree)
// 默认选中
const activeIndex = props.post.postid
// 检查是否从文档树过来
const isFromDocTree = computed(() => {
  return route.query.from === 'docTree'
})

// 默认展开的节点 - 始终展开所有父节点，确保当前文档可见
const expandedIds = computed(() => {
  const currentId = props.post.postid
  const ids = [currentId]

  // 始终添加所有父节点ID，确保树结构展开
  const docTreeMap = new Map(props.post.docTree.map((item: any) => [item.id, item]))
  let parentId = docTreeMap.get(currentId)?.parentId

  // 添加所有父节点
  while (parentId) {
    ids.push(parentId)
    parentId = docTreeMap.get(parentId)?.parentId
  }

  return ids
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
      isShared: item.isShared,
      hasPassword: item.hasPassword,
      isExpired: item.isExpired,
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
        name: `...`,
        type: "placeholder",
        isShared: false,
        hasPassword: false,
        isExpired: false,
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
  <el-scrollbar ref="scrollbarRef" class="sidebar-container">
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
  font-family var(--b3-font-family, "Helvetica Neue", Arial, sans-serif)
  min-width 220px
  max-width 260px
  border-right 1px solid rgba(0, 0, 0, 0.06) /* 更淡的边框 */
  background var(--b3-theme-background, var(--el-bg-color, #fff))
  
  /* 更精致的滚动条 */
  :deep(.el-scrollbar__bar.is-vertical)
    width 3px
    
  :deep(.el-scrollbar__thumb)
    background rgba(0, 0, 0, 0.08)
    border-radius 2px
    
  :deep(.el-scrollbar__thumb:hover)
    background rgba(0, 0, 0, 0.15)

.sidebar-header
  margin-top 16px /* 更紧凑 */
  font-size 13px /* 更小的字体 */
  font-weight 600 /* 更粗的标题 */
  color var(--text-color-primary)
  margin-left 16px /* 更紧凑 */
  padding 8px 0 /* 更紧凑 */
  letter-spacing -0.01em /* 更紧凑的字间距 */

.sidebar-menu
  border none
  background transparent

@media (max-width: 768px)
  .sidebar-container
    width calc(100vw - 56px) !important
    max-width 460px !important
    min-width 0 !important
  
  /* 菜单项样式优化 - 适配亮色/暗色主题 */
  :deep(.el-menu-item)
    font-size 12.5px /* 更小的字体 */
    height 36px /* 更紧凑的高度 */
    line-height 36px
    color var(--el-text-color-regular)
    
  :deep(.el-sub-menu__title)
    font-size 12.5px
    height 36px
    line-height 36px
    color var(--el-text-color-regular)
    
  /* 激活状态 - 高亮明显 */
  :deep(.el-menu-item.is-active)
    color var(--el-color-primary)
    background var(--el-color-primary-light-8)
    font-weight 600
    
  /* 悬停状态 */
  :deep(.el-menu-item:hover)
    color var(--el-color-primary)
    
  :deep(.el-sub-menu__title:hover)
    color var(--el-color-primary)
</style>
