---
title: SpringBoot访问webapp下面的html等静态资源文件出现404解决方案
short_title: ''
description: 在做SpringBoot集成页面的时候，发现不能直接访问页面或者静态资源，都是报404，可以试试在pom.xml的build里面加入代码（不想用jsp，只想用html或者其他的可以采用这种方式）。
date: 2022-05-06 15:28:53
category:
  - 实用技巧
  - 经验分享
tag:
  - springboot
  - webapp
  - '404'
article: true
timeline: false
---
这里的前提是在src/main/目录下（跟src/main/resources同级）建好了webapp目录，并且在webapp下建好了WEB-INF。如图：

![image-20220506152354284](https://img1.terwer.space/20220506152354.png)

在做SpringBoot集成页面的时候，发现不能直接访问页面或者静态资源，都是报404，可以试试在pom.xml的build里面加入如下代码：
（不想用jsp，只想用html或者其他的可以采用这种方式）

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
    <!-- 添加访问静态资源文件 -->
    <!-- 代码的作用是让src/main/webapp在编译的时候在resoureces路径下也生成webapp的文件 -->
    <resources>
        <resource>
            <directory>src/main/webapp</directory>
            <targetPath>META-INF/resources</targetPath>
            <includes>
                <include>**/**</include>
            </includes>
        </resource>
        <resource>
            <directory>src/main/resources</directory>
            <filtering>true</filtering>
        </resource>
    </resources>
</build>
```

代码的作用是让src/main/webapp在编译的时候在resoureces路径下也生成webapp的文件

resourece路径下没有META-INF/resources文件夹也可以访问

添加好后，右键maven updae一下项目，重启项目，输入：[http://localhost:8080](http://localhost:8080)（我的项目用的是8080端口），发现可以访问

![image-20220506152314044](https://img1.terwer.space/20220506152314.png)