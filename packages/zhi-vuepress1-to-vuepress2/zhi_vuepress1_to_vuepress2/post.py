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
from zhi_vuepress1_to_vuepress2.category_info import CategoryInfo


class Post:
    """文章模型类，用于表示一篇文章对象"""

    def __init__(self):
        """创建一个新的文章对象"""
        self.post_id = ""  # 文章ID
        self.title = ""  # 标题
        self.mt_keywords = ""  # 关键词，用逗号分隔
        self.link = None  # 文章链接（可选）
        self.permalink = ""  # 永久链接
        self.short_desc = None  # 摘要（可选）
        self.description = ""  # 描述
        self.mt_excerpt = None  # 短评（可选）
        self.wp_slug = ""  # 别名
        self.date_created = None  # 创建时间
        self.categories: list[CategoryInfo] = []  # 分类列表
        self.mt_text_more = None  # 更多内容（可选）
        self.post_status = None  # 发布状态（可选）
        self.is_published = False  # 是否发布
        self.wp_password = ""  # 发布密码
