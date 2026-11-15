import {readFile,realpath} from 'node:fs/promises'
import {createRequire} from 'node:module'
import {normalizePublicUrl,parsePublicSettings} from '../../utils/publicConnection.ts'
import {withAppBase} from '../../utils/viewerUrls.ts'
export async function loadConnectionFetcher({server=false,env,route={path:'/',params:{},query:{}},state={value:null},fetcher=fetch,origin='http://reader.test'}={}) {
  const require=createRequire(await realpath(new URL('../../node_modules/vite/package.json',import.meta.url)))
  const {transform}=require('esbuild')
  const source=(await readFile(new URL('../../composables/useConnectionSettingsFetch.ts',import.meta.url),'utf8')).replace(/^import[^\n]*\n/gm,'').replace('export const','const')
  const {code}=await transform(source,{loader:'ts',target:'es2022'})
  const createError=(value)=>Object.assign(new Error(value.statusMessage || value.message),value)
  const factory=new Function('useRuntimeConfig','useRoute','useRequestURL','useState','process','fetch','normalizePublicUrl','parsePublicSettings','withAppBase','createError',code+';return useConnectionSettingsFetch()')
  return {api:factory(()=>({app:{baseURL:'/'},...env}),()=>route,()=>new URL(origin),()=>state,{server},fetcher,normalizePublicUrl,parsePublicSettings,withAppBase,createError),state,route}
}
