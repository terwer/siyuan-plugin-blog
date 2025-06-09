<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup lang="ts">
import { ref } from "vue"
import VueEasyLightbox from "vue-easy-lightbox"

const props = defineProps<{
  images: string[]
  index?: number
}>()

const logger = createAppLogger("image-preview")
const visibleRef = ref(false)
const indexRef = ref(props.index ?? 0)
const imgsRef = ref(props.images)

const show = (index: number) => {
  logger.debug("show method called with index:", index)
  indexRef.value = index
  visibleRef.value = true
}

const onHide = () => {
  visibleRef.value = false
}

// 确保在组件挂载后暴露方法
defineExpose({
  show
})
</script>

<template>
  <vue-easy-lightbox
    :visible="visibleRef"
    :imgs="imgsRef"
    :index="indexRef"
    @hide="onHide"
  />
</template>

<style lang="stylus">
.v-easy-lightbox
  &__wrapper
    background-color: rgba(0, 0, 0, 0.9) !important
  &__img
    max-width: 90vw !important
    max-height: 90vh !important
    object-fit: contain !important
  &__toolbar
    background-color: rgba(0, 0, 0, 0.5) !important
  &__btn
    color: #fff !important
    &:hover
      background-color: rgba(255, 255, 255, 0.1) !important
</style>
