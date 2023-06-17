<script setup lang="ts">
import { usePost } from "~/composables/usePost"

const { currentPost } = usePost()
// https://stackoverflow.com/a/71781246/4037224
const VNode = () => h("div", { class: "b3-typography", innerHTML: currentPost.post.description })
</script>

<template>
  <div class="protyle-preview">
    <div class="protyle-preview__action post-title">
      {{ currentPost.post.title }}
    </div>
    <VNode />
  </div>
</template>

<style scoped>
.post-title {
  text-align: left;
  font-size: 32px;
  font-weight: 600;
}
</style>
