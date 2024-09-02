<script setup lang="ts">
import { JsonUtil } from "zhi-common"
import AppConfig from "~/app.config"
import { useAuthModeFetch } from "~/composables/useAuthModeFetch"
import { useRoute } from "vue-router"

const env = useRuntimeConfig()
const providerMode = env.public.providerMode === "true"
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
