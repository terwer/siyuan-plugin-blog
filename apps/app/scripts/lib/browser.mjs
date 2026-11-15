import { EventEmitter } from 'node:events';
export async function connectPage(port) {
    const response = await fetch(`http://127.0.0.1:${port}/json/list`);
    const pages = await response.json();
    if (pages.some(p => p.type === "page" && (p.url.includes("/stage/build/app/") || /思源笔记/.test(p.title)))) {
        throw Error("Use an independent test browser; SiYuan targets must not be navigated");
    }
    const page = pages.find(p => p.type === 'page');
    if (!page)
        throw Error('Headless test page missing');
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => { ws.addEventListener('open', resolve, { once: true }); ws.addEventListener('error', reject, { once: true }); });
    const pending = new Map(), events = new EventEmitter();
    let id = 0;
    ws.addEventListener('message', ({ data }) => { const r = JSON.parse(String(data)); if (r.id) {
        const p = pending.get(r.id);
        if (p) {
            pending.delete(r.id);
            clearTimeout(p.timer);
            r.error ? p.reject(Error(JSON.stringify(r.error))) : p.resolve(r.result);
        }
    }
    else
        events.emit(r.method, r.params); });
    const call = (method, params = {}) => new Promise((resolve, reject) => { const requestId = ++id; const timer = setTimeout(() => { pending.delete(requestId); reject(Error('CDP timeout ' + method)); }, 45000); pending.set(requestId, { resolve, reject, timer }); ws.send(JSON.stringify({ id: requestId, method, params })); });
    const evaluate = async (source) => { const r = await call('Runtime.evaluate', { expression: typeof source === 'function' ? `(${source})()` : source, awaitPromise: true, returnByValue: true }); if (r.exceptionDetails)
        throw Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text); return r.result?.value; };
    const wait = async (predicate, timeout = 30000) => { const end = Date.now() + timeout; while (Date.now() < end) {
        try {
            if (await evaluate(predicate))
                return;
        }
        catch (e) {
            if (!/context|Inspected target navigated|Cannot find/.test(e.message))
                throw e;
        }
        await new Promise(r => setTimeout(r, 150));
    } throw Error('Browser wait timeout: ' + predicate); };
    await call('Page.enable');
    await call('Runtime.enable');
    await call('Network.enable');
    return { call, evaluate, wait, events, close: () => ws.close() };
}
