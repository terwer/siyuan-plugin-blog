import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const source = await readFile(new URL('../plugins/07.datatable.client.ts', import.meta.url), 'utf8')

test('真实五种数据库视图都有独立 renderer 分支', () => {
  for (const type of ['table', 'list', 'gallery', 'kanban', 'calendar']) {
    assert.match(source, new RegExp(`case "${type}"`), type)
  }
  assert.match(source, /dataset\.viewType/)
  assert.match(source, /renderUnsupported/)
  assert.match(source, /div\[data-av-type\]/)
})

test('renderer 分支覆盖真实响应专属字段', () => {
  assert.match(source, /view\?\.rows/)
  assert.match(source, /view\?\.fields/)
  assert.match(source, /view\?\.cards/)
  assert.match(source, /view\?\.groups/)
  assert.match(source, /view\?\.calendar\?\.dateKeyID/)
  assert.match(source, /setSafeCellContent/)
  assert.doesNotMatch(source, /coverContent/)
})

test('未知类型只读回退不猜测为表格', () => {
  assert.match(source, /暂不支持数据库视图类型/)
  assert.match(source, /db-view-unsupported/)
  assert.doesNotMatch(source, /default:\s*renderTable/)
})

test('筛选编辑器和双语状态保持本地只读', () => {
  assert.match(source, /createFilterEditor/)
  assert.match(source, /db-view-filter-status/)
  assert.match(source, /role", "status"/)
  assert.match(source, /筛选/)
  assert.match(source, /No matching entries/)
  assert.match(source, /filterViewSnapshot/)
  assert.match(source, /noFields/)
  assert.match(source, /aria-live/)
})
