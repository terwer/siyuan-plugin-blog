<script setup lang="ts">
import { useSettingStore } from "~/stores/useSettingStore"
import { version } from "~/package.json"
import { useI18n } from "vue-i18n"
import { DateUtil } from "zhi-common"

// datas
const v = ref(version)
const nowYear = DateUtil.nowYear()

const { t } = useI18n()
const { getSetting } = useSettingStore()
const setting = await getSetting()
const { colorMode, toggleDark } = await useThemeMode()

const VNode = () =>
  h("div", {
    class: "",
    innerHTML: setting.footer ?? "",
  })
</script>

<template>
  <div class="footer">
    <VNode />
    <span class="text"> &copy;2011-{{ nowYear }} </span>
    <span class="text s-dark" @click="goGithub()">&nbsp;siyuan-plugin-blog&nbsp;</span>
    <span class="text">v{{ v }}&nbsp;</span>
    <span class="text">.</span>
    <span class="text s-dark" @click="toggleDark()">{{
      colorMode ? t("theme.mode.light") : t("theme.mode.dark")
    }}</span>
  </div>
</template>
<style scoped>
.footer {
  font-size: 12px;
  color: #bbb;
  text-align: center;
  padding-bottom: 8px;
}

.footer .text {
  vertical-align: middle;
}

.s-dark {
  color: var(--el-color-primary);
  cursor: pointer;
}
</style>
