/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2026 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import { computed, onMounted, onUnmounted, ref } from "vue"

const DOC_TREE_SOURCE = "docTree"
const MOBILE_VIEWPORT_QUERY = "(max-width: 768px)"

const isDocTreeSource = (source: unknown) => {
  if (Array.isArray(source)) {
    return source.includes(DOC_TREE_SOURCE)
  }

  return source === DOC_TREE_SOURCE
}

export const isMobileViewportNow = () => {
  if (!process.client) {
    return false
  }

  if (typeof window.matchMedia === "function") {
    return window.matchMedia(MOBILE_VIEWPORT_QUERY).matches
  }

  return window.innerWidth <= 768
}

export const useMobileViewport = () => {
  const isMobileViewport = ref(false)
  let mediaQuery: MediaQueryList | null = null

  const updateMobileViewport = () => {
    isMobileViewport.value = isMobileViewportNow()
  }

  onMounted(() => {
    updateMobileViewport()

    if (typeof window.matchMedia !== "function") {
      window.addEventListener("resize", updateMobileViewport)
      return
    }

    mediaQuery = window.matchMedia(MOBILE_VIEWPORT_QUERY)
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateMobileViewport)
    } else {
      mediaQuery.addListener(updateMobileViewport)
    }
  })

  onUnmounted(() => {
    if (!process.client) {
      return
    }

    if (!mediaQuery) {
      window.removeEventListener("resize", updateMobileViewport)
      return
    }

    if (typeof mediaQuery.removeEventListener === "function") {
      mediaQuery.removeEventListener("change", updateMobileViewport)
    } else {
      mediaQuery.removeListener(updateMobileViewport)
    }
  })

  return {
    isMobileViewport,
  }
}

export const useDocTreeSource = () => {
  const route = useRoute()
  const { isMobileViewport } = useMobileViewport()
  const isFromDocTree = computed(() => isDocTreeSource(route.query.from))
  const shouldApplyDocTreeEffects = computed(() => isFromDocTree.value && !isMobileViewport.value)

  return {
    isFromDocTree,
    isMobileViewport,
    shouldApplyDocTreeEffects,
  }
}
