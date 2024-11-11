<!--
  - Copyright (c) 2023, Terwer . All rights reserved.
  - DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
  -
  - This code is free software; you can redistribute it and/or modify it
  - under the terms of the GNU General Public License version 2 only, as
  - published by the Free Software Foundation.  Terwer designates this
  - particular file as subject to the "Classpath" exception as provided
  - by Terwer in the LICENSE file that accompanied this code.
  -
  - This code is distributed in the hope that it will be useful, but WITHOUT
  - ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
  - FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
  - version 2 for more details (a copy is included in the LICENSE file that
  - accompanied this code).
  -
  - You should have received a copy of the GNU General Public License version
  - 2 along with this work; if not, write to the Free Software Foundation,
  - Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
  -
  - Please contact Terwer, Shenzhen, Guangdong, China, youweics@163.com
  - or visit www.terwer.space if you need additional information or have any
  - questions.
  -->

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
import { type TreeNode, TreeUtils } from "~/utils/TreeUtils"

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

  // 文档树
  items: <TreeNode[]>[],
  defaultOpen: id,
  maxDepth: 3,
  openItems: <string[]>[],
  selectedItem: {},

  outlineItems: <any[]>[],
})

const onItemSelected = (item: any) => {
  formData.selectedItem = item
}

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

const parseOutline = (content: string, depth = 1): any[] => {
  const headings = <any[]>[]

  const items: any[] = []
  headings.forEach((heading) => {
    const id = heading.id || heading.textContent?.trim().toLowerCase().replace(/\s+/g, "-") || ""
    items.push({ id, title: heading.textContent || "", depth })
  })

  return items
}

const contentRef = ref<HTMLElement | null>(null)

const scrollToSection = (id: string) => {
  if (contentRef.value) {
    const section = contentRef.value.querySelector(`#${id}`)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }
}

onMounted(async () => {
  formData.items = TreeUtils.buildTree(formData.post.docTree ?? [])
  formData.openItems.push(formData.defaultOpen)
  // formData.outlineItems = parseOutline(editorDom)

  console.log("formData.items", formData.items)
  console.log("formData.openItems", formData.openItems)
})

const VNode = () =>
  h("div", {
    class: "",
    innerHTML: editorDom,
  })
</script>

<template>
  <div v-if="!formData.shareEnabled || formData.isExpires">
    <el-empty :description="formData.isExpires ? t('blog.index.no.expires') : t('blog.index.no.permission')">
    </el-empty>
  </div>
  <div v-else class="container">
    <!-- 文档树 -->
    <Sidebar
      v-model="formData.openItems"
      :items="formData.items"
      :default-open="formData.defaultOpen"
      :max-depth="formData.maxDepth"
      @item-selected="onItemSelected"
    />
    <!-- 分享正文 -->
    <div class="content-container">
      <div class="outline">
        <Outline
          :outline-items="formData.outlineItems"
          :max-depth="formData.maxDepth"
          @scroll-to-section="scrollToSection"
        />
      </div>
      <div ref="contentRef" class="content">
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
      </div>
    </div>
  </div>
</template>

<style scoped lang="stylus">
.container
  display flex
  height 100vh

.sidebar
  width 250px
  background-color #f4f4f9
  padding 15px
  box-shadow 2px 0 5px rgba(0, 0, 0, 0.1)

  ul
    list-style-type none
    padding 0

  li
    cursor pointer
    padding 8px 16px
    border-bottom 1px solid #ddd
    transition background-color 0.3s

    &.open
      background-color #e0e0e0

    &:hover
      background-color #e0e0e0

.content
  flex 1
  padding 20px
  background-color #fff
  box-shadow -2px 0 5px rgba(0, 0, 0, 0.1)
</style>
