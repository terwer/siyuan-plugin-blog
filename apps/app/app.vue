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
html[data-viewer-font-mode="enhanced"][data-theme-mode="light"][data-light-theme="Zhihu"],
html[data-viewer-font-mode="enhanced"][data-theme-mode="dark"][data-dark-theme="Zhihu"]
  --viewer-font-stack "Open Sans", "LXGW WenKai", "-apple-system", BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", "Microsoft YaHei", "PingFang SC", "Hiragino Sans GB", Arial, sans-serif
  --viewer-font-stack-code "JetBrains Mono", "Open Sans", "LXGW WenKai", "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace
  --b3-font-family var(--viewer-font-stack)
  --b3-font-family-base var(--viewer-font-stack)
  --b3-font-family-code var(--viewer-font-stack-code)
  --b3-font-family-graph var(--viewer-font-stack)
  --b3-font-family-emoji var(--viewer-font-stack)
  --b3-font-family-math "KaTeX_Main", var(--viewer-font-stack)
  --b3-font-family-protyle var(--viewer-font-stack)
  --el-font-family var(--viewer-font-stack)

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
