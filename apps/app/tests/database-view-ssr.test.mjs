import test from 'node:test'
import assert from 'node:assert/strict'
import { load } from 'cheerio'

import { normalizeDataTable, renderDatabaseViewsSsr } from '../utils/databaseViewSsr.ts'

const html = '<div class="正文"><div data-type="NodeAttributeView" data-av-id="table-1"><div class="old-render" spellcheck="false"></div><div class="protyle-attr"></div></div><div class="后续正文">业务说明</div></div>'

test('SSR 数据库使用友好抽象块，不输出未加载样式的裸表格', () => {
  const output = renderDatabaseViewsSsr(html, {
    'table-1': {
      order: ['view-1', 'view-2'],
      'view-1': { viewType: 'table', name: '客户合同与项目回款管理', view: { name: '表格', rows: [{ id: 'row-1' }] } },
      'view-2': { viewType: 'gallery', name: '卡片', view: { cards: [] } },
    },
  })
  assert.match(output, /db-view-ssr-placeholder/)
  assert.match(output, /客户合同与项目回款管理/)
  assert.match(output, /2 个视图/)
  assert.doesNotMatch(output, /old-render/)
  assert.doesNotMatch(output, /db-ssr-table/)
  const $ = load(output, {}, false)
  assert.equal($('.正文 > [data-av-id="table-1"] > .db-view-ssr-placeholder').length, 1)
  assert.equal($('.正文 > [data-av-id="table-1"] > .protyle-attr').length, 1)
  assert.equal($('.正文 > .后续正文').text(), '业务说明')
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

test('数据库标题独立于标签，视图按原生元数据而非采集完成顺序排列', () => {
  const views = [{id: '表格', name: '合同台账', type: 'table'}, {id: '列表', name: '待跟进合同', type: 'list'}, {id: '看板', name: '交付阶段', type: 'kanban'}]
  const raw = { order: ['看板', '表格', '列表'], 看板: { name: '项目管理', views, view: { name: '交付阶段', groups: [] } }, 表格: { name: '项目管理', view: { name: '合同台账', columns: [], rows: [] } }, 列表: { name: '项目管理', view: { name: '待跟进合同', columns: [], rows: [] } } }
  const table = normalizeDataTable(raw, '台账')
  assert.equal(table.name, '项目管理')
  assert.deepEqual(table.order, ['表格', '列表', '看板'])
  assert.deepEqual(table.order.map(id => table[id].name), ['合同台账', '待跟进合同', '交付阶段'])
  const legacy = normalizeDataTable({name: '项目管理', viewType: 'table', columns: [], rows: []}, '台账')
  assert.equal(legacy.name, '项目管理')
  assert.equal(legacy[legacy.order[0]].viewType, 'table')
})
