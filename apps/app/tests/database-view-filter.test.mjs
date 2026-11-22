import test from 'node:test'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { realpath, readFile } from 'node:fs/promises'
const require = createRequire(await realpath(new URL('../node_modules/vite/package.json', import.meta.url)))
const { transform } = require('esbuild')
const source = (await readFile(new URL('../utils/databaseViewFilter.ts', import.meta.url), 'utf8')).replace(/export /g, '')
const { code } = await transform(source, { loader: 'ts', target: 'es2022' })
const mod = new Function(code + '\nreturn {filterViewSnapshot,matchesCell,matchesDate,getFilterFields,resultCount,searchViewSnapshot,sortViewSnapshot,getSortFields}')()

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
  assert.ok(fields[0].operators.includes('contains'))
  assert.ok(fields[0].operators.includes('empty'))
})

test('日历隐藏日期列仍可用于筛选但资源字段仍不可用', () => {
  const fields = mod.getFilterFields({ columns: [column('date', '截止日期', 'date'), column('asset', '附件', 'mAsset')] }, 'calendar')
  assert.deepEqual(fields.map(field => field.id), ['date'])
  assert.ok(fields[0].operators.includes('before'))
  assert.ok(fields[0].operators.includes('after'))
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
test('搜索和排序只改变本地快照，不改原始数据', () => {
  const view = {
    columns: [column('name', '名称', 'text'), column('amount', '金额', 'number')],
    rows: [
      { id: 'a', cells: [text('华东项目'), number(300)] },
      { id: 'b', cells: [text('华南项目'), number(100)] },
      { id: 'c', cells: [text('西北运维'), number(200)] },
    ],
  }
  const searched = mod.searchViewSnapshot(view, 'table', '华南')
  assert.deepEqual(searched.rows.map(row => row.id), ['b'])
  const sorted = mod.sortViewSnapshot(view, 'table', [{ fieldId: 'amount', direction: 'asc' }])
  assert.deepEqual(sorted.rows.map(row => row.id), ['b', 'c', 'a'])
  assert.deepEqual(view.rows.map(row => row.id), ['a', 'b', 'c'])
})

test('卡片和看板搜索覆盖卡片字段', () => {
  const fields = [column('name', '名称', 'text')]
  const cards = [{ id: 'a', values: [{ valueType: 'text', value: { keyID: 'name', text: { content: '华东项目' } } }] }, { id: 'b', values: [{ valueType: 'text', value: { keyID: 'name', text: { content: '华南项目' } } }] }]
  assert.deepEqual(mod.searchViewSnapshot({ fields, cards }, 'gallery', '华南').cards.map(card => card.id), ['b'])
  const board = mod.searchViewSnapshot({ fields, groups: [{ id: 'g1', cards }, { id: 'g2', cards: [] }] }, 'kanban', '华东')
  assert.deepEqual(board.groups[0].cards.map(card => card.id), ['a'])
  assert.equal(board.groups[1].cards.length, 0)
})

test('多条件与嵌套分组支持且或、清空和未完成条件', () => {
  const view = { columns: [column('status', '合同状态', 'text'), column('amount', '合同金额', 'number')], rows: [
    {id: '华中教育', cells: [text('执行中'), number(960000)]},
    {id: '华北能源', cells: [text('已完成'), number(540000)]},
    {id: '西部交通', cells: [text('待启动'), number(1780000)]},
  ] }
  const status = {fieldId: 'status', operator: 'equals', query: '执行中'}
  const amount = {fieldId: 'amount', operator: 'gt', query: '1000000'}
  const group = {kind: 'group', join: 'or', rules: [status, {kind: 'group', join: 'and', rules: [amount, {...status, query: ''}]}]}
  assert.deepEqual(mod.filterViewSnapshot(view, 'table', group).rows.map(row => row.id), ['华中教育', '西部交通'])
  group.join = 'and'
  assert.equal(mod.resultCount(mod.filterViewSnapshot(view, 'table', group), 'table'), 0)
  group.rules.length = 0
  assert.equal(mod.filterViewSnapshot(view, 'table', group), view)
  assert.equal(view.rows.length, 3)
})

test('日期条件区分起止端点，空值与数字零不混淆', () => {
  const from = new Date(2026, 10, 20).getTime(); const until = new Date(2027, 1, 28).getTime()
  const range = cell('date', {date:{content:from, content2:until, hasEndDate:true}})
  assert.equal(mod.matchesDate(range, 'equals', '2026-11-20', 'start'), true)
  assert.equal(mod.matchesDate(range, 'equals', '2027-02-28', 'end'), true)
  assert.equal(mod.matchesDate(date(from), 'empty', '', 'end'), true)
  assert.equal(mod.matchesCell(number(0), 'notEmpty', ''), true)
  assert.equal(mod.matchesCell(number(0), 'equals', '0'), true)
  assert.equal(mod.matchesCell(cell('number', {number:{}}), 'equals', '0'), false)
})

test('多字段排序按优先级稳定比较并保留空值在末尾', () => {
  const view = { columns: [column('status', '合同状态', 'text'), column('amount', '合同金额', 'number')], rows: [
    {id: '华中教育', cells: [text('执行中'), number(960000)]},
    {id: '华北能源', cells: [text('已完成'), number(540000)]},
    {id: '江南医药', cells: [text('执行中'), number(2160000)]},
    {id: '南方零售', cells: [text('执行中'), number(2160000)]},
    {id: '待确认合同', cells: [text('执行中'), null]},
  ] }
  const status = {fieldId: 'status', direction: 'asc'}
  const amount = {fieldId: 'amount', direction: 'desc'}
  const first = mod.sortViewSnapshot(view, 'table', [status, amount]).rows.map(row => row.id)
  assert.deepEqual(first.filter(id => id !== '华北能源'), ['江南医药', '南方零售', '华中教育', '待确认合同'])
  assert.deepEqual(mod.sortViewSnapshot(view, 'table', [amount, status]).rows.map(row => row.id), ['江南医药', '南方零售', '华中教育', '华北能源', '待确认合同'])
  assert.equal(mod.sortViewSnapshot(view, 'table', []), view)
  assert.equal(view.rows[0].id, '华中教育')
})

test('日期起止分别排序，卡片与看板保留所在分组', () => {
  const fields = [column('plan', '计划开始', 'date'), column('project', '合同项目', 'block')]
  assert.deepEqual(mod.getSortFields({fields}, 'gallery').map(field => field.id), ['project', 'plan'])
  const entry = (id, from, until) => ({id, values: [{valueType: 'date', keyID: 'plan', value: {date: {content: from, content2: until, hasEndDate: until != null}}}]})
  const cards = [entry('门店改造', 1, 5), entry('仓储升级', 2, 4), entry('运维交接', 3, null)]
  const rule = {fieldId: 'plan', direction: 'asc'}
  assert.deepEqual(mod.sortViewSnapshot({fields, cards}, 'gallery', [rule]).cards.map(item => item.id), ['门店改造', '仓储升级', '运维交接'])
  const result = mod.sortViewSnapshot({fields, groups:[{id:'实施中',cards}, {id:'待启动',cards:[]}]}, 'kanban', [{...rule, datePart:'end'}])
  assert.deepEqual(result.groups.map(group => group.id), ['实施中', '待启动'])
  assert.deepEqual(result.groups[0].cards.map(item => item.id), ['仓储升级', '门店改造', '运维交接'])
  assert.equal(cards[0].id, '门店改造')
})

test('清除关键词恢复当前筛选与排序的结果', () => {
  const view = { columns: [column('project', '合同项目', 'text'), column('state', '合同状态', 'text'), column('amount', '合同金额', 'number')], rows: [
    {id: '仓储升级', cells: [text('智能仓储升级'), text('执行中'), number(1280000)]},
    {id: '医药冷链', cells: [text('医药冷链追溯'), text('执行中'), number(2160000)]},
    {id: '设备维保', cells: [text('设备年度维保'), text('已完成'), number(540000)]},
  ] }
  const filtered = mod.filterViewSnapshot(view, 'table', { fieldId: 'state', operator: 'equals', query: '执行中' })
  const result = query => mod.sortViewSnapshot(mod.searchViewSnapshot(filtered, 'table', query), 'table', [{fieldId: 'amount', direction: 'desc'}]).rows.map(row => row.id)
  assert.deepEqual(result('仓储'), ['仓储升级'])
  assert.deepEqual(result(''), ['医药冷链', '仓储升级'])
  assert.equal(view.rows.length, 3)
})
