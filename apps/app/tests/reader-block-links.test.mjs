import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile, realpath } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { createRenderer, h, nextTick, ref, withDirectives } from 'vue'
import { normalizeViewerHome } from '../utils/viewerUrls.ts'

const require = createRequire(await realpath(new URL('../node_modules/vite/package.json', import.meta.url)))
const { transform } = require('esbuild')

async function load(file, bindings, result) {
  const source = (await readFile(new URL(file, import.meta.url), 'utf8'))
    .replace(/^import .+$/gm, '')
    .replace(/^export (?:default )?/gm, '')
  const { code } = await transform(source, { loader: 'ts' })
  return new Function(...Object.keys(bindings), `${code}\nreturn ${result}`)(...Object.values(bindings))
}

class BlockReference extends EventTarget {
  dataset = {}
  attributes = new Map([['data-id', '20261028143747-w0xddqk']])
  getAttribute(name) { return this.attributes.get(name) ?? null }
  setAttribute(name, value) { this.attributes.set(name, value) }
}

test('reader block references open once after the real Vue directive mounts and updates', async () => {
  const opened = []
  let docPath = 'x'
  const info = () => {}
  const useStaticBlockRef = await load('../plugins/libs/domparser/useStaticBlockRef.ts', {
    createAppLogger: () => ({ info }),
    useBaseUrl: () => ({ getHome: () => normalizeViewerHome('https://siyuan.wiki', '/', false) }),
    window: {
      localStorage: { getItem: () => JSON.stringify({ docPath }) },
      open: (...args) => opened.push(args),
    },
  }, 'useStaticBlockRef')

  let directive
  await load('../plugins/05.domparser.static.client.ts', {
    defineNuxtPlugin: plugin => plugin({ vueApp: { directive: (_, handler) => { directive = handler } } }),
    createAppLogger: () => ({ info }),
    useSvg: () => ({ addSymbolsToPage: () => {} }),
    useStaticBlockRef,
    SIYUAN_SYMBOLS: [],
  }, 'undefined')

  const block = new BlockReference()
  const elements = [block]
  const container = {}
  const body = { querySelectorAll: selector => selector === 'span[data-type="block-ref"]' ? elements : [] }
  const renderVersion = ref(0)
  const renderer = createRenderer({
    createElement: () => body, insert: () => {}, remove: () => {}, patchProp: () => {},
    parentNode: () => container, nextSibling: () => null,
  })
  const app = renderer.createApp({
    render: () => withDirectives(h('div', { 'data-render-version': renderVersion.value }), [[directive]]),
  })
  const assertOpen = (target, type, key, expectedUrl) => {
    opened.length = 0
    const event = Object.assign(new Event(type, { cancelable: true }), key ? { key } : {})
    target.dispatchEvent(event)
    assert.equal(event.defaultPrevented, true)
    assert.deepEqual(opened, [[expectedUrl, '_blank', 'noopener,noreferrer']])
  }

  app.mount(container)
  try {
    const x = 'https://siyuan.wiki/x/20261028143747-w0xddqk'
    assertOpen(block, 'click', undefined, x)

    renderVersion.value++
    await nextTick()
    assertOpen(block, 'click', undefined, x)

    docPath = 's'
    const inserted = new BlockReference()
    elements.push(inserted)
    renderVersion.value++
    await nextTick()
    const s = 'https://siyuan.wiki/s/20261028143747-w0xddqk'
    assert.equal(block.dataset.shareHref, s)
    assert.equal(block.dataset.docId, '20261028143747-w0xddqk')
    assert.equal(block.getAttribute('role'), 'link')
    assert.equal(block.getAttribute('tabindex'), '0')
    assertOpen(block, 'keydown', 'Enter', s)
    assertOpen(block, 'keydown', ' ', s)
    assertOpen(inserted, 'click', undefined, s)
  } finally {
    app.unmount()
  }
})
