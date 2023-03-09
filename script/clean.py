# Copyright (c) 2022 Landray Authors. All Rights Reserved.
# @author terwer on 2023/3/8
# ========================================================
import os

import scriptutils

if __name__ == "__main__":
    # 切换工作空间
    scriptutils.switch_workdir()

    # src
    scriptutils.rm_files("./src/**/*.d.ts")
    scriptutils.rm_files("./src/*.d.ts")

    scriptutils.rm_files("./src/**/*.map")
    scriptutils.rm_files("./src/*.map")

    scriptutils.rm_files("./src/**/*.js")
    scriptutils.rm_files("./src/*.js")

    if scriptutils.is_dir_empty("./lib/src"):
        scriptutils.rm_folder("./lib/src")

    # lib
    scriptutils.rm_files("./lib/**/*.d.ts")
    scriptutils.rm_files("./lib/*.d.ts")

    scriptutils.rm_files("./lib/**/*.map")
    scriptutils.rm_files("./lib/*.map")

    # none default dts
    scriptutils.rm_files("./typings/*alpha.d.ts")
    scriptutils.rm_files("./typings/*beta.d.ts")
    scriptutils.rm_files("./typings/*public.d.ts")

    # formatter
    os.system("pnpm prettier")
    os.system("pnpm lint:fix")
    print("cleaned.")