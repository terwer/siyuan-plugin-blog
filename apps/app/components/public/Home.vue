<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup lang="ts">
// props
const props = defineProps<{ pageId: string }>()
</script>

<template>
  <public-detail :page-id="props.pageId" :override-seo="true"/>
</template>

<style scoped></style>
