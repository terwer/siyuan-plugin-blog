---
title: js正则替换和删除字符串
short_title: ''
description: js正则替换和删除字符串最近在用mweb发布文章的时候，发现有些字符显示的不是预期效果，具体在发布到confluence的时候，页面展示出现了问题。于是，想出了下面的办法：去掉多余的换行bodyvaluereplace/[\r\n]&lt\/code&gt&lt\/pre&gt[\r\n]/g&lt/code&gt&lt/pre&gt去掉h1标签contentcontentreplace/&lth1*?&gt*?&lt\/h1&gt\n/ig完整的例子letbody{value&lth1&gt&ltaid
date: 2022-06-20 15:20:08
category:
  - 前端开发
tag:
  - js
  - regex
  - confluence
  - conf
article: true
timeline: false
---
# js正则替换和删除字符串

最近在用MWeb发布文章的时候，发现有些字符显示的不是预期效果，具体在发布到confluence的时候，页面展示出现了问题。

于是，想出了下面的办法：

## 去掉多余的换行

```javascript
 body.value.replace(/[\r\n]<\/code><\/pre>[\r\n]/g, "</code></pre>");
```

## 去掉h1标签

```javascript
content = content.replace(/<h1.*?>.*?<\/h1>\n/ig,'');
```

## 完整的例子

```javascript
let body = {
    "value": "<h1><a id=\"deepin20-5%E5%AE%89%E8%A3%85-docker%E4%B8%8E-docker-compose\" class=\"anchor\" aria-hidden=\"true\"><span class=\"octicon octicon-link\"></span></a>Deepin20.5 安装 docker 与 docker-compose</h1>\n<p>:::tip 文章更新历史</p>\n<p>2022/06/14 fix:统信UOS 21.3家庭版验证通过。</p>\n<p>2022/05/29 fix:Deepin 20.6也验证通过。</p>\n<p>:::</p>\n<h2><a id=\"%E5%8D%B8%E8%BD%BD%E6%97%A7%E7%89%88%E6%9C%AC\" class=\"anchor\" aria-hidden=\"true\"><span class=\"octicon octicon-link\"></span></a>卸载旧版本</h2>\n<pre><code class=\"language-bash\">sudo apt remove docker.io docker-engine\n</code></pre>\n<h2><a id=\"%E5%AE%89%E8%A3%85%E7%A7%98%E9%92%A5%E7%AE%A1%E7%90%86%E5%B7%A5%E5%85%B7\" class=\"anchor\" aria-hidden=\"true\"><span class=\"octicon octicon-link\"></span></a>安装秘钥管理工具</h2>\n<pre><code class=\"language-bash\">sudo apt install software-properties-common\nsudo apt install apt-transport-https ca-certificates curl\n</code></pre>\n<p>为了确认所下载软件包的合法性，需要添加软件源的 GPG 密钥。</p>\n<pre><code class=\"language-bash\">// 中科大源\ncurl -fsSL https://mirrors.ustc.edu.cn/docker-ce/linux/debian/gpg | sudo apt-key add -\n\n// 官方源，能否成功可能需要看运气。\n// curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -\n</code></pre>\n<p>查看密钥是否安装成功</p>\n<pre><code class=\"language-bash\">sudo apt-key fingerprint 0EBFCD88\n</code></pre>\n<h2><a id=\"%E6%B7%BB%E5%8A%A0docker%E6%BA%90\" class=\"anchor\" aria-hidden=\"true\"><span class=\"octicon octicon-link\"></span></a>添加 docker 源</h2>\n<p><del>方法一：直接修改文件（已废弃）</del></p>\n<pre><code class=\"language-bash\"># 这里我们通过编辑 sudo vim /etc/apt/sources.list 添加一行即可，原因未知\n# deb [arch=amd64] https://mirrors.ustc.edu.cn/docker-ce/linux/debian buster stable\n</code></pre>\n<p><strong>方法二：新建镜像源文件（推荐）</strong></p>\n<p>方法一是直接修改镜像原文件，显得不那么优雅。最好是在 <code>/etc/apt/sources.list.d</code> 目录新建一个 .list 文件，然后写上源地址即可。</p>\n<pre><code class=\"language-bash\">cd /etc/apt/sources.list.d\nsudo touch docker.list\n</code></pre>\n<p>内容如下：</p>\n<pre><code class=\"language-bash\">deb [arch=amd64] https://mirrors.ustc.edu.cn/docker-ce/linux/debian buster stable\n</code></pre>\n<p><img src=\"https://img1.terwer.space/20220614205016.png\" alt=\"image-20220614204804619\" /></p>\n<h2><a id=\"%E5%AE%89%E8%A3%85docker%E4%BB%A5%E5%8F%8A-docker-compose\" class=\"anchor\" aria-hidden=\"true\"><span class=\"octicon octicon-link\"></span></a>安装 docker 以及 docker-compose</h2>\n<pre><code class=\"language-bash\">sudo apt update\nsudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin docker-compose\n</code></pre>\n<h2><a id=\"%E8%AE%A9%E6%99%AE%E9%80%9A%E7%94%A8%E6%88%B7%E4%B9%9F%E5%8F%AF%E8%BF%90%E8%A1%8Cdocker\" class=\"anchor\" aria-hidden=\"true\"><span class=\"octicon octicon-link\"></span></a>让普通用户也可运行 docker</h2>\n<p>运行 <code>docker ps</code> 如果显示权限不足，那是是因为 docker 只允许 root 用户执行。为让普通用户也可运行 docker，执行</p>\n<pre><code class=\"language-bash\">sudo usermod -aG docker username\n</code></pre>\n<p>将当前用户加入 docker 用户组，然后<strong>注销用户重新登录</strong>即可。</p>\n<p><strong>注意：一定要注销登录、一定要注销登录、一定要注销登录。</strong></p>\n<p>否则权限无法生效，普通用户使用 <code>docker ps</code> 无法查看 docker 状态。</p>\n<h2><a id=\"%E5%90%AF%E5%8A%A8docker\" class=\"anchor\" aria-hidden=\"true\"><span class=\"octicon octicon-link\"></span></a>启动 docker</h2>\n<pre><code class=\"language-bash\">systemctl start docker\n</code></pre>\n<h2><a id=\"%E6%B5%8B%E8%AF%95%E5%AE%89%E8%A3%85%E6%95%88%E6%9E%9C\" class=\"anchor\" aria-hidden=\"true\"><span class=\"octicon octicon-link\"></span></a>测试安装效果</h2>\n<p>可以通过 <code>hello-world</code> 镜像来验证.</p>\n<pre><code class=\"language-bash\">sudo docker run hello-world\ndocker ps\n</code></pre>\n<p>注意：如果不想重启，可以暂时使用sudo来看：</p>\n<pre><code class=\"language-bash\">sudo docker ps\n</code></pre>\n<p><img src=\"https://img1.terwer.space/20220614212009.png\" alt=\"image-20220614212007264\" /></p>\n<h2><a id=\"%E5%BB%B6%E4%BC%B8%E9%98%85%E8%AF%BB\" class=\"anchor\" aria-hidden=\"true\"><span class=\"octicon octicon-link\"></span></a>延伸阅读</h2>\n<h3><a id=\"%E6%9F%A5%E7%9C%8B%E5%8F%AF%E5%AE%89%E8%A3%85%E7%9A%84%E6%89%80%E6%9C%89%E7%89%88%E6%9C%AC%E5%88%97%E8%A1%A8\" class=\"anchor\" aria-hidden=\"true\"><span class=\"octicon octicon-link\"></span></a>查看可安装的所有版本列表</h3>\n<pre><code class=\"language-bash\">➜  ~ apt-cache madison docker-ce\n docker-ce | 5:20.10.16~3-0~debian-buster | https://mirrors.ustc.edu.cn/docker-ce/linux/debian buster/stable amd64 Packages\n docker-ce | 5:20.10.15~3-0~debian-buster | https://mirrors.ustc.edu.cn/docker-ce/linux/debian buster/stable amd64 Packages\n docker-ce | 5:20.10.14~3-0~debian-buster | https://mirrors.ustc.edu.cn/docker-ce/linux/debian buster/stable amd64 Packages\n</code></pre>\n<h3><a id=\"%E5%AE%89%E8%A3%85%E6%8C%87%E5%AE%9A%E7%89%88%E6%9C%AC\" class=\"anchor\" aria-hidden=\"true\"><span class=\"octicon octicon-link\"></span></a>安装指定版本</h3>\n<pre><code class=\"language-bash\">$ sudo apt install docker-ce=&lt;VERSION_STRING&gt; docker-ce-cli=&lt;VERSION_STRING&gt; containerd.io docker-compose-plugin\n</code></pre>\n<h3><a id=\"%E7%A6%81%E6%AD%A2%E5%BC%80%E6%9C%BA%E8%87%AA%E5%90%AF\" class=\"anchor\" aria-hidden=\"true\"><span class=\"octicon octicon-link\"></span></a>禁止开机自启</h3>\n<p>默认情况下 docker 是开机自启的，如果我们想禁用开机自启，可以通过安装 chkconfig 命令来管理 Deepin 自启项：</p>\n<ol>\n<li>\n<p>安装 chkconfig</p>\n<pre><code class=\"language-bash\">sudo apt install chkconfig\n</code></pre>\n</li>\n<li>\n<p>移除自启</p>\n<pre><code class=\"language-bash\">sudo chkconfig --del docker\n</code></pre>\n</li>\n</ol>",
    "representation": "storage"
}
let content = body.value.replace(/[\r\n]<\/code><\/pre>[\r\n]/g, "</code></pre>");
content = content.replace(/<h1.*?>.*?<\/h1>\n/ig,'');
console.log(content)
```