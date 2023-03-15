<template>
  <div>
    <NuxtLink to="./post/1">detail</NuxtLink>
    <NuxtWelcome />
  </div>
</template>

<script lang="ts" setup>
import ZhiUtil from "zhi-common"
import { version } from "~/package.json"
import Env from "zhi-env"

const nuxtEnv = useRuntimeConfig()
const env = new Env(nuxtEnv)
const zhiSdk = ZhiUtil.zhiSdk(env)
const logger = zhiSdk.getLogger()
const common = zhiSdk.common

function hello(from: string): void {
  logger.debug("Nuxt env is ok")
  logger.info(common.strUtil.f("Hello, {0} {1} v{2}! You are from {3}", "zhi", "theme", version, from))
}

hello(ThemeFromEnum.ThemeFrom_Blog)
</script>
