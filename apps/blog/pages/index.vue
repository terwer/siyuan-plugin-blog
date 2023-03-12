<template>
  <div>
    <NuxtLink to="./post/1">detail</NuxtLink>
    <NuxtWelcome />
  </div>
</template>

<script lang="ts" setup>
import ZhiUtil from "../../common"
import { version } from "~/package.json"
import { ThemeFromEnum } from "../../common"

const zhiSdk = ZhiUtil.zhiSdk()
const logger = zhiSdk.getLogger()
const common = zhiSdk.common

function hello(from: string): void {
  logger.info(common.strUtil.f("Hello, {0} {1} v{2}! You are from {3}", "zhi", "theme", version, from))
}

hello(ThemeFromEnum.ThemeFrom_Blog)
</script>
