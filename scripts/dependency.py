import os

import scriptutils

if __name__ == "__main__":
    # 切换工作空间
    scriptutils.switch_workdir()

    # blog
    os.chdir("./apps/blog")
    os.system("pnpm install")

    # theme
    os.chdir("../theme")
    os.system("pnpm install")

    print("Dependency installed.")
