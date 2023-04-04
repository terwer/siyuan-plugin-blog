---
title: NIO三大核心之通道（Channel）
short_title: ''
description: NIO中所有的IO都是从通道（Channel）开始的。NIO的通道类似于流，但是有区别。
date: 2022-05-04 14:39:34
category:
  - 后端开发
  - 分布式
tag:
  - nio
  - channel
article: true
timeline: false
---
### 通道（Channel）

#### 基本介绍

NIO中所有的IO都是从通道（Channel）开始的。NIO的通道类似于流，但是有区别：

1. 通道可读可写，流一般是单向的（只能读或者写，所以之前socket的demo里面分别创建一个输入流和输出流）。

2. 通道可以异步读写。

3. 通道总是基于缓冲区Buffer来读写

   ![image-20220418214447367](https://img1.terwer.space/image-20220418214447367.png)

#### Channel的常用类介绍

1. Channel接口

   常用的Channel实现类有：FileChannel、DatagramChannel、ServerSocketChannel和SocketChannel

   FileChannel用于文件的数据读写，DatagramChannel用于UDP数据的读写，ServerSocketChannel和SocketChannel用于TCP数据的读写。

   ServerSocketChannel类似于ServerSocket，SocketChannel类似于Socket。

   ```mermaid
   classDiagram
   direction BT
   class Channel {
   <<Interface>>
   
   }
   class DatagramChannel
   class FileChannel
   class ServerSocketChannel
   class SocketChannel
   
   DatagramChannel  ..>  Channel 
   FileChannel  ..>  Channel 
   ServerSocketChannel  ..>  Channel 
   SocketChannel  ..>  Channel 
   ```

   > 如果无法显示图片，请看这里
   >
   > ![image-20220418215316887](https://img1.terwer.space/image-20220418215316887.png)

2. SocketChannel和ServerSocketChannel

   类似于Socket和ServerSocket，可用于客户端与服务器的通信。

#### ServerSocketChannel

服务端实现步骤：

1. 打开一个服务端通道
2. 绑定对应的端口号
3. 通道默认是阻塞的，需要设置为非阻塞
4. 检查是否有客户端连接，有客户端连接会返回对应的通道
5. 获取客户端传递过来的数据,并把数据放在byteBuffer这个缓冲区中 
6. 给客户端回写数据
7. 释放资源

```java
/**
 * 服务端
 *
 * @name: NIOServer
 * @author: terwer
 * @date: 2022-04-18 21:59
 **/
public class NIOServer {
    public static void main(String[] args) throws IOException, InterruptedException {
        // 1. 打开一个服务端通道
        ServerSocketChannel serverSocketChannel = ServerSocketChannel.open();
        // 2. 绑定对应的端口号
        serverSocketChannel.bind(new InetSocketAddress(9999));
        // 3. 通道默认是阻塞的，需要设置为非阻塞
        // true为阻塞，false为非阻塞
        serverSocketChannel.configureBlocking(false);
        System.out.println("服务端启动成功=========");

        while (true) {
            // 4. 检查是否有客户端连接，有客户端连接会返回对应的通道
            SocketChannel socketChannel = serverSocketChannel.accept();
            if (socketChannel == null) {
                System.out.println("没有客户端连接，做别的事情");
                Thread.sleep(2000);
                continue;
            }

            // 5. 获取客户端传递过来的数据,并把数据放在byteBuffer这个缓冲区中
            ByteBuffer byteBuffer = ByteBuffer.allocate(1024);
            // 正数，读到的字节
            // 0，没有读到数据
            // -1，读到了文件末尾
            int read = socketChannel.read(byteBuffer);
            System.out.println("客户端发来的消息：" + new String(byteBuffer.array(), 0, read));

            // 6. 给客户端回写数据
            socketChannel.write(ByteBuffer.wrap("你好，我是服务端".getBytes(StandardCharsets.UTF_8)));

            // 7. 释放资源
            socketChannel.close();
        }

    }
}
```

#### SocketChannel

客户端实现步骤：

1. 打开通道
2. 设置连接IP和端口号
3. 写出数据
4. 读取服务器写回的数据

```java
/**
 * 客户端
 *
 * @name: NIOClient
 * @author: terwer
 * @date: 2022-04-18 22:11
 **/
public class NIOClient {
    public static void main(String[] args) throws IOException {
        // 1. 打开通道
        SocketChannel socketChannel = SocketChannel.open();
        // 2. 设置连接IP和端口号
        socketChannel.connect(new InetSocketAddress("127.0.0.1", 9999));
        // 3. 写出数据
        socketChannel.write(ByteBuffer.wrap("你好，我是客户端".getBytes(StandardCharsets.UTF_8)));
        // 4. 读取服务器写回的数据
        ByteBuffer byteBuffer = ByteBuffer.allocate(1024);
        int read = socketChannel.read(byteBuffer);
        System.out.println("服务端回话：" + new String(byteBuffer.array(), 0, read));
        // 5.释放资源
        socketChannel.close();
    }
}
```

运行效果

![image-20220418221859423](https://img1.terwer.space/image-20220418221859423.png)



![image-20220418221828926](https://img1.terwer.space/image-20220418221828926.png)