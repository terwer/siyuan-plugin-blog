<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<script setup lang="ts">
import { ref, onMounted, watch } from "vue"

const isHovered = ref(false)
const headings = ref<any[]>([])
const currentHeading = ref<string | null>(null)

const handleMouseEnter = () => {
  isHovered.value = true
}

const handleMouseLeave = () => {
  isHovered.value = false
}

const scrollToHeading = () => {
  // Selecting headings directly from the main content (body or global element)
  const headingsElements = document.querySelectorAll("h2, h3, h4")
  headingsElements.forEach((heading) => {
    const id = heading.id
    if (id) {
      headings.value.push({ id, text: heading.innerText })
    }
  })
}

onMounted(() => {
  scrollToHeading()
  window.addEventListener("scroll", updateCurrentHeading)
})

watch(headings, () => {
  updateCurrentHeading()
})

const updateCurrentHeading = () => {
  const headingsElement = document.querySelectorAll("h2, h3, h4")
  headingsElement.forEach((heading) => {
    const rect = heading.getBoundingClientRect()
    if (rect.top <= 0 && rect.bottom >= 0) {
      currentHeading.value = heading.id
    }
  })
}
</script>

<template>
  <div class="outline" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <div class="outline-bar" :class="{ 'outline-bar-expanded': isHovered }" />
    <div v-if="isHovered" class="outline-content">
      <ul>
        <li v-for="(heading, index) in headings" :key="index">
          <a :href="'#' + heading.id" :class="{ active: currentHeading === heading.id }">{{ heading.text }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="stylus">
.outline
  position: fixed
  right: 0
  top: 0
  height: 100%
  width: 260px
  background-color: #f5f5f5
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1)
  overflow-y: auto
  z-index: 1
  transition: transform 0.3s ease

.outline-bar
  position: absolute
  top: 50%
  right: 0
  width: 5px
  background-color: green
  transform: translateY(-50%)
  height: 50px
  cursor: pointer
  transition: width 0.3s ease

.outline-bar-expanded
  width: 260px

.outline-content
  padding-top: 60px
  padding-right: 20px
  max-height: 90vh
  overflow-y: auto

.outline-content ul
  list-style: none
  padding: 0
  margin: 0

.outline-content li
  margin-bottom: 10px

.outline-content a
  text-decoration: none
  color: #333
  font-size: 16px
  display: block
  transition: color 0.3s

.outline-content a:hover
  color: #007bff

.outline-content a.active
  font-weight: bold
  color: #007bff
</style>
