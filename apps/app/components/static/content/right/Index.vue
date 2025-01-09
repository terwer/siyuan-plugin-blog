<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup lang="ts">
import type AppConfig from "~/app.config"

const props = defineProps<{ post: any, setting: typeof AppConfig }>()

const showOutline = ref(true)

const toggleOutline = () => {
  showOutline.value = !showOutline.value
}
</script>

<template>
  <el-aside class="aside-right" :class="{ 'aside-right-expanded': showOutline }">
    <static-content-right-outline v-if="showOutline" />
    <div class="toggle-btn" @click="toggleOutline">
      Toggle Outline
    </div>
  </el-aside>
</template>

<style scoped lang="stylus">
.aside-right
  position: fixed /* Fixed when collapsed */
  top: 0
  right: 0
  height: 100%
  width: 0 /* Initially collapsed */
  background-color: #f5f5f5
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1)
  overflow-y: auto
  z-index: 1
  transition: width 0.3s ease /* Animate width transition */

.aside-right-expanded
  position: relative /* Change to relative when expanded */
  width: 260px /* Expanded width */

.toggle-btn
  position: fixed
  top: 20px
  right: 20px
  background-color: #007bff
  color: white
  padding: 8px 16px
  border-radius: 5px
  cursor: pointer
  z-index: 10
</style>
