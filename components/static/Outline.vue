<template>
  <div v-for="(item, index) in outlineData" :key="index">
    <outline-item :item="item" :max-depth="maxDepth" />
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

<style lang="stylus" scoped></style>
