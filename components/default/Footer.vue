<script setup lang="ts">
import { version } from "~/package.json"
import { DateUtil } from "zhi-common"
import { useI18n } from "vue-i18n"
import { BrowserUtil } from "zhi-device"
import { createAppLogger } from "~/common/appLogger"

const logger = createAppLogger("footer")
const { t } = useI18n()

const color = useColorMode()
const colorMode = computed({
  get: () => {
    if (color.value === "dark") {
      if (BrowserUtil.isInBrowser) {
        const VERSION = "11.5.0"
        const protyleHljsStyle = document.getElementById("protyleHljsStyle") as any
        document.documentElement.dataset.themeMode = "dark"
        protyleHljsStyle.href = `${process.env.APP_BASE}resources/stage/protyle/js/highlight.js/styles/vs2015.min.css?v=${VERSION}`
        logger.debug("浏览器暗黑模式")
      }
      return true
    } else {
      if (BrowserUtil.isInBrowser) {
        const VERSION = "11.5.0"
        const protyleHljsStyle = document.getElementById("protyleHljsStyle") as any
        protyleHljsStyle.href = `${process.env.APP_BASE}resources/stage/protyle/js/highlight.js/styles/vs.min.css?v=${VERSION}`
        document.documentElement.dataset.themeMode = "light"
        logger.debug("浏览器浅色模式")
      }
      return false
    }
  },
  set: (value) => {
    color.preference = value ? "dark" : "light"
  },
})
const toggleDark = () => {
  colorMode.value = !colorMode.value
}

const v = ref(version)
const nowYear = DateUtil.nowYear()

const goGithub = () => {
  window.open("https://github.com/terwer/siyuan-plugin-blog")
}

const goAbout = () => {
  window.open("https://blog.terwer.space/about")
}
</script>

<template>
  <div>
    <div class="footer">
      <div>
        <span class="text"> &copy;2011-{{ nowYear }} </span>
        <span class="text s-dark" @click="goGithub()">&nbsp;siyuan-plugin-blog&nbsp;</span>

        <span class="text">v{{ v }}&nbsp;</span>

        <span class="text s-dark" @click="goAbout()">{{ t("syp.about") }}</span>

        <span class="text">.</span>
        <span class="text s-dark" @click="toggleDark()">{{
          colorMode ? t("theme.mode.light") : t("theme.mode.dark")
        }}</span>
      </div>

      <!--
       -----------------------------------------------------------------------------
       -->
    </div>
  </div>
</template>

<style scoped>
.footer {
  font-size: 12px;
  color: #bbb;
  text-align: center;
  padding-bottom: 8px;
}

.footer .text {
  vertical-align: middle;
}

.s-dark {
  color: var(--el-color-primary);
  cursor: pointer;
}
</style>
