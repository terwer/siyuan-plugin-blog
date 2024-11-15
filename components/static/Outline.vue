<template>
  <div>
    <div class="outline-title">
      <a class="outline-title-link"> {{ "文档大纲" }} </a>
    </div>
    <div v-for="(item, index) in outlineData" :key="index">
      <outline-item :item="item" :max-depth="maxDepth" :is-root="true" />
    </div>
  </div>
</template>

<script setup>
import OutlineItem from "~/components/static/OutlineItem.vue"

const props = defineProps({
  outlineData: {
    type: Array,
    required: true,
  },
  maxDepth: {
    type: Number,
    default: -1,
  },
})

onMounted(() => {})
</script>

<style lang="stylus" scoped>
.outline-title
  .outline-title-link
    text-decoration none
    color #333
</style>
