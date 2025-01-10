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
import {StrUtil} from "zhi-common"
import {showMessage} from "siyuan"
import {createAppLogger} from "../../utils/appLogger.ts"
import {useSettingStore} from "../../stores/useSettingStore.ts"
import * as pkg from "../../../package.json"


const props=defineProps<{
  pluginInstance: any,
}>()

const logger = createAppLogger("advanced-setting")
const {getSetting, updateSetting} = useSettingStore()

const setting = ref()
// datas
const formData = reactive({
  siteTitle: undefined,
  siteSlogan:undefined,
  siteDescription: undefined,
  footer:undefined,
  shareTemplate: undefined,
})

onBeforeMount(async ()=>{
  setting.value = await getSetting()
  formData.siteTitle = setting.value?.siteTitle??props.pluginInstance.i18n["blog.site.title"]
  formData.siteSlogan = setting.value?.siteSlogan??props.pluginInstance.i18n["blog.site.slogan"]
  formData.siteDescription = setting.value?.siteDescription??""
  formData.footer = setting.value?.footer??`<div class="footer">
        <span class="text"> ©2011-${new Date().getFullYear()}</span><span class="text s-dark">&nbsp;siyuan-plugin-blog&nbsp;</span>
        <span class="text">v${pkg.version}&nbsp;</span>
        <span class="text s-dark"><a href="https://terwer.space/about" target="_blank">关于作者</a></span>
    </div>`
  formData.shareTemplate = StrUtil.isEmptyString(setting.value.shareTemplate)
      ? "我给你分享了一篇文章：[title] （有效期 [expired] 秒）\n 打开链接：[url]"
      : setting.value.shareTemplate
})

// methods
const onSubmit = async () => {
  try {
    setting.value.siteTitle = formData.siteTitle
    setting.value.siteSlogan = formData.siteSlogan
    setting.value.siteDescription = formData.siteDescription
    setting.value.footer = formData.footer
    setting.value.shareTemplate = formData.shareTemplate
    await updateSetting(setting.value)
    showMessage(props.pluginInstance.i18n["main.opt.success"], 3000,"info" )
  } catch (e) {
    logger.error(props.pluginInstance.i18n["main.opt.failure"], e)
    showMessage(props.pluginInstance.i18n["main.opt.failure"] + e, 7000,"error")
  }
}
</script>

<template>
  <div class="advanced-setting">
    <form @submit.prevent="onSubmit" class="form-container">
      <div class="form-item">
        <label for="siteTitle" class="form-label">{{ props.pluginInstance.i18n["blog.site.title"] }}</label>
        <input
            type="text"
            id="siteTitle"
            v-model="formData.siteTitle"
            class="form-input"
            :placeholder="props.pluginInstance.i18n['blog.site.title.placeholder']"
        />
      </div>

      <div class="form-item">
        <label for="siteSlogan" class="form-label">{{ props.pluginInstance.i18n["blog.site.slogan"] }}</label>
        <input
            type="text"
            id="siteSlogan"
            v-model="formData.siteSlogan"
            class="form-input"
            :placeholder="props.pluginInstance.i18n['blog.site.slogan.placeholder']"
        />
      </div>

      <div class="form-item">
        <label for="siteDescription" class="form-label">{{ props.pluginInstance.i18n["blog.site.description"] }}</label>
        <textarea
            id="siteDescription"
            v-model="formData.siteDescription"
            class="form-input"
            :placeholder="props.pluginInstance.i18n['blog.site.description.placeholder']"
        />
      </div>

      <div class="form-item">
        <label for="footer" class="form-label">{{ props.pluginInstance.i18n["blog.footer"] }}</label>
        <textarea
            id="footer"
            v-model="formData.footer"
            class="form-input"
            :placeholder="props.pluginInstance.i18n['blog.footer.placeholder']"
        />
      </div>

      <div class="form-item">
        <label for="shareTemplate" class="form-label">{{ props.pluginInstance.i18n["blog.share.template"] }}</label>
        <textarea
            id="shareTemplate"
            v-model="formData.shareTemplate"
            class="form-input"
            :placeholder="props.pluginInstance.i18n['blog.share.template.placeholder']"
        />
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

textarea.form-input
  resize vertical
  height 80px

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
  align-self flex-start

.form-button:hover
  background-color #66b1ff
</style>
