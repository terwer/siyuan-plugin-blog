---
title: Apache-CXF简介与第一个JAX-WS的入门程序
short_title: ''
description: cxf的历史官网_https_cxfapacheorgceltix和xfire合并而来。稳定版本https_archiveapacheorgdistcxf入门项目新建一个普通java项目即可。最好使用maven服务端pomxmlxsi_schemalocation=服务端核心代码myservice接口packagespaceterwercxf_importjavaxjwswebservice_@webservicepublicinterfacemyservice{stringhello(stringuse
date: 2022-11-05 01:06:48
category:
  - Webservice
  - 后端开发
tag:
  - 客户端
  - 版本
  - WS
  - Webservice
  - JAX-WS
  - CXF
  - Apache
article: true
timeline: false
---
## CXF 的历史

官网：[https://cxf.apache.org/](https://cxf.apache.org/)

 Celtix 和 XFire 合并而来。

## 稳定版本

3.3.11

[https://archive.apache.org/dist/cxf/3.3.11/](https://archive.apache.org/dist/cxf/3.3.11/)

## 入门项目

新建一个普通 Java 项目即可。

最好使用 Maven

### 服务端

pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>space.terwer</groupId>
    <artifactId>cxf-server-demo</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>war</packaging>

    <name>cxf-server-demo</name>
    <url>https://terwer.space</url>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
        <cxf.version>3.3.11</cxf.version>
    </properties>

    <dependencies>
        <!-- Logback -->
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-classic</artifactId>
            <version>1.2.10</version>
            <scope>compile</scope>
        </dependency>
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-core</artifactId>
            <version>1.2.10</version>
            <scope>compile</scope>
        </dependency>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>1.7.33</version>
        </dependency>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>jul-to-slf4j</artifactId>
            <version>1.7.33</version>
        </dependency>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>jcl-over-slf4j</artifactId>
            <version>1.7.33</version>
        </dependency>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>log4j-over-slf4j</artifactId>
            <version>1.7.33</version>
        </dependency>
        <dependency>
            <groupId>org.apache.logging.log4j</groupId>
            <artifactId>log4j-to-slf4j</artifactId>
            <version>2.17.2</version>
        </dependency>

        <!-- cfx -->
        <dependency>
            <groupId>org.apache.cxf</groupId>
            <artifactId>cxf-rt-frontend-jaxws</artifactId>
            <version>${cxf.version}</version>
        </dependency>
        <dependency>
            <groupId>org.apache.cxf</groupId>
            <artifactId>cxf-rt-transports-http-jetty</artifactId>
            <version>${cxf.version}</version>
        </dependency>

        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.2</version>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <pluginManagement><!-- lock down plugins versions to avoid using Maven defaults (may be moved to parent pom) -->
            <plugins>
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-war-plugin</artifactId>
                    <version>3.3.2</version>
                </plugin>
            </plugins>
        </pluginManagement>
    </build>
</project>
```

服务端核心代码

MyService 接口

```java
package space.terwer.cxf;

import javax.jws.WebService;

@WebService
public interface MyService {
	String hello(String username);
}
```

MyServiceImpl 实现类

```java
package space.terwer.cxf;

public class MyServiceImpl implements MyService {

	@Override
	public String hello(String username) {
		System.out.println("hello is invoked!");
		return "hello," + username;
	}

}
```

MyServer 服务端

```java
package space.terwer.cxf;

import org.apache.cxf.endpoint.Server;
import org.apache.cxf.jaxws.JaxWsServerFactoryBean;

public class MyServer {

	public static void main(String[] args) {
		JaxWsServerFactoryBean factory = new JaxWsServerFactoryBean();

		factory.setServiceClass(MyServiceImpl.class);
		factory.setAddress("http://localhost:8080/myservice?wsdl");

		Server server = factory.create();
		server.start();
	}

}
```

### 客户端

pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>space.terwer</groupId>
    <artifactId>cxf-client-demo</artifactId>
    <version>1.0-SNAPSHOT</version>

    <name>cxf-client-demo</name>
    <url>https://terwer.space</url>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <maven.compiler.encoding>UTF-8</maven.compiler.encoding>
        <jdk.version>1.8</jdk.version>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
        <cxf.version>3.3.11</cxf.version>
    </properties>

    <dependencies>
        <!-- Logback -->
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-classic</artifactId>
            <version>1.2.10</version>
            <scope>compile</scope>
        </dependency>
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-core</artifactId>
            <version>1.2.10</version>
            <scope>compile</scope>
        </dependency>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>1.7.33</version>
        </dependency>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>jul-to-slf4j</artifactId>
            <version>1.7.33</version>
        </dependency>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>jcl-over-slf4j</artifactId>
            <version>1.7.33</version>
        </dependency>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>log4j-over-slf4j</artifactId>
            <version>1.7.33</version>
        </dependency>
        <dependency>
            <groupId>org.apache.logging.log4j</groupId>
            <artifactId>log4j-to-slf4j</artifactId>
            <version>2.17.2</version>
        </dependency>

        <!-- cfx -->
        <dependency>
            <groupId>org.apache.cxf</groupId>
            <artifactId>cxf-rt-frontend-jaxws</artifactId>
            <version>${cxf.version}</version>
        </dependency>
        <dependency>
            <groupId>org.apache.cxf</groupId>
            <artifactId>cxf-rt-transports-http-jetty</artifactId>
            <version>${cxf.version}</version>
        </dependency>

        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.1</version>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-surefire-plugin</artifactId>
                <configuration>
                    <testFailureIgnore>true</testFailureIgnore>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

客户端核心代码：

```java
package space.terwer.cxf;

import org.apache.cxf.jaxws.JaxWsProxyFactoryBean;

public class Client {

	public static void main(String[] args) {
		JaxWsProxyFactoryBean factory = new JaxWsProxyFactoryBean();

		factory.setAddress("http://localhost:8080/myservice?wsdl");
		factory.setServiceClass(MyService.class);

		MyService myservice = (MyService) factory.create();
		String result = myservice.hello("terwer");

		System.out.println("result=>" + result);
	}

}
```

### 测试

![](https://img1.terwer.space/api/public/20221108185144.png)​

## 与.NET 交互，通过.NET 作为客户端链接 Webservice 服务

### VS2022 版本

* 新建一个 `.NET Framework`​ 的控制台项目，注意不能选择 `.NET Core`​ ，目前我选择的是 `.NET Framework 4.8.1`

  ![](https://img1.terwer.space/api/public/20221108190335.png)​
* 新建 Web 引用，输入地址

  ![](https://img1.terwer.space/api/public/20221108190249.png)​
* 新建客户端

  ```java
  using System;
  using System.Collections.Generic;
  using System.Linq;
  using System.Text;
  using System.Threading.Tasks;

  namespace WebserviceNet4
  {
      internal class Program
      {
          static void Main(string[] args)
          {
              Console.WriteLine("Hello World");

              hello.MyServiceImplService service = new hello.MyServiceImplService();
              string result = service.hello("terwer");
              Console.WriteLine(result);

              Console.ReadKey();
          }
      }
  }
  ```
* 测试

  ![](https://img1.terwer.space/api/public/20221108190622.png)​

### Rider 版本（可以用.NET Core 6）

* 新建一个 `C#`​ 的控制台项目
* 添加引用，输入地址

  ![](https://img1.terwer.space/api/public/20221108185630.png)

  添加完成，点击会自动解析

  ![](https://img1.terwer.space/api/public/20221108185734.png)​
* 调用客户端

  ```java
  // See https://aka.ms/new-console-template for more information

  using WebServiceTest.MyServiceImplService;

  namespace WebServiceTest{
      class Program{
          static void Main(string[] args){
              Console.WriteLine("Hello World");

              MyServiceClient client = new MyServiceClient();
              Task<helloResponse> respone = client.helloAsync("lisi");
              respone.Wait();
              string result = respone.Result.Body.@return;
              Console.WriteLine("result=>" + result);
          }
      }
  }
  ```
* 测试

  ![](https://img1.terwer.space/api/public/20221108185857.png)​