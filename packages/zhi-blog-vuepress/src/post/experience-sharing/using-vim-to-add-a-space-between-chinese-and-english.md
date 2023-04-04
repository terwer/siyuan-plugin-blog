---
title: 利用 vim 在文档内容的中英文之间添加一个空格
short_title: ''
description: 在中英文（英中文）之间加入一个空格，只需要在 vim 中使用如下命令。
date: 2022-06-01 12:08:47
category:
  - 实用技巧
  - 经验分享
tag:
  - vim
  - space
article: true
timeline: false
---
> **文章更新历史**
>
> 2022/05/05 feat:初稿。

# 利用 vim 在文档内容的中英文之间添加一个空格

## 打开文档

```bash
vim test.md
```

在中英文（英中文）之间加入一个空格，只需要在 vim 中使用如下命令：

## 在中文和英文字符之间加一个空格

```javascript
%s/\([\u4e00-\u9fa5]\)\([\da-zA-Z]\)/\1 \2/gc
```

## 在英文和中文字符之间加一个空格

```javascript
%s/\([\da-zA-Z]\)\([\u4e00-\u9fa5]\)/\1 \2/gc
```

PS：vim 中唤起命令的方法，输入英文的 `:` 即可，然后粘贴（一般快捷键是 `Ctrl+Shift+V` ）进去，选择 `a` 全部替换。

保存直接 `:w` 即可。退出使用 `:q` 。

参考: [https://stackoverflow.com/a/8406194/2400133](https://stackoverflow.com/a/8406194/2400133)