---
title: 两栏布局左右拖拽效果实现方案
short_title: ''
description: css方式实现第一种利用的css的方式实现利用浏览器非overflow_auto元素设置resize可以拉伸的特性实现无javascript的分栏宽度控制。webkit浏览器下滚动条可以自定义其中resize区域大小就是scrollbar的大小于是我们可以将整个拉伸区域变成和容器一样高红色的就是扩大后的区域不推荐使用css的方式实现毕竟兼容性并不好。在火狐上表现不佳。{padding__margin__}flcontainer{width_%_height_vh_overflow_hidden_}flre
date: 2022-07-18 14:25:48
category:
  - 前端开发
tag:
  - 拖拽
  - 布局
  - 实现
  - 方式
  - 可以
  - 区域
article: true
timeline: false
---
## CSS方式实现

![screenshot-20220718-144148](https://img1.terwergreen.com/api/public/screenshot-20220718-144148.gif)

第一种利用的css的方式实现，利用浏览器非 overflow:auto 元素 设置 resize 可以拉伸的特性实现无JavaScript的分栏宽度控制。

webkit浏览器下滚动条可以自定义，其中resize区域大小就是scrollbar的大小，于是，我们可以将整个拉伸区域变成和容器一样高

红色的就是扩大后的区域

不推荐使用css的方式实现，毕竟兼容性并不好。在火狐上表现不佳。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AA-drag</title>
    <style>
      * {
        padding: 0;
        margin: 0;
      }
      .fl-container {
        width: 100%;
        height: 100vh;
        overflow: hidden;
      }
      .fl-resize-bar,
      .fl-resize-bar::-webkit-scrollbar {
        width: 400px;
      }
      .fl-left {
        position: relative;
        float: left;
        height: 100vh;
        background: pink;
      }
      .fl-right {
        box-sizing: border-box;
        overflow-x: hidden;
        height: 100vh;
      }
      .fl-cont-right {
        height: 200vh;
      }
      .fl-resize-bar {
        height: inherit;
        resize: horizontal;
        cursor: ew-resize;
        cursor: col-resize;
        opacity: 0;
        overflow: scroll;
      }
      .fl-resize-bar::-webkit-scrollbar {
        width: 400px;
        height: inherit;
      }

      .fl-cont-left {
        position: absolute;
        top: 0;
        right: 4px; /* 拖拽线的间距 */
        bottom: 0;
        left: 0;
        overflow-x: hidden;
        background: #fff;
      }

      .fl-resize-line {
        position: absolute;
        right: 1px;
        top: 0;
        bottom: 0;
        border-right: 2px solid #bbb;
        pointer-events: none;
      }
      .fl-resize-bar:hover ~ .fl-resize-line,
      .fl-resize-bar:active ~ .fl-resize-line {
        border-right: 2px dashed skyblue;
      }

      /* Firefox只有下面一小块区域可以拉伸 */
      @supports (-moz-user-select: none) {
        .fl-resize-bar:hover ~ .fl-resize-line,
        .fl-resize-bar:active ~ .fl-resize-line {
          border-right: 2px solid #bbb;
        }
        .fl-resize-bar:hover ~ .fl-resize-line::after,
        .fl-resize-bar:active ~ .fl-resize-line::after {
          content: '';
          position: absolute;
          width: 16px;
          height: 16px;
          bottom: 0;
          right: -8px;
          background: url(https://www.zhangxinxu.com/study/201903/css-idea/resize.svg);
          background-size: 100% 100%;
          z-index: 1;
        }
      }
    </style>
  </head>
  <body>
    <div class="fl-container">
      <div class="fl-left">
        <div class="fl-resize-bar"></div>
        <div class="fl-resize-line"></div>
        <div class="fl-cont-left">左侧内容</div>
      </div>
      <div class="fl-right">
        <div class="fl-cont-right">
          右侧内容右侧内容右侧内容右侧内容右侧内容右侧内容右侧内容右侧内容右侧内容 右侧内容右侧内容右侧内容右侧内容右侧内容右侧内容右侧内容右侧内容右侧内容右侧内容右侧内容
          右侧内容右侧内容右侧内容右侧内容右侧内容右侧内容右侧内容右侧内容右侧内容右侧内容右侧内容右侧内容右侧
          内容右侧内容右侧内容右侧内容右侧内容右侧内容右侧内容右侧内容右侧内容右侧内容右侧内容右侧内容右侧内容右侧内容右侧内容右侧内容
        </div>
      </div>
    </div>
  </body>
</html>
```

## 使用js方式实现

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AA-drag</title>
    <style>
      * {
        padding: 0;
        margin: 0;
      }
      #left,
      #right,
      #middle {
        height: 100vh;
        position: absolute;
      }
      #left {
        width: 300px;
        background: #ccc;
      }
      #middle {
        width: 5px;
        background: #666;
        left: 300px;
      }
      #middle:hover {
        cursor: col-resize;
      }
      #right {
        right: 0;
        background: #ccc;
        left: 305px;
        width: auto;
      }
    </style>
  </head>
  <body>
    <div id="left">左侧内容</div>
    <div id="middle"></div>
    <div id="right">右侧内容</div>
  </body>
</html>
<script>
  function getEle(id) {
    return document.getElementById(id);
  }
  window.onload = function () {
    let left = getEle('left');
    let right = getEle('right');
    let middle = getEle('middle');

    let middleWidth = 5;
    middle.onmousedown = function (e) {
      var disX = (e || event).clientX;
      middle.left = middle.offsetLeft;
      document.onmousemove = function (e) {
        let middleLeft = middle.left + ((e || event).clientX - disX);
        let maxWidth = document.body.clientWidth;
        middleLeft < 0 && (middleLeft = 0);
        middleLeft > maxWidth && (middleLeft = maxWidth);
        middle.style.left = left.style.width = middleLeft + 'px';
        right.style.width = maxWidth - middleLeft - middleWidth + 'px';
        right.style.left = middleLeft + middleWidth + 'px';
        return false;
      };
      document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
        middle.releaseCapture && middle.releaseCapture();
      };
      middle.setCapture && middle.setCapture();
      return false;
    };
  };
</script>
```