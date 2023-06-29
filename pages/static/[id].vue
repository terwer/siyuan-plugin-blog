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
import { getSummery } from "~/utils/utils"
import { useServerAssets } from "~/plugins/renderer/useServerAssets"

definePageMeta({
  layout: "static",
})

// props
const props = defineProps({
  showTitleSign: Boolean,
  overrideSeo: Boolean,
})

const logger = createAppLogger("static-share-page")
const { t } = useI18n()
const route = useRoute()
const id = (route.params.id ?? "") as string
const { getFirstImageSrc } = useServerAssets()

// datas
const getPostData = async () => {
  const mdResponse = await fetch(`/public/siyuan-blog/${id}.json`, {
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language": "zh-CN,zh;q=0.9",
      "cache-control": "no-cache",
      pragma: "no-cache",
      "sec-ch-ua": '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
    },
    referrerPolicy: "strict-origin-when-cross-origin",
    body: null,
    method: "GET",
    mode: "cors",
    credentials: "include",
  })
  const mdText = await mdResponse.text()
  formData.post = JsonUtil.safeParse<Post>(mdText, {} as Post)
  formData.shareEnabled = !ObjectUtil.isEmptyObject(formData.post)
  logger.info("post=>", formData.post)
  logger.info(`shareEnabled=>${formData.shareEnabled}`)
}

const formData = reactive({
  post: {} as Post,
  shareEnabled: true,
})

await getPostData()
if (!props.overrideSeo) {
  const titleSign = " - " + t("blog.share")
  const title = `${formData.post.title}${props.showTitleSign ? titleSign : ""}`
  const desc = getSummery(formData.post.description)
  const headImage = getFirstImageSrc(formData.post.description)
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

onMounted(async () => {})

const VNode = () =>
  h("div", {
    class: "",
    innerHTML: formData.post.editorDom?.replaceAll('contenteditable="true"', 'contenteditable="false"') ?? "",
  })
</script>

<template>
  <div v-if="!formData.shareEnabled">
    <el-empty :description="t('blog.index.no.permission')"> </el-empty>
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
          {{ formData.post.title }}
        </div>
      </div>
      <div
        class="protyle-wysiwyg protyle-wysiwyg--attr"
        spellcheck="false"
        contenteditable="false"
        data-doc-type="NodeDocument"
      >
        <VNode v-highlight v-beauty v-domparser />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
