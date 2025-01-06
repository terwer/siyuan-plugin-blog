<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2023-2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup lang="ts">
definePageMeta({
  layout: false,
})

const logger = createAppLogger("s-page")
const { isPrivateShare } = useCommonShareType()

// datas
const isPrivate = await isPrivateShare()
logger.info(`isPrivate=>${isPrivate}`)
</script>

<template>
  <static-detail-page v-if="isPrivate" />
  <public-detail-page v-else />
</template>
