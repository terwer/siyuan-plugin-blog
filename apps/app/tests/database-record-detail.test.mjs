import test from 'node:test'
import assert from 'node:assert/strict'
import { normalizeDataTable } from '../utils/databaseViewSsr.ts'
import { readDatabaseRowCell, resolveDatabaseRecordDetail } from '../utils/databaseRecordDetail.ts'

const primary = {id:'project', name:'合同项目', type:'block'}
const status = {id:'status', name:'合同状态', type:'text'}
const amount = {id:'amount', name:'合同金额', type:'number'}
const kind = {id:'kind', name:'合同类型', type:'select'}
const field = (key, value) => ({valueType:key.type, value:{keyID:key.id, type:key.type, ...value}})
const rowId = '西部交通数据迁移'
const projectCell = field(primary, {block:{content:'西部交通集团数据中心迁移项目'}})
const statusCell = field(status, {text:{content:'待启动'}})
const amountCell = field(amount, {number:{content:1780000}})
const kindCell = field(kind, {mSelect:[{content:'数据迁移', color:'3'}]})
const table = {
  name:'项目管理', order:['gallery','kanban','table','list','calendar'],
  table:{viewType:'table', columns:[status, amount, primary, kind], rows:[{id:rowId, cells:[kindCell, amountCell, projectCell, statusCell]}]},
  list:{viewType:'list', columns:[primary], rows:[{id:rowId, cells:[projectCell]}]},
  calendar:{viewType:'calendar', columns:[primary, {...amount, hidden:true}], rows:[{id:rowId,cells:[projectCell, amountCell]}]},
  gallery:{viewType:'gallery', fields:[primary,kind],cards:[{id:rowId,values:[projectCell,kindCell]}]},
  kanban:{viewType:'kanban', fields:[primary,kind],cards:[], groups:[{fields:[kind,primary],cards:[{id:rowId,values:[projectCell,kindCell]}]}]},
}

test('五个入口都使用记录标识，展示一致的已发布属性', () => {
  const snapshot = JSON.stringify(table)
  for (const viewId of table.order) {
    const detail = resolveDatabaseRecordDetail(table, viewId, rowId)
    assert.equal(detail.id,rowId)
    assert.equal(detail.title,'西部交通集团数据中心迁移项目')
    assert.equal(detail.databaseName,'项目管理')
    assert.deepEqual(detail.fields.map(x=>x.field.name),['合同状态','合同金额','合同项目','合同类型'])
    assert.deepEqual(detail.fields.map(x=>x.cell),[statusCell,amountCell,projectCell,kindCell])
  }
  assert.equal(resolveDatabaseRecordDetail(table,'gallery','其他合同'),null)
  assert.equal(JSON.stringify(table),snapshot)
})

test('隐藏列与稀疏表格按字段标识关联，不把其他列的值配给缺失列', () => {
  const row = {id:rowId,cells:[statusCell,projectCell]}
  const columns = [{...amount,hidden:true},status,primary]
  assert.equal(readDatabaseRowCell(row,columns,'project'),projectCell)
  assert.equal(readDatabaseRowCell(row,columns,'status'),statusCell)
  assert.equal(readDatabaseRowCell(row,columns,'amount'),undefined)
})

test('历史单表使用原有位置字段，数值零可读取', () => {
  const legacy = normalizeDataTable({viewType:'table',name:'项目管理', columns:[primary,amount], rows:[
    {id:rowId,cells:[{type:'block',block:{content:'西部交通集团数据中心迁移项目'}},{type:'number',number:{content:0}}]},
  ]},'项目管理台账')
  const detail = resolveDatabaseRecordDetail(legacy,legacy.order[0],rowId)
  assert.equal(detail.title,'西部交通集团数据中心迁移项目')
  assert.equal(detail.fields[1].cell.number.content,0)
})
