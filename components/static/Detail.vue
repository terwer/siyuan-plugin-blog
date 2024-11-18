<!--suppress ALL -->
<template>
  <div v-if="!formData.shareEnabled || formData.isExpires">
    <el-empty :description="formData.isExpires ? t('blog.index.no.expires') : t('blog.index.no.permission')">
    </el-empty>
  </div>
  <div v-else class="app-container">
    <aside v-if="formData.setting.docTreeEnabled && treeData && treeData.length > 0">
      <!-- 固定的图标 -->
      <div class="sidebar-toggle" @click="toggleSidebar">
        <el-icon v-if="isSidebarVisible">
          <Expand />
        </el-icon>
        <el-icon v-else>
          <Fold />
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
    </aside>
    <main class="main">
      <!-- 分享正文 -->
      <div class="fn__flex-1 protyle" data-loading="finished">
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
            <VNode />
          </div>
        </div>
      </div>
    </main>
    <aside v-if="formData.setting.outlineEnabled && outlineData && outlineData.length > 0" class="floating-toc">
      <outline :outline-data="outlineData" :max-depth="outlineMaxDepth" />
    </aside>
  </div>
</template>

<script setup lang="ts">
import { JsonUtil, ObjectUtil } from "zhi-common"
import { Post } from "zhi-blog-api"
import { createAppLogger } from "~/common/appLogger"
import { checkExpires, getSummery } from "~/utils/utils"
import { useServerAssets } from "~/plugins/renderer/useServerAssets"
import { useAuthModeFetch } from "~/composables/useAuthModeFetch"
import { useProviderMode } from "~/composables/useProviderMode"
import Sidebar from "~/components/static/Sidebar.vue"
import Outline from "~/components/static/Outline.vue"
import { Fold, Expand } from "@element-plus/icons-vue"
import AppConfig from "~/app.config"

// https://github.com/nuxt/nuxt/issues/15346
// 由于布局是个宏，静态构建情况下，不能动态设置，只能在前面的页面写死

// props
const props = defineProps({
  showTitleSign: Boolean,
  overrideSeo: Boolean,
  pageId: {
    type: String,
    default: undefined,
  },
})

const logger = createAppLogger("static-share-page")
const { t } = useI18n()
const route = useRoute()
const id = props.pageId ?? ((route.params.id ?? "") as string)
const { getFirstImageSrc } = useServerAssets()
const { fetchPostMeta } = useAuthModeFetch()
const { providerMode } = useProviderMode()
const { fetchConfig } = useAuthModeFetch()

// datas
const formData = reactive({
  post: {} as Post,
  setting: {} as any,
  shareEnabled: true,
  isExpires: false,
})

const getPostData = async () => {
  const resText = await fetchPostMeta(id, providerMode)
  const currentPost = JsonUtil.safeParse<Post>(resText, {} as Post)
  logger.info("currentPost=>", currentPost)
  formData.post = currentPost
  formData.shareEnabled = !ObjectUtil.isEmptyObject(formData.post)
  // logger.info("post=>", formData.post)
  // logger.info(`shareEnabled=>${formData.shareEnabled}`)

  const attrs = JsonUtil.safeParse<any>(formData.post?.attrs ?? "{}", {})
  formData.isExpires = checkExpires(attrs)
}
const getSetting = async () => {
  const resText = await fetchConfig(`static.app.config.json`, providerMode)
  const currentSetting = JsonUtil.safeParse<typeof AppConfig>(resText, {} as typeof AppConfig)
  logger.info("currentSetting=>", currentSetting)
  formData.setting = currentSetting
}
await getPostData()
await getSetting()

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
const editorDom = formData.post.editorDom?.replaceAll('contenteditable="true"', 'contenteditable="false"') ?? ""

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

const VNode = () =>
  h("div", {
    class: "",
    innerHTML: editorDom,
  })

onMounted(() => {})
</script>

<style lang="stylus" scoped>
.app-container
  display flex
  height 100vh

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

.main {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 和 Edge */
}

.main::-webkit-scrollbar {
  /* 隐藏滚动条（Chrome 和 Safari）*/
  display: none;
}

.floating-toc
  position fixed
  top 20px
  right 20px
  min-idth 200px
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
