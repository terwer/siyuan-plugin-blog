import test from 'node:test'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { realpath, readFile } from 'node:fs/promises'
const require = createRequire(await realpath(new URL('../node_modules/vite/package.json', import.meta.url)))
const { transform } = require('esbuild')
const source = (await readFile(new URL('../utils/databaseViewFilter.ts', import.meta.url), 'utf8')).replace(/export /g, '')
const { code } = await transform(source, { loader: 'ts', target: 'es2022' })
const mod = new Function(code + '\nreturn {filterViewSnapshot,matchesCell,matchesDate,getFilterFields,resultCount}')()

const cell = (valueType, value) => ({ valueType, value })
const column = (id, name, type) => ({ id, name, type })
const text = value => cell('text', { text: { content: value } })
const number = value => cell('number', { number: { content: value, isNotEmpty: true } })
const date = value => cell('date', { date: { content: value, isNotEmpty: true, formattedContent: new Date(value).toISOString().slice(0, 10) } })
const select = value => cell('select', { select: { content: value } })

test('文本、数字、日期和选择字段都使用统一筛选模型', () => {
  assert.equal(mod.matchesCell(text('准备调研样本'), 'contains', '调研'), true)
  assert.equal(mod.matchesCell(number(4), 'gt', '3'), true)
  assert.equal(mod.matchesCell(select('完成'), 'equals', '完成'), true)
  assert.equal(mod.matchesDate(date(Date.UTC(2026, 10, 18)), 'after', '2026-11-17'), true)
  assert.equal(mod.matchesDate(date(Date.UTC(2026, 10, 17)), 'before', '2026-11-17'), false)
})

test('rows 类型筛选不修改源视图', () => {
  const view = {
    columns: [column('name', '任务名称', 'text')],
    rows: [{ id: 'a', cells: [text('准备调研样本')] }, { id: 'b', cells: [text('验证列表视图')] }],
  }
  const filtered = mod.filterViewSnapshot(view, 'table', { fieldId: 'name', operator: 'contains', query: '列表' })
  assert.equal(view.rows.length, 2)
  assert.equal(filtered.rows.length, 1)
  assert.equal(filtered.rows[0].id, 'b')
})

test('gallery 类型筛选 cards，kanban 类型筛选 groups[].cards', () => {
  const fields = [column('name', '任务名称', 'text')]
  const cards = [{ id: 'a', values: [{ valueType: 'text', value: { keyID: 'name', text: { content: '准备调研样本' } } }] }, { id: 'b', values: [{ valueType: 'text', value: { keyID: 'name', text: { content: '验证列表视图' } } }] }]
  const gallery = mod.filterViewSnapshot({ fields, cards }, 'gallery', { fieldId: 'name', operator: 'contains', query: '列表' })
  assert.equal(gallery.cards.length, 1)
  const kanban = mod.filterViewSnapshot({ fields, groups: [{ id: 'g1', cards }, { id: 'g2', cards: [] }] }, 'kanban', { fieldId: 'name', operator: 'contains', query: '调研' })
  assert.equal(kanban.groups[0].cards.length, 1)
  assert.equal(kanban.groups[1].cards.length, 0)
  assert.equal(mod.resultCount(kanban, 'kanban'), 1)
})

test('只暴露有确定语义的字段和操作符', () => {
  const fields = mod.getFilterFields({ columns: [column('name', '任务名称', 'text'), column('asset', '附件', 'mAsset')] }, 'table')
  assert.deepEqual(fields.map(field => field.id), ['name'])
  assert.deepEqual(fields[0].operators, ['contains', 'equals'])
})

test('日历隐藏日期列仍可用于筛选但资源字段仍不可用', () => {
  const fields = mod.getFilterFields({ columns: [column('date', '截止日期', 'date'), column('asset', '附件', 'mAsset')] }, 'calendar')
  assert.deepEqual(fields.map(field => field.id), ['date'])
  assert.deepEqual(fields[0].operators, ['equals', 'before', 'after'])
})

test('块与多选值使用稳定的文本比较值', () => {
  const block = cell('block', { block: { content: '正文块' } })
  const multi = cell('mSelect', { mSelect: [{ content: '高' }, { content: '紧急' }] })
  assert.equal(mod.matchesCell(block, 'contains', '正文'), true)
  assert.equal(mod.matchesCell(multi, 'contains', '紧急'), true)
  assert.equal(mod.matchesCell(multi, 'equals', '高, 紧急'), true)
})

test('旧快照、未知字段和格式错误不会破坏原始视图', () => {
  const legacy = { rows: [{ id: 'legacy' }] }
  assert.equal(mod.filterViewSnapshot(legacy, 'table', { fieldId: 'missing', operator: 'contains', query: 'x' }), legacy)
  assert.equal(mod.resultCount(legacy, 'table'), 1)
  const invalidDate = cell('date', { date: { content: 'not-a-date', isNotEmpty: true } })
  assert.equal(mod.matchesDate(invalidDate, 'after', '2026-11-18'), false)
  const empty = { columns: [column('name', '名称', 'text')], rows: [{ id: 'a', cells: [text('alpha')] }] }
  const filtered = mod.filterViewSnapshot(empty, 'table', { fieldId: 'name', operator: 'contains', query: '不存在' })
  assert.equal(mod.resultCount(filtered, 'table'), 0)
  assert.equal(empty.rows.length, 1)
})

test('一万行合成快照本地筛选保持可接受性能', () => {
  const view = {
    columns: [column('name', '名称', 'text')],
    rows: Array.from({ length: 10000 }, (_, index) => ({
      id: String(index),
      cells: [text(index === 9999 ? '目标记录' : `记录-${index}`)],
    })),
  }
  const start = performance.now()
  const filtered = mod.filterViewSnapshot(view, 'table', { fieldId: 'name', operator: 'contains', query: '目标' })
  const elapsed = performance.now() - start
  assert.equal(filtered.rows.length, 1)
  assert.ok(elapsed < 250, `filter took ${elapsed.toFixed(1)}ms`)
})