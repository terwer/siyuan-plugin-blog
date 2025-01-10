<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2025 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script lang="ts" setup>
import Tab from "../../components/Tab.vue"
import GeneralSetting from "./GeneralSetting.vue"
import AdvancedSetting from "./AdvancedSetting.vue"

const props=defineProps<{
  pluginInstance: any,
}>()

const tabs = [
  {
    label: props.pluginInstance.i18n["share.setting.basic"],
    content: GeneralSetting,
    props: {
      pluginInstance: props.pluginInstance,
    },
  },
  {
    label: props.pluginInstance.i18n["share.setting.advanced"],
    content: AdvancedSetting,
    props: {
      pluginInstance: props.pluginInstance,
    },
  }
]
const activeTab=0
</script>

<template>
  <div id="setting">
    <Tab :tabs="tabs" :active-tab="activeTab" :vertical="true"/>
  </div>
</template>

<style scoped lang="stylus">
#setting
  font-family "Open Sans", "LXGW WenKai", "JetBrains Mono", "-apple-system", "Microsoft YaHei", "Times New Roman",
  "方正北魏楷书_GBK", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans",
  "Droid Sans", "Helvetica Neue", sans-serif
  max-width 725px
  min-width 768px
</style>