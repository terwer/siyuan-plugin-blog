<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2023-2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup lang="ts">
import AppConfig from "~/app.config"
import {StrUtil} from "zhi-common"
import {useI18n} from "vue-i18n"

// props
const props = defineProps<{ setting: typeof AppConfig }>()

// uses
const {t} = useI18n()
const {colorMode, toggleDark} = await useClientThemeMode(props.setting)

// datas
const header = props.setting?.header ?? ""

const VNode = () =>
    h("div", {
      class: "",
      innerHTML: header,
    })
</script>

<template>
  <div class="header" v-if="StrUtil.isEmptyString(header)">
    <client-only>
      <span class="text dot">.</span>
      <span class="text s-dark" @click="toggleDark()">
        {{ colorMode ? t("theme.mode.light") : t("theme.mode.dark") }}
      </span>
    </client-only>
  </div>
  <div class="header" v-else>
    <VNode/>
  </div>
</template>

<style lang="stylus" scoped>
header
  height 44px
</style>
