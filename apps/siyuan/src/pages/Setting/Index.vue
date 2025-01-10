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

const tabs = [
  {
    label: "general",
    content: "GeneralSetting",
    props: {},
  },
  {
    label: "advanced",
    content: "AdvancedSetting",
    props: {},
  }
]
const activeTab=0
</script>

<template>
  <div>
    <Tab :tabs="tabs" :active-tab="activeTab" :vertical="true"/>
  </div>
</template>

<style scoped>

</style>