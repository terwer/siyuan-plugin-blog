import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';
import { connectPage } from './lib/browser.mjs';
const arg = (name, fallback) => process.argv.find(a => a.startsWith(name + '='))?.slice(name.length + 1) ?? fallback;
const cdp = arg('--cdp');
if (!cdp)
    throw Error('--cdp=http://127.0.0.1:<independent-browser-port> required');
const root = arg('--root', 'http://127.0.0.1:4100/'), prefix = arg('--prefix', 'http://127.0.0.1:4101/reader/');
const out = resolve(arg('--out', '../artifacts/p1/browser-results.json')), shots = resolve(arg('--shots', '../artifacts/p1/screenshots'));
await mkdir(shots, { recursive: true });
const fixture = JSON.parse(await readFile(new URL('../tests/fixtures/posts.json', import.meta.url), 'utf8')).posts;
const page = await connectPage(Number(new URL(cdp).port));
const issues = [], requests = [], blocked = [], scenes = [];
let active = 'startup', bootId;
page.events.on('Runtime.exceptionThrown', r => issues.push({ scene: active, type: 'exception', text: r.exceptionDetails.exception?.description ?? r.exceptionDetails.text }));
page.events.on('Runtime.consoleAPICalled', r => { if (['error', 'warning', 'warn'].includes(r.type))
    issues.push({ scene: active, type: r.type, text: r.args.map(a => a.value ?? a.description ?? '').join(' ') }); });
page.events.on('Network.responseReceived', r => { if (r.response.status >= 400)
    issues.push({ scene: active, type: 'http', status: r.response.status, url: r.response.url }); });
page.events.on('Network.requestWillBeSent', r => requests.push({ scene: active, url: r.request.url }));
page.events.on('Fetch.requestPaused', async (r) => { try {
    const u = new URL(r.request.url);
    if (['127.0.0.1', 'localhost'].includes(u.hostname) || ['data:', 'blob:', 'about:'].includes(u.protocol)) {
        await page.call('Fetch.continueRequest', { requestId: r.requestId });
    }
    else {
        blocked.push({ scene: active, url: r.request.url });
        await page.call('Fetch.failRequest', { requestId: r.requestId, errorReason: 'BlockedByClient' });
    }
}
catch (error) {
    issues.push({ scene: active, type: 'intercept', text: error.message });
} });
const navigate = async (url, { width = 1366, theme = 'light' } = {}) => {
    if (bootId)
        await page.call('Page.removeScriptToEvaluateOnNewDocument', { identifier: bootId });
    bootId = (await page.call('Page.addScriptToEvaluateOnNewDocument', { source: `localStorage.setItem('vueuse-color-scheme',${JSON.stringify(theme)});localStorage.setItem('siyuan-blog-viewer-preferences-hint-shown','true');` })).identifier;
    await page.call('Emulation.setDeviceMetricsOverride', { width, height: width < 600 ? 844 : 1000, deviceScaleFactor: 1, mobile: width < 600 });
    await page.call('Page.navigate', { url });
    await page.wait(`location.href===${JSON.stringify(url)}&&document.readyState==='complete'&&!!document.querySelector('#__nuxt')?.__vue_app__`, 45000);
    await page.evaluate(async () => { await document.fonts.ready; await new Promise(r => setTimeout(r, 750)); });
};
const nativeComparison = async () => page.evaluate(async () => {
    const preview = document.querySelector('.protyle-wysiwyg');
    if (!preview)
        throw Error('Native reader DOM missing');
    const html = document.documentElement, bodyStyle = getComputedStyle(document.body);
    const variables = Array.from(bodyStyle).filter(k => k.startsWith('--')).map(k => `${k}:${bodyStyle.getPropertyValue(k)};`).join('');
    const links = [...document.querySelectorAll('link[rel="stylesheet"]')].filter(l => l.href.includes('/resources/') || l.href.includes('/libs/fonts/')).map(l => `<link rel="stylesheet" href="${l.href}">`).join('');
    const frame = document.createElement('iframe');
    frame.style.cssText = `position:fixed;left:-20000px;top:0;width:${preview.clientWidth}px;height:1000px;visibility:hidden`;
    const content = preview.outerHTML;
    const loaded = new Promise((resolve, reject) => { frame.onload = resolve; frame.onerror = reject; });
    frame.srcdoc = `<!doctype html><html lang="${html.lang}" class="${html.className}" data-theme-mode="${html.dataset.themeMode}" data-light-theme="${html.dataset.lightTheme}" data-dark-theme="${html.dataset.darkTheme}" data-viewer-font-mode="enhanced"><head>${links}<style>body{${variables}font-family:${bodyStyle.fontFamily};font-size:${bodyStyle.fontSize};}</style></head><body><div class="protyle"><div class="protyle-content">${content}</div></div></body></html>`;
    document.body.append(frame);
    await loaded;
    await frame.contentDocument.fonts.ready;
    const result = [];
    for (const type of ['NodeHeading', 'NodeBlockquote', 'NodeListItem', 'NodeCodeBlock', 'NodeTable']) {
        const selector = `[data-type="${type}"]`, a = preview.querySelector(selector), b = frame.contentDocument.querySelector(selector);
        if (!a || !b)
            throw Error('Native sample element missing: ' + type + ' actual=' + !!a + ' reference=' + !!b + ' frame=' + frame.contentDocument.body.innerHTML.slice(0, 160));
        const av = getComputedStyle(a), bv = frame.contentWindow.getComputedStyle(b);
        const properties = {};
        for (const key of ['fontSize', 'fontFamily', 'fontWeight', 'lineHeight', 'color'])
            properties[key] = { actual: av[key], native: bv[key] };
        result.push({ type, properties });
    }
    frame.remove();
    return result;
});
const saveShot = async (name) => { const r = await page.call('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false }); await writeFile(resolve(shots, name + '.png'), Buffer.from(r.data, 'base64')); };
try {
    await page.call('Runtime.discardConsoleEntries');
    await page.call('Network.clearBrowserCache');
    await page.call('Fetch.enable', { patterns: [{ urlPattern: '*', requestStage: 'Request' }] });
    for (const [name, base] of [['root', root], ['prefix', prefix]]) {
        for (const width of [1366, 390])
            for (const theme of ['light', 'dark'])
                for (const lang of ['zh_CN', 'en_US']) {
                    active = `${name}-${width}-${theme}-${lang}`;
                    const url = base + 'x/' + fixture.complex.docId + '?lang=' + lang;
                    const ssr = await fetch(url).then(r => r.text());
                    assert.ok(ssr.includes(fixture.complex.post.title), 'SSR title');
                    assert.ok(!ssr.includes('127.0.0.1:18088'), 'Private SSR URL exposed');
                    const sheetTags = [...ssr.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*>/g)].map(m => m[0]);
                    const nativeIndex = sheetTags.findIndex(s => s.includes('/resources/stage/build/app/base.css'));
                    const lastApp = sheetTags.findLastIndex(s => s.includes('/_nuxt/'));
                    assert.ok(nativeIndex > lastApp, 'Native CSS must follow application CSS');
                    await navigate(url, { width, theme });
                    const status = await page.evaluate(() => ({ lang: document.documentElement.lang, theme: document.documentElement.dataset.themeMode, bodyWidth: document.body.scrollWidth, viewport: innerWidth, nativeNodes: document.querySelectorAll('.protyle-wysiwyg [data-type]').length, font: getComputedStyle(document.body).getPropertyValue('--viewer-font-stack'), text: document.body.innerText }));
                    assert.equal(status.lang, lang.replace('_', '-'));
                    assert.equal(status.theme, theme);
                    assert.ok(status.bodyWidth <= width + 1, 'Horizontal page overflow');
                    assert.ok(status.nativeNodes > 10);
                    assert.ok(status.font.includes('Open Sans'));
                    const comparison = await nativeComparison();
                    for (const e of comparison)
                        for (const [k, v] of Object.entries(e.properties))
                            assert.equal(v.actual, v.native, `${active}: ${e.type}.${k}`);
                    await saveShot(active);
                    scenes.push({ name, width, theme, lang, nativeNodeCount: status.nativeNodes, horizontalOverflow: false, computedStyleComparisons: comparison });
                    console.log('PASS', active);
                }
        active = name + '-home';
        await navigate(base);
        assert.ok((await page.evaluate(() => document.body.innerText)).includes(fixture.complex.post.title), 'Home content');
        active = name + '-tree';
        await navigate(base + 'x/' + fixture.complex.docId + '?from=docTree');
        await page.wait(`!!document.querySelector('.menu-item-content[data-doc-id="${fixture.english.docId}"]')`);
        await page.evaluate(`document.querySelector('.menu-item-content[data-doc-id="${fixture.english.docId}"]').click()`);
        await page.wait(`location.pathname.endsWith('/x/${fixture.english.docId}')&&document.documentElement.lang==='en-US'&&document.body.innerText.includes('English contract')`);
        assert.ok((await page.evaluate(() => location.href)).startsWith(base), 'Tree navigation lost app prefix');
        for (const kind of ['simple', 'media', 'database']) {
            active = name + '-' + kind;
            await navigate(base + 'x/' + fixture[kind].docId);
            assert.ok((await page.evaluate(() => document.body.innerText)).includes(fixture[kind].post.title));
            if (kind === 'database')
                await page.wait(`document.querySelectorAll('[data-av-type=\"table\"] .db-tab-content tbody tr').length>=1`);
            if (kind === 'media' || kind === 'database') {
                await page.wait(`document.querySelectorAll('.protyle-wysiwyg img').length>=6`);
                await page.evaluate(async () => { for (const i of document.querySelectorAll('.protyle-wysiwyg img')) {
                    i.loading = 'eager';
                    i.scrollIntoView();
                    try {
                        await i.decode();
                    }
                    catch { }
                } });
                assert.equal(await page.evaluate(() => [...document.querySelectorAll('.protyle-wysiwyg img')].filter(i => i.naturalWidth > 0).length), 6);
            }
        }
        active = name + '-password';
        await navigate(base + 'x/' + fixture.password.docId);
        assert.ok(!await page.evaluate(() => !!document.querySelector('.protyle-wysiwyg')), 'Locked document leaked content');
        await page.wait(`!!document.querySelector('.password-confirm input')&&!document.querySelector('.password-confirm button[type="submit"]').disabled`, 15000);
        const submit = async (value) => page.evaluate(`(()=>{const i=document.querySelector('.password-confirm input');i.value=${JSON.stringify(value)};i.dispatchEvent(new Event('input',{bubbles:true}));setTimeout(()=>document.querySelector('.password-confirm button[type="submit"]').click(),50)})()`);
        await submit('wrong-password');
        await page.wait(`!!document.querySelector('.el-message--error')`);
        assert.ok(!await page.evaluate(() => !!document.querySelector('.protyle-wysiwyg')));
        await submit('p1-password');
        await page.wait(`location.search.includes('key=fixture-key')&&!!document.querySelector('.protyle-wysiwyg')`, 30000);
        assert.ok((await page.evaluate(() => document.body.innerText)).includes('Password protected'));
    }
    assert.equal(blocked.length, 0, 'External runtime dependency detected');
    assert.equal(requests.filter(r => r.url.includes('127.0.0.1:18088')).length, 0, 'Browser called private provider URL');
    assert.equal(requests.filter(r => /\/api\/ai\//.test(r.url)).length, 0, 'Unconfigured AI made automatic API calls');
    const failures = issues.filter(i => i.type === 'exception' || i.type === 'http' || i.type === 'error' || /hydration|mismatch|not found.*(?:key|locale)/i.test(i.text ?? ''));
    assert.deepEqual(failures, [], 'Browser errors or hydration/locale mismatches');
    const report = { status: 'passed', verifiedAt: new Date().toISOString(), browser: 'independent Chromium; no SiYuan/MCP changes', root, prefix, sceneCount: scenes.length, scenes, checks: { home: true, detail: true, treeNavigation: true, passwordWrongAndCorrect: true, images: 6, database: true, privateAddressNotLeaked: true, aiUnconfiguredCoreRead: true, externalRequests: 0, hydrationErrors: 0 }, warnings: issues };
    await mkdir(resolve(out, '..'), { recursive: true });
    await writeFile(out, JSON.stringify(report, null, 2) + '\n');
    console.log('Browser verification complete:', scenes.length, 'layout/language/theme scenes plus functional routes');
}
catch (error) {
    await mkdir(resolve(out, '..'), { recursive: true });
    await writeFile(out, JSON.stringify({ status: 'failed', scene: active, completedScenes: scenes.length, error: error.stack, issues, blocked }, null, 2) + '\n');
    throw error;
}
finally {
    page.close();
}
