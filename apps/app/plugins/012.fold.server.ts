/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2025 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

// stub - block nuxt getSSRProps error
export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.directive("fold", {})
})
