import os

import scriptutils

def package_siyuan(cwd):
    dist_folder = "./dist/siyuan"
    data = scriptutils.read_json_file(cwd + "package.json")
    v = data["version"]

    src_folder = dist_folder
    tmp_folder_name = "./siyuan-blog"
    build_zip_path = "./build"
    build_zip_name = "siyuan-plugin-blog-" + v + ".zip"

    try:
        # 压缩dist为zip
        scriptutils.zip_folder(src_folder, tmp_folder_name, build_zip_path, build_zip_name)
        scriptutils.cp_file(os.path.join(build_zip_path, build_zip_name), os.path.join(build_zip_path, "package.zip"))
    except Exception as e:
        print(f"打包错误,{str(e)}")
    print("思源插件打包完毕.")

def package_node(cwd):
    dist_folder = "./dist/node"
    data = scriptutils.read_json_file(cwd + "package.json")
    v = data["version"]

    src_folder = dist_folder
    tmp_folder_name = "./node-blog"
    build_zip_path = "./build"
    build_zip_name = "node-blog-" + v + ".zip"

    try:
        # 压缩dist为zip
        scriptutils.zip_folder(src_folder, tmp_folder_name, build_zip_path, build_zip_name)
    except Exception as e:
        print(f"打包错误,{str(e)}")
    print("Node部署包打包完毕.")

if __name__ == "__main__":
    # 切换工作空间
    scriptutils.switch_workdir()

    # 获取当前工作空间
    cwd = scriptutils.get_workdir()

    # 打包思源
    package_siyuan(cwd)

    # 打包 node
    package_node(cwd)
