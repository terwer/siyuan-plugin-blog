<!--
  -            GNU GENERAL PUBLIC LICENSE
  -               Version 3, 29 June 2007
  -
  -  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
  -  Everyone is permitted to copy and distribute verbatim copies
  -  of this license document, but changing it is not allowed.
  -->

<template>
  <div>
    <Suspense>
      <!-- 主内容 -->
      <template #default>
        <NuxtPage />
      </template>

      <!-- 加载状态 -->
      <template #fallback>
        <div class="loading-spinner"></div>
      </template>
    </Suspense>
  </div>
</template>

<style lang="stylus">
.loading-spinner
  width: 40px
  height: 40px
  margin: 100px auto
  border: 4px solid #f3f3f3
  border-top: 4px solid #3498db
  border-radius: 50%
  animation: spin 1s linear infinite

@keyframes spin
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)
</style>
