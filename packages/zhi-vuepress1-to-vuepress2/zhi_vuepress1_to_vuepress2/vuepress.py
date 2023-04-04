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
import json
import os
import re
from collections import defaultdict

from loguru import logger

from zhi_vuepress1_to_vuepress2.category_info import CategoryInfo
from zhi_vuepress1_to_vuepress2.post import Post
from zhi_vuepress1_to_vuepress2.utils import strutils, fileutils, dictutils
from zhi_vuepress1_to_vuepress2.vuepress2_front_formatter import Vuepress2FrontFormatter


class Vuepress:
    def __init__(self):
        self.IGNORED_PATHS = ["node_modules", ".vuepress"]
        self.IGNORED_FILES = [".DS_Store"]
        self.EXCLUDE_CATS = ["更多", "默认分类", "temp", "博文", "心情随笔", "_posts"]
        self.CATS_MAP_DIR = "/Users/terwer/Documents/mydocs/zhi/packages/zhi-vuepress1-to-vuepress2" \
                            "/zhi_vuepress1_to_vuepress2/dir_cats_map.json"
        self.VUEPRESS2_DOCS_PATH = "/Users/terwer/Documents/mydocs/zhi/packages/zhi-blog-vuepress/src/post"
        # self.VUEPRESS2_DOCS_PATH = "/Users/terwer/Downloads/zhi-blog-vuepress/post"
        self.LIMIT_COUNT = 5

    def convert(self):
        logger.info("Convert is starting...")
        vuepress1_folder = "/Users/terwer/Documents/mydocs/terwer.github.io/docs"
        self._do_parse_file_info(vuepress1_folder)

    def _do_parse_file_info(self, base_dir):
        """
        解析目录获取文件和文件名
        :param base_dir: 目录
        """
        logger.info(f"Start reading paths at {base_dir}")
        # 遍历指定目录及子目录
        files_count = 0
        dir_cats = []
        for dirpath, dirnames, filenames in os.walk(base_dir):
            if strutils.is_contain_any_char(dirpath, self.IGNORED_PATHS):
                # logger.warning(f"Ignored folder {dirpath}")
                continue
            if 0 < self.LIMIT_COUNT <= files_count:
                logger.warning(f"Limited size {self.LIMIT_COUNT}, end")
                break

            for each_file in filenames:
                if strutils.is_contain_any_char(each_file, self.IGNORED_FILES):
                    # logger.warning(f"Ignored file {each_file}")
                    continue
                cat_save_path = ""
                title_save_path = ""

                post = Post()
                post.title = strutils.remove_title_number(each_file)
                cates = self._parse_cat_arr(dirpath)
                post.categories = cates

                full_path = os.path.join(dirpath, each_file)
                # 读取文件属性等操作
                data, content = strutils.extract_frontmatter_from_file(full_path)
                post.description = content

                # 解析 front formatter
                if data is not None:
                    # 标题
                    post.title = dictutils.get_dict_str_value(data, "title")
                    # permalink
                    permalink = dictutils.get_dict_str_value(data, "permalink")
                    # 分类
                    f_cats = dictutils.get_dict_value(data, "categories")
                    if f_cats is not None:
                        cate_names = [c.description for c in post.categories]
                        f_cats = [s.replace('《', '').replace('》', '') for s in f_cats]
                        dir_cats = dir_cats + f_cats
                        # 保存路径
                        dir_cates_map = fileutils.read_json_file(self.CATS_MAP_DIR)
                        cat_path_list = []
                        for cate_name in cate_names:
                            cate_name_en = dir_cates_map.get(cate_name)
                            cate_slug = strutils.slug(cate_name_en)
                            cat_path_list.append(cate_slug)
                            # print(cate_name_en)
                        cat_save_path = os.sep.join(cat_path_list)
                        title_save_path = permalink.replace(".html", ".md")
                        title_save_path = title_save_path.replace("/post/", "")
                        title_save_path = title_save_path.replace("/pages/", "")
                        if title_save_path.endswith('/'):
                            title_save_path = title_save_path[:-1] + '.md'  # 去掉末尾的斜杠，然后拼接扩展名
                        title_save_path = os.sep + title_save_path

                        post_cats = cate_names + f_cats
                        # 去重
                        post_cats = list(set(post_cats))
                        # 去除分类
                        post_cats = [i for i in post_cats if i not in self.EXCLUDE_CATS]
                        post_cats = ['timeline' if i == '随笔' else i for i in post_cats]
                        cts = []
                        for pc in post_cats:
                            ct = CategoryInfo()
                            ct.description = pc
                            cts.append(ct)
                        post.categories = cts
                    # date
                    post.date_created = dictutils.get_dict_str_value(data, "date")
                    # short_desc
                    meta = dictutils.get_dict_value(data, "meta")
                    if meta is not None:
                        for meta_item in meta:
                            if meta_item['name'] == "description":
                                post.short_desc = meta_item['content']
                                break
                    tags = dictutils.get_dict_value(data, "tags")
                    if tags is not None:
                        tags = list(filter(lambda x: x is not None, tags))
                        post.mt_keywords = tags
                    else:
                        post.mt_keywords = []

                # 生成vuepress2支持的formatter
                v2f = self._make_vuepress2_formatter(post)
                # 附加formatter到正文
                post.description = v2f + post.description

                md_save_full_path = os.path.join(self.VUEPRESS2_DOCS_PATH, cat_save_path)
                if cat_save_path == "":
                    logger.warning("Cate path is empty, ignore")
                    continue
                if title_save_path == "":
                    logger.warning("File name is empty, ignore")
                    continue
                # logger.debug(f"title_save_path=>{title_save_path}")
                md_file_full_path = md_save_full_path + title_save_path
                p = os.path.dirname(md_file_full_path)
                f = os.path.basename(md_file_full_path)
                # logger.debug(f"p=>{p}")
                # logger.debug(f"f=>{f}")
                fileutils.save_data_to_txt(p, f, post.description)

                files_count = files_count + 1

        # dir_cats = list(set(dir_cats))
        # print(json.dumps(dir_cats,ensure_ascii=False))
        logger.info(f"finish.handed {files_count} files")

    def _parse_cat_arr(self, path):
        cats: list[CategoryInfo] = []

        # 对每一个文件进行操作
        prefix = "terwer.github.io/docs/"
        find_index = path.find(prefix)

        # 去掉前缀
        cate_path = ""
        if path.find(prefix) != -1:
            cate_path = path[find_index + len(prefix):len(path)]
        ori_cates = cate_path.split(os.sep)

        for ori_cate in ori_cates:
            cate_name = strutils.remove_title_number(ori_cate)
            # 去掉尖括号
            cate_name = re.sub(r'[《》]', '', cate_name).strip()
            cate_name = cate_name.replace("_posts", "")
            if cate_name != "":
                cate = CategoryInfo()
                cate.description = cate_name
                # 会卡死，后面单独处理
                # cate.category_name = strutils.slug(cate_name)
                cats.append(cate)
        return cats

    def _make_vuepress2_formatter(self, post: Post):
        """
        生成vuepress2支持的formatter
        :param post:
        :return:
        """
        v2f = Vuepress2FrontFormatter()
        v2f.title = post.title
        # v2f.short_title = post.title
        v2f.description = post.short_desc
        v2f.date = post.date_created
        v2f.category = [c.description for c in post.categories]
        v2f.tag = post.mt_keywords
        if "timeline" in v2f.category:
            v2f.timeline = True
            v2f.article = False
        return v2f.to_md()
