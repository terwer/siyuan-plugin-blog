<script setup lang="ts">
import { JsonUtil } from "zhi-common"
import AppConfig from "~/app.config"
import { useAuthModeFetch } from "~/composables/useAuthModeFetch"
import { useProviderMode } from "~/composables/useProviderMode"

const { providerMode } = useProviderMode()
const { fetchConfig } = useAuthModeFetch()
const resText = await fetchConfig(`static.app.config.json`, providerMode)
const setting = JsonUtil.safeParse<typeof AppConfig>(resText, {} as typeof AppConfig)
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
