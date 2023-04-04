<!--
  - Copyright (c) 2023, Terwer . All rights reserved.
  - DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
  -
  - This code is free software; you can redistribute it and/or modify it
  - under the terms of the GNU General Public License version 2 only, as
  - published by the Free Software Foundation.  Terwer designates this
  - particular file as subject to the "Classpath" exception as provided
  - by Terwer in the LICENSE file that accompanied this code.
  -
  - This code is distributed in the hope that it will be useful, but WITHOUT
  - ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
  - FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
  - version 2 for more details (a copy is included in the LICENSE file that
  - accompanied this code).
  -
  - You should have received a copy of the GNU General Public License version
  - 2 along with this work; if not, write to the Free Software Foundation,
  - Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
  -
  - Please contact Terwer, Shenzhen, Guangdong, China, youweics@163.com
  - or visit www.terwer.space if you need additional information or have any
  - questions.
  -->
<template>
    <div class="box-layout">
        <div class="box-main" v-for="(item, index) in linkList" :key="index">
            <!-- 卡片 -->
            <li class="card">
                <ul>
                    <img :src="item.imgurl" alt="this is images">
                </ul>
                <ul>
                    <a rel="noopener" :href="item.href" target="_blank">{{ item.name }}</a>
                </ul>
            </li>
            <p class="dec">{{ item.description }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LinkLayout',
    data() {
        return {}
    },
    props: ['linkList'],
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

.box-layout {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: auto;
    padding: 20px;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.box-main {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 20px;
}

.dec {
    width: 280px;
}

.card {
    width: 320px;
    height: 50px;
    padding: 5px;
    /* border: 5px solid rgb(184, 188, 236); */
    border-radius: 10px;
    display: flex;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.card img {
    width: 50px;
    height: 50px;
    border-radius: 15px;
}

.card:hover {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    transition: all 0.5s;
}

/* 针对小屏优化页面大小 */
@media (max-width: 280px) {
    .box-layout {
        margin: 0 auto;
        padding: 5px;
    }
    .box-main {
        width: 220px;
        padding: 2px;
        margin: 0 auto;
    }
    .card {
        width: 210px;
        height: 60px;
    }
    .dec {
        width: 180px;
    }
}
@media (max-width: 512px) {
    .box-layout {
        width: 230px;
        margin: 0 auto;
    }
    .box-main {
        width: 220px;
        padding: 2px;
        margin: 0 auto;
    }
    .card {
        width: 210px;
        height: 60px;
    }
    .dec {
        width: 180px;
    }
}
</style>
