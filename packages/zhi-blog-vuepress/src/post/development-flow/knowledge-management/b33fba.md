---
title: 从零开始Jira配合Bitbucket和Github打造流水线式的开发流程
short_title: ''
date: 2022-06-21 12:30:54
category:
  - 开发流程
  - 知识管理
tag: []
article: true
timeline: false
---
## 创建Jira项目

打开Jira项目首页

[https://youweics.atlassian.net/jira/projects](https://youweics.atlassian.net/jira/projects)

选择Create Project

![image-20220621123700603](https://img1.terwer.space/20220621123706.png)

下一步项目类型选择kanban

然后一定要勾上link reponties

这里Bitbucket可以无缝集成。

Github需要提交一个Commit才行。

选择完成之后，会成功创建一个Jira Project，同时也会在Bitbucket创建一个仓库。