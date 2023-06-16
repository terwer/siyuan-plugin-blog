<script setup lang="ts">
const color = useColorMode()
const colorMode = computed({
  get: () => color.value === "dark",
  set: () => (color.preference = color.value === "dark" ? "light" : "dark"),
})
</script>

<template>
  <div>
    <el-switch v-model="colorMode" inline-prompt active-text="dark" inactive-text="light" size="large"></el-switch>
  </div>
</template>

<style scoped></style>
