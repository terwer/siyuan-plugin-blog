---
title: Struts2的Action中自定义方法的输入校验
short_title: ''
description: 自定义方法的输入校验对于通过action​的method​属性所指定的自定义方法myexecute​其对应的自定义输入校验方法名为validatemyexecute​。（底层是通过反射调用的）publicvoidvalidatemyexecute(){systemoutprintln(thisaddactionerror(}publicstringmyexecute()throwsexception{systemoutprintln(returnsuccess_}校验方法的执行顺序当在action​中指定
date: 2022-11-03 21:23:05
category:
  - Struts2
  - 后端开发
tag:
  - 方法
  - 自定义
  - 校验
  - 执行
  - 输入
  - 信息
  - custom
  - validate
  - msg
  - message
article: true
timeline: false
---
## 自定义方法的输入校验

1. 对于通过 `action`​ 的 `method`​ 属性所指定的自定义方法 `myExecute`​ ，其对应的自定义输入校验方法名为 `validateMyExecute`​ 。 （底层是通过反射调用的）

   ```java
   public void validateMyExecute() {
   	System.out.println("validateMyExecute invoked");

   	 this.addActionError("action error");
   }

   public String myExecute() throws Exception {
   	System.out.println("myExecute invoked");
   	return SUCCESS;
   }
   ```

2. 校验方法的执行顺序

   当在 `Action`​ 中指定了自定义的 `execute`​ 方法时，首先会执行自定义的 `execute`​ 方法所对应的输入校验方法，然后再去执行 `validate`​ 方法，执行完毕之后如果出现了任何错误都不会再去执行自定义的 `execute`​ 方法，流程转向了 `input`​ 这个名字所对应的页面上。

   ```java
   public void validateMyExecute() {
   	System.out.println("validateMyExecute invoked");

   	 this.addActionError("action error");
   }

   @Override
   public void validate() {
   	System.out.println("validate invoked");

   	// this.addActionError("action error");
   }

   @Override
   public String execute() throws Exception {
   	return SUCCESS;
   }

   public String myExecute() throws Exception {
   	System.out.println("myExecute invoked");
   	return SUCCESS;
   }
   // validateMyExecute invoked
   // validate invoked
   ```

   效果

   ![](https://img1.terwer.space/api/public/20221104001955.png)​

## 自定义 Field 级别的校验信息

在 Action 的同级目录新建一个属性文件，例如：`RegisterAction.properties`​

```properties
invalid.fieldvalue.birthday=age invalid custom msg
invalid.fieldvalue.graduation=graduation invalid custom msg
```

结果如下：

![](https://img1.terwer.space/api/public/20221104004231.png)​

总结：

1. 新建一个以 `Action`​ 名命名的 properties 文件，如： `RegisterAction.properties`​
2. 然后在该属性文件中指定每一个出错字段的错误消息，格式：

   ```properties
   invalid.fieldvalue.borthday=birthday invalid custom msg
   ```

‍