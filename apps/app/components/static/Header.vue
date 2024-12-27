<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup lang="ts">
defineProps({
  showHeader: Boolean,
})
</script>

<template>
  <header v-if="showHeader">header</header>
</template>

<style lang="stylus" scoped>
header
  height 44px
</style>
