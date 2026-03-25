<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup lang="ts">
import ImagePreview from "~/components/common/ImagePreview.vue"
import { useImagePreview } from "~/composables/useImagePreview"

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

// ========== AI 面板激活状态（跨组件共享）==========
const aiPanelActive = useState('ai-panel-active', () => false)

// 从 setting 读取开关，历史用户默认均关闭
// const postMetaEnabled = computed(() => props.setting?.postMetaEnabled === true)

// 临时测试
const postMetaEnabled = computed(() => true)
</script>

<template>
  <div class="fn__flex-1 protyle" data-loading="finished">
    <div class="protyle-content protyle-content--transition" data-fullwidth="true">
      <div class="protyle-title protyle-wysiwyg--attr">
        <div contenteditable="false" data-position="center" spellcheck="false" class="protyle-title__input"
          data-render="true">
          {{ props.post.title }}
        </div>
      </div>

      <!-- 文档元信息栏：阅读时间、日期（setting.postMetaEnabled=true 时显示） -->
      <static-content-post-meta v-if="postMetaEnabled" :post="props.post" />

      <div v-highlight v-sbeauty v-sdomparser v-db v-embedblock v-fold v-desc v-htmlblock v-echarts
        class="protyle-wysiwyg protyle-wysiwyg--attr" spellcheck="false" contenteditable="false"
        data-doc-type="NodeDocument" :data-page-id="props.post.postid"
        :data-dataviews="JSON.stringify(props.post.dataViews)"
        :data-embedblocks="JSON.stringify(props.post.embedBlocks)"
        :data-foldblocks="JSON.stringify(props.post.foldBlocks)">
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
  padding 16px 32px !important /* 标题区域增加左右边距 */
  margin 0 !important
.protyle-wysiwyg
  padding 24px 32px !important /* 参考大厂文档：舒适的阅读边距 */
  margin 0 !important
</style>
