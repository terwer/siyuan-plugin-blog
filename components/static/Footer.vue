<script setup lang="ts">
import { useStaticSettingStore } from "~/stores/useStaticSettingStore"
import { useI18n } from "vue-i18n"

const { locale } = useI18n()
const { getStaticSetting } = useStaticSettingStore()
const setting = await getStaticSetting()
await useStaticThemeMode()

const VNode = () =>
  h("div", {
    class: "",
    innerHTML: setting.footer ?? "",
  })

// lifecycles
onBeforeMount(() => {
  // 设置默认语言
  if (setting?.lang) {
    locale.value = setting?.lang
  }
})
</script>

<template>
  <div class="footer">
    <VNode />
  </div>
</template>
