<script setup lang="ts">
import { JsonUtil } from "zhi-common"
import AppConfig from "~/app.config"
import { useAuthModeFetch } from "~/composables/useAuthModeFetch"

const { fetchPublicText } = useAuthModeFetch()
const resText = await fetchPublicText(`static.app.config.json`)
const setting = JsonUtil.safeParse<typeof AppConfig>(resText, {} as typeof AppConfig)

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
