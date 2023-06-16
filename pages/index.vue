<script setup lang="ts">
const { t } = useVueI18n()

const goSetting = async () => {
  await navigateTo("/setting")
}
</script>

<template>
  <div>
    <el-empty :description="t('blog.index.no.home')">
      <el-button type="primary" @click="goSetting">{{ t("blog.index.goto.set.home") }}</el-button>
    </el-empty>
  </div>
</template>

<style scoped></style>
