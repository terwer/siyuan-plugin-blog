<script setup lang="ts">
import { useStaticSettingStore } from "~/stores/useStaticSettingStore"

const { getStaticSetting } = useStaticSettingStore()
const setting = await getStaticSetting()
await useStaticThemeMode()

const VNode = () =>
  h("div", {
    class: "",
    innerHTML: setting.footer ?? "",
  })
</script>

<template>
  <div class="footer">
    <VNode />
  </div>
</template>
