---
title: Struts1页面表单提交给action后页面一片空白解决
short_title: ''
description: Struts1页面表单提交给action后页面一片空白解决。使用struts1很容易遇到一个问题：页面表单提交之后，地址栏变为处理的action的地址，即以xxx.do结尾。然后页面一片空白，无错无异常。
date: 2022-05-07 20:56:31
category:
  - 实用技巧
  - 经验分享
tag:
  - struts1
  - blank
article: true
timeline: false
---
使用struts1很容易遇到一个问题：页面表单提交之后，地址栏变为处理的action的地址，即以xxx.do结尾,然后页面一片空白，无错无异常。

可能原因：

1. 在Action的执行方法中return null，就会一片空白

2. struts配置里的forward里的name里的值和action标签里的forward的name不一致

3. 配置文件跳转路径错误

4. **如果上面的都不行，你可以检检查下下面的：**

   - 检查下生成继承自Action的execute方法是不是继承错了，因为父类提供了两个同名方法，事实证明，把这个方法改正之后，页面跳转成功。

   - 两个execute方法的参数类型不一样，一个是 `HttpServletRequest` 和 `HttpServletResponse` 类型，另外一个方法的参数是`ServletRequest` 和 `ServletResponse` 类型，如果你无意中继承了ServletRequest和ServletResponse类型的execute方法，那就会出现页面一片空白，无错无异常

   ```java
   @Override
   public ActionForward execute(ActionMapping mapping, ActionForm form, ServletRequest request, ServletResponse response) throws Exception {
       return mapping.findForward(SUCCESS);
   }
   ```

   ```java
   @Override
   public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
       return mapping.findForward(SUCCESS);
   }
   ```

    经验证，使用第一种就会出现页面空白的现象，改成第二种，一切正常！