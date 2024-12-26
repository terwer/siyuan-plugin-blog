<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2023-2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script lang="ts" setup>
const logger = createAppLogger("static-share-page")
const {docId} = useDocId()
const {t} = useI18n()

// datas
const formData = reactive({
  post: {} as any,
  setting: {} as any,
  shareEnabled: true,
  isExpires: false,
})
</script>

<template>
  <div v-if="!formData.shareEnabled || formData.isExpires">
    <!--
    <el-empty :description="formData.isExpires ? t('blog.index.no.expires') : t('blog.index.no.permission')">
    </el-empty>
    -->
    {{ t('blog.index.no.expires') }}
  </div>
  <div v-else class="app-container">
    {{ t('blog.index.no.permission') }}:
    {{docId}}
  </div>
</template>

<style scoped>

</style>