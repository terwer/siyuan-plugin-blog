import { normalizeAppBase } from "~/utils/viewerUrls"

export const useAppBase = () => {
  const config = useRuntimeConfig()
  return { appBase: normalizeAppBase(config.app.baseURL) }
}
