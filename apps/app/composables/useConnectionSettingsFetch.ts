/** Per-request SSR bootstrap; only the browser uses the author's public API address. */
import { withAppBase } from '~/utils/viewerUrls'
import { normalizePublicUrl, parsePublicSettings } from '~/utils/publicConnection'
export const useConnectionSettingsFetch = () => {
  const env=useRuntimeConfig()
  const route=useRoute()
  const requestURL=useRequestURL()
  const state=useState<any>('viewer-public-connection',()=>null)
  const scope=()=>String(route.path)
  const internalBase=()=>normalizePublicUrl(String(env.providerInternalUrl || env.public.providerUrl))
  const postAt=async(base:string,path:string,body:unknown)=>{
    const controller=new AbortController()
    const timer=setTimeout(()=>controller.abort(),8000)
    try {
      const response=await fetch(base+path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:controller.signal,cache:'no-store',credentials:'omit'})
      const text=await response.text()
      if(!response.ok){let result:any;try{result=JSON.parse(text)}catch{};throw createError({statusCode:response.status,statusMessage:result?.errorCode || 'SERVICE_UNAVAILABLE',message:result?.errorCode || 'SERVICE_UNAVAILABLE'})}
      return text
    } finally {clearTimeout(timer)}
  }
  const pending=new Map<string,Promise<any>>()
  const bootstrap=async(id?:string)=>{
    const routeScope=scope()
    const target=routeScope+":"+String(id || "home")
    if(state.value?.scope===target)return state.value
    if(pending.has(target))return pending.get(target)
    const request=(async()=>{
      // A public setting never selects the SSR destination. Browser SPA switches stay on the last service until settings resolve.
      const base=process.server?internalBase():normalizePublicUrl(state.value?.config?.publicApiUrl || String(env.public.providerUrl))
      const path=id?'/api/settings/share':'/api/settings/byResource'
      const body=id?{group:'GENERAL',docId:id,key:'static.app.config.json'}:{key:'static.app.config.json',readingAddress:requestURL.origin+withAppBase(env.app.baseURL,route.path)}
      const raw=await postAt(base,path,body)
      const parsed=parsePublicSettings(raw)
      if(!parsed.config.publicApiUrl && parsed.hostedMode===false)throw createError({statusCode:404,statusMessage:'CONFIGURATION_REQUIRED'})
      const result={scope:target,...parsed}
      if(scope()===routeScope)state.value=result
      return result
    })()
    pending.set(target,request)
    try{return await request}finally{pending.delete(target)}
  }
  const docId=()=>String(route.params.id || route.params.docId || route.path.split('/').filter(Boolean).at(-1) || '').replace(/\.html?$/,'')
  const currentDoc=()=>route.params.id || route.params.docId || /^\d{14}-[a-z0-9]{7}$/.test(docId())?docId():undefined
  const fetchConfig=async(filename:string,_providerMode:boolean,_url:URL)=>{
    const current=await bootstrap(currentDoc())
    if(filename==='static.app.config.json')return JSON.stringify(current.config)
    const base=process.server?internalBase():normalizePublicUrl(current.config.publicApiUrl || String(env.public.providerUrl))
    return postAt(base,'/api/settings/byResource',{key:filename})
  }
  const publicPost=async(path:string,body:unknown,id?:string)=>{
    const requestedRoute=scope()
    const current=await bootstrap(id || currentDoc())
    if(scope()!==requestedRoute)throw createError({statusCode:409,statusMessage:"STALE_NAVIGATION"})
    const base=process.server?internalBase():normalizePublicUrl(current.config.publicApiUrl || String(env.public.providerUrl))
    const response=await postAt(base,path,body)
    if(scope()!==requestedRoute)throw createError({statusCode:409,statusMessage:"STALE_NAVIGATION"})
    return JSON.parse(response)
  }
  const fetchPostMeta=async(id:string,_providerMode=true)=>{
    const key=typeof route.query.key==='string'?route.query.key:undefined
    const response=await publicPost('/api/share/getDoc',{fdId:id,...(key?{fdKey:key}:{})},id)
    if(response.code!==0 || typeof response.data!=='string')throw createError({statusCode:response.errorCode==='SHARE_NOT_FOUND'?404:502,statusMessage:response.errorCode || 'SERVICE_UNAVAILABLE'})
    return response.data
  }
  const validatePassword=async(id:string,password:string,encryptPassword:string)=>{
    try{const response=await publicPost('/api/share/validatePassword',{docId:id,password,encryptPassword},id);return {flag:response.code===0,msg:response.msg || '',data:response.data}}
    catch{return {flag:false,msg:'Password validation unavailable',data:''}}
  }
  return {fetchConfig,fetchPostMeta,validatePassword}
}
