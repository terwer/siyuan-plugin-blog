#  Copyright (c) 2023, Terwer . All rights reserved.
#  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
#
#  This code is free software; you can redistribute it and/or modify it
#  under the terms of the GNU General Public License version 2 only, as
#  published by the Free Software Foundation.  Terwer designates this
#  particular file as subject to the "Classpath" exception as provided
#  by Terwer in the LICENSE file that accompanied this code.
#
#  This code is distributed in the hope that it will be useful, but WITHOUT
#  ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
#  FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
#  version 2 for more details (a copy is included in the LICENSE file that
#  accompanied this code).
#
#  You should have received a copy of the GNU General Public License version
#  2 along with this work; if not, write to the Free Software Foundation,
#  Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
#
#  Please contact Terwer, Shenzhen, Guangdong, China, youweics@163.com
#  or visit www.terwer.space if you need additional information or have any
#  questions.

import os

import scriptutils

if __name__ == "__main__":
    # 切换工作空间
    scriptutils.switch_workdir()

    scriptutils.rm_folder("./dist-cjs")
    # theme.js
    os.system("tsc && vite build -c vite.cjs.config.ts --outDir dist-cjs")

    # plugin-system-hook.js
    os.system("tsc && vite build -c config/vite.cjs.config.plugin.system.hook.ts --outDir dist-cjs/plugin-system")
    scriptutils.rm_folder("dist-cjs/plugin-system/fonts")

    # zhi-demo-plugin/main.js
    os.system("tsc && vite build -c config/plugins/vite.cjs.config.zhi-demo-plugin.ts --outDir "
              "dist-cjs/zhi-plugins/zhi-demo-plugin")
    scriptutils.cp_file("src/apps/zhi/zhi-plugins/zhi-demo-plugin/manifest.json", "dist-cjs/zhi-plugins/zhi-demo"
                                                                                  "-plugin/manifest.json")
    scriptutils.rm_folder("dist-cjs/zhi-plugins/zhi-demo-plugin/fonts")

    print("cjs构建完成.")
