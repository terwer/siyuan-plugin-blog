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
import BackPage from "~/components/common/BackPage.vue"

const { t } = useI18n()

definePageMeta({
  layout: "default",
})
</script>

<template>
  <back-page title="偏好设置">
    <div class="setting-body">
      <el-tabs tab-position="left">
        <el-tab-pane :label="t('setting.basic')">
          <setting-basic />
        </el-tab-pane>
        <el-tab-pane :label="t('setting.preference')">
          <setting-preference />
        </el-tab-pane>
        <el-tab-pane :label="t('setting.system')">
          <setting-system />
        </el-tab-pane>
      </el-tabs>

      <div class="setting-tips">
        <el-alert :title="t('setting.need.reload')" type="warning" />
      </div>
    </div>
  </back-page>
</template>

<style lang="stylus" scoped>
.setting-tips
  margin-top 20px
.setting-body
  padding-top 10px
</style>
