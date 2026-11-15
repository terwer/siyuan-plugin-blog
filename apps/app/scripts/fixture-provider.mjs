import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
const fixture = JSON.parse(await readFile(new URL('../tests/fixtures/posts.json', import.meta.url), 'utf8'));
export const posts = fixture.posts;
export function createFixtureProvider() {
    const events = [];
    const tree = Object.entries(posts).map(([kind, d]) => ({ id: d.docId, name: d.post.title, depth: 1, parentId: '', isShared: true, hasPassword: kind === 'password' }));
    const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScLbtAAAAABJRU5ErkJggg==', 'base64');
    const server = http.createServer(async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
        if (req.method === 'OPTIONS') {
            res.writeHead(204);
            res.end();
            return;
        }
        const path = new URL(req.url, 'http://fixture').pathname;
        const send = (value, status = 200) => { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' }); res.end(JSON.stringify(value)); };
        if (path === '/_p1/meta')
            return send(Object.fromEntries(Object.entries(posts).map(([k, v]) => [k, { docId: v.docId, title: v.post.title }])));
        if (path === '/_p1/events')
            return send(events);
        if (path.startsWith('/api/asset/origin/base64/')) {
            events.push({ path, host: req.headers.host, kind: 'media' });
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(png);
            return;
        }
        let body = {};
        try {
            let raw = '';
            for await (const b of req)
                raw += b;
            body = raw ? JSON.parse(raw) : {};
        }
        catch {
            return send({ code: 1, msg: 'Invalid JSON' }, 400);
        }
        events.push({ path, host: req.headers.host, body, kind: ((req.headers['user-agent'] ?? '').includes('Chrome') ? 'browser' : 'server') });
        const current = Object.entries(posts).find(([, d]) => d.docId === (body.fdId ?? body.docId));
        const settings = { lang: current?.[0] === 'english' ? 'en_US' : 'zh_CN', siteTitle: 'P1 LAN reader', siteSlogan: 'Self-hosted fixture', siteDescription: 'P0 contract regression', homePageId: posts.complex.docId, domain: '', docPath: 'x', header: '', footer: '', postMetaEnabled: true, aiAssistantEnabled: true, linkHoverPreview: { enabled: true }, theme: { mode: 'light', lightTheme: 'Zhihu', darkTheme: 'Zhihu', themeVersion: '0.1.5' } };
        if (path.startsWith('/api/settings/'))
            return send(body.key === 'domains.json' ? { domains: [] } : settings);
        if (path === '/api/share/validatePassword')
            return send(body.password === 'p1-password' && body.encryptPassword === 'fixture-encrypted-password' ? { code: 0, msg: 'ok', data: 'fixture-key' } : { code: 1, msg: '密码不匹配', data: null });
        if (path === '/api/share/getDoc') {
            if (!current)
                return send({ code: 1, msg: 'not shared', data: null });
            const [kind, d] = current, locked = kind === 'password' && body.fdKey !== 'fixture-key';
            const post = structuredClone(d.post);
            post.docTree = tree;
            post.docTreeLevel = 3;
            const data = locked ? { passwordEnabled: true, password: 'fixture-encrypted-password', isShared: true } : { post: JSON.stringify(post), author: 'fixture-owner', viewUrl: `/x/${d.docId}`, passwordEnabled: false, password: '', isShared: true, shareStatus: 'COMPLETED' };
            return send({ code: 0, msg: 'ok', data: JSON.stringify(data) });
        }
        send({ code: 404, msg: 'Unexpected fixture route' }, 404);
    });
    return { server, events };
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    const { server } = createFixtureProvider();
    const privateServer = http.createServer(server.listeners('request')[0]);
    privateServer.listen(Number(process.env.P1_FIXTURE_PRIVATE_PORT ?? 18088), '127.0.0.1');
    server.listen(Number(process.env.P1_FIXTURE_PORT ?? 18087), '127.0.0.1', () => console.log('P1 read-only fixture provider ready'));
}
