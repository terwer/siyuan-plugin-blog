<template>
  <div>
    <div style="margin-top: 100px" v-for="testItem in testItems.items">
      index
      <p>{{ testItem }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import ZhiUtil from "~/utils/zhiUtil"
import { version } from "~/package.json"
import Env from "zhi-env"
import ThemeFromEnum from "~/utils/enums/themeFromEnum"

const nuxtEnv = useRuntimeConfig()
const env = new Env(nuxtEnv)
const zhiSdk = ZhiUtil.zhiSdk(env)
const logger = zhiSdk.getLogger()
const common = zhiSdk.common

const testItems = reactive({
  items: <string[]>[],
})

for (let i = 0; i < 20; i++) {
  testItems.items.push("hello")
}

function hello(from: string): void {
  logger.debug("Nuxt env is ok")
  logger.info(common.strUtil.f("Hello, {0} {1} v{2}! You are from {3}", "zhi", "theme", version, from))
}

hello(ThemeFromEnum.ThemeFrom_Blog)
</script>
