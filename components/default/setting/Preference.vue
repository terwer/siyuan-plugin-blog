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
import { createAppLogger } from "~/common/appLogger"
import { useSettingStore } from "~/stores/useSettingStore"

const logger = createAppLogger("preference-page")
const { t } = useI18n()
const { getSetting, updateSetting } = useSettingStore()

const setting = await getSetting()

// datas
const formData = reactive({
  siteTitle: setting?.siteTitle ?? t("blog.site.title"),
  siteSlogan: setting?.siteSlogan ?? t("blog.site.slogan"),
  siteDescription: setting?.siteDescription ?? "",
})

// methods
const onSubmit = async () => {
  try {
    setting.siteTitle = formData.siteTitle
    setting.siteSlogan = formData.siteSlogan
    setting.siteDescription = formData.siteDescription
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
  <div class="preference-setting">
    <el-form label-width="85px">
      <el-form-item :label="t('blog.site.title.label')">
        <el-input v-model="formData.siteTitle" />
      </el-form-item>
      <el-form-item :label="t('blog.site.slogan.label')">
        <el-input v-model="formData.siteSlogan" />
      </el-form-item>
      <el-form-item :label="t('blog.site.desc.label')">
        <el-input v-model="formData.siteDescription" :rows="4" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{ t("main.opt.save") }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped></style>
