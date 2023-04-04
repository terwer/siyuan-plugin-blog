---
title: Java生成验证码图片
short_title: ''
description: 生成验证码验证码工具类@name_verificationcode@author_terwer@date__publicclassverificationcode{privatestaticfinalstring[]randomstr={随机生成验证码@returnpublicstaticmapgetverificationcode(){returngetverificationcodewithstr(null)_}利用给定的字符串生成验证码@paramstr指定的字符串@returnpublicstat
date: 2022-07-16 23:14:41
category:
  - 经验分享
tag:
  - 验证码
  - 生成
  - 字符串
  - 随机
  - 内存
  - java
  - code
article: true
timeline: false
---
## 生成验证码

```java
/**
 * 验证码工具类
 *
 * @name: VerificationCode
 * @author: terwer
 * @date: 2022-07-17 22:21
 **/
public class VerificationCode {
    private static final String[] randomStr = {"0", "1", "2", "3", "4",
            "5", "6", "7", "8", "9", "A", "B",
            "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
            "N", "O", "P", "Q", "R",
            "S", "T", "U", "V", "W", "X", "Y", "Z"};

    /**
     * 随机生成验证码
     *
     * @return
     */
    public static Map getVerificationCode() {
        return getVerificationCodeWithStr(null);
    }

    /**
     * 利用给定的字符串生成验证码
     *
     * @param str 指定的字符串
     * @return
     */
    public static Map getVerificationCodeWithStr(String str) {
        // 设置默认生成 4个 长度的验证码
        int strLength = 4;
        char[] strArr = null;
        if (StringUtils.isNotEmpty(str)) {
            strLength = str.length();
            strArr = str.toCharArray();
        }

        // 定义验证码图片大小
        int width = 20 * strLength + 5, height = 25;
        // 在内存中创建 图像
        BufferedImage bufferedImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        // 为内存中要创建的图像生成画布，
        Graphics2D graphics2D = bufferedImage.createGraphics();
        // 画一个白色矩形，作为验证码背景
        graphics2D.setColor(Color.WHITE);
        // 填充
        graphics2D.fillRect(0, 0, width, height);

        // 画 100 条 灰色的 随机干扰线
        if (StringUtils.isNotEmpty(str)) {
            graphics2D.setColor(Color.WHITE);
        } else {
            graphics2D.setColor(Color.GRAY);
        }
        Random random = new Random();
        for (int i = 0; i < 100; i++) {
            graphics2D.drawLine(random.nextInt(width), random.nextInt(height), random.nextInt(width), random.nextInt(height));
        }

        // 创建字体
        Font font = new Font("Times New Roman", Font.BOLD, 25);
        graphics2D.setFont(font);

        StringBuffer sb = new StringBuffer();
        // 取得 4 位数的 随机字符串
        for (int i = 0; i < strLength; i++) {
            // 返回一个 随机数，在 1 和 20 之间
            String randomNumber = randomStr[random.nextInt(36)];
            if (StringUtils.isNotEmpty(str)) {
                randomNumber = String.valueOf(strArr[i]);
            }

            int red = random.nextInt(255);
            int green = random.nextInt(255);
            int blue = random.nextInt(255);
            //获得一个随机红蓝绿的配合颜色
            graphics2D.setColor(new Color(red, green, blue));
            //把该数字用画笔在画布画出，并指定数字的坐标
            if (null != randomNumber) {
                graphics2D.drawString(randomNumber, 20 * i + 5, (height / 2) + 10);
                //把该数字加到缓存字符串中。用于等会生成验证码字符串set到session中用于校对
                sb.append(randomNumber);
            }
        }
        // 清除内存的图片
        bufferedImage.flush();
        // 释放资源
        graphics2D.dispose();

        // 返回结果
        Map result = new HashMap();
        result.put("imgStream", bufferedImage);
        result.put("code", str);
        return result;
    }
}

```

## 解决 alpine 镜像运行 springboot 无法获取验证码（缺少字体）的问题

问题

```bash
Caused by: java.lang.NullPointerException
	at sun.awt.FontConfiguration.getVersion(FontConfiguration.java:1264)
	at sun.awt.FontConfiguration.readFontConfigFile(FontConfiguration.java:219)
	at sun.awt.FontConfiguration.init(FontConfiguration.java:107)
	at sun.awt.X11FontManager.createFontConfiguration(X11FontManager.java:774)
	at sun.font.SunFontManager$2.run(SunFontManager.java:431)
	at java.security.AccessController.doPrivileged(Native Method)
	at sun.font.SunFontManager.<init>(SunFontManager.java:376)
	at sun.awt.FcFontManager.<init>(FcFontManager.java:35)
	at sun.awt.X11FontManager.<init>(X11FontManager.java:57)
	at sun.reflect.NativeConstructorAccessorImpl.newInstance0(Native Method)
	at sun.reflect.NativeConstructorAccessorImpl.newInstance(NativeConstructorAccessorImpl.java:62)
	at sun.reflect.DelegatingConstructorAccessorImpl.newInstance(DelegatingConstructorAccessorImpl.java:45)
	at java.lang.reflect.Constructor.newInstance(Constructor.java:423)
```

方案

```dockerfile
FROM maven:3.6.0-jdk-8-alpine
ENV LANG en_US.UTF-8
RUN apk add --update ttf-dejavu fontconfig && rm -rf /var/cache/apk/*
```

## 参考

[https://www.cnblogs.com/oukele/p/12869137.html](https://www.cnblogs.com/oukele/p/12869137.html)

‍