# Copyright (c) 2022 Terwer Authors. All Rights Reserved.
# @author terwer on 2023/3/7
# ========================================================

import argparse
import os.path

import scriptutils


def parse_json(filename):
    """
    解析json文件，并修改版本号未指定的值
    :param filename: 文件路径
    :param version_field: 版本号字段
    :param new_version: 版本号
    """

    # 读取 JSON 文件
    data = scriptutils.read_json_file(filename)

    # 修改 JSON 文件中的属性
    data["name"] = "terwer"
    data["description"] = "ts template lib for test"
    data["repository"] = "terwer/zhi-ts-template"
    data["author"] = "terwer"

    # 将修改后的 JSON 写回到文件中
    scriptutils.write_json_file(filename, data)


if __name__ == "__main__":
    # 获取当前工作空间
    cwd = scriptutils.get_workdir()

    # 参数解析
    parser = argparse.ArgumentParser()
    parser.add_argument("-b", "--backup", action="store_true", required=False, help="the file to be processed")
    parser.add_argument("-r", "--restore", action="store_true", required=False, help="the file to be processed")
    parser.add_argument("-v", "--verbose", action="store_true", help="enable verbose output")
    args = parser.parse_args()

    if args.verbose:
        print("Verbose mode enabled")

    # 备份
    if args.backup:
        if os.path.exists("./package-template.json"):
            parse_json(cwd + "package.json")
            print("package.json changed for test and ci only.")
        else:
            print("template not exist, ignored.")

    # 还原
    if args.restore:
        if os.path.exists("./package-template.json"):
            scriptutils.rm_file("./package.json")
            scriptutils.cp_file("./package-template.json", "./package.json")
            print("package.json restored.")
        else:
            print("template not exist, ignored.")

    print("template handle finished.")
