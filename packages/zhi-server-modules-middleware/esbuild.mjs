import esbuild from "esbuild"
import fse from "fs-extra"
import fs from "fs"
import minimist from "minimist"
import inlineImportPlugin from "esbuild-plugin-inline-import"
import builtinModules from "builtin-modules"

const outDir = "dist/packages/zhi/server/middleware"

const args = minimist(process.argv.slice(2))
const isProduction = args.production

const resultHandler = async (result) => {
    result.metafile &&
        console.log(
            await esbuild.analyzeMetafile(result.metafile, {
                verbose: true,
            })
        )
}

// clean old built files
if (fs.existsSync(outDir)) {
    fse.rmdirSync(outDir, { recursive: true })
}
fse.mkdirpSync(outDir)

/**
 * @type {import("esbuild").BuildOptions}
 */
const commonOptions = {
    bundle: true,
    sourcemap: isProduction ? false : "inline",
    loader: {
        ".js": "jsx",
        ".png": "dataurl",
        ".jpg": "dataurl",
        ".svg": "dataurl",
        ".woff": "dataurl",
        ".woff2": "dataurl",
    },
    define: {
        "process.env.NODE_ENV": isProduction ? '"production"' : '"development"',
    },
    minify: isProduction,
    // metafile: true
}

// build extension (node app)
esbuild
    .build({
        ...commonOptions,
        outdir: outDir,
        entryPoints: ["packages/zhi-server-modules-middleware/src/index.ts"],
        external: ["esbuild", "fsevents", "express", ...builtinModules],
        format: "cjs",
        platform: "node",
        mainFields: ["module", "main"],
        plugins: [inlineImportPlugin()],
    })
    .then(resultHandler)
    .catch(() => {
        process.exit(1)
    })
