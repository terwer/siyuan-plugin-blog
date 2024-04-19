<script setup lang="ts">
import { version } from "~/package.json"
import { DateUtil } from "zhi-common"
import { useI18n } from "vue-i18n"
import { useThemeMode } from "~/composables/useThemeMode"
import { useBaseUrl } from "~/plugins/renderer/useClientBaseUrl"

// uses
const { t } = useI18n()
const { colorMode, toggleDark } = await useThemeMode()
const { getHome } = useBaseUrl()

// datas
const v = ref(version)
const nowYear = DateUtil.nowYear()

// methods
const goGithub = () => {
  window.open("https://github.com/terwer/siyuan-plugin-blog")
}

const goAbout = () => {
  window.open("https://terwer.space/about")
}

// methods
const goHome = async () => {
  const home = getHome()
  window.open(home)
}
</script>

<template>
  <div class="footer">
    <div>
      <span class="text"> &copy;2011-{{ nowYear }} </span>
      <span class="text s-dark" @click="goGithub()">&nbsp;siyuan-plugin-blog&nbsp;</span>

      <span class="text">v{{ v }}&nbsp;</span>

      <span class="text s-dark" @click="goHome()">{{ t("go.home") }}</span>

      <span class="text">.</span>
      <span class="text s-dark" @click="goAbout()">{{ t("syp.about") }}</span>

      <span class="text">.</span>
      <span class="text s-dark" @click="toggleDark()">
        {{ colorMode ? t("theme.mode.light") : t("theme.mode.dark") }}
      </span>
    </div>
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
