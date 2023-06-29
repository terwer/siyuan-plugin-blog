<script lang="ts" setup>
import { createAppLogger } from "~/common/appLogger"
import { sendMessageToParent } from "~/utils/innerIframeEvent"

const logger = createAppLogger("blog-app-layout")

// datas

onMounted(() => {
  if (window.self !== window.top) {
    logger.info("Current window is inside an iframe")

    const isParentWindowLoaded = window.parent.document.readyState === "complete"
    if (isParentWindowLoaded) {
      nextTick(() => {
        const height = document.body.scrollHeight + 10
        logger.info(`Sending message to parent window with height: ${height}`)
        sendMessageToParent("updateHeight", height)
      })
    } else {
      logger.info("Parent window has not finished loading yet.")
    }

    window.addEventListener("load", function () {
      logger.info("IFrame has finished loading.")
    })
  }
})
</script>

<template>
  <el-container>
    <default-header />
    <el-main>
      <slot />
    </el-main>
    <default-footer />
  </el-container>
</template>

<style lang="stylus">
.el-container
  display block !important
</style>
