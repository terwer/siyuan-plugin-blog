import { providerAssetUrl } from '~/utils/viewerUrls'
import { useBaseUrl } from './useClientBaseUrl'
import { useImagePreview } from '~/composables/useImagePreview'
export const useStaticClientAssets=()=>{
  const env=useRuntimeConfig()
  const {getClientBaseUrl}=useBaseUrl()
  const {initImagePreview}=useImagePreview()
  const addClientAssetsPrefix=(el:HTMLElement)=>{
    const provider=env.public.connectionSync || String(env.public.providerMode)==='true'
    const pageId=el.getAttribute('data-page-id') || ''
    for(const image of el.querySelectorAll('img')){
      image.loading='lazy'
      const original=image.getAttribute('src') || ''
      let url=original
      if(provider)url=providerAssetUrl(original,String(getClientBaseUrl()))
      else if(original.startsWith('assets/'))url=String(getClientBaseUrl()).replace(/\/$/,'')+'/public/siyuan-blog/'+encodeURIComponent(pageId)+'/'+original
      if(url!==original){image.setAttribute('src',url);image.setAttribute('data-src',url)}
    }
    initImagePreview(el)
  }
  return {addClientAssetsPrefix}
}
