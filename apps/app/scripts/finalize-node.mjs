import { access, cp, mkdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { materializeGeneratedLinks } from './lib/portable-output.mjs';
// Operate on generated output only; source dependencies remain untouched.
const output = resolve(import.meta.dirname, '../.output');
const modules = join(output, 'server/node_modules');
const exists = async path => access(path).then(() => true, () => false);
const upstream = join(modules, '@sxzz/popperjs-es');
const alias = join(modules, '@popperjs/core');
if (await exists(upstream) && !(await exists(alias))) {
    await mkdir(join(modules, '@popperjs'), { recursive: true });
    await cp(upstream, alias, { recursive: true, dereference: true });
}
const count = await materializeGeneratedLinks(output);
console.log(`Standalone Node entry: .output/server/index.mjs; materialized ${count} dependency links`);
