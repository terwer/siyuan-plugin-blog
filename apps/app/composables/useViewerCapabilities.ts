export const useViewerCapabilities = () => {
  const env = useRuntimeConfig()

  const viewerType = computed(() => env.public.defaultType?.toString() ?? "node")
  const aiAssistantSupported = computed(() => {
    const runtimeSupported = env.public.viewerCapabilities?.aiAssistant !== false
    return __ENABLE_AI_ASSISTANT__ && runtimeSupported
  })

  return {
    viewerType,
    aiAssistantSupported,
  }
}
