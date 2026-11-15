import { cp, readdir, realpath, lstat, unlink, rename, access } from 'node:fs/promises';
import { resolve, join, sep } from 'node:path';

/** Materialize links only inside a generated standalone output directory. */
export async function materializeGeneratedLinks(directory) {
    const output = await realpath(resolve(directory));
    const exists = path => access(path).then(() => true, () => false);
    const inside = path => path.startsWith(output + sep);
    async function validate(path, visited = new Set()) {
        const canonical = await realpath(path);
        if (!inside(canonical)) throw Error('Dependency link escapes Node output');
        if (visited.has(canonical)) return;
        visited.add(canonical);
        if ((await lstat(canonical)).isDirectory()) {
            for (const entry of await readdir(canonical)) await validate(join(canonical, entry), visited);
        }
    }
    let count = 0;
    async function walk(parent) {
        for (const entry of await readdir(parent)) {
            const path = join(parent, entry);
            if (!inside(path)) throw Error('Generated path outside Node output');
            const stat = await lstat(path);
            if (stat.isSymbolicLink()) {
                await validate(path);
                const temporary = path + '.materializing';
                if (await exists(temporary)) throw Error('Incomplete previous Node finalization');
                await cp(await realpath(path), temporary, { recursive: true, dereference: true });
                await unlink(path); // The link itself, never its target directory.
                await rename(temporary, path);
                count++;
            } else if (stat.isDirectory()) {
                await walk(path);
            }
        }
    }
    await walk(output);
    return count;
}
