<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2025 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup lang="ts">
import {onBeforeMount, reactive, ref} from "vue"
import {showMessage} from "siyuan"
import {useSettingStore} from "../../stores/useSettingStore.ts"
import {createAppLogger} from "../../utils/appLogger.ts"

const props = defineProps<{
  pluginInstance: any,
}>()

const logger = createAppLogger("general-setting")
const {getSetting, updateSetting} = useSettingStore()

const setting = ref()
// datas
const formData = reactive({
  siteUrl: undefined,
  homePageId: undefined,
  themes: {
    light: [
      {
        value: "daylight",
        label: "daylight",
      },
      {
        value: "Zhihu",
        label: "Zhihu",
      },
      {
        value: "Savor",
        label: "写未",
      },
      {
        value: "Tsundoku",
        label: "積読",
      },
      {
        value: "pink-room",
        label: "粉色小屋",
      },
      {
        value: "Trends",
        label: "Trends",
      },
    ],
    dark: [
      {
        value: "midlight",
        label: "midlight",
      },
      {
        value: "Zhihu",
        label: "Zhihu",
      },
      {
        value: "Savor",
        label: "写未",
      },
      {
        value: "Tsundoku",
        label: "積読",
      },
      {
        value: "pink-room",
        label: "粉色小屋",
      },
      {
        value: "trends-in-siyuan",
        label: "Trends",
      },
    ],
  },
  lightTheme: "Zhihu",
  darkTheme: "Zhihu",
  versionMap: {
    midlight: "3.1.10",
    daylight: "3.1.10",
    Zhihu: "0.1.3",
    Savor: "4.2.3",
    Tsundoku: "2.3.5",
    "pink-room": "0.9.4",
    "trends-in-siyuan": "0.4.0",
  } as any,
})

onBeforeMount(async () => {
  setting.value = await getSetting()
  formData.siteUrl = setting.value?.siteUrl
  formData.homePageId = setting.value?.homePageId
  formData.lightTheme = setting.value?.theme?.lightTheme ?? "Zhihu"
  formData.darkTheme = setting.value?.theme?.darkTheme ?? "Zhihu"
})

// methods
const onSubmit = async () => {
  try {
    setting.value.siteUrl = formData.siteUrl
    setting.value.homePageId = formData.homePageId
    setting.value.theme ||= {}
    setting.value.theme.lightTheme = formData.lightTheme
    setting.value.theme.darkTheme = formData.darkTheme
    setting.value.theme.themeVersion = formData.versionMap[setting.value.theme.lightTheme] ?? "0.1.1"
    await updateSetting(setting.value)
    showMessage(props.pluginInstance.i18n["main.opt.success"], 3000, "info")
  } catch (e) {
    logger.error(props.pluginInstance.i18n["main.opt.failure"], e)
    showMessage(props.pluginInstance.i18n["main.opt.failure"] + e, 7000, "error")
  }
}
</script>

<template>
  <div class="basic-setting">
    <form @submit.prevent="onSubmit" class="form-container">
      <div class="form-item">
        <label for="siteUrl" class="form-label">{{ props.pluginInstance.i18n["main.label.siteUrl"] }}</label>
        <input
            type="text"
            id="siteUrl"
            v-model="formData.siteUrl"
            class="form-input"
            :placeholder="props.pluginInstance.i18n['main.label.siteUrl.placeholder']"
        />
      </div>

      <div class="form-item">
        <label for="homePageId" class="form-label">{{ props.pluginInstance.i18n["main.label.homePageId"] }}</label>
        <input
            type="text"
            id="homePageId"
            v-model="formData.homePageId"
            class="form-input"
            :placeholder="props.pluginInstance.i18n['main.label.homePageId.placeholder']"
        />
      </div>

      <div class="form-item">
        <label for="lightTheme" class="form-label">{{ props.pluginInstance.i18n["main.label.lightTheme"] }}</label>
        <select id="lightTheme" v-model="formData.lightTheme" class="form-select">
          <option v-for="theme in formData.themes.light" :key="theme.value" :value="theme.value">
            {{ theme.label }}
          </option>
        </select>
      </div>

      <div class="form-item">
        <label for="darkTheme" class="form-label">{{ props.pluginInstance.i18n["main.label.darkTheme"] }}</label>
        <select id="darkTheme" v-model="formData.darkTheme" class="form-select">
          <option v-for="theme in formData.themes.dark" :key="theme.value" :value="theme.value">
            {{ theme.label }}
          </option>
        </select>
      </div>

      <div class="form-item">
        <label for="submit" class="form-label"></label>
        <button id="submit" type="submit" class="form-button">{{ props.pluginInstance.i18n["main.opt.save"] }}</button>
      </div>
    </form>
  </div>
</template>

<style scoped lang="stylus">
.form-container
  display flex
  flex-direction column
  gap 16px
  align-items center
  padding 0 16px
  width 100%
  padding-left 0
  margin-left -28px

.form-item
  display flex
  align-items center
  gap 8px
  width 100%

.form-label
  width 120px // 减少文字宽度，减少左侧空白
  text-align right
  font-size 14px
  color #666

.form-input, .form-select
  flex 1
  height 36px
  padding 6px 8px
  font-size 14px
  border 1px solid #ccc
  border-radius 4px
  box-sizing border-box

.form-input:focus, .form-select:focus
  border-color #409eff
  outline none

.form-button
  padding 8px 16px
  font-size 14px
  color #fff
  background-color #409eff
  border none
  border-radius 4px
  cursor pointer
  margin-top 16px

.form-button:hover
  background-color #66b1ff
</style>