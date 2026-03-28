<script setup lang="ts">
const emit = defineEmits<{
  (e: "close"): void
}>()

onMounted(() => {
  emit("close")
})
</script>

<template>
  <div />
</template>
