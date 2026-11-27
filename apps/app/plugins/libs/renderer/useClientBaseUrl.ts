import { useAppBase } from '~/composables/useAppBase'
import { normalizeViewerHome } from '~/utils/viewerUrls'
export const useBaseUrl=()=>{
  const config=useRuntimeConfig()
  const {appBase}=useAppBase()
  const connection=useState<any>('viewer-public-connection')
  const provider=()=>config.public.connectionSync || String(config.public.providerMode)==='true'
  const getOrigin=()=>process.server?useRequestURL().origin:window.location.origin
  const getHome=()=>normalizeViewerHome(getOrigin(), appBase, typeof __SIYUAN_SPA_TARGET__!=='undefined' && __SIYUAN_SPA_TARGET__)
  const publicBase=()=>provider()?connection.value?.config?.publicApiUrl || config.public.providerUrl:config.public.siyuanApiUrl || getOrigin()
  return {getHome,getOrigin,getClientBaseUrl:publicBase,getServerBaseUrl:publicBase}
}
