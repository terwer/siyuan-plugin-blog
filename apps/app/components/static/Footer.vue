<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup lang="ts">
import {useStaticSettingStore} from "~/stores/useStaticSettingStore"
import {useI18n} from "vue-i18n"

const {locale, t} = useI18n()
const {getStaticSetting} = useStaticSettingStore()
const setting = await getStaticSetting()
const {colorMode, toggleDark} = await useStaticThemeMode()

const VNode = () =>
    h("div", {
      class: "",
      innerHTML: setting.footer ?? "",
    })

// lifecycles
onBeforeMount(() => {
  // 设置默认语言
  if (setting?.lang) {
    locale.value = setting?.lang as any
  }
})
</script>

<template>
  <div class="footer">
    <VNode/>
    <div class="theme-toggle" @click="toggleDark()">
      <div class="theme-option" :class="{ active: !colorMode }">
        {{ t("theme.mode.light") }}
      </div>
      <div class="theme-option" :class="{ active: colorMode }">
        {{ t("theme.mode.dark") }}
      </div>
    </div>
  </div>
</template>

<style>
:root {
  --footer-only-background-color: #ffffff;
  --footer-only-hover-background-color: #f0f0f0;
  --footer-only-active-background-color: #007bff;
  --footer-only-border-color: #ccc;
  --footer-only-text-color: #333;
  --footer-only-active-text-color: #ffffff;
}

html[data-theme-mode="dark"] {
  --footer-only-background-color: #444444; /* 深色背景 */
  --footer-only-hover-background-color: #555555; /* 悬浮背景 */
  --footer-only-active-background-color: #ffa500; /* 激活项背景 */
  --footer-only-border-color: #666666; /* 边框深色 */
  --footer-only-text-color: #f0f0f0; /* 默认文字浅色 */
  --footer-only-active-text-color: #333333; /* 激活项文字深色 */
}
</style>
<style scoped>
.footer {
  font-size: 12px;
  color: #bbb;
  text-align: center;
  padding-bottom: 8px;
}

.theme-toggle {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  background-color: var(--footer-only-background-color, #ffffff);
  border: 1px solid var(--footer-only-border-color, #ccc);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.theme-option {
  padding: 10px 20px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  font-size: 14px;
  font-weight: bold;
  color: var(--footer-only-text-color, #333);
}

.theme-option:hover {
  background-color: var(--footer-only-hover-background-color, #f0f0f0);
}

.theme-option.active {
  background-color: var(--footer-only-active-background-color, #007bff);
  color: var(--footer-only-active-text-color, #ffffff);
}
</style>
