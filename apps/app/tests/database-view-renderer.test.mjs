import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const menu = await readFile(new URL('../plugins/libs/dataview/filterMenu.ts', import.meta.url), 'utf8')
const source = (await readFile(new URL('../plugins/07.datatable.client.ts', import.meta.url), 'utf8')) + '\n' + (await readFile(new URL('../plugins/libs/dataview/native.ts', import.meta.url), 'utf8'))

test('真实五种数据库视图都有独立 renderer 分支', () => {
  for (const type of ['table', 'list', 'gallery', 'kanban', 'calendar']) {
    assert.match(source, new RegExp(`case "${type}"`), type)
  }
  assert.match(source, /dataset\.viewType/)
  assert.match(source, /renderItem/)
  assert.match(source, /currentDataTable/)
  assert.match(source, /renderUnsupported/)
  assert.match(source, /normalizeDataTable/)
  assert.match(source, /div\[data-av-type\]/)
})

test('renderer 分支覆盖真实响应专属字段', () => {
  assert.match(source, /view\?\.rows/)
  assert.match(source, /view\?\.fields/)
  assert.match(source, /view\?\.cards/)
  assert.match(source, /view\?\.groups/)
  assert.match(source, /dateKeyID/)
  assert.match(source, /setSafeCellContent/)
  assert.doesNotMatch(source, /content\.innerHTML\s*=\s*card\?\.coverContent/)
  assert.match(source, /showCover = true/)
  assert.match(source, /av__gallery-item\", false/)
  assert.match(source, /data-readonly-sort/)
  assert.match(source, /enforceReadOnly/)
  assert.match(source, /data-row-id/)
  assert.match(source, /av-row-open/)
  assert.match(source, /data-readonly-title/)
  assert.match(source, /当前视图暂无数据/)
  assert.match(source, /createSvg/)
  assert.match(source, /onSort/)
  assert.match(source, /onSearch/)
  assert.match(source, /onCopy/)
  assert.match(source, /navigator\.clipboard/)
})

test('未知类型只读回退不猜测为表格', () => {
  assert.match(source, /暂不支持数据库视图类型/)
  assert.match(source, /db-view-unsupported/)
  assert.doesNotMatch(source, /default:\s*renderTable/)
})

test('筛选菜单提供条件、分组及本地状态控制', () => {
  assert.match(source, /openDatabaseFilterMenu/)
  assert.match(source, /filterViewSnapshot/)
  assert.match(menu, /添加筛选条件分组/)
  assert.match(menu, /清空筛选规则/)
  assert.match(menu, /aria-live/)
})
