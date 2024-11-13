<template>
  <div v-if="!formData.shareEnabled || formData.isExpires">
    <el-empty :description="formData.isExpires ? t('blog.index.no.expires') : t('blog.index.no.permission')">
    </el-empty>
  </div>
  <div v-else class="app-container">
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
    <aside class="floating-toc">
      <Outline :items="outlineItems" />
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
import Outline from "~/components/static/Outline.vue"
import Sidebar from "~/components/static/Sidebar.vue"

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

// datas
const formData = reactive({
  post: {} as Post,
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
await getPostData()

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

const maxDepth = ref(6)
const allExpanded = ref(false)
const defaultExpandedIds = ref([id])
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

const treeData = ref({
  items: TreeUtils.addParentIds(formData.post.docTree),
})
logger.info("treeData.value=>", treeData.value)
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
expandedIds.value = TreeUtils.chainExpandedIds(treeData.value.items, defaultExpandedIds.value)

const VNode = () =>
  h("div", {
    class: "",
    innerHTML: editorDom,
  })

onMounted(() => {
  console.log("expandedIds.value=>", expandedIds.value)
})
</script>

<style lang="stylus" scoped>
.app-container
  display flex
  height 100vh

.sidebar-container
  min-width 180px
  max-width 350px
  background-color #fafafa
  border-right 1px solid #f0f0f0
  overflow-y auto
  box-shadow 4px 0 6px rgba(0, 0, 0, 0.1)
  padding 16px

.main
  flex 1
  overflow-y auto
  padding 16px

.floating-toc
  position fixed
  top 20px
  right 20px
  width 200px
  background-color #fff
  border 1px solid #ddd
  padding 10px
  box-shadow 0 2px 4px rgba(0, 0, 0, 0.1)
  z-index 1000

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
