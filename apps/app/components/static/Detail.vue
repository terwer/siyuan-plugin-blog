<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2023-2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script lang="ts" setup>
import {JsonUtil, ObjectUtil} from "zhi-common"
import {checkExpires, getSummery} from "~/utils/utils"
import {useStaticSettingStore} from "~/stores/useStaticSettingStore"
import {useServerAssets} from "~/plugins/libs/renderer/useServerAssets"
import AppConfig from "~/app.config"
import Sidebar from "~/components/static/Sidebar.vue";
import Outline from "~/components/static/Outline.vue";
import {Expand, Fold} from "@element-plus/icons-vue"

const logger = createAppLogger("static-share-page")
const {docId} = useDocId()
const {t} = useI18n()
const {providerMode} = useProviderMode()
const {fetchPostMeta} = useAuthModeFetch()
const {getStaticSetting} = useStaticSettingStore()
const {getFirstImageSrc} = useServerAssets()

// props
const props = defineProps({
  showTitleSign: {
    type: Boolean,
    default: false
  },
  overrideSeo: {
    type: Boolean,
    default: false
  },
  pageId: {
    type: String,
    default: undefined,
  }, setting: {
    type: typeof AppConfig,
    default: undefined
  }
} as any)

// datas
const id = props.pageId ?? docId
const formData = reactive({
  post: {} as any,
  setting: {} as any,
  shareEnabled: true,
  isExpires: false,
  isShared: true,
})
const getPostData = async () => {
  try {
    const resText = await fetchPostMeta(id, providerMode)
    const currentPost = JsonUtil.safeParse<any>(resText, {} as any)
    logger.info("currentPost=>", currentPost)
    formData.post = currentPost
    formData.shareEnabled = !ObjectUtil.isEmptyObject(formData.post)
    // logger.info("post=>", formData.post)
    // logger.info(`shareEnabled=>${formData.shareEnabled}`)

    const attrs = JsonUtil.safeParse<any>(formData.post?.attrs ?? "{}", {})
    formData.isExpires = checkExpires(attrs)
  } catch (e) {
    formData.isShared = false
  }
}
const getSetting = async () => {
  let currentSetting = props.setting
  // 防止重复请求
  if (!props.setting) {
    currentSetting = await getStaticSetting()
  }
  logger.info("currentSetting=>", currentSetting)
  // 默认没有设置的时候应该显示
  if (isDev) {
    // 开发阶段开启所有模式
    formData.setting.docTreeEnabled = true
    formData.setting.outlineEnabled = true
  } else {
    formData.setting.docTreeEnabled = currentSetting?.docTreeEnabled ?? true
    formData.setting.outlineEnabled = currentSetting?.outlineEnabled ?? true
  }
}
await getPostData()
await getSetting()

// SEO
if (!props.overrideSeo) {
  const titleSign = " - " + t("blog.share")
  const title = `${formData?.post?.title ?? "404 Not Found"}${props.showTitleSign ? titleSign : ""}`
  const desc = getSummery(formData?.post?.description ?? "")
  const headImage = getFirstImageSrc(formData?.post?.description ?? "")
  const seoMeta = {
    title: title,
    ogTitle: title,
    description: desc,
    ogDescription: desc,
  } as any
  if (headImage) {
    logger.info("get a head image from doc=>", headImage)
    seoMeta.ogImage = headImage
  }
  useSeoMeta(seoMeta)
}
// 正文
const editorDom = formData.post.editorDom?.replaceAll('contenteditable="true"', 'contenteditable="false"') ?? ""
const VNode = () =>
    h("div", {
      class: "",
      innerHTML: editorDom,
    })

// docTree
const treeData = ref([] as any)
const maxDepth = ref(formData.post?.docTreeLevel ?? 3)
const allExpanded = ref(false)
const defaultExpandedIds = ref([id])
const expandedIds = ref([] as any)
const isSidebarVisible = ref(false)
// outline
const outlineData = ref([] as any)
const outlineMaxDepth = ref(formData.post?.outlineLevel ?? 6)

// 处理 expandedIds 的更新
const handleUpdateExpandedIds = (newExpandedIds: number[]) => {
  expandedIds.value = newExpandedIds
}

// 处理 allExpanded 的更新
const handleUpdateAllExpanded = (newAllExpanded: boolean) => {
  allExpanded.value = newAllExpanded
}

const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value
}

// 初始化文档树
treeData.value = TreeUtils.addParentIds(formData.post.docTree)
expandedIds.value = TreeUtils.chainExpandedIds(treeData.value, defaultExpandedIds.value)
// 初始化大纲
outlineData.value = formData.post.outline ?? []
</script>

<template>
  <div v-if="!formData.shareEnabled">
    <el-empty :description="t('blog.index.no.permission')">
    </el-empty>
  </div>
  <div v-else-if="formData.isExpires">
    <el-empty :description=" t('blog.index.no.expires') ">
    </el-empty>
  </div>
  <div v-else-if="!formData.isShared">
    <el-empty :description=" t('blog.index.no.shared') ">
    </el-empty>
  </div>
  <div v-else class="app-container">
    <el-aside v-if="formData.setting.docTreeEnabled && treeData && treeData.length > 0">
      <!-- 固定的图标 -->
      <div class="sidebar-toggle" @click="toggleSidebar">
        <el-icon v-if="isSidebarVisible">
          <Expand/>
        </el-icon>
        <el-icon v-else>
          <Fold/>
        </el-icon>
      </div>
      <div v-if="isSidebarVisible" class="sidebar-container" :class="{ 'sidebar-hidden': !isSidebarVisible }">
        <sidebar
            :tree-data="treeData"
            :max-depth="maxDepth"
            :all-expanded="allExpanded"
            :expanded-ids="expandedIds"
            @update-expanded-ids="handleUpdateExpandedIds"
            @update-all-expanded="handleUpdateAllExpanded"
        />
      </div>
    </el-aside>
    <el-main class="main">
      <!-- 分享正文 -->
      <div class="fn__flex-1 protyle" data-loading="finished">
        <static-header :setting="formData.setting"/>
        <div class="protyle-content protyle-content--transition" data-fullwidth="true">
          <div class="protyle-title protyle-wysiwyg--attr">
            <div
                contenteditable="false"
                data-position="center"
                spellcheck="false"
                class="protyle-title__input"
                data-render="true"
            >
              {{ formData.post.title }}
            </div>
          </div>
          <div
              v-highlight
              v-sbeauty
              v-sdomparser
              class="protyle-wysiwyg protyle-wysiwyg--attr"
              spellcheck="false"
              contenteditable="false"
              data-doc-type="NodeDocument"
              :data-page-id="id"
          >
            <VNode/>
          </div>
        </div>
        <static-footer :setting="formData.setting"/>
      </div>
    </el-main>
    <el-aside v-if="formData.setting.outlineEnabled && outlineData && outlineData.length > 0" class="floating-toc">
      <outline :outline-data="outlineData" :max-depth="outlineMaxDepth"/>
    </el-aside>
  </div>
</template>

<style lang="stylus" scoped>
.app-container
  display flex
  flex-direction column
  height 100vh

.main
  flex 1
  overflow-y auto
  padding 0
  box-sizing border-box
  scrollbar-width none /* Firefox */
  -ms-overflow-style none /* IE 和 Edge */
  background-clip padding-box /* 确保背景只在内容区域 */
  /* 隐藏滚动条的同时保留滚动功能 */

  ::-webkit-scrollbar
    display none

/* Chrome 和 Safari */
//.protyle-content
//  margin-top 44px

// sidebar
.sidebar-toggle
  position fixed
  top 24px
  left 14px
  z-index 2000
  //background-color #fff
  //border 1px solid #ddd
  //box-shadow 0 2px 4px rgba(0, 0, 0, 0.1)
  padding 10px
  cursor pointer
  transition transform 0.3s ease-in-out

  &:hover
    transform scale(1.1)

.sidebar-container
  min-width 180px
  max-width 350px
  background-color #fafafa
  border-right 1px solid #f0f0f0
  overflow-y auto
  box-shadow 4px 0 6px rgba(0, 0, 0, 0.1)
  padding 16px
  padding-left 24px
  transition transform 0.3s ease-in-out

.sidebar-hidden
  transform translateX(-100%)

// outline
.floating-toc
  position fixed
  top 20px
  right 20px
  min-width 200px
  max-width 350px
  background-color #fff
  border 1px solid #ddd
  padding 10px
  box-shadow 0 2px 4px rgba(0, 0, 0, 0.1)
  z-index 1000
  overflow-y auto
  /* 限制最大高度，防止内容超出屏幕 */
  max-height 80vh

  h3
    margin-top 0
    margin-bottom 10px

  ul
    list-style-type none
    padding 0
    margin 0

  li
    cursor pointer
    padding 5px 0
    transition background-color 0.3s

    &:hover
      background-color #f5f5f5
</style>