import argparse
import os

import scriptutils

if __name__ == "__main__":
    # 切换工作空间
    scriptutils.switch_workdir()

  # 参数解析
    parser = argparse.ArgumentParser()
    parser.add_argument("-t", "--theme", action="store_true", required=False, help="devlop theme")
    parser.add_argument("-b", "--blog", action="store_true", required=False, help="devlop blog")
    parser.add_argument("-v", "--verbose", action="store_true", help="enable verbose output")
    args = parser.parse_args()

    if args.verbose:
        print("Verbose mode enabled")

    if args.blog:
        # blog
        os.chdir("./apps/blog")
        os.system("pnpm dev")
    elif args.theme:
        # theme
        os.chdir("./apps/theme")
        os.system("pnpm dev")
