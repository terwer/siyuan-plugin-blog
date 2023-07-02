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
import { StrUtil } from "zhi-common"

definePageMeta({
  layout: "default",
})

const { t } = useI18n()
const { getSetting } = useSettingStore()

const setting = await getSetting()
const title = `${setting?.siteTitle ?? t("blog.site.title")} - ${setting?.siteSlogan ?? t("blog.site.slogan")}`
const seoMeta = {
  title: title,
  ogTitle: title,
  description: setting?.siteDescription,
  ogDescription: setting?.siteDescription,
} as any
useSeoMeta(seoMeta)

const homePageId = setting?.homePageId ?? undefined

// methods
const goSetting = async () => {
  await navigateTo("/setting")
}
</script>

<template>
  <el-container>
    <default-header />
    <el-main>
      <div v-if="StrUtil.isEmptyString(homePageId)">
        <el-empty :description="t('blog.index.no.home')">
          <el-button type="primary" @click="goSetting">{{ t("blog.index.goto.set.home") }}</el-button>
        </el-empty>
      </div>
      <div v-else>
        <default-home :page-id="homePageId" />
      </div>
    </el-main>
    <default-footer />
  </el-container>
</template>

<style scoped></style>
