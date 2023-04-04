---
title: SSH 框架整合续3之提交问题分析与删除用户的实现
short_title: ''
description: SSH 框架整合续3之提交问题分析与删除用户的实现。
date: 2022-06-05 19:45:20
category:
  - OA与工作流新思路
  - 新笔记
tag:
  - spring
  - struts2
  - hibernate
article: true
timeline: false
---
:::tip 重点：

当校验框架校验失败的分析。

:::

## 多次提交问题分析

![image-20220605184337454](https://img1.terwer.space/20220605184337.png)

原因：

打印错误日志排查

```java
@SuppressWarnings("rawtypes")
@Override
public void validate() {
	Map map = this.getFieldErrors();
	Set set = map.keySet();
	for (Iterator iter = set.iterator(); iter.hasNext();) {
		logger.info(map.get(iter.next()).toString());
	}
}
```

```
21915 [qtp157456214-19] INFO  c.t.hoa.action.user.SaveUserAction - [用户的昵称不能为空] 
21916 [qtp157456214-19] INFO  c.t.hoa.action.user.SaveUserAction - [用户的年龄不能为空] 
23994 [qtp157456214-17] INFO  c.t.hoa.action.user.SaveUserAction - [用户的昵称不能为空, 用户的昵称不能为空] 
23994 [qtp157456214-17] INFO  c.t.hoa.action.user.SaveUserAction - [用户的年龄不能为空, 用户的年龄不能为空] 
89588 [qtp157456214-18] INFO  c.t.hoa.action.user.SaveUserAction - [用户的昵称不能为空, 用户的昵称不能为空, 用户的昵称不能为空] 
89588 [qtp157456214-18] INFO  c.t.hoa.action.user.SaveUserAction - [用户的年龄不能为空, 用户的年龄不能为空, 用户的年龄不能为空] 
```

对于 Spring 来说，如果没有配置 scope，默认是单例的

```xml
<bean id="saveUserAction" class="com.terwergreen.hoa.action.user.SaveUserAction">
    <property name="userService" ref="userService"></property>
</bean>
```

解决方案

配置 scope 为 prototype 即可

```xml
<bean id="saveUserAction" class="com.terwergreen.hoa.action.user.SaveUserAction" scope="prototype">
    <property name="userService" ref="userService"></property>
</bean>
```

```
8331 [qtp157456214-17] INFO  c.t.hoa.action.user.SaveUserAction - [用户的昵称不能为空] 
8331 [qtp157456214-17] INFO  c.t.hoa.action.user.SaveUserAction - [用户的年龄不能为空] 
10844 [qtp157456214-25] INFO  c.t.hoa.action.user.SaveUserAction - [用户的昵称不能为空] 
10844 [qtp157456214-25] INFO  c.t.hoa.action.user.SaveUserAction - [用户的年龄不能为空] 
11790 [qtp157456214-21] INFO  c.t.hoa.action.user.SaveUserAction - [用户的昵称不能为空] 
11791 [qtp157456214-21] INFO  c.t.hoa.action.user.SaveUserAction - [用户的年龄不能为空] 
12373 [qtp157456214-25] INFO  c.t.hoa.action.user.SaveUserAction - [用户的昵称不能为空] 
12373 [qtp157456214-25] INFO  c.t.hoa.action.user.SaveUserAction - [用户的年龄不能为空] 
12855 [qtp157456214-21] INFO  c.t.hoa.action.user.SaveUserAction - [用户的昵称不能为空] 
12855 [qtp157456214-21] INFO  c.t.hoa.action.user.SaveUserAction - [用户的年龄不能为空] 
13288 [qtp157456214-25] INFO  c.t.hoa.action.user.SaveUserAction - [用户的昵称不能为空] 
13288 [qtp157456214-25] INFO  c.t.hoa.action.user.SaveUserAction - [用户的年龄不能为空] 
13606 [qtp157456214-21] INFO  c.t.hoa.action.user.SaveUserAction - [用户的昵称不能为空] 
13606 [qtp157456214-21] INFO  c.t.hoa.action.user.SaveUserAction - [用户的年龄不能为空] 
13805 [qtp157456214-25] INFO  c.t.hoa.action.user.SaveUserAction - [用户的昵称不能为空] 
13805 [qtp157456214-25] INFO  c.t.hoa.action.user.SaveUserAction - [用户的年龄不能为空] 
```

## 拦截器

### 什么是拦截器

拦截器的作用是在到达 action 之前做一些处理。

Struts2已经帮我们写好了一些常用的拦截器，并且有一个 defaultStack 的拦截器栈。我们使用的 action 就要经过这个默认拦截器栈。如果不修改拦截器栈，那么我们默认访问得到 action 就要经过18个拦截器，可以看看是哪些：

![image-20220605135232494](https://img1.terwer.space/20220605135232.png)

找到 defaultStack

![image-20220605135344657](https://img1.terwer.space/20220605135344.png)

### 自定义拦截器

大部分功能 Struts2已经帮我们写好了，但有一些功能，我们有个性化需求，这时候就需要自定义拦截器了。

自定义拦截器主要分为两个步骤：

- 第一步：编写拦截器类，继承自 AbstractInterceptor 类。（它帮我们实现了 Inteceptor 接口）

  ```java
  /**
   * 自定义拦截器
   */
  public class MyInterceptor extends AbstractInterceptor {
  
      private static final Logger logger = LoggerFactory.getLogger(MyInterceptor.class);
  
      @Override
      public String intercept(ActionInvocation invocation) throws Exception {
          logger.info("进入我的自定义拦截器");
          return invocation.invoke();
      }
  }
  ```

- 注册拦截器

  在 struts.xml 中注册

  在 package 中声明拦截器

  在 action 中使用拦截器

  ```xml
  <package name="user" extends="struts-default">
      <!-- 声明拦截器 -->
      <interceptors>
          <interceptor name="myInterceptor" class="com.terwergreen.hoa.interceptor.MyInterceptor"></interceptor>
      </interceptors>
  
      <!--
      <default-action-ref name="index"/>
      <action name="index">
          <result name="success">/index.jsp</result>
      </action>
      -->
  
      <action name="saveUser" class="saveUserAction">
          <result name="success" type="redirect">listUser.action</result>
          <result name="input">/saveUser.jsp</result>
          <!-- 在 Action 中使用拦截器 -->
          <interceptor-ref name="myInterceptor"></interceptor-ref>
      </action>
      <action name="listUser" class="listUserAction">
          <result name="success">/listUser.jsp</result>
      </action>
  </package>
  ```

  但是这样有一个问题：**在 struts2中，一旦指定了拦截器，那么默认拦截器就不会执行，这样默认的校验、参数注入、国际化都没了，所以还需要加入默认拦截器**

  ````xml
  <package name="user" extends="struts-default">
      <!-- 声明拦截器 -->
      <interceptors>
          <interceptor name="myInterceptor" class="com.terwergreen.hoa.interceptor.MyInterceptor"></interceptor>
      </interceptors>
  
      <!--
      <default-action-ref name="index"/>
      <action name="index">
          <result name="success">/index.jsp</result>
      </action>
      -->
  
      <action name="saveUser" class="saveUserAction">
          <result name="success" type="redirect">listUser.action</result>
          <result name="input">/saveUser.jsp</result>
          <interceptor-ref name="defaultStack"></interceptor-ref>
          <!-- 在 Action 中使用拦截器 -->
          <interceptor-ref name="myInterceptor"></interceptor-ref>
      </action>
      <action name="listUser" class="listUserAction">
          <result name="success">/listUser.jsp</result>
      </action>
  </package>
  ````

- 优化版处理

  创建一个拦截器栈，将默认拦截器加入其中。

  ```bash
  <package name="user" extends="struts-default">
      <!-- 声明拦截器 -->
      <interceptors>
          <interceptor name="myInterceptor" class="com.terwergreen.hoa.interceptor.MyInterceptor"></interceptor>
          <!-- 创建声明拦截器栈 -->
          <interceptor-stack name="myStack">
              <interceptor-ref name="defaultStack"></interceptor-ref>
              <!-- 在 Action 中使用拦截器 -->
              <interceptor-ref name="myInterceptor"></interceptor-ref>
          </interceptor-stack>
      </interceptors>
  
      <!-- 将默认拦截器栈设置我我们自定义的拦截器栈 -->
      <default-interceptor-ref name="myStack"></default-interceptor-ref>
      
      <!--
      <default-action-ref name="index"/>
      <action name="index">
          <result name="success">/index.jsp</result>
      </action>
      -->
  
      <action name="saveUser" class="saveUserAction">
          <result name="success" type="redirect">listUser.action</result>
          <result name="input">/saveUser.jsp</result>
      </action>
      <action name="listUser" class="listUserAction">
          <result name="success">/listUser.jsp</result>
      </action>
  </package>
  ```

- 可以在自定义拦截器中实现我们的自定义逻辑。

## 本项目地址

[https://github.com/terwer/hoa](https://github.com/terwer/hoa)