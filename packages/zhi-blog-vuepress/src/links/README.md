---
title: 友链💖
sidebar: false
article: false
pageInfo: false
lastUpdated: false
editLink: false
prev: false
next: false
---

<LinkLayout :linkList="linkList"/>

<hr/>
<p>在下方评论区留言申请加入我的友链，请按如下格式提供信息：</p>
<ul>
    <li>博客名：浅海拾贝</li>
	<li>简介：寻找未知的技术拼图</li>
	<li>图片：https://terwer.space/logo.svg</li>
	<li>链接：https://terwer.space</li>
</ul>

:::tip 温馨提示
由于缓存原因，如果评论框未显示，刷新一下当前页面即可。
:::

<script>
export default {
        data() {
                return {
                        linkList: [
                                {
                                    name: "vuepress-theme-hope",
                                    description: "感谢强大的VuePress主题Hope",
                                    imgurl: "https://theme-hope.vuejs.press/logo.svg",
                                    href: "https://theme-hope.vuejs.press/zh/",
                                },
                                {
                                    name: "花诽语",
                                    description: "授人与鱼不如授人与渔",
                                    imgurl: "https://www.sakurafeiyu.top/logo.png",
                                    href: "https://sakurafeiyu.top",
                                },
                        ],
                };
        }
};
</script>
