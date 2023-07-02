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
import { usePost } from "~/composables/usePost"
import { checkExpires, getSummery } from "~/utils/utils"
import { createAppLogger } from "~/common/appLogger"
import { JsonUtil } from "zhi-common"
import { useServerAssets } from "~/plugins/renderer/useServerAssets"

const logger = createAppLogger("share-page")

definePageMeta({
  layout: "default",
})

// props
const props = defineProps({
  showTitleSign: Boolean,
  overrideSeo: Boolean,
  pageId: {
    type: String,
    default: undefined,
  },
})

const { t } = useI18n()
const route = useRoute()
const { getFirstImageSrc } = useServerAssets()
const { currentPost, setCurrentPost } = usePost()
await setCurrentPost(props.pageId)

// datas
const formData = reactive({
  shareEnabled: true,
  isExpires: false,
})

const id = props.pageId ?? ((route.params.id ?? "") as string)
const attrs = JsonUtil.safeParse<any>(currentPost.post?.attrs ?? "{}", {})
formData.shareEnabled = attrs["custom-publish-status"] === "publish" || attrs["custom-publish-status"] === "preview"
formData.isExpires = checkExpires(attrs)
logger.info(`current document status,shareEnabled => ${formData.shareEnabled}, isExpires => ${formData.isExpires}`)

if (!props.overrideSeo) {
  const titleSign = " - " + t("blog.share")
  const title = `${currentPost.post.title}${props.showTitleSign ? titleSign : ""}`
  const desc = getSummery(currentPost.post.description)
  const headImage = getFirstImageSrc(currentPost.post.description)
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

// https://stackoverflow.com/a/71781246/4037224
const VNode = () =>
  h("div", {
    class: "",
    innerHTML: currentPost.post.editorDom?.replaceAll('contenteditable="true"', 'contenteditable="false"') ?? "",
  })
</script>

<template>
  <div v-if="!formData.shareEnabled || formData.isExpires">
    <el-empty :description="formData.isExpires ? t('blog.index.no.expires') : t('blog.index.no.permission')">
    </el-empty>
  </div>
  <div v-else class="fn__flex-1 protyle" data-loading="finished">
    <div class="protyle-content protyle-content--transition" data-fullwidth="true">
      <div class="protyle-title protyle-wysiwyg--attr">
        <div
          contenteditable="false"
          data-position="center"
          spellcheck="false"
          class="protyle-title__input"
          data-render="true"
        >
          {{ currentPost.post.title }}
        </div>
      </div>
      <div
        v-highlight
        v-beauty
        v-domparser
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
</template>
