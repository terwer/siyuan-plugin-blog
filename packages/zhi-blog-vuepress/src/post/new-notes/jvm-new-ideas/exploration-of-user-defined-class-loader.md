---
title: 用户自定义类加载器探秘
short_title: ''
description: 用户自定义类加载器探秘
date: 2022-07-07 21:28:38
category:
  - JVM新思路
  - 新笔记
tag:
  - jvm
  - classloader
  - custom
article: true
timeline: false
---
# 用户自定义类加载器探秘

MyClassLoader

```java
/**
 * 自定义类加载器
 *
 * @name: MyClassLoader
 * @author: terwer
 * @date: 2022-07-07 21:37
 **/
public class MyClassLoader extends ClassLoader {
    //  类加载器的名字
    private String name;

    // 加载类的路径
    private String path = "/home/terwer/Downloads";

    // class文件的扩展名
    private final String fileType = ".class";

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public MyClassLoader(String name) {
        // 让系统类加载器成为类加载器的父类加载器
        super();
        this.name = name;
    }

    public MyClassLoader(ClassLoader parent, String name) {
        // 显式指定类的父类加载器
        super(parent);
        this.name = name;
    }

    @Override
    public String toString() {
        return this.name;
    }

    @Override
    protected Class<?> findClass(String name) throws ClassNotFoundException {
        byte[] data = this.loadClassData(name);

        return this.defineClass(name, data, 0, data.length);
    }

    private byte[] loadClassData(String name) {
        InputStream is = null;
        byte[] data = null;
        ByteArrayOutputStream baos = null;

        try {
            this.name = this.name.replace(".", "/");
            is = new FileInputStream(path + "/" + name + fileType);

            baos = new ByteArrayOutputStream();

            int ch = 0;
            while (-1 != (ch = is.read())) {
                baos.write(ch);
            }

            data = baos.toByteArray();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (is != null) {
                    is.close();
                }
                if (baos != null) {
                    baos.close();
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }

        return data;
    }
}
```

Main

```java
/**
 * @name: Main
 * @author: terwer
 * @date: 2022-07-07 21:33
 **/
public class Main {
    public static void main(String[] args) throws Exception{
        MyClassLoader loader1 = new MyClassLoader("loader1");
        loader1.setPath("/home/terwer/Downloads/f1");

        MyClassLoader loader2 = new MyClassLoader(loader1, "loader2");
        loader2.setPath("/home/terwer/Downloads/f2");

        MyClassLoader loader3 = new MyClassLoader(null, "loader3");
        loader3.setPath("/home/terwer/Downloads/f3");

        test(loader2);
        test(loader3);
    }

    public static void test(ClassLoader loader) throws Exception {
        Class clazz = loader.loadClass("com.terwergreen.loader.Simple");
        Object object = clazz.getDeclaredConstructor().newInstance();
    }
}
```

运行效果

![image-20220707224506215](https://img1.terwergreen.com/api/public/20220707224506.png)

分析

![image-20220707222253906](https://img1.terwergreen.com/api/public/20220707222716.png)

![image-20220707223251502](https://img1.terwergreen.com/api/public/20220707223252.png)