import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile, realpath } from 'node:fs/promises'
import { createRequire } from 'node:module'

const require = createRequire(await realpath(new URL('../node_modules/vite/package.json', import.meta.url)))
const { transform } = require('esbuild')
const source = (await readFile(new URL('../utils/databaseViewSsr.ts', import.meta.url), 'utf8')).replace('export const renderDatabaseViewsSsr', 'const renderDatabaseViewsSsr')
const { code } = await transform(source, { loader: 'ts', target: 'es2022' })
const renderDatabaseViewsSsr = new Function(`${code}\nreturn renderDatabaseViewsSsr`)()

const html = '<div data-type="NodeAttributeView" data-av-id="table-1"><div class="old-render"></div></div><div class="protyle-attr"></div>'

 test('SSR 数据库使用友好抽象块，不输出未加载样式的裸表格', () => {
  const output = renderDatabaseViewsSsr(html, {
    'table-1': {
      order: ['view-1', 'view-2'],
      'view-1': { viewType: 'table', name: '客户合同与项目回款管理', view: { rows: [{ id: 'row-1' }] } },
      'view-2': { viewType: 'gallery', name: '卡片', view: { cards: [] } },
    },
  })
  assert.match(output, /db-view-ssr-placeholder/)
  assert.match(output, /客户合同与项目回款管理/)
  assert.match(output, /2 个视图/)
  assert.doesNotMatch(output, /old-render/)
  assert.doesNotMatch(output, /db-ssr-table/)
})

test('上线前旧单表快照也进入同一 SSR 抽象块', () => {
  const output = renderDatabaseViewsSsr(html, {
    'table-1': { viewType: 'table', columns: [{ id: 'name', name: '名称' }], rows: [{ id: 'row-1' }] },
  })
  assert.match(output, /db-view-ssr-placeholder/)
  assert.match(output, /1 个视图/)
})

test('未知快照不被猜测成数据库或表格', () => {
  assert.equal(renderDatabaseViewsSsr(html, { 'table-1': { rows: [] } }), html)
})
