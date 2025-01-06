<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2023-2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup lang="ts">
import { useI18n } from "vue-i18n"
import { DateUtil, StrUtil } from "zhi-common"
import { useProviderMode } from "~/composables/useProviderMode"
import * as pkg from "~/package.json"
import { useBaseUrl } from "~/plugins/libs/renderer/useClientBaseUrl"
import AppConfig from "~/app.config"

// props
const props = defineProps<{ setting: typeof AppConfig }>()

// uses
const { locale, t } = useI18n()
const { providerMode } = useProviderMode()
const { getHome } = useBaseUrl()
const { colorMode, toggleDark } = useClientThemeMode(props.setting)

// datas
const v = ref((pkg as any).version)
const nowYear = DateUtil.nowYear()
const footer = props.setting?.footer ?? ""

// methods
const goGithub = () => {
  window.open("https://github.com/terwer/siyuan-plugin-blog")
}

const goAbout = () => {
  window.open("https://siyuan.wiki/s/20241226200349-4v6e21m")
}

// methods
const goHome = () => {
  const home = getHome()
  window.open(home)
}

const emitToggleThemeMode = (key: "auto"|"light"|"dark") => {
  if (key === "dark" && colorMode.value) {
    return
  }
  if (key === "light" && !colorMode.value) {
    return
  }
  toggleDark()
}

const VNode = () =>
  h("div", {
    class: "",
    innerHTML: footer,
  })

// lifecycles
onBeforeMount(() => {
  // 设置默认语言
  if (props.setting?.lang) {
    locale.value = props.setting?.lang as any
  }
})
</script>

<template>
  <div v-if="!providerMode && StrUtil.isEmptyString(footer)" class="footer">
    <static-buttons :default-mode="colorMode?'dark':'light'" @toggle-theme-mode="emitToggleThemeMode" />

    <span class="text"> &copy;2011-{{ nowYear }} </span>
    <span class="text s-dark" @click="goGithub()">&nbsp;{{ t("name") }}</span>

    <span class="text">v{{ v }}&nbsp;</span>

    <span class="text s-dark" @click="goHome()">{{ t("go.home") }}</span>

    <span class="text dot">.</span>
    <span class="text s-dark" @click="goAbout()">{{ t("syp.about") }}</span>
  </div>
  <div v-else class="footer">
    <static-buttons :default-mode="colorMode?'dark':'light'" @toggle-theme-mode="emitToggleThemeMode" />
    <VNode />
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

.dot {
  padding-left: 2px;
  padding-right: 2px;
}

</style>
