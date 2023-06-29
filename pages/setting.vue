<script setup lang="ts">
const { t } = useI18n()

definePageMeta({
  layout: "default",
})
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

    <div class="setting-tips">
      <el-alert :title="t('setting.need.reload')" type="warning" />
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.setting-tips
  margin-top 20px
</style>
