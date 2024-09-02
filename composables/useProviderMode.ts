import { createAppLogger } from "~/common/appLogger"

export const useProviderMode = () => {
  const logger = createAppLogger("use-auth-mode-fetch")
  const env = useRuntimeConfig()
  const providerMode = env.public.providerMode === "true" || env.public.providerMode === true
  logger.debug(`check in providerMode => ${providerMode}`)
  return { providerMode }
}
