/*
 * Copyright (c) 2023, Terwer . All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Terwer designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Terwer in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Terwer, Shenzhen, Guangdong, China, youweics@163.com
 * or visit www.terwer.space if you need additional information or have any
 * questions.
 */

const TypeDoc = require("typedoc")
const { join } = require("path")

// TODO vitepress need to be adapted
// https://github.com/tgreyuk/typedoc-plugin-markdown/issues/287
async function main() {
  await makeOneTypedoc("zhi", "src/theme.ts")
}

async function makeOneTypedoc(projectName, entry) {
  const app = new TypeDoc.Application()

  // If you want TypeDoc to load tsconfig.json / typedoc.json files
  app.options.addReader(new TypeDoc.TSConfigReader())
  app.options.addReader(new TypeDoc.TypeDocReader())

  app.bootstrap({
    entryPoints: [join("packages", projectName, entry)],
    tsconfig: join("packages", projectName, "tsconfig.json"),
    theme: "default",
    plugin: ["typedoc-plugin-rename-defaults", "typedoc-plugin-markdown"],
  })

  const project = app.convert()

  if (project) {
    // Project may not have converted correctly
    const outputDir = join("packages", "zhi-docs-vitepress", projectName)

    // Rendered docs
    await app.generateDocs(project, outputDir)
    // Alternatively generate JSON output
    await app.generateJson(project, outputDir + "/documentation.json")
  }
}

main().catch(console.error)
