<script setup lang="ts">
import { usePost } from "~/composables/usePost"
import { getFirstImageSrc, getSummery } from "~/utils/utils"
import { createAppLogger } from "~/common/appLogger"

const logger = createAppLogger("share-page")
const { currentPost, setCurrentPost } = usePost()
await setCurrentPost()

const title = currentPost.post.title
const desc = getSummery(currentPost.post.description)
const headImage = await getFirstImageSrc(currentPost.post.description)
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

// https://stackoverflow.com/a/71781246/4037224
const VNode = () =>
  h("div", {
    class: "",
    innerHTML: currentPost.post.editorDom?.replaceAll('contenteditable="true"', 'contenteditable="false"') ?? "",
  })
</script>

<template>
  <div class="fn__flex-1 protyle" data-loading="finished">
    <div class="protyle-content protyle-content--transition" data-fullwidth="true">
      <div class="protyle-title protyle-wysiwyg--attr" style="margin: 16px 96px 0">
        <div
          style="margin: 20px 0"
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
        class="protyle-wysiwyg protyle-wysiwyg--attr"
        spellcheck="false"
        contenteditable="false"
        data-doc-type="NodeDocument"
      >
        <VNode v-highlight />
      </div>
    </div>
  </div>
</template>
