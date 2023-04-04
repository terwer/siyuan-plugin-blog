---
title: SSH 框架整合续2之校验框架
short_title: ''
description: SSH 框架整合续2之校验框架。IDEA->new->Project，创建一个 Maven 的 webapp 项目，选择 org.apache.maven
  的 webapp 骨架。
date: 2022-05-28 16:56:23
category:
  - OA与工作流新思路
  - 新笔记
tag:
  - spring
  - struts2
  - hibernate
  - validate
article: true
timeline: false
---
:::tip 重点：

完成 Save User 页面的输入校验（姓名及昵称不能为空、年龄不能为空且在 1-150 之间），采用代码方式完成（override validate 方法），采用校验框架方式完成（有两种办法）

:::

## 前台校验

> JS 的校验不是必须的，JS 的校验是可以被绕行的、JS 提升用户体验。
>

最简单的校验，以校验用户名为空为例

```javascript
<script type="text/javascript" src="https://cdn.staticfile.org/jquery/1.12.4/jquery.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        var form = document.forms[0];
        $(form).on("submit", function () {
            var firstname = $("input[name='user.firstname']");
            if(firstname == ""){
                alert("姓名不能为空");
                return false;
            }
        });
    });
</script>
```

效果

![image-20220528225452613](https://img1.terwer.space/20220528225452.png)

## 后台校验

### 方法一：重写 validate 方法

首先重写 SaveuserAction 的 validate 方法

```java
@Override
public void validate() {
    if (StringUtils.isEmpty(user.getFirstname())) {
        this.addFieldError("user.firstname", "姓名不能为空");
    }
    if (StringUtils.isEmpty(user.getLastname())) {
        this.addFieldError("user.lastname", "昵称不能为空");
    }
    if (null == user.getAge()) {
        this.addFieldError("user.age", "年龄不能为空");
    }

    if (user.getFirstname().length() > 2) {
        this.addFieldError("user.firstname", "姓名不能超过150字符");
    }
    if (user.getLastname().length() > 150) {
        this.addFieldError("user.lastname", "昵称不能超过150字符");
    }
}   
```

然后在 struts.xml 添加 input 返回结果，并返回到当前页面

```xml
<action name="saveUser" class="saveUserAction">
    <result name="success" type="redirect">listUser.action</result>
    <result name="input">/saveUser.jsp</result>
</action>
```

效果

![image-20220528223348438](https://img1.terwer.space/20220528223349.png)

### 方法二：使用 xml 配置校验

实际上是调用 Struts2已经定义好的校验器，来对我们的 Action 进行校验。

要求：

1、必须实现 validatable 接口，ActionSupport 已经实现了，我们只需要继承 ActionSupport 即可。

2、Action 中必须实现 getter、setter 方法。

创建校验配置文件。格式规范：

`actionClass-actionName-validation.xml`

actionClass：action 的类名

actionName：action 的访问名称。在 struts.xml 中配置的`<action name="actionName">`，若有动态函数传递，只想对某个函数进行校验，需要把函数名显式的写出来。

validation.xml：固定的后缀名。

比如：`SaveUserAction-saveUser-validation.xml`

路径：必须与 Action 同包

![image-20220605125735739](https://img1.terwer.space/20220605125736.png)

Action 类

```java
/**
 * 用户 Action
 *
 * @name: SaveUserAction
 * @author: terwer
 * @date: 2022-05-06 21:05
 **/
public class SaveUserAction extends ActionSupport {
    private static final Logger logger = LoggerFactory.getLogger(SaveUserAction.class);

    private User user;
    private UserService userService;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public UserService getUserService() {
        return userService;
    }

    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public String execute() {
        try {
            logger.info("开始保存用户");
            userService.saveUser(user);
        } catch (Exception e) {
            logger.error("保存用户出错：", e);
        }

        return SUCCESS;
    }
}
```

保存用户的表单 saveUser.jsp

```html
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="s" uri="/struts-tags" %>

<html>
<head>
    <title>保存用户</title>
    <link rel="stylesheet" href="css/common.css"></link>
</head>
<body>
<h1 style="color: red;">保存用户</h1>

<s:form action="saveUser">
    <s:textfield name="user.firstname" label="%{getText('firstname')}"></s:textfield>
    <s:textfield name="user.lastname" label="%{getText('lastname')}"></s:textfield>
    <s:textfield name="user.age" label="%{getText('age')}"></s:textfield>

    <s:submit value="提交"></s:submit>
</s:form>

</body>
</html>
```

struts.xml 的配置

```bash
<action name="saveUser" class="saveUserAction">
    <result name="success" type="redirect">listUser.action</result>
    <result name="input">/saveUser.jsp</result>
</action>
```

主要的 validator 配置：SaveUserAction-saveUser-validation.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE validators PUBLIC
        "-//Apache Struts//XWork Validator 1.0.3//EN"
        "http://struts.apache.org/dtds/xwork-validator-1.0.3.dtd">
<validators>
    <!-- action 中需要校验的属性 -->
    <field name="user.firstname">
        <!-- 指定校验器 -->
        <field-validator type="requiredstring">
            <!-- 为校验器中的参数配置值 -->
            <param name="trim">true</param>
            <!-- 校验失败后的提示信息 -->
            <message>用户名不能为空</message>
        </field-validator>
    </field>

    <field name="user.lastname">
        <field-validator type="requiredstring">
            <param name="trim">true</param>
            <message>昵称不能为空</message>
        </field-validator>
    </field>

    <field name="user.age">
        <field-validator type="int">
            <param name="min">0</param>
            <param name="max">120</param>
            <message>年龄输入必须在0-120之间</message>
        </field-validator>

        <field-validator type="required">
            <message>请输入年龄</message>
        </field-validator>
    </field>
</validators>
```

注意：输入 Action 名称-validation.xml 也是可以的。例如：

![image-20220605163937409](https://img1.terwer.space/20220605163937.png)

效果

![image-20220605132553016](https://img1.terwer.space/20220605132553.png)

**总结**

校验规则有很多，在 struts2-core-xxx.jar/com/opensymphony/xwork2/validator/validators/default.xml 中有详细的配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
-->
<!DOCTYPE validators PUBLIC
        "-//Apache Struts//XWork Validator Definition 1.0//EN"
        "http://struts.apache.org/dtds/xwork-validator-definition-1.0.dtd">

<!-- START SNIPPET: validators-default -->
<validators>
    <validator name="required" class="com.opensymphony.xwork2.validator.validators.RequiredFieldValidator"/>
    <validator name="requiredstring" class="com.opensymphony.xwork2.validator.validators.RequiredStringValidator"/>
    <validator name="int" class="com.opensymphony.xwork2.validator.validators.IntRangeFieldValidator"/>
    <validator name="long" class="com.opensymphony.xwork2.validator.validators.LongRangeFieldValidator"/>
    <validator name="short" class="com.opensymphony.xwork2.validator.validators.ShortRangeFieldValidator"/>
    <validator name="double" class="com.opensymphony.xwork2.validator.validators.DoubleRangeFieldValidator"/>
    <validator name="date" class="com.opensymphony.xwork2.validator.validators.DateRangeFieldValidator"/>
    <validator name="expression" class="com.opensymphony.xwork2.validator.validators.ExpressionValidator"/>
    <validator name="fieldexpression" class="com.opensymphony.xwork2.validator.validators.FieldExpressionValidator"/>
    <validator name="email" class="com.opensymphony.xwork2.validator.validators.EmailValidator"/>
    <validator name="creditcard" class="com.opensymphony.xwork2.validator.validators.CreditCardValidator"/>
    <validator name="url" class="com.opensymphony.xwork2.validator.validators.URLValidator"/>
    <validator name="visitor" class="com.opensymphony.xwork2.validator.validators.VisitorFieldValidator"/>
    <validator name="conversion" class="com.opensymphony.xwork2.validator.validators.ConversionErrorFieldValidator"/>
    <validator name="stringlength" class="com.opensymphony.xwork2.validator.validators.StringLengthFieldValidator"/>
    <validator name="regex" class="com.opensymphony.xwork2.validator.validators.RegexFieldValidator"/>
    <validator name="conditionalvisitor" class="com.opensymphony.xwork2.validator.validators.ConditionalVisitorFieldValidator"/>
</validators>
<!--  END SNIPPET: validators-default -->
```

![image-20220605133333966](https://img1.terwer.space/20220605133334.png)

相比较来说，xml 配置方式要方便一些，不过，如果需要自定义校验的话，可能默认的校验规则还不够。

### 方法三：使用 visitor 方式

配置文件分离

SaveUserAction-validation.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE validators PUBLIC
        "-//Apache Struts//XWork Validator 1.0.3//EN"
        "http://struts.apache.org/dtds/xwork-validator-1.0.3.dtd">
        
<validators>
	<field name="user">
		<field-validator type="visitor">
			<param name="context">user</param>
			<param name="appendPrefix">true</param>
			<message>用户的</message>
		</field-validator>
	</field>
</validators>
```

User-user-validation.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE validators PUBLIC
        "-//Apache Struts//XWork Validator 1.0.3//EN"
        "http://struts.apache.org/dtds/xwork-validator-1.0.3.dtd">
<validators>
    <!-- action 中需要校验的属性 -->
    <field name="firstname">
        <!-- 指定校验器 -->
        <field-validator type="requiredstring">
            <!-- 为校验器中的参数配置值 -->
            <param name="trim">true</param>
            <!-- 校验失败后的提示信息 -->
            <message>用户名不能为空</message>
        </field-validator>
    </field>

    <field name="lastname">
        <field-validator type="requiredstring">
            <param name="trim">true</param>
            <message>昵称不能为空</message>
        </field-validator>
    </field>

    <field name="age">
        <field-validator type="int">
            <param name="min">1</param>
            <param name="max">120</param>
            <message>年龄输入必须在 ${min} - ${max} 之间</message>
        </field-validator>

        <field-validator type="required">
            <message>年龄不能为空</message>
        </field-validator>
    </field>
</validators>
```

效果

![image-20220605183530598](https://img1.terwer.space/20220605183530.png)

## 本项目地址

[https://github.com/terwer/hoa](https://github.com/terwer/hoa)