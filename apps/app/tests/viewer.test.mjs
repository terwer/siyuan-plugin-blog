import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, realpath } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { normalizeAppBase, withAppBase, providerAssetUrl } from '../utils/viewerUrls.ts';
const read = p => readFile(new URL(p, import.meta.url), 'utf8');
import {loadConnectionFetcher} from '../scripts/lib/test-connection.mjs';
const pkg = JSON.parse(await read('../package.json'));
test('root self-hosted commands are portable and upstream targets remain available',async()=>{for(const key of ['dev:self-hosted','build:self-hosted','test','start'])assert.ok(pkg.scripts[key]);assert.ok(!/\.sh|--filter|workspace:/.test(pkg.scripts['build:self-hosted']));for(const file of ['nuxt.node.config.ts','nuxt.vercel.config.ts','nuxt.cloudflare.config.ts','nuxt.siyuan.config.ts'])await read('../'+file);const lock=await read('../pnpm-lock.yaml');assert.match(lock,/\n  \.:/)});
test('runtime base prefix normalization', () => { assert.equal(normalizeAppBase('/'), '/'); assert.equal(normalizeAppBase('/share'), '/share/'); assert.equal(withAppBase('/share/', '/libs/lute/lute.min.js'), '/share/libs/lute/lute.min.js'); });
test('historical absolute URLs and newly bound media URLs stay intact', () => { for (const url of ['https://old.example/assets/file.png', '/media/local-1/file.png', 'data:image/png;base64,a', 'blob:test', 'https://api.siyuannote.site/old.png'])
    assert.equal(providerAssetUrl(url, 'http://browser-api.test'), url); assert.match(providerAssetUrl('assets/中文.png', 'http://browser-api.test/'), /^http:\/\/browser-api\.test\/api\/asset\/origin\/base64\//); });
test('browser and SSR fetch use distinct addresses without exposing the private connection',async()=>{for(const server of [true,false]){const seen=[];const env={providerInternalUrl:'http://private-only.invalid:8086',public:{providerUrl:'http://legacy.test'}};const state={value:server?null:{scope:'/:sample',hostedMode:false,config:{publicApiUrl:'http://browser-visible.test:8086'}}};const {api}=await loadConnectionFetcher({server,env,state,fetcher:async(url)=>{seen.push(url);return {ok:true,text:async()=>JSON.stringify(url.endsWith('/getDoc')?{code:0,data:'{"post":"{}"}'}:{publicApiUrl:'http://browser-visible.test:8086',hostedMode:false})}}});assert.equal(await api.fetchPostMeta('sample'),'{"post":"{}"}');assert.ok(seen.every(url=>url.startsWith(server?env.providerInternalUrl:'http://browser-visible.test:8086')))}});
test('右侧栏组件可编译，并在挂载后才恢复侧栏状态', async () => {
  const filename = 'components/static/content/right/Index.vue';
  const source = await read('../' + filename);
  const require = createRequire(import.meta.url);
  const { parse, compileScript } = require('vue/compiler-sfc');
  const { descriptor, errors } = parse(source, { filename });
  assert.deepEqual(errors, []);
  assert.doesNotThrow(() => compileScript(descriptor, { id: 'viewer-right-sidebar' }));
  assert.match(source, /isClientMounted.value && isPageInteractiveReady.value && showSidebar.value/);
});
test('static detail uses serialized state and stable provider mode for hydration', async () => { const detail = await read('../components/static/Detail.vue'); const footer = await read('../components/static/Footer.vue'); assert.match(detail, /useState<any>\(`static-detail:/); assert.doesNotMatch(detail, /const formData = reactive/); assert.match(footer, /const selfHosted = providerMode/); assert.doesNotMatch(footer, /public\.connectionSync/); });
test('self-hosted has no public API proxy and preserves optional upstream SPA behavior',async()=>{const source=await read('../composables/useConnectionSettingsFetch.ts');assert.ok(!source.includes('public/siyuan-blog'));assert.ok(source.includes('providerInternalUrl'));assert.ok((await read('../composables/useLegacyAuthModeFetch.ts')).includes('useSiyuanSPA'));const config=await read('../nuxt.config.ts');assert.match(config,/providerInternalUrl: process\.env\.NUXT_PROVIDER_INTERNAL_URL \?\? ""/);assert.ok(config.includes('"self-hosted"'));assert.ok(!/aiApiKey[\s\S]*public:[\s\S]*aiApiKey/.test(config))});
test('hosted reader removes SiYuan host-level root layout pollution', async () => {
  const base = await read('../public/resources/stage/build/app/base.css')
  const css = await read('../assets/css/index.styl')
  assert.doesNotMatch(base, /body\{[^}]*height:100%;[^}]*max-height:100%;[^}]*overflow:hidden/)
  assert.doesNotMatch(base, /html\{position:fixed;top:0;right:0;left:0\}/)
  const rootLayout = css.slice(0, css.indexOf('// 思源笔记额外样式'))
  assert.doesNotMatch(rootLayout, /!important/)
  assert.match(css, /html, body/)
})

test('enhanced fonts use the runtime switch and replace variables on the same element', async () => {
  const plugin = await read('../plugins/019.viewer-font-mode.client.ts')
  const css = await read('../assets/css/siyuan.styl')
  const config = await read('../nuxt.config.ts')
  assert.match(plugin, /viewerFontsEnabled/)
  assert.match(plugin, /if \(!enabled\)/)
  assert.match(plugin, /disableEnhancedFonts/)
  assert.doesNotMatch(plugin, /window\.addEventListener\("load"/)
  assert.match(css, /html\[data-viewer-font-mode="enhanced"\] body\r?\n  --viewer-font-stack "Open Sans", "LXGW WenKai"/)
  assert.match(config, /viewerFontsEnabled: process\.env\.NUXT_PUBLIC_VIEWER_FONTS_ENABLED/)
  assert.match(config, /viewerFontsEnabled:.*"false"/)
});
test('icons are local and native CSS follows application CSS', async () => { const font = await read('../public/libs/fonts/vdoing_font.css'); assert.ok(!font.includes('https://')); assert.ok(font.includes('./vdoing-icons.woff2')); const app = await read('../app.vue'); assert.match(app, /tagPriority: 200/); });
test('SSR render resolves legacy media without changing stored data', async () => { const require = createRequire(await realpath(new URL('../node_modules/vite/package.json', import.meta.url))); const { transform } = require('esbuild'); const src = (await read('../utils/documentMedia.ts')).replace(/^import[^\n]*\n/gm, '').replace('export const', 'const'); const js = (await transform(src, { loader: 'ts' })).code; const documentMedia = new Function('cheerio', 'providerAssetUrl', js + ';return documentMedia')(await import('cheerio'), providerAssetUrl); const input = { editorDom: '<div data-type="NodeParagraph"><img src="assets/test.png"><img src="https://old.example/a.png"></div>', dataViews: { rows: [{ valueType: 'mAsset', value: { mAsset: [{ type: 'image', content: 'assets/av.png' }] } }] } }; const output = documentMedia(input, 'http://public-api.test'); assert.ok(output.editorDom.includes('http://public-api.test/api/asset/origin/base64/')); assert.ok(output.editorDom.includes('https://old.example/a.png')); assert.ok(!output.editorDom.includes('<html>')); assert.equal(input.dataViews.rows[0].value.mAsset[0].content, 'assets/av.png'); assert.ok(output.dataViews.rows[0].value.mAsset[0].content.startsWith('http://public-api.test')); });

test('all app font stylesheet references resolve relative to their CSS',async()=>{for(const name of ['vdoing_font.css','lxgw_font.css']){const file=new URL('../public/libs/fonts/'+name,import.meta.url);const css=(await readFile(file,'utf8')).replace(/\/\*[\s\S]*?\*\//g,'');for(const m of css.matchAll(/url\(["']?([^"')]+)["']?\)/g)){assert.ok(!/^(?:https?:|\/)/.test(m[1]),m[1]);await readFile(new URL(m[1],file));}}});
test('browser verifier rejects SiYuan targets before opening a debugger socket',async()=>{const {createServer}=await import('node:http');const {connectPage}=await import('../scripts/lib/browser.mjs');const server=createServer((req,res)=>{res.setHeader('Content-Type','application/json');res.end(JSON.stringify([{type:'page',title:'思源笔记 test',url:'https://127.0.0.1:54398/stage/build/app/'}]));});await new Promise(r=>server.listen(0,'127.0.0.1',r));try{await assert.rejects(connectPage(server.address().port),/independent test browser/);}finally{await new Promise(r=>server.close(r));}});

test('bound media URLs and read credentials survive mixed document rendering', async () => {
  const require = createRequire(await realpath(new URL('../node_modules/vite/package.json', import.meta.url)));
  const { transform } = require('esbuild');
  const src = (await read('../utils/documentMedia.ts')).replace(/^import[^\n]*\n/gm, '').replace('export const', 'const');
  const js = (await transform(src, { loader: 'ts' })).code;
  const documentMedia = new Function('cheerio', 'providerAssetUrl', js + ';return documentMedia')(await import('cheerio'), providerAssetUrl);
  const local = 'https://share.example/api/media/' + 'a'.repeat(32) + '?key=v1.opaque-reading-key';
  const old = 'https://s2.loli.net/historical.png';
  const input = {editorDom: `<img src="${local}"><img src="${old}">`, dataViews: {cells: [{valueType: 'mAsset', value: {mAsset: [{type:'image',content:local},{type:'image',content:old}]}}]}};
  const before = JSON.stringify(input);const rendered = documentMedia(input, 'http://private-only.invalid');
  assert.ok(rendered.editorDom.includes(local));assert.ok(rendered.editorDom.includes(old));
  assert.equal(rendered.dataViews.cells[0].value.mAsset[0].content, local);
  assert.equal(rendered.dataViews.cells[0].value.mAsset[1].content, old);
  assert.equal(JSON.stringify(input), before);
});
