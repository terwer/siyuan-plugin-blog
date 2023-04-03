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

from loguru import logger


def read_json_file(filename):
    """
    读取json文件
    :param filename: 文件名
    """
    if not os.path.exists(filename):
        return {}
    with open(filename, encoding="utf-8") as json_file:
        resp = json.load(json_file)
    return resp


def save_data_to_txt(save_folder, filename, content):
    """
    保存数据到指定目录的指定文件
    :param save_folder: 保存目录
    :param filename: 文件名
    :param content: 数据列表
    """
    if not os.path.exists(save_folder):
        os.makedirs(save_folder)
    fname = os.path.join(save_folder, filename)
    if os.path.isdir(fname):
        logger.warning(f"This is dir, ignore {fname}")
        return
    with open(fname, mode='w', encoding='utf-8') as f:
        f.write(content)
