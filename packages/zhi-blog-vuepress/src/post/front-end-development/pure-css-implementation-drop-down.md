---
title: 纯css实现下拉菜单
short_title: ''
description: 纯css实现下拉菜单ul，li版本&ltnavrolenavigation&gt&ltul&gt&ltli&gt&ltahref#&gtone&lt/a&gt&lt/li&gt&ltli&gt&ltahref#&gttwo&lt/a&gt&ltulclassdropdown&gt&ltli&gt&ltahref#&gtsub1&lt/a&gt&lt/li&gt&ltli&gt&ltahref#&gtsub2&lt/a&gt&lt/li&gt&ltli&gt&ltahref#&gtsub3&lt/a&gt&
date: 2022-07-09 15:36:00
category:
  - 前端开发
tag:
  - css
  - dropdown
article: true
timeline: false
---
# 纯CSS实现下拉菜单
## ul，li版本

```html
<nav role="navigation">
  <ul>
    <li><a href="#">One</a></li>
    <li><a href="#">Two</a>
      <ul class="dropdown">
        <li><a href="#">Sub-1</a></li>
        <li><a href="#">Sub-2</a></li>
        <li><a href="#">Sub-3</a></li>
      </ul>
    </li>
    <li><a href="#">Three</a></li>
  </ul>
</nav>

<style>
a {
  text-decoration: none;
}

nav {
	font-family: monospace;
}

ul {
  background: darkorange;
	list-style: none;
	margin: 0;
	padding-left: 0;
}

li {
	color: #fff;
  background: darkorange;
	display: block;
	float: left;
	padding: 1rem;
	position: relative;
	text-decoration: none;
  transition-duration: 0.5s;
}
  
li a {
  color: #fff;
}

li:hover {
	background: red;
	cursor: pointer;
}

ul li ul {
	background: orange;
	visibility: hidden;
  opacity: 0;
  min-width: 5rem;
	position: absolute;
  transition: all 0.5s ease;
  margin-top: 1rem;
	left: 0;
  display: none;
}

ul li:hover > ul,
ul li:focus-within > ul, /* this is the line we add */
ul li ul:hover {
  visibility: visible;
  opacity: 1;
  display: block;
}

ul li ul li {
	clear: both;
  width: 100%;
}
</style>
```

### div版本

```html
<div class="nav-wrap">
  <div class="nav-node-ul">
    <div class="nav-node-li"><a href="#">One</a></div>
    <div class="nav-node-li"><a href="#">Two</a>
      <div class="nav-node-ul dropdown">
        <div class="nav-node-li"><a href="#">Sub-1</a></div>
        <div class="nav-node-li"><a href="#">Sub-2</a></div>
        <div class="nav-node-li"><a href="#">Sub-3</a></div>
      </div>
    </div>
    <div class="nav-node-li"><a href="#">Three</a></div>
  </div>
</div>
<style>
/* 下拉菜单 */
/* 这个放到父级也可以 */ 
.nav-wrap{
  position: absolute;
  left: 0;
}

.nav-wrap a {
  text-decoration: none;
}

.nav-wrap .nav-node-.nav-node-ul {
  background: darkorange;
	list-style: none;
	margin: 0;
	padding-left: 0;
}

.nav-wrap .nav-node-li {
	color: #fff;
  background: darkorange;
	display: block;
	float: left;
	padding: 1rem;
	position: relative;
	text-decoration: none;
  transition-duration: 0.5s;
}
  
.nav-wrap .nav-node-li a {
  color: #fff;
}

.nav-wrap .nav-node-li:hover {
	background: red;
	cursor: pointer;
}

.nav-wrap .nav-node-ul .nav-node-li .nav-node-ul {
	background: orange;
	visibility: hidden;
  opacity: 0;
  min-width: 5rem;
	position: absolute;
  transition: all 0.5s ease;
  margin-top: 1rem;
	left: 0;
  display: none;
}

.nav-wrap .nav-node-ul .nav-node-li:hover > .nav-node-ul,
.nav-wrap .nav-node-ul .nav-node-li:focus-within > .nav-node-ul, /* this is the line we add */
.nav-wrap .nav-node-ul .nav-node-li .nav-node-ul:hover {
  visibility: visible;
  opacity: 1;
  display: block;
}

.nav-wrap .nav-node-ul .nav-node-li .nav-node-ul .nav-node-li {
	clear: both;
  width: 100%;
}
</style>
```