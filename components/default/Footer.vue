<script setup lang="ts">
import { useVueI18n } from "~/composables/useVueI18n"
import { version } from "~/package.json"
import { DateUtil } from "zhi-common"

const { t } = useVueI18n()

const color = useColorMode()
const colorMode = computed({
  get: () => color.value === "dark",
  set: () => (color.preference = color.value === "dark" ? "light" : "dark"),
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
