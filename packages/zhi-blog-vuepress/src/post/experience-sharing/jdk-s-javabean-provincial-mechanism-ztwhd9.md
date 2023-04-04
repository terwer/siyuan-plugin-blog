---
title: JDK之JavaBean内省机制
short_title: ''
description: jdk规范目录javabean是一种特殊的java类主要用于传递数据信息这种java类中的方法主要用于访问私有的字段且方法名符合某种命名规则。一javabeanjavabean命名规则一个javabean类中的方法去掉set或get前缀剩余部分就是属性名如果剩余部分的第二个字母是小写的则把剩余部分的首字母改成小的。getagesetageagegettimesettimetime如果去掉前缀剩余部分的第二个字母为大写则全部大写getcpugetcpu完整示例publicclasstestbean{priv
date: 2022-10-05 21:29:02
category:
  - 经验分享
tag:
  - 方法
  - 属性
  - 内省
  - java
  - bean
  - jdk
article: true
timeline: false
---
[JDK 规范目录](https://www.cnblogs.com/binarylei/p/10200503.html)

JavaBean 是一种特殊的 Java 类，主要用于传递数据信息，这种 Java 类中的方法主要用于访问私有的字段，且方法名符合某种命名规则。

## 一、JavaBean

### JavaBean 命名规则

1. 一个 JavaBean 类中的方法，去掉 set 或 get 前缀，剩余部分就是属性名，如果剩余部分的第二个字母是小写的，则把剩余部分的首字母改成小的。  
    getAge/setAge --> age  
    getTime/setTime --> time<br />
2. 如果去掉前缀，剩余部分的第二个字母为大写，则全部大写  
    getCPU --> getCPU

完整示例

```java
public class TestBean {
    private Integer age;
    private String time;
    private String CPU;

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getCPU() {
        return CPU;
    }

    public void setCPU(String CPU) {
        this.CPU = CPU;
    }
}
```

### 什么叫做内省？

Java 内省主要使用来对 JavaBean 进行操作的，所以当一个类满足了 JavaBean 的条件，就可以使用内省的方式来获取和操作 JavaBean 中的字段值。内省提供了操作 JavaBean 的 API。

Java 中提供了一套 API 用来访问某个属性的 getter/setter 方法，通过这些 API 可以使你不需要了解这个规则，这些 API 存放于包 java.beans 中，一般的做法是通过类 Introspector 的 getBeanInfo 方法 来获取某个对象的 BeanInfo 信息，然后通过 BeanInfo 来获取属性的描述器(PropertyDescriptor)，通过这个属性描述器就可以获取某个属性对应的 getter/setter 方法，然后我们就可以通过反射机制来调用这些方法。

## 二、JDK 内省机制

### Introspector 类

Introspector 这个类位于 java.beans 包中，该类中的方法都是静态的，可以直接使用类名调用。

```java
// 获取 beanClass 及其所有父类的 BeanInfo
BeanInfo getBeanInfo(Class<?>beanClass)

// 获取 beanClass 及其指定到父类 stopClass 的 BeanInfo 
BeanInfo getBeanInfo(Class<?> beanClass, Class<?> stopClass)
```

我们可以使用 Introspector 的 getBeanInfo(Class<?> beanClass) 来获取一个 JavaBean 类的 BeanInfo 对象。BeanInfo 有三个常用的属性：

```java
// bean 信息
BeanDescriptor beanDescriptor = beanInfo.getBeanDescriptor();
// 属性信息
PropertyDescriptor[] propertyDescriptors = beanInfo.getPropertyDescriptors();
// 方法信息
MethodDescriptor[] methodDescriptors = beanInfo.getMethodDescriptors();
```

### PropertyDescriptor 类

这个类位于 java.beans 包中。

```java
@Test
public void test() throws Exception {
    PropertyDescriptor pd = new PropertyDescriptor("id", User.class);
    System.out.println(pd.getName());
}
```

### PropertyEditor 类

Spring 中使用 PropertyEditor 向 JavaBean 中注入属性。

```java
@Test
public void test1() throws Exception {
    User user = new User();

    PropertyDescriptor propertyDescriptor = new new PropertyDescriptor("id", User.class);
    propertyDescriptor.setPropertyEditorClass(IntPropertyEditor.class);
    PropertyEditor propertyEditor = propertyDescriptor.createPropertyEditor(user);

    propertyEditor.setAsText("99");
    Method writeMethod = propertyDescriptor.getWriteMethod();
    writeMethod.invoke(user, propertyEditor.getValue());

    System.out.println(user);
}

@Test
public void test2() throws Exception {
    User user = new User();

    PropertyDescriptor propertyDescriptor = new new PropertyDescriptor("id", User.class);
    propertyDescriptor.setPropertyEditorClass(IntPropertyEditor.class);
    PropertyEditor propertyEditor = propertyDescriptor.createPropertyEditor(user);

    // 这个 evt 实际上就是 propertyEditor 对象
    propertyEditor.addPropertyChangeListener(evt -> {
        PropertyEditor source = (PropertyEditor) evt.getSource();
        Method writeMethod = propertyDescriptor.getWriteMethod();
        writeMethod.invoke(user, source.getValue());
    });
    propertyEditor.setAsText("99");
    System.out.println(user);
}

// JDK 中的 PropertyEditor 接口
public static class IntPropertyEditor extends PropertyEditorSupport {
    @Override
    public void setAsText(String text) throws IllegalArgumentException {
        setValue(Integer.parseInt(text));
    }
}
```

## 三、Apache BeanUtils 工具包

Apache 组织开发了一套用于操作 JavaBean 的 API(内省)。该工具在 commons-beanutils 包中，核心类 BeanUtils：

```java
setProperty(bean, name, value)
copyProperties(target, source)
```

可以支持 String 到 8 中基本数据类型转换，其他引用数据类型都需要注册转换器 ConvertUtils.register(Converter, Class)

使用 BeanUtils 来格式化日期：

```java
public static void main(String[] args) throws Exception {
      
    User user = new User();
  
    String name = "zhangsan";
    String birthday = "19801122";
  
    // 注册一个转换器
    /* 使用匿名内部类来注册转换器
    ConvertUtils.register(new Converter() {
      
        public Object convert(Class beanClass, Object value) {
            String birthday = (String) value;
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
            try {
                return sdf.parse(birthday);
            } catch (ParseException e) {
                return null;
            }
        }
    }, Date.class);
    */
   
    DateConverter converter = new DateConverter();
    converter.setPatterns(new String[]{"yyyy-MM-dd","yyyyMMdd","MM/dd/yyyy"});
    ConvertUtils.register(converter, Date.class);
  
    BeanUtils.setProperty(user, "name", name);
    BeanUtils.setProperty(user, "birthday", birthday);

    System.out.println(user);  
}
```

**参考：**

《JavaBean 以及内省技术详解》：[https://www.cnblogs.com/yejiurui/archive/2012/10/06/2712693.html](https://www.cnblogs.com/yejiurui/archive/2012/10/06/2712693.html)