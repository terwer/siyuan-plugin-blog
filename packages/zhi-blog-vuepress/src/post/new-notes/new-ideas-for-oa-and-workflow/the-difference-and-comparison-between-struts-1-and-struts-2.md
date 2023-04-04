---
title: Struts1与Struts2的区别和对比
short_title: ''
description: 本文介绍了Struts2的起源，详细对比了Struts2和Struts1.x的差异，并穿插概述了Struts2框架和请求流程。本文介绍了两者在Action方面、对
  Servlet 的依赖方面、输入捕获方面和表达式语言等十几个方面的差别，同时指出Struts2对拦截器与IoC的支持，而在Struts1.x中这些特性是很难想象的。
date: 2022-05-07 14:42:44
category:
  - OA与工作流新思路
  - 新笔记
tag:
  - struts1
  - struts2
article: true
timeline: false
---
本文介绍了Struts2的起源，详细对比了Struts2和Struts1.x的差异，并穿插概述了Struts2框架及其请求流程。

本文介绍了两者在Action方面、对 Servlet 的依赖方面、输入捕获方面和表达式语言等十几个方面的差别，同时指出了Struts2对拦截器与IOC的支持，而在Struts1.x中这些特性是很难想象的。

<!-- more -->

## 前言

[Struts](https://struts.apache.org) 的第一个版本是在2001年5月份发布的。它的最初设想是： **通过结合JSP和Servlet，使Web应用的视图和业务/应用逻辑得以清晰地分离开来。** 

在Struts之前，最常见的做法是在JSP中加入业务和应用逻辑，或者在Servlet中通过 `println()` 来生成视图。

自从第一版发布以来，Struts实际上已成为业界公认的Web应用标准。它的炙手可热也为自己带来了改进和变更，其不但要跟上Web应用框架不断变化的需求，而且要与日渐增多竞争激烈的众多框架的特性相融合。到最后，产生了几个下一代Struts的解决方案，其中两个最受瞩目的方案是 `Shale` 和 `Struts Ti` 。

 [Shale Framework](https://shale.apache.org/)

Shale是一个基于构件的框架，并在成为Apache的顶级项目；而Struts Ti则是在Struts的成功经验基础上继续坚持对前端控制器（Front Controller） 和 MVC（model-view-controller）模式进行改进。

WebWork项目是在2002年3月发布的，它对Struts式框架进行了革命性改进，引进了不少新的思想、概念和功能，但和原Struts代码并不兼容。

WebWork是一个成熟的框架，经过了好几次重大的改进与发布。在2005年12月，WebWork与Struts Ti宣布合并。

与此同时，Struts Ti改名为Struts Action Framework 2.0，成为Struts真正的继承者。需要特别注意的是，全新的Struts2的体系结构与Struts1差别巨大，因为Struts2是以WebWork为核心的，继承了更多的WebWork血统，并吸收了struts1和webwork的优势。

需要指出的是，由于人们对这两个项目的兴趣仍然很高，而且也有很多开发者仍然愿意使用它们，因此这两个项目还在继续开发中，继续修复Bug，改进功能和继续添加新功能。

接下来，就让我们来详细了解一下Struts2与Struts 1.x的差异吧！

## Action 方面

Action的区别

对于有着丰富的Struts1.x开发经验的朋友来说，都十分的清楚Action是整个Struts框架的核心内容，当然Struts2也不例外。

不过，Struts1.x与Struts2的Action模型很大的区别。

- Struts2和Struts1.x的差别，最明显的就是Struts2是一个 `pull-MVC` 架构 。这是什么意思呢？从开发者角度看，就是说需要显示给用户的数据可以直接从Action中获取，而不像 Struts1.x那样，必须把相应的Bean存到Page、Request或者Session中才能获取。

- Struts1.x 必须继承org.apache.struts.action.Action或者其子类，表单数据封装在FormBean中。而Struts 2无须继承任何类型或实现任何接口，表单数据包含在Action中，通过Getter和Setter获取（如下面的ActionForStruts2的代码示例）。

- 虽然，在理论上Struts2的Action无须实现任何接口或者是继承任何的类，但是，在实际编程过程中，为了更加方便的实现Action，大多数情况下都会继承 `com.opensymphony.xwork2.ActionSupport` 类，并且重载（Override）此类里的 execute()` 方法。

- 在Struts2中，处理业务逻辑的方法（通常是execute方法）返回的对象不是ActionForward，而是String。如果你不喜欢以字符串的形式出现在你的代码中，我们知道Action接口可以以常量方式提供常见结果，如 “success”、“none”、“error”、“input”和“login”。特别地，**在Struts1.x中，只有“execute”方法才能处理该Action的业务逻辑, 但在Struts2中并非必要，任何声明为public String methodName() 方法，都能通过配置来调用Action。**

- 和Struts1.x最大的革命性的不同是，Struts2处理Action过程中调用的方法（“execute”方法）是不带参数的。那如何获取所需要的对象呢？答案是使用 IoC（反转控制，Inversion of Control)，也叫“依赖注入（Dependency Injection）”的模式（想更多地了解这方面信息请看Martin Fowler的文章 [http://www.martinfowler.com/articles/injection.html]( http://www.martinfowler.com/articles/injection.html) ）。Spring框架使得这个模式流行起来，不过Struts2的前身（WebWork）也同时应用上了这个模式。

最后，我们分别看一下 Struts 1.3.10 和 Struts2.5.30 对Action官方注释：

Struts1.3.10

```java
/**
 * <p>An <strong>Action</strong> is an adapter between the contents of an
 * incoming HTTP request and the corresponding business logic that should be
 * executed to process this request. The controller (RequestProcessor) will
 * select an appropriate Action for each request, create an instance (if
 * necessary), and call the <code>execute</code> method.</p>
 *
 * <p>Actions must be programmed in a thread-safe manner, because the
 * controller will share the same instance for multiple simultaneous requests.
 * This means you should design with the following items in mind: </p>
 *
 * <ul>
 *
 * <li>Instance and static variables MUST NOT be used to store information
 * related to the state of a particular request. They MAY be used to share
 * global resources across requests for the same action.</li>
 *
 * <li>Access to other resources (JavaBeans, session variables, etc.) MUST be
 * synchronized if those resources require protection. (Generally, however,
 * resource classes should be designed to provide their own protection where
 * necessary.</li>
 *
 * </ul>
 *
 * <p>When an <code>Action</code> instance is first created, the controller
 * will call <code>setServlet</code> with a non-null argument to identify the
 * servlet instance to which this Action is attached. When the servlet is to
 * be shut down (or restarted), the <code>setServlet</code> method will be
 * called with a <code>null</code> argument, which can be used to clean up any
 * allocated resources in use by this Action.</p>
 *
 * @version $Rev: 471754 $ $Date: 2005-08-26 21:58:39 -0400 (Fri, 26 Aug 2005)
 *          $
 */
public class Action {
}
```

Struts2.5.30

```java
/**
 * All actions <b>may</b> implement this interface, which exposes the <code>execute()</code> method.
 * <p>
 * However, as of XWork 1.1, this is <b>not</b> required and is only here to assist users. You are free to create POJOs
 * that honor the same contract defined by this interface without actually implementing the interface.
 * </p>
 */
public interface Action {
}
```

结合以上内容，我们可以看出二者在 Action 的设计方面的差异：

- Struts1要求Action类继承一个抽象基类。**Struts1的一个普遍问题是使用抽象类编程而不是接口，而struts2的Action是接口；**

- **Struts2的Action 可以实现一个Action接口，也可实现其他接口，还可以不实现任何接口，这使得可选和定制的服务成为可能。** 在Struts2中，它提供了一个ActionSupport基类去实现 常用的接口。注意，Action接口不是必须的，任何有execute标识的POJO对象都可以用作Struts2的Action对象。

## 线程模式方面

- **Struts1的Action是线程安全的单例模式，因为仅有Action的一个实例来处理所有的请求。** 单例策略限制了Struts1 Action能作的事，并且要在开发时特别小心，因为Action使用的资源必须是线程安全的或同步的。

- Struts2的Action对象为每一个请求产生一个实例，因此没有线程安全问题。Struts2中的ActionContext为Action的执行提供了环境，而 **ActionContext 实质上是一个 ThreadLocal 变量**。

## Servlet依赖方面

- **Struts1的Action与Servlet API是紧耦合的。** 因为当一个Action被调用时，HttpServletRequest 和 HttpServletResponse 会被传递给execute方法；

- **Struts2的Action 并不依赖于Servlet容器，允许Action脱离容器单独被测试。** 并且，如果需要，Struts2 Action仍然可以访问初始的HttpServetRequest和HttpServletResponse，但是通常情况下我们没必要直接访问它们，因为我们完全通过 OGNL表达式、ActionContext等使用它们。

## 可测试性方面

- **测试Struts1的Action的一个主要问题是execute方法暴露了servlet API，这使得测试要依赖于容器。** 此外，一个第三方扩展Struts TestCase提供了一套Struts1的模拟对象来帮助我们进行测试；
- **Struts2的Action可以通过初始化、设置属性、调用方法来测试，“依赖注入”支持也使测试更容易。**

## 输入捕获方面

- **Struts1使用ActionForm对象捕获输入。** 所有的ActionForm必须继承一个基类，因为其他JavaBean不能用作ActionForm，开发者经常创建多余的类捕获输入。动态Bean（DynaBeans）可以作为创建传统ActionForm的选择，但是开发者可能是在重新修改已经存在的JavaBean（仍然会导致有冗余的Javabean）;

- **Struts2直接使用Action属性作为输入属性，消除了对第二个输入对象的需求。** ModelDriven接口、OGNL以及Strust的类型转换拦截器完全可以胜任这项工作。

## 表达式语言方面

- **Struts1 整合了JSTL，因此可以使用JSTL的EL。** 但是，EL只能胜任基本对象图的遍历，但是对集合和索引属性的支持很弱；

- **Struts2 可以使用JSTL，但是也支持一个更强大和灵活的表达式语言OGNL(Object Graph Notation Language)。** 关于OGNL(Object Graph Notation Language)的前世今生和在Struts2中的应用可参考博文《与MVC框架解耦的OGNL：前世今生及其基本用法》 和 《 再述 OGNL：在Struts2中的应用》。

## 绑定值到页面方面

- **Struts1使用标准JSP机制把对象绑定到页面中来访问;**
- **Struts2 通过ValueStack可以使taglib能够访问值而不需要把你的页面（view）和对象绑定起来。** ValueStack策略允许通过一系列名称相同但类型不同的属性重用页面（view）。

## 类型转换方面

- **Struts1的ActionForm属性通常都是String类型，Struts1借助于Apache的Commons-Beanutils进行类型转换。** 也就是说，每个类一个转换器，对每一个实例来说是不可配置的；

- Struts2使用OGNL进行类型转换，并且提供基本和常用对象的转换器。此外，Strusts2 为我们写自定义的类型转换器提供了很好的支持。

## 数据校验方面

- **Struts1支持在ActionForm的validate方法中手动校验，或者通过Commons Validator的扩展来校验。** 同一个类可以有不同的校验内容，但不能校验子对象；
- **Struts2支持通过validate方法和XWork校验框架(拦截器机制)来进行校验**。XWork校验框架使用为属性类类型定义的校验和内容校验来支持chain校验子属性。

## 对Action执行的控制方面

- **Struts1支持每一个模块有单独的Request Processors（生命周期），但是模块中的所有Action必须共享相同的生命周期；**
- **Struts2支持通过拦截器堆栈（InterceptorStacks）为每一个Action创建不同的生命周期。** 我们可以根据需要让拦截器和不同的Action一起使用。

## 对IOC的应用

IoC (Inversion of Control，控制反转）随着Java社区中轻量级容器（Lightweight Contianer）的推广而越来越为大家耳熟能详。在此，无需再多费唇舌来解释“什么是控制反转”和“为什么需要控制反转”，因为互联网上已经有非常多的文章对诸如此类的问题作了精彩而准确的回答。特别地，读者可以去读一下 Rod Johnson和Juergen Hoeller合著的《Expert one-on-one J2EE Development without EJB》(此书被称为“架构学习上的明灯”) 或 Martin Fowler所写的《Inversion of Control Containers and the Dependency Injection pattern》。

众所周知，Struts2是以Webwork 2作为基础发展出来。而在Webwork 2.2之前的Webwork版本，其自身有一套控制反转的实现，Webwork 2.2在Spring 框架的如火如荼发展的背景下，决定放弃控制反转功能的开发转由Spring实现。值得一提的是，Spring确实是一个值得学习的框架，因为有越来越多的开源组件（如iBATIS等）都放弃与Spring重叠的功能的开发。因此，Struts2推荐大家通过Spring实现控制反转。

为了更好地了解反转控制，下面来看一个例子，如何利用IoC在Action处理过程中可以访问到当前请求HttpServerRequest对象(ModelDriven也是)。在例子中，使用的依赖注入机制是 接口注入 。就如其名称一样，接口注入需要的是已经被实现了的接口。在这个接口中包含了相应属性的 Setter，以便为Action提供值。例子中使用了RequestAware接口(类似的还包括 SessionAware、ApplicationAware、ModelDriven等接口)如下：

```java
public interface ServletRequestAware {
    public void setServletRequest(HttpServletRequest request);
}
```

当我们的Action继承了这个接口后，原本简单的Action看起来就有点复杂了，但是这时可以获取HttpServerRequest对象来使用了，如下所示：

```java
public class IoCForStruts2 implements RequestAware {

    private HttpServletRequest request;

    public void setServletRequest(HttpServletRequest request) {
        this.request = request;
    }

    public String execute() throws Exception {

        // 可以开始使用request对象进行工作了...

        return Action.SUCCESS; 
    }

}
```

虽然看起来现在这些属性是类级别的，不是线程安全的，会出现问题。但其实在Struts2里并没有问题，**因为每个请求过来的时候都会产生一个新的Action对象实例以及新的ActionContext实例(ActionContext就包含请求的内容)，它并没有和其他请求共享一个对象，所以不需要考虑线程安全问题。**

## Struts2的拦截器机制

拦截器(Interceptor) 在AOP（Aspect-Oriented Programming）中用于在某个方法或字段被访问之前进行拦截，然后在之前或之后加入某些操作。

拦截是AOP的一种实现策略。在Webwork的中文文档的解释为：拦截器是动态拦截Action调用的对象。

它提供了一种机制可以使开发者定义在一个action执行的前后执行的代码，也可以在一个action执行前阻止其执行，同时，也提供了一种可以提取action中可重用的部分的方式。

Struts1.x的标准框架中不提供任何形式的拦截器，虽然有一个名为SAIF的附加项目实现了这样的功能，但它的适用的范围还很有限。拦截器是Struts2的一个强有力的工具。Struts2许多的功能（feature）都是构建于它之上，如国际化、类型转换器、数据校验、异常处理等。虽然，Struts2为我们提供如此丰富的拦截器实现，但是这并不意味我们失去创建自定义拦截器的能力，恰恰相反，在Struts 2自定义拦截器是相当容易的一件事。

谈到拦截器，还有一个流行的词 —— 拦截器链（Interceptor Chain），在Struts2中称为拦截器栈(Interceptor Stack)。拦截器链就是将拦截器按一定的顺序联结成一条链，在访问被拦截的方法或字段时，拦截器链中的拦截器就会按其之前定义的顺序被调用。这涉及到了对责任链模式的应用，具体请见关于拦截器、AOP和责任链模式的介绍的文章《责任链模式综述(基础篇)》 和 《责任链模式进阶：与AOP思想的融合与应用》。

Struts2 的拦截器实现相对比较简单，当请求到达Struts2的ServletDispatcher时，Struts 2会查找配置文件，并根据其配置实例化相对的拦截器对象，然后串成一个列表（list），最后一一地调用列表中的拦截器，Struts 2已经提供丰富多样功能齐全的拦截器实现。这一点在《责任链模式进阶：与AOP思想的融合与应用》中做了详细的阐述。

读者可以到struts2-all-2.5.30.jar或struts2-core-2.5.30.jar包的struts-default.xml查看关于默认的拦截器与拦截器链的配置。作为框架（framework），可扩展性是不可缺少的，因为世上没有放之四海而皆准的东西。

## 总结

前面已经简要介绍了Struts2的起源，并详细对比了Struts2和Struts1.x的差异。

本文概述了Struts2的高层的框架概念和基础的请求流程，并介绍了Struts1.x和Struts2两者之间在Action方面、对 Servlet 的依赖方面、输入捕获方面和表达式语言方面等的差别，同时指出Struts2加强了对拦截器与IoC的支持，而在Struts1.x中，这些特性是很难想象的。

同时，读者应该明白：Struts2是WebWork的升级，而不是Struts1.x的升级。虽然Struts2提供了与Struts1.x的兼容，但已经不是Struts1.x的升级。对于已有Struts1.x开发经验的开发者而言，Struts1.x的开发经验对于Struts2并没有太大的帮助；相反，对于已经有WebWork开发经验的开发者而言，WebWork的开发经验对Struts2的开发将有很好的借鉴意义。

## 更多

若读者想对Struts2的拦截器机制、AOP理念和责任链模式内涵进行进一步的了解的话，请移步到文章《责任链模式综述(基础篇)》 和 《责任链模式进阶：与AOP思想的融合与应用》。

若读者想了解OGNL(Object Graph Notation Language)的前世今生及其在Struts2中的应用请看博文《与MVC框架解耦的OGNL：前世今生及其基本用法》 和 《 再述 OGNL：在Struts2中的应用》。

更多关于Struts2的的介绍请见我的专栏《Java Web 成神之路》。本专栏全面记录了Java Web开发相关知识，不但包括对http, servlet,session等基础知识的讲解，还包括对流行框架(SSM,SpringMVC等)、中间件(Redis等)等进阶知识的深入分析。笔者将持续跟进最新Web技术，期望对大家能够起到抛砖引玉的效果。