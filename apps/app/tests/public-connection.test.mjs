import test from 'node:test'
import assert from 'node:assert/strict'
import {parsePublicSettings,normalizePublicUrl} from '../utils/publicConnection.ts'
import {loadConnectionFetcher} from '../scripts/lib/test-connection.mjs'
const reply=(value,status=200)=>({ok:status<400,status,text:async()=>JSON.stringify(value)})
const settings={publicApiUrl:'http://public.test:18886/service',domain:'http://reader.test:14000/notes',docPath:'s',hostedMode:false}
const env={providerInternalUrl:'http://private.test:8086',public:{providerUrl:'http://legacy.test',connectionSync:true},app:{baseURL:'/notes/'}}
test('SSR settings and content use only the private backend; public address is hydrated',async()=>{const seen=[];const {api,state}=await loadConnectionFetcher({server:true,env,fetcher:async(url,options)=>{seen.push({url,body:JSON.parse(options.body)});return reply(url.endsWith('/getDoc')?{code:0,data:'{"post":"{}"}'}:settings)}});await api.fetchPostMeta('sample-doc');assert.equal(seen.length,2);assert.ok(seen.every(v=>v.url.startsWith(env.providerInternalUrl)));assert.equal(state.value.config.publicApiUrl,settings.publicApiUrl)})
test('browser hydration and content use synced API, never the private address',async()=>{const seen=[];const state={value:{scope:'/:sample-doc',config:settings,hostedMode:false}};const {api}=await loadConnectionFetcher({env,state,fetcher:async(url,options)=>{seen.push({url,options});return reply({code:0,data:'{}'})}});await api.fetchPostMeta('sample-doc');assert.equal(seen.length,1);assert.ok(seen[0].url.startsWith(settings.publicApiUrl));assert.equal(seen[0].options.credentials,'omit');assert.equal(seen[0].options.headers.Authorization,undefined)})
test('homepage lookup includes the reading prefix and never asks for account domains',async()=>{const seen=[];const {api}=await loadConnectionFetcher({server:true,env,fetcher:async(url,options)=>{seen.push({url,body:JSON.parse(options.body)});return reply(settings)}});await api.fetchConfig('static.app.config.json',true,new URL('http://reader.test/notes/'));assert.equal(seen[0].body.readingAddress,'http://reader.test/notes/');assert.equal(seen[0].body.key,'static.app.config.json');assert.ok(!JSON.stringify(seen).includes('domains.json'))})
test('self-hosted missing public API reports configuration required instead of guessing a URL',async()=>{const {api}=await loadConnectionFetcher({server:true,env,fetcher:async()=>reply({hostedMode:false,domain:settings.domain})});await assert.rejects(api.fetchPostMeta('sample-doc'),/CONFIGURATION_REQUIRED/)})
test('configuration conflicts propagate without silently falling back to default accounts',async()=>{let calls=0;const {api}=await loadConnectionFetcher({server:true,env,fetcher:async()=>{calls++;return reply({code:1,errorCode:'CONFIGURATION_CONFLICT',hostedMode:false},409)}});await assert.rejects(api.fetchConfig('static.app.config.json',true,new URL('http://reader.test')),/CONFIGURATION_CONFLICT/);assert.equal(calls,1)})
test('public settings drop nested credentials and keep supported password flags',()=>{const value=parsePublicSettings(JSON.stringify({...settings,serviceApiConfig:{token:'synthetic'},nested:{secret:'synthetic'},passwordEnabled:true,showPassword:false}));assert.ok(!JSON.stringify(value).includes('synthetic'));assert.equal(value.config.passwordEnabled,true);assert.equal(value.hostedMode,false)})
test('old hosted responses retain configured fallback; malformed public URLs are rejected',()=>{assert.equal(parsePublicSettings('{}').hostedMode,true);for(const url of ['file:///data','https://user:secret@site.test','http://site.test/?secret=x'])assert.throws(()=>normalizePublicUrl(url))})
test('SPA navigation resolves the next document settings before requesting its body',async()=>{const seen=[];const route={path:'/s/a',params:{},query:{}};const {api,state}=await loadConnectionFetcher({server:true,env,route,fetcher:async(url,options)=>{const body=JSON.parse(options.body);seen.push({url,body});return reply(url.endsWith('/getDoc')?{code:0,data:'{}'}:{...settings,publicApiUrl:body.docId==='b'?'http://b.test':settings.publicApiUrl})}});await api.fetchPostMeta('a');route.path='/s/b';await api.fetchPostMeta('b');assert.equal(seen[2].body.docId,'b');assert.equal(seen[3].body.fdId,'b');assert.equal(state.value.config.publicApiUrl,'http://b.test')})

test('late settings from the previous SPA route cannot replace the current author or trigger its content request',async()=>{
  let releaseOld
  const seen=[]
  const route={path:'/s/old',params:{id:'old'},query:{}}
  const {api,state}=await loadConnectionFetcher({server:true,env,route,fetcher:async(url,options)=>{const body=JSON.parse(options.body);seen.push({url,body});if(url.endsWith('/share')&&body.docId==='old')return new Promise(resolve=>releaseOld=()=>resolve(reply({...settings,publicApiUrl:'http://old.test'})));return reply(url.endsWith('/getDoc')?{code:0,data:'{}'}:{...settings,publicApiUrl:'http://new.test'})}})
  const old=api.fetchPostMeta('old');const stale=assert.rejects(old,/STALE_NAVIGATION/)
  while(!releaseOld)await new Promise(resolve=>setImmediate(resolve))
  route.path='/s/new';route.params.id='new';await api.fetchPostMeta('new');releaseOld();await stale
  assert.equal(state.value.config.publicApiUrl,'http://new.test')
  assert.equal(seen.filter(item=>item.url.endsWith('/getDoc')&&item.body.fdId==='old').length,0)
})
test('legacy html-suffixed document links bootstrap by document rather than homepage',async()=>{const seen=[];const {api}=await loadConnectionFetcher({server:true,env,route:{path:'/doc/legacy.html',params:{id:'legacy.html'},query:{}},fetcher:async(url,options)=>{seen.push({url,body:JSON.parse(options.body)});return reply(settings)}});await api.fetchConfig('static.app.config.json',true,new URL('http://reader.test'));assert.equal(seen[0].body.docId,'legacy')})

test('shared app keeps legacy hosted and SiYuan targets while synchronized mode uses the new bootstrap',async()=>{
  const {readFile}=await import('node:fs/promises')
  const source=(await readFile(new URL('../composables/useAuthModeFetch.ts',import.meta.url),'utf8')).replace(/^import[^\n]*\n/gm,'').replace('export const','const')
  const factory=new Function('useRuntimeConfig','useLegacyAuthModeFetch','useConnectionSettingsFetch',source+';return useAuthModeFetch()')
  for(const [config,expected] of [[{public:{providerMode:'true',connectionSync:false}},'legacy'],[{public:{providerMode:'false',connectionSync:false}},'legacy'],[{public:{connectionSync:true}},'synchronized'],[{providerInternalUrl:'http://private.test',public:{}},'synchronized']])assert.equal(factory(()=>config,()=> 'legacy',()=> 'synchronized'),expected)
})
