import { useLegacyAuthModeFetch } from './useLegacyAuthModeFetch'
import { useConnectionSettingsFetch } from './useConnectionSettingsFetch'
export const useAuthModeFetch = () => {
  const config=useRuntimeConfig()
  return config.public.connectionSync || config.providerInternalUrl
    ? useConnectionSettingsFetch() : useLegacyAuthModeFetch()
}
