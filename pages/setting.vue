<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div>
    <el-tabs tab-position="left">
      <el-tab-pane :label="t('setting.basic')">
        <default-setting-basic />
      </el-tab-pane>
      <el-tab-pane :label="t('setting.preference')">
        <default-setting-preference />
      </el-tab-pane>
      <el-tab-pane :label="t('setting.system')">
        <default-setting-change-local />
      </el-tab-pane>
    </el-tabs>
    <el-alert :title="t('setting.need.reload')" type="warning" />
  </div>
</template>

<style scoped></style>
