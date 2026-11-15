import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, mkdtemp, writeFile, readFile, symlink, lstat } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { materializeGeneratedLinks } from '../scripts/lib/portable-output.mjs';
const parent=resolve(import.meta.dirname,'../../artifacts/p6/finalizer-tests');
await mkdir(parent,{recursive:true});
const linkType=process.platform==='win32'?'junction':'dir';
test('standalone output materializes an absolute dependency link and preserves its target',async()=>{
 const root=await mkdtemp(join(parent,'portable-'));await mkdir(join(root,'target'));await writeFile(join(root,'target','index.js'),'portable');await symlink(join(root,'target'),join(root,'dependency'),linkType);
 assert.equal(await materializeGeneratedLinks(root),1);assert.equal((await lstat(join(root,'dependency'))).isSymbolicLink(),false);assert.equal(await readFile(join(root,'dependency','index.js'),'utf8'),'portable');assert.equal(await readFile(join(root,'target','index.js'),'utf8'),'portable');assert.equal(await materializeGeneratedLinks(root),0);
});
test('standalone output rejects dependency links outside generated output',async()=>{
 const root=await mkdtemp(join(parent,'escape-'));const outside=await mkdtemp(join(parent,'source-'));await writeFile(join(outside,'unchanged'),'source');await symlink(outside,join(root,'dependency'),linkType);
 await assert.rejects(materializeGeneratedLinks(root),/escapes Node output/);assert.equal(await readFile(join(outside,'unchanged'),'utf8'),'source');assert.ok((await lstat(join(root,'dependency'))).isSymbolicLink());
});
test('standalone output refuses to overwrite incomplete previous materialization',async()=>{
 const root=await mkdtemp(join(parent,'incomplete-'));await mkdir(join(root,'target'));await symlink(join(root,'target'),join(root,'dependency'),linkType);await mkdir(join(root,'dependency.materializing'));
 await assert.rejects(materializeGeneratedLinks(root),/Incomplete previous/);assert.ok((await lstat(join(root,'dependency'))).isSymbolicLink());
});
