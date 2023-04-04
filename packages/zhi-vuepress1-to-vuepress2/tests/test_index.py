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
import unittest

import yaml

from zhi_vuepress1_to_vuepress2.utils import strutils
from zhi_vuepress1_to_vuepress2.utils.strutils import MyDumper
from zhi_vuepress1_to_vuepress2.vuepress import Vuepress


class MyTestCase(unittest.TestCase):
    def test_index(self):
        print()
        vuepress = Vuepress()
        vuepress.convert()

    def test_slug(self):
        print()
        ret = strutils.slug("后端开发")
        print(ret)

    def test_demo(self):
        data = {
            "name": "John",
            "age": 30,
            "city": "New York",
            "haha": ["aaaa", "bbbb", str(404)]
        }

        # 设置 indent 和 default_flow_style 参数
        output = yaml.dump(data, Dumper=MyDumper, sort_keys=False, indent=2)
        print(output)
