<script setup lang="ts">
import { useSettingStore } from "~/stores/useSettingStore"

const { getSetting } = useSettingStore()
const setting = await getSetting()

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
