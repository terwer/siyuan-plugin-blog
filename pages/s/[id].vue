<script setup lang="ts">
import { usePost } from "~/composables/usePost"

const { currentPost } = usePost()
</script>

<template>
  <div>{{ currentPost.post.description }}</div>
</template>

<style scoped></style>
