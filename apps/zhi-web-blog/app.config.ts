export default defineAppConfig({
  siteTitle: "浅海拾贝",
  siteSlogan: "寻找未知的技术拼图",
  siteDescription:
    "远方的灯塔是关注与分享互联网及服务端开发技术的个人博客，致力于Java后端开发及服务端技术、软件架构、微服务技术分享。",

  // 主题配置
  themeConfig: {
    // 导航配置
    nav: [
      { text: "首页", link: "/" },
      {
        text: "前端",
        link: "/web/", //目录页链接，此处link是vdoing主题新增的配置项，有二级导航时，可以点击一级导航跳到目录页
        items: [
          // 说明：以下所有link的值只是在相应md文件头部定义的永久链接（不是什么特殊编码）。另外，注意结尾是有斜杠的
          {
            text: "前端文章",
            items: [{ text: "JavaScript", link: "/pages/8143cc480faf9a11/" }],
          },
          {
            text: "学习笔记",
            items: [
              { text: "《JavaScript教程》", link: "/note/javascript/" },
              { text: "《JavaScript高级程序设计》", link: "/note/js/" },
              { text: "《ES6 教程》", link: "/note/es6/" },
              { text: "《Vue》", link: "/note/vue/" },
              { text: "《React》", link: "/note/react/" },
              {
                text: "《TypeScript 从零实现 axios》",
                link: "/note/typescript-axios/",
              },
              {
                text: "《Git》",
                link: "/note/git/",
              },
              {
                text: "TypeScript",
                link: "/pages/51afd6/",
              },
              {
                text: "JS设计模式总结",
                link: "/pages/4643cd/",
              },
            ],
          },
        ],
      },
      {
        text: "页面",
        link: "/ui/",
        items: [
          { text: "HTML", link: "/pages/8309a5b876fc95e3/" },
          { text: "CSS", link: "/pages/0a83b083bdf257cb/" },
        ],
      },
      {
        text: "技术",
        link: "/technology/",
        items: [
          { text: "技术文档", link: "/pages/9a7ee40fc232253e/" },
          { text: "GitHub技巧", link: "/pages/4c778760be26d8b3/" },
          { text: "Nodejs", link: "/pages/117708e0af7f0bd9/" },
          { text: "博客搭建", link: "/pages/41f87d890d0a02af/" },
        ],
      },
      {
        text: "更多",
        link: "/more/",
        items: [
          { text: "学习", link: "/pages/f2a556/" },
          { text: "面试", link: "/pages/aea6571b7a8bae86/" },
          { text: "心情杂货", link: "/pages/2d615df9a36a98ed/" },
          { text: "实用技巧", link: "/pages/baaa02/" },
          { text: "友情链接", link: "/friends/" },
        ],
      },
      { text: "关于", link: "/about/" },
      {
        text: "收藏",
        link: "/pages/beb6c0bd8a66cea6/",
        // items: [
        //   { text: '网站', link: '/pages/beb6c0bd8a66cea6/' },
        //   { text: '资源', link: '/pages/eee83a9211a70f9d/' },
        //   { text: 'Vue资源', link: '/pages/12df8ace52d493f6/' },
        // ],
      },
      {
        text: "索引",
        link: "/archives/",
        items: [
          { text: "分类", link: "/categories/" },
          { text: "标签", link: "/tags/" },
          { text: "归档", link: "/archives/" },
        ],
      },
    ],
    sidebarDepth: 2, // 侧边栏显示深度，默认1，最大2（显示到h3标题）
    logo: "/img/logo-small.png", // 导航栏logo
    repo: "terwer/zhi", // 导航栏右侧生成Github链接
    // repo: "https://gitee.com/terwer/zhi",
    repoLabel: undefined,
    searchMaxSuggestions: 10, // 搜索结果显示最大数
    lastUpdated: "上次更新", // 开启更新时间，并配置前缀文字   string | boolean (取值为git提交时间)
    docsDir: "docs", // 编辑的文件夹
    // docsBranch: 'master', // 编辑的文件所在分支，默认master。 注意：如果你的分支是main则修改为main
    editLinks: true, // 启用编辑
    editLinkText: "编辑",

    //*** 以下是Vdoing主题相关配置，文档：https://doc.xugaoyi.com/pages/a20ce8/ ***//

    // category: false, // 是否打开分类功能，默认true
    // tag: false, // 是否打开标签功能，默认true
    // archive: false, // 是否打开归档功能，默认true
    // categoryText: '随笔', // 碎片化文章（_posts文件夹的文章）预设生成的分类值，默认'随笔'

    pageStyle: "line", // 页面风格，可选值：'card'卡片 | 'line' 线（未设置bodyBgImg时才生效）， 默认'card'。 说明：card时背景显示灰色衬托出卡片样式，line时背景显示纯色，并且部分模块带线条边框

    bodyBgImg: <string[] | string>[],
    // bodyBgImg: [
    //     "https://ghproxy.com/https://raw.githubusercontent.com/xugaoyi/image_store/master/blog/20200507175828.jpeg",
    //     "https://ghproxy.com/https://raw.githubusercontent.com/xugaoyi/image_store/master/blog/20200507175845.jpeg",
    //     "https://ghproxy.com/https://raw.githubusercontent.com/xugaoyi/image_store/master/blog/20200507175846.jpeg",
    // ], // body背景大图，默认无。 单张图片 String | 多张图片 Array, 多张图片时隔bodyBgImgInterval切换一张。
    bodyBgImgOpacity: 0.5,
    // bodyBgImgOpacity: 0.5, // body背景图透明度，选值 0.1~1.0, 默认0.5
    bodyBgImgInterval: 15,
    // bodyBgImgInterval: 15, // body多张背景图时的切换间隔, 默认15，单位s
    // titleBadge: false, // 文章标题前的图标是否显示，默认true
    // titleBadgeIcons: [ // 文章标题前图标的地址，默认主题内置图标
    //   '图标地址1',
    //   '图标地址2'
    // ],
    // contentBgStyle: 1, // 文章内容块的背景风格，默认无. 1 方格 | 2 横线 | 3 竖线 | 4 左斜线 | 5 右斜线 | 6 点状

    // updateBar: { // 最近更新栏
    //   showToArticle: true, // 显示到文章页底部，默认true
    //   moreArticle: '/archives' // “更多文章”跳转的页面，默认'/archives'
    // },
    // rightMenuBar: false, // 是否显示右侧文章大纲栏，默认true (屏宽小于1300px下无论如何都不显示)
    // sidebarOpen: false, // 初始状态是否打开左侧边栏，默认true
    // pageButton: false, // 是否显示快捷翻页按钮，默认true

    // 默认外观模式（用户未在页面手动修改过模式时才生效，否则以用户设置的模式为准），可选：'auto' | 'light' | 'dark' | 'read'，默认'auto'。
    defaultMode: "auto",

    // 侧边栏  'structuring' | { mode: 'structuring', collapsable: Boolean} | 'auto' | <自定义>    温馨提示：目录页数据依赖于结构化的侧边栏数据，如果你不设置为'structuring',将无法使用目录页
    sidebar: "structuring",
    sidebarHoverTriggerOpen: undefined,

    // 文章默认的作者信息，(可在md文件中单独配置此信息) string | {name: string, link?: string}
    author: {
      name: "terwer", // 必需
      link: "https://github.com/terwer", // 可选的
    },

    // 博主信息 (显示在首页侧边栏)
    blogger: {
      avatar: "/img/photo.jpg",
      name: "Terwer",
      slogan: "一个后端老菜鸟",
      social: <any>undefined,
    },

    // 社交图标 (显示于博主信息栏和页脚栏。内置图标：https://doc.xugaoyi.com/pages/a20ce8/#social)
    social: {
      iconfontCssFile: undefined,
      // iconfontCssFile: '//at.alicdn.com/t/xxx.css', // 可选，阿里图标库在线css文件地址，对于主题没有的图标可自己添加。阿里图片库：https://www.iconfont.cn/
      icons: [
        {
          iconClass: "icon-youjian",
          title: "发邮件",
          link: "mailto:youweics@163.com",
        },
        {
          iconClass: "icon-github",
          title: "GitHub",
          link: "https://github.com/terwer",
        },
        {
          iconClass: "icon-erji",
          title: "听音乐",
          link: "https://music.163.com/#/playlist?id=6820033188",
        },
      ],
    },

    // 页脚信息
    footer: {
      createYear: 2011, // 博客创建年份
      copyrightInfo:
        'Terwer | <a href="https://github.com/terwer/zhi-blog/blob/main/LICENSE" target="_blank">GPL License</a>', // 博客版权信息、备案信息等，支持a标签或换行标签</br>
    },

    // 扩展自动生成frontmatter。（当md文件的frontmatter不存在相应的字段时将自动添加。不会覆盖已有的数据。）
    extendFrontmatter: {
      author: {
        name: "xugaoyi",
        link: "https://github.com/xugaoyi",
      },
    },

    // 自定义html(广告)模块
    // htmlModules,
  },
})
