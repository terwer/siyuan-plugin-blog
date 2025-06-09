<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup lang="ts">
import { useImagePreview } from "~/composables/useImagePreview"
import ImagePreview from "~/components/common/ImagePreview.vue"

const props = defineProps<{
  post: any
  setting?: any
}>()

const { images, previewRef } = useImagePreview()

// 正文
const editorDom = props.post.editorDom?.replaceAll("contenteditable=\"true\"", "contenteditable=\"false\"") ?? ""
const VNode = () =>
  h("div", {
    class: "",
    innerHTML: editorDom,
  })
</script>

<template>
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
          {{ props.post.title }}
        </div>
      </div>
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
    <client-only>
      <ImagePreview ref="previewRef" :images="images as any" />
    </client-only>
  </div>
</template>

<style lang="stylus" scoped>
.protyle-title
  padding 0 !important
  margin 0 !important
.protyle-wysiwyg
  padding 0 !important
  margin 0 !important
</style>
