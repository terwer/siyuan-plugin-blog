<!--
  - Copyright (c) 2023, Terwer . All rights reserved.
  - DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
  -
  - This code is free software; you can redistribute it and/or modify it
  - under the terms of the GNU General Public License version 2 only, as
  - published by the Free Software Foundation.  Terwer designates this
  - particular file as subject to the "Classpath" exception as provided
  - by Terwer in the LICENSE file that accompanied this code.
  -
  - This code is distributed in the hope that it will be useful, but WITHOUT
  - ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
  - FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
  - version 2 for more details (a copy is included in the LICENSE file that
  - accompanied this code).
  -
  - You should have received a copy of the GNU General Public License version
  - 2 along with this work; if not, write to the Free Software Foundation,
  - Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
  -
  - Please contact Terwer, Shenzhen, Guangdong, China, youweics@163.com
  - or visit www.terwer.space if you need additional information or have any
  - questions.
  -->

<script setup lang="ts">
import { useSettingStore } from "~/stores/useSettingStore"
import { createAppLogger } from "~/common/appLogger"

const logger = createAppLogger("setting-page")
const { t } = useI18n()
const { getSetting, updateSetting } = useSettingStore()

const setting = await getSetting()
const title = `${t("blog.share")} - ${t("blog.share.setting")}`
const seoMeta = {
  title: title,
  ogTitle: title,
} as any
useSeoMeta(seoMeta)

// datas
const formData = reactive({
  homePageId: setting.homePageId,
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
    ],
  },
  lightTheme: setting?.theme?.lightTheme ?? "Zhihu",
  darkTheme: setting?.theme?.darkTheme ?? "Zhihu",
})

// methods
const onSubmit = async () => {
  try {
    setting.homePageId = formData.homePageId
    setting.theme ||= {}
    setting.theme.lightTheme = formData.lightTheme
    setting.theme.darkTheme = formData.darkTheme
    await updateSetting(setting)
    ElMessage.success(t("main.opt.success"))
  } catch (e) {
    logger.error(t("main.opt.failure"), e)
    ElMessage({
      type: "error",
      message: t("main.opt.failure") + e,
    })
  }
}
</script>

<template>
  <div class="basic-setting">
    <el-form label-width="85px">
      <el-form-item :label="t('setting.basic.homePageId')">
        <el-input v-model="formData.homePageId" />
      </el-form-item>
      <el-form-item :label="t('siyuan.theme.light')">
        <el-select v-model="formData.lightTheme" class="m-2" :placeholder="t('siyuan.theme.select')">
          <el-option v-for="item in formData.themes.light" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item :label="t('siyuan.theme.dark')">
        <el-select v-model="formData.darkTheme" class="m-2" :placeholder="t('siyuan.theme.select')">
          <el-option v-for="item in formData.themes.dark" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{ t("main.opt.save") }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped></style>
