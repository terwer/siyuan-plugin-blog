<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2023-2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup lang="ts">
import { useCommonShareType } from "~/composables/useCommonShareType"

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
  <static-home-page v-if="isPrivate" />
  <public-home-page v-else />
</template>
