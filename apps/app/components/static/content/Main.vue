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
import ImagePreview from "~/components/common/ImagePreview.vue"
import { useImagePreview } from "~/composables/useImagePreview"

const props = defineProps<{
  post: any
  setting?: typeof AppConfig
  previewMode?: boolean
}>()

const { images, previewRef } = useImagePreview()

// 正文
const editorDom = props.post.editorDom?.replaceAll("contenteditable=\"true\"", "contenteditable=\"false\"") ?? ""
const VNode = () =>
  h("div", {
    class: "",
    innerHTML: editorDom,
  })

// 文档元信息栏兼容历史默认行为：只有显式 false 时才关闭。
const postMetaEnabled = computed(() => !props.previewMode && props.setting?.postMetaEnabled !== false)
const previewShowTitle = computed(() => props.setting?.linkHoverPreview?.showTitle !== false)
</script>

<template>
  <div :class="{ 'fn__flex-1': true, protyle: true, 'protyle--preview': props.previewMode }" data-loading="finished">
    <div class="protyle-content protyle-content--transition" data-fullwidth="true">
      <div v-if="!props.previewMode || previewShowTitle" class="protyle-title protyle-wysiwyg--attr">
        <div
          contenteditable="false"
          data-position="center"
          spellcheck="false"
          class="protyle-title__input"
          data-render="true"
        >
          {{ props.post.title }}
        </div>
      </div>

      <!-- 文档元信息栏：阅读时间、日期（setting.postMetaEnabled=true 时显示） -->
      <static-content-post-meta v-if="postMetaEnabled" :post="props.post" />

      <div
        v-highlight
        v-sbeauty
        v-sdomparser
        v-db
        v-embedblock
        v-fold
        v-desc
        v-htmlblock
        v-echarts
        class="protyle-wysiwyg protyle-wysiwyg--attr"
        spellcheck="false"
        contenteditable="false"
        data-doc-type="NodeDocument"
        :data-page-id="props.post.postid"
        :data-dataviews="JSON.stringify(props.post.dataViews)"
        :data-embedblocks="JSON.stringify(props.post.embedBlocks)"
        :data-foldblocks="JSON.stringify(props.post.foldBlocks)"
      >
        <VNode />
      </div>
    </div>

    <client-only v-if="!props.previewMode">
      <ImagePreview ref="previewRef" :images="images as any" />
    </client-only>
  </div>
</template>

<style lang="stylus" scoped>
.protyle-title
  padding 16px 32px !important /* 标题区域增加左右边距 */
  margin 0 !important
.protyle-wysiwyg
  padding 24px 32px !important /* 参考大厂文档：舒适的阅读边距 */
  margin 0 !important

.protyle--preview
  width 100%
  min-height 100vh

  .protyle-content
    width 100%
    min-height 100vh

  .protyle-title
    padding 14px 16px 10px !important

  .protyle-title__input
    font-size 22px
    line-height 1.35

  .protyle-wysiwyg
    padding 12px 16px 20px !important

@media (max-width: 768px)
  .protyle-title
    padding 14px clamp(8px, 2.8vw, 12px) 12px !important

  .protyle-title__input
    padding-left 0 !important
    padding-right 0 !important

  .protyle-wysiwyg
    padding 18px clamp(8px, 2.8vw, 12px) !important

    :deep(> [data-type="NodeParagraph"]),
    :deep(> div > [data-type="NodeParagraph"])
      text-align justify
      text-align-last left
      text-justify inter-ideograph
      overflow-wrap break-word
</style>
