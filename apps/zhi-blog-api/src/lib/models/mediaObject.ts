/*
 * Copyright (c) 2023, Terwer . All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Terwer designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Terwer in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Terwer, Shenzhen, Guangdong, China, youweics@163.com
 * or visit www.terwer.space if you need additional information or have any
 * questions.
 */

/**
 * 媒体文件
 *
 * ```ts
 *  const url = "./testdata/photo.jpg";
 *  const file = fs.readFileSync(url)
 *  const data = {
 *    name: "20220616-132401-001.jpg",
 *    type: "image/jpeg",
 *    bits: file,
 *    overwrite: true
 *  }
 *
 *  // return
 *  {
 *     attachment_id: '4108',
 *     date_created_gmt: 2022-06-15T21:25:23.000Z,
 *     parent: 0,
 *     link: 'https://terwergreen.files.wordpress.com/2022/06/20220616-132401-001.jpg',
 *     title: '20220616-132401-001.jpg',
 *     caption: '',
 *     description: '',
 *     metadata: { filesize: 113032 },
 *     type: 'image/jpeg',
 *     thumbnail: 'https://terwergreen.files.wordpress.com/2022/06/20220616-132401-001.jpg?w=150',
 *     id: '4108',
 *     file: '20220616-132401-001.jpg',
 *     url: 'http://terwergreen.files.wordpress.com/2022/06/20220616-132401-001.jpg'
 *  }
 * ```
 * @author terwer
 * @version 1.0.0
 * @since 1.0.0
 */
class MediaObject {
  name: string
  type: string
  bits: Buffer

  constructor(name: string, type: string, bits: Buffer) {
    this.name = name
    this.type = type
    this.bits = bits
  }
}

export default MediaObject
