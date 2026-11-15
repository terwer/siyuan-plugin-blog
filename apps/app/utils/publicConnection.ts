export const normalizePublicUrl=(value:string):string=>{
  const url=new URL(value)
  if(!['http:','https:'].includes(url.protocol)||url.username||url.password||url.search||url.hash)throw new Error('INVALID_PUBLIC_ADDRESS')
  return url.href.replace(/\/+$/,'')
}
export const parsePublicSettings=(raw:string)=>{
  const value=JSON.parse(raw)
  if(!value || typeof value!=='object'||Array.isArray(value))throw new Error('INVALID_PUBLIC_CONFIGURATION')
  if(value.errorCode && value.code!==0)throw new Error(value.errorCode)
  const config={...value}
  // Service metadata is accepted separately; credentials are never hydrated.
  const strip=(item:any)=>{if(!item||typeof item!=='object')return;for(const key of Object.keys(item)){if(/token|secret|credential|authorization|siyuanConfig|serviceApiConfig|connectionProfiles|authCode/i.test(key)||(/password/i.test(key)&&!['passwordEnabled','showPassword'].includes(key)))delete item[key];else strip(item[key])}}
  strip(config)
  if(config.publicApiUrl)config.publicApiUrl=normalizePublicUrl(config.publicApiUrl)
  delete config.hostedMode;delete config.errorCode
  return {config,hostedMode:value.hostedMode!==false}
}

export const isPublicConfigurationError=(error:any)=>['CONFIGURATION_REQUIRED','CONFIGURATION_CONFLICT'].includes(error?.statusMessage || error?.data?.errorCode)
