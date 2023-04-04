---
title: Next-js组件使用泛型类型传递异步数据
short_title: ''
description: nextjs组件使用泛型类型传递异步数据定义类型typepageprops={hello_stringpage_anyrandom_any}返回属性https_githubcomvercelnextjsblobcanaryexamplescmswordpresspagesindexjsexportconstgetstaticprops_getstaticprops{constpageid=vtfmdmletpage=awaitgetpage(pageid)if(!page){page={}}return{
date: 2022-08-01 23:44:27
category:
  - 前端开发
tag:
  - 使用
  - 类型
  - 组件
  - 传递
  - 异步
article: true
timeline: false
---
# Next-js组件使用泛型类型传递异步数据



定义类型

```ts
type PageProps = {
    hello: string,
    page: any,
    random: any
}
```

返回属性

```ts
// https://github.com/vercel/next.js/blob/canary/examples/cms-wordpress/pages/index.js
export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
    const pageId = "20220718142548-vtf8mdm"

    let page = await getPage(pageId)
    if (!page) {
        page = {}
    }
    return {
        props: {
            hello: 'world',
            page: page,
            random: Math.random()
        }
    }
}

```

使用

```ts
const Home: NextPage<PageProps> = (props, context) => {
    return (
      <p>{JSON.stringify(props.page)}</p>
    )
}
```