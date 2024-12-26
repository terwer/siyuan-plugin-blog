<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup lang="ts">
import {useStaticSettingStore} from "~/stores/useStaticSettingStore"
import {useI18n} from "vue-i18n"
import {useProviderMode} from "~/composables/useProviderMode"
import {DateUtil, StrUtil} from "zhi-common"
import * as pkg from "~/package.json"
import {useBaseUrl} from "~/plugins/libs/renderer/useClientBaseUrl"

const {locale, t} = useI18n()
const {getStaticSetting} = useStaticSettingStore()
const setting = await getStaticSetting()
const {colorMode, toggleDark} = await useStaticThemeMode()
const {providerMode} = useProviderMode()
const footer = setting?.footer ?? ""
const {getHome} = useBaseUrl()

// datas
const v = ref(pkg.version)
const nowYear = DateUtil.nowYear()

// methods
const goGithub = () => {
  window.open("https://github.com/terwer/siyuan-plugin-blog")
}

const goAbout = () => {
  window.open("https://siyuan.wiki/s/20241226200349-4v6e21m")
}

// methods
const goHome = async () => {
  const home = getHome()
  window.open(home)
}


const VNode = () =>
    h("div", {
      class: "",
      innerHTML: footer,
    })

// lifecycles
onBeforeMount(() => {
  // 设置默认语言
  if (setting?.lang) {
    locale.value = setting?.lang as any
  }
})
</script>

<template>
  <el-footer>
    <div class="footer" v-if="!providerMode && StrUtil.isEmptyString(footer)">
      <span class="text"> &copy;2011-{{ nowYear }} </span>
      <span class="text s-dark" @click="goGithub()">&nbsp;{{ t("name") }}</span>

      <span class="text">v{{ v }}&nbsp;</span>

      <span class="text s-dark" @click="goHome()">{{ t("go.home") }}</span>

      <span class="text dot">.</span>
      <span class="text s-dark" @click="goAbout()">{{ t("syp.about") }}</span>

      <span class="text dot">.</span>
      <span class="text s-dark" @click="toggleDark()">
        {{
          colorMode ? t("theme.mode.light") : t("theme.mode.dark")
        }}
      </span>
    </div>
    <div class="footer" v-else>
      <VNode/>
    </div>
  </el-footer>
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

.dot{
  padding-left: 2px;
  padding-right: 2px;
}

</style>