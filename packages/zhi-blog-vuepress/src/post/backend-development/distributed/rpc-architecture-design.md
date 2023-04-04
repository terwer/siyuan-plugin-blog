---
title: RPC架构设计及IO模型
short_title: ''
description: 本文阐述了socket编程、IO网络模型，以及各种IO模型的适用场景。
date: 2022-04-16 19:03:55
category:
  - 后端开发
  - 分布式
tag:
  - rpc
  - arch
  - io
article: true
timeline: false
---
本文阐述了socket编程、IO网络模型，以及各种IO模型的适用场景。

<!-- more -->

# RPC架构设计

:::tip 文章更新历史

2022/05/10 feat:新增GO、C++、C支持

2022/05/10 feat:新增PHP支持

2022/05/09 feat:新增Scala、Grovvy、GraalVMJS支持

2022/05/09 feat:新增C#、F#支持

2022/05/09 feat:新增JRuby支持

2022/05/09 feat:新增Kotlin支持、Jython支持

2022/05/04 feat:修改相关描述。

2022/03/01 feat:初稿。

:::

## socket

### socket网络编程

#### socket概述

socket套接字是两台主机之间逻辑连接的端点。

TCP/IP协议是传输层协议，主要解决数据在网络中的传输

socket是网络通信之间的抽象接口，它包含网络通信的五种基础信息：**连接使用的协议、本地主机的ip地址、本地进程协议端口、远程主机ip地址、远程进程的协议端口**。

#### socket整体流程

socket编程主要包括客户端和服务端两个方面。

首先在服务端创建一个服务端套接字（ServerSocket），并把它附加到一个端口上，服务端从这个端口监听链接。

端口范围是 `0-65536` ，注意 `0-1024` 是特权服务保留的端口。可选择任意一个不被其他进程使用的端口。

客户端请求与服务端连接时，根据服务端的域名或者ip地址，加上端口号，打开一个套接字。当服务器接受连接后，服务器和客户端之间的操作可以像输入输出流一样操作。

![image-20220417134215803](https://img1.terwer.space/image-20220417134215803.png)

#### 代码实现

1. 服务端代码

   <code-group>

   <code-block title="Kotlin" active>

   ```kotlin
   /**
    * 服务端
    *
    * @name: ServerDemo
    * @author: terwer
    * @date: 2022-05-08 14:20
    */
   object ServerDemo {
       @Throws(IOException::class)
       @JvmStatic
       fun main(args: Array<String>) {
           // 1.创建一个线程池，如果有客户端链接就创建一个线程与之通信
           val executorService = Executors.newCachedThreadPool()
           // 2.创建ServerSocket
           val serverSocket = ServerSocket(9999)
           println("服务器已启动")
           while (true) {
               // 3.监听客户端
               val socket = serverSocket.accept()
               println("有客户端链接")
               executorService.execute { handle(socket) }
           }
       }
   
       private fun handle(socket: Socket) {
           try {
               println("线程ID:" + Thread.currentThread().id + ",线程名称：" + Thread.currentThread().name)
               // 从连接中取出输入流
               val inputStream = socket.getInputStream()
               val b = ByteArray(1024)
               val read = inputStream.read(b)
               println("客户端发过来的消息：" + String(b, 0, read))
   
               // 链接中取出输出流并回话
               val outputStream = socket.getOutputStream()
               outputStream.write("没有".toByteArray())
           } catch (e: Exception) {
               e.printStackTrace()
           } finally {
               try {
                   socket.close()
               } catch (e: IOException) {
                   e.printStackTrace()
               }
           }
       }
   }
   ```

   </code-block>

   <code-block title="Java">

   ```java
   /**
    * 服务端
    *
    * @name: ServerDemo
    * @author: terwer
    * @date: 2022-04-17 14:20
    **/
   public class ServerDemo {
       public static void main(String[] args) throws IOException {
           // 1.创建一个线程池，如果有客户端链接就创建一个线程与之通信
           ExecutorService executorService = Executors.newCachedThreadPool();
           // 2.创建ServerSocket
           ServerSocket serverSocket = new ServerSocket(9999);
           System.out.println("服务器已启动");
           while (true) {
               // 3.监听客户端
               Socket socket = serverSocket.accept();
               System.out.println("有客户端链接");
               executorService.execute(new Runnable() {
                   @Override
                   public void run() {
                       handle(socket);
                   }
               });
           }
       }
   
       private static void handle(Socket socket) {
           try {
               System.out.println("线程ID:" + Thread.currentThread().getId() + ",线程名称：" + Thread.currentThread().getName());
               // 从连接中取出输入流
               InputStream inputStream = socket.getInputStream();
               byte[] b = new byte[1024];
               int read = inputStream.read(b);
               System.out.println("客户端" + new String(b, 0, read));
   
               // 链接中取出输出流并回话
               OutputStream outputStream = socket.getOutputStream();
               outputStream.write("没有".getBytes());
           } catch (Exception e) {
               e.printStackTrace();
           } finally {
               try {
                   socket.close();
               } catch (IOException e) {
                   e.printStackTrace();
               }
           }
       }
   }
   ```

   </code-block>

   <code-block title="Jython">

   ```python
   # -*- coding: utf-8 -*-
   
   from java.util.concurrent import Executors
   from java.net import ServerSocket
   from java.lang import String
   
   import jarray
   import sys
   
   # Jython版socket服务端
   #
   # @name: ServerDemo
   # @author: terwer
   # @date: 2022-05-09 15:48
   class ServerDemo(object):
   
       @classmethod
       def main(self, args):
           executorService = Executors.newCachedThreadPool()
           serverSocket = ServerSocket(9999)
           print("server is running")
           while True:
               socket = serverSocket.accept()
               # lambda <<argument(s)>> : <<function body>>
               # name_combo = lambda first, last: first + ' ' + last
               # name_combo('Jim','Baker')
               runnable_lambda_fun = lambda: self.handle(socket)
               executorService.execute(runnable_lambda_fun)
   
       @classmethod
       def handle(self, socket):
           try:
               print("receiced socket here=>")
               print(socket)
   
               inputStream = socket.getInputStream()
               b = jarray.zeros(1024, "b")
               read = inputStream.read(b)
               in_str = String(b, 0, read)
               print("receice msg from client=>")
               print(in_str)
   
               outputStream = socket.getOutputStream()
               out_bytes = map(ord, "msg from jython socket server")
               outputStream.write(out_bytes)
           except Exception as e:
               print("An error occured:")
               print(e)
           finally:
               try:
                   socket.close()
               except IOError as e:
                   print("An error occured:")
                   print(e)
   
   if __name__ == "__main__":
       ServerDemo.main(sys.argv)
   ```

   </code-block>

   <code-block title="JRuby">

   ```ruby
   require 'java'
   
   java_import 'java.util.concurrent.Executors'
   java_import 'java.net.ServerSocket'
   java_import 'java.net.SocketInputStream'
   java_import 'java.lang.Byte'
   
   # JRuby版socket服务端
   #
   # https://github.com/jruby/jruby/wiki/JRuby-Reference#Arrays
   #
   # @name: ServerDemo
   # @author: terwer
   # @date: 2022-05-09 21:04
   class ServerDemo
     def self.main()
       executorService = Executors.newCachedThreadPool()
       serverSocket = ServerSocket.new(9999)
       puts("jbury server is running...")
       while (true)
         socket = serverSocket.accept()
         runnable_lambda_fun = -> { self.handle(socket) }
         executorService.execute(runnable_lambda_fun)
       end
     end
   
     def self.handle(socket)
       begin
         print("receiced socket here=>")
         puts(socket)
         inputStream = socket.getInputStream()
         b = Java::byte[1024].new
         read = inputStream.read(b)
         puts "received msg from client=> #{b}"
   
         outputStream = socket.getOutputStream()
         out_bytes = "server msg send from jruby".to_java_bytes
         outputStream.write(out_bytes)
       rescue => e
         socket.close()
         puts "Exception Occurred #{e.class}. Message: #{e.message}. Backtrace:  \n #{e.backtrace.join("\n")}"
         Rails.logger.error "Exception Occurred #{e.class}. Message: #{e.message}. Backtrace:  \n #{e.backtrace.join("\n")}"
       end
     end
   end
   
   ServerDemo.main()
   ```

   </code-block>

   <code-block title="Scala">

   ````scala
   /**
    * 服务端
    *
    * @name: ServerDemo
    * @author: terwer
    * @date: 2022-05-09 14:20
    * */
   object ServerDemo {
     @throws[IOException]
     def main(args: Array[String]) = { // 1.创建一个线程池，如果有客户端链接就创建一个线程与之通信
       val executorService = Executors.newCachedThreadPool
       // 2.创建ServerSocket
       val serverSocket = new ServerSocket(9999)
       System.out.println("服务器已启动")
       while ( {
         true
       }) { // 3.监听客户端
         val socket = serverSocket.accept
         System.out.println("有客户端链接")
         executorService.execute(() => handle(socket))
       }
     }
   
     private def handle(socket: Socket) = try {
       System.out.println("线程ID:" + Thread.currentThread.getId + ",线程名称：" + Thread.currentThread.getName)
       // 从连接中取出输入流
       val inputStream = socket.getInputStream
       val b = new Array[Byte](1024)
       val read = inputStream.read(b)
       System.out.println("客户端发过来的消息：" + new String(b, 0, read))
       // 链接中取出输出流并回话
       val outputStream = socket.getOutputStream
       outputStream.write("没有".getBytes)
     } catch {
       case e: Exception =>
         e.printStackTrace()
     } finally try socket.close()
     catch {
       case e: IOException =>
         e.printStackTrace()
     }
   }
   ````

   </code-block>

   <code-block title="Groovy">

   ```groovy
   /**
    * 服务端
    *
    * @name: ServerDemo
    * @author: terwer
    * @date: 2022-05-09 14:20
    * */
   class ServerDemo {
       static void main(String[] args) throws IOException {
           // 1.创建一个线程池，如果有客户端链接就创建一个线程与之通信
           ExecutorService executorService = Executors.newCachedThreadPool()
           // 2.创建ServerSocket
           ServerSocket serverSocket = new ServerSocket(9999)
           System.out.println('服务器已启动')
           while (true) {
               // 3.监听客户端
               Socket socket = serverSocket.accept()
               System.out.println('有客户端链接')
               executorService.execute(() -> handle(socket))
           }
       }
   
       private static void handle(Socket socket) {
           try {
               System.out.println('线程ID:' + Thread.currentThread().id + ',线程名称：' + Thread.currentThread().name)
               // 从连接中取出输入流
               InputStream inputStream = socket.inputStream
               byte[] b = new byte[1024]
               int read = inputStream.read(b)
               System.out.println('客户端发过来的消息：' + new String(b, 0, read))
   
               // 链接中取出输出流并回话
               OutputStream outputStream = socket.outputStream
               outputStream.write('没有'.bytes)
           } catch (Exception e) {
               e.printStackTrace()
           } finally {
               try {
                   socket.close()
               } catch (IOException e) {
                   e.printStackTrace()
               }
           }
       }
   }
   ```

   </code-block>

   <code-block title="PHP">

   ```php
   <?php
   
   namespace com\terwergreen\php;
   
   /**
    * 服务端
    *
    * @name: ServerDemo
    * @author: terwer
    * @date: 2022-05-10 14:20
    **/
   class ServerDemo {
       public static function main($args) {
           $addr = "127.0.0.1";
           $port = 9999;
   
           // 创建server_socket
           $server_socket = socket_create(AF_INET, SOCK_STREAM, 0);
           // 绑定端口
           socket_bind($server_socket, $addr, $port);
           // 监听
           socket_listen($server_socket);
           echo "php版socket服务器启动成功\n";
   
           while (true) {
               $socket = socket_accept($server_socket);
   
               self::handle($socket);
           }
   
       }
   
       public static function handle($socket) {
           echo "处理客户端连接\n";
   
           $msg = socket_read($socket, 1024, PHP_BINARY_READ);
           echo "来自客户端的消息:$msg";
   
           $out_msg = "这是php版socket服务器发送过来的消息";
           socket_write($socket, $out_msg);
   
           socket_close($socket);
       }
   }
   
   $args = [];
   ServerDemo::main($args);
   ```

   </code-block>

   <code-block title="GO">

   ```go
   package main
   
   import (
   	"bytes"
   	"fmt"
   	"net"
   )
   
   /*
   * 服务端
   *
   * @name: ServerDemo
   * @author: terwer
   * @date: 2022-05-09 23:14
   **/
   func main() {
   	listen, _ := net.Listen("tcp", ":9999")
   	fmt.Println("go的socket服务器已启动")
   
   	for true {
   		conn, _ := listen.Accept()
   		handle(conn)
   	}
   }
   
   func handle(conn net.Conn) {
   	fmt.Println("处理客户端连接")
   
   	// 收消息
   	b := make([]byte, 1024)
   	read, err := conn.Read(b)
   	if err != nil {
   		return
   	}
   	var dataBuffer bytes.Buffer
   	dataBuffer.Write(b[:read])
   	fmt.Println("接收到来自客户端的消息:")
   	fmt.Print(dataBuffer.String())
   
   	// 发消息
   	var str string = "这是来着go的socket服务端发过来的消息"
   	var outBytes []byte = []byte(str)
   	conn.Write(outBytes)
   
   	// 关闭链接
   	conn.Close()
   }
   ```

   </code-block>

   <code-block title="C++">

   ```cpp
   #include <iostream>
   #include <sys/socket.h>
   #include <netinet/in.h>
   #include <stdio.h>
   #include <stdlib.h>
   #include <unistd.h>
   #include <string.h>
   #include <time.h>
   
   int main() {
       int serv_sock = 0, sock = 0;
       struct sockaddr_in serv_addr;
   
       char sendBuff[2015];
       time_t ticks;
   
       // 创建socket
       serv_sock = socket(AF_INET, SOCK_STREAM, 0);
       if (serv_sock < 0) {
           std::cout << "创建socket失败";
           exit(1);
       }
       memset(&serv_addr, '0', sizeof(serv_addr));
       memset(sendBuff, '0', sizeof(sendBuff));
   
       serv_addr.sin_family = AF_INET;
       serv_addr.sin_addr.s_addr = htonl(INADDR_ANY);// htonl(inet_addr("127.0.0.1"));// 两种效一样
       serv_addr.sin_port = htons(9999);
   
       // 绑定ip与端口
       bind(serv_sock, (struct sockaddr *) &serv_addr, sizeof(serv_addr));
   
       // 开启监听
       listen(serv_sock, 10);
   
       std::cout << "C++版socket服务器已启动!" << std::endl;
   
       while (true) {
           try {
               // 接收消息
               sock = accept(serv_sock, (sockaddr *) NULL, NULL);
   
               // 发送消息
               snprintf(sendBuff, sizeof(sendBuff), "这是从C++版的socket服务器发送过来的消息:%.24s\r\n", ctime(&ticks));
               write(sock, sendBuff, strlen(sendBuff));
   
               // 关闭
               // close(server_socket);
               close(sock);
   
               sleep(1);
           } catch (...) {
               std::cout << "服务端异常";
               break;
           }
       }
   }
   ```

   </code-block>

   <code-block title="C">

   ```c
   #include <stdio.h>
   #include <sys/types.h>
   #include <sys/socket.h>
   #include <stdlib.h>
   #include <string.h>
   #include <netinet/in.h>
   #include <stdbool.h>
   #include <time.h>
   #include <unistd.h>
   
   int main() {
       int serv_sock = 0, sock = 0;
       struct sockaddr_in serv_addr;
   
       char sendBuff[2015];
       time_t ticks;
   
       // 创建socket
       serv_sock = socket(AF_INET, SOCK_STREAM, 0);
       if (serv_sock < 0) {
           exit(1);
       }
       memset(&serv_addr, '0', sizeof(serv_addr));
       memset(sendBuff, '0', sizeof(sendBuff));
   
       serv_addr.sin_family = AF_INET;
       // serv_addr.sin_addr.s_addr = INADDR_ANY;
       serv_addr.sin_addr.s_addr = htonl(INADDR_ANY);
       // serv_addr.sin_port = 9999;
       serv_addr.sin_port = htons(9999);
   
       // 绑定ip与端口
       bind(serv_sock, (struct sockaddr *) &serv_addr, sizeof(serv_addr));
   
       // 开启监听
       listen(serv_sock, 10);
       printf("C语言版的socket服务器启动成功\n");
   
       while (true) {
           // 接收消息
           sock = accept(serv_sock, (struct sockaddr *) NULL, NULL);
   
           // 发送消息
           snprintf(sendBuff, sizeof(sendBuff), "这是从C语言版的socket服务器发送过来的消息:%.24s\r\n", ctime(&ticks));
           write(sock, sendBuff, strlen(sendBuff));
   
           // 关闭
           // close(server_socket);
           close(sock);
   
           sleep(1);
       }
   }
   ```

   </code-block>

   <code-block title="C#">

   ```csharp
   using System.Net;
   using System.Net.Sockets;
   using System.Text;
   
   namespace SocketDemo;
   
   /**
    * https://docs.microsoft.com/en-us/dotnet/framework/network-programming/asynchronous-server-socket-example
    */
   public class ServerDemo{
       public static void Main(string[] args){
           var serverSocket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
           serverSocket.Bind(new IPEndPoint(IpToInt("127.0.0.1"), 9999));
           serverSocket.Listen();
           Console.WriteLine("C#版Socket服务端已启动");
           while (true)
           {
               Socket socket = serverSocket.Accept();
               ThreadPool.QueueUserWorkItem((state => { DoHandle(socket); }));
           }
       }
   
       private static void DoHandle(Socket socket){
           Console.WriteLine("处理客户端请求");
           Console.WriteLine(socket);
   
           byte[] in_bytes = new byte[1024];
           int len = socket.Receive(in_bytes);
           var in_str = Encoding.UTF8.GetString(in_bytes, 0, len);
           Console.WriteLine("接收到来着客户端的数据=>" + in_str);
   
           byte[] out_bytes = Encoding.UTF8.GetBytes("从C#服务端发送给客户端的数据");
           socket.Send(out_bytes);
       }
   
       private static uint IpToInt(string addr){
           return BitConverter.ToUInt32(IPAddress.Parse(addr).GetAddressBytes(), 0);
       }
   }
   ```

   </code-block>

   <code-block title="F#">

   ```fsharp
   namespace global
   
   open System.Net
   open System.Net.Sockets
   open System.Text
   namespace SocketDemo
   
   open System
   open System.Threading
   
   type ServerDemo() =
       static member Main(args: string []) =
           let mutable serverSocket =
               new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp)
   
           let mutable addr = IPAddress.Parse("127.0.0.1")
           let mutable endPoint = new IPEndPoint(addr, 9999)
           serverSocket.Bind(endPoint)
           serverSocket.Listen()
           Console.WriteLine("F#版Socket服务端已启动")
   
           while true do
               let mutable (socket: Socket) = serverSocket.Accept()
   
               ThreadPool.QueueUserWorkItem(fun state -> ServerDemo.DoHandle(socket))
               |> ignore
   
           ()
   
       static member private DoHandle(socket: Socket) =
           Console.WriteLine("处理客户端请求")
           Console.WriteLine(socket)
           let mutable (in_bytes: byte []) = Array.zeroCreate 1024
           let mutable (len: int) = socket.Receive(in_bytes)
   
           let mutable in_str =
               Encoding.UTF8.GetString(in_bytes, 0, len)
   
           Console.WriteLine("接收到来着客户端的数据=>" + in_str)
   
           let mutable (out_bytes: byte []) =
               Encoding.UTF8.GetBytes("从F#服务端发送给客户端的数据")
   
           socket.Send(out_bytes) |> ignore
   
   module ServerDemo__run =
       [<EntryPoint>]
       let main args =
           ServerDemo.Main(args)
           0
   ```

   </code-block>

   <code-block title="GraalVMJS(Beta)">

   ```javascript
   // https://github.com/oracle/graaljs/blob/master/docs/user/FAQ.md
   
   const Executors = Java.type("java.util.concurrent.Executors")
   const ServerSocket = Java.type("java.net.ServerSocket")
   const Byte = Java.type("java.lang.Byte")
   const String = Java.type("java.lang.String")
   
   const serverSocket = new ServerSocket(9999)
   console.log("Node.js版socket服务器已启动.")
   
   while (true) {
       const socket = serverSocket.accept()
       handle(socket)
   }
   
   function handle(socket) {
       try {
           console.log("处理客户端链接")
   
           const inputStream = socket.getInputStream()
           var b = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024)
           const read = inputStream.read(b)
           const in_bytes = new String(b, 0, read)
           console.log("接收到来着客户端的消息", in_bytes)
   
           let outputSream = socket.getOutputStream()
           // TODO:中文乱码，NodeJS的Bug，https://juejin.cn/post/6981797254705184798
           const out_bytes = Buffer.from("msg from graaljs socket server", "utf8")
           outputSream.write(out_bytes)
       } catch (e) {
           console.log("系统异常:", e)
       } finally {
           if (null != socket) {
               socket.close()
           }
       }
   }
   ```

   </code-block>

   <code-block title="Clojure(Beta)">

   ```clojure
   (ns com.terwergreen.clojure.ServerDemo
     (:import java.util.concurrent.Executors)
     (:import java.net.ServerSocket)
     )
   
   ;定义main函数
   (defn -main
     "main"
     []
     ;创建线程池
     (def executorService (Executors/newCachedThreadPool))
     ;(println executorService)
   
     ;socket通信
     (def serverSocket (new ServerSocket 9999))
     (println serverSocket)
   
     ;启动服务器
     (println "clojore socker server is runnning...")
     ;(.println (System/out) "clojore socker server is runnning...")
   
     (while true
       (def socket (.accept serverSocket))
   
       ;Runnable线程
       (def run_fun (fn [socket] (println "message")))
       ;放入线程池
       ;(def call_run_fun (run_fun socket))
       ;TODO:lambda传参有问题
       (.execute executorService call_run_fun)
   
       )
   
     )
   
   ;(defn handle [socket] (print "Hello"))
   ```

   </code-block>

   </code-group>

2. 客户端代码

   ```java
   /**
    * 客户端
    *
    * @name: ClientDemo
    * @author: terwer
    * @date: 2022-04-17 15:30
    **/
   public class ClientDemo {
       public static void main(String[] args) throws IOException {
           while (true) {
               // 1.创建客户端socket
               Socket s = new Socket("127.0.0.1", 9999);
               // 2.从连接中获取输出流并发送消息
               OutputStream os = s.getOutputStream();
               System.out.println("请输入:");
               Scanner sc = new Scanner(System.in);
               String msg = sc.nextLine();
               os.write(msg.getBytes());
   
               // 3.从连接中取出输入流并接受会话
               InputStream is = s.getInputStream();
               byte[] b = new byte[1024];
               // 下面写法错了
               // int read = is.read();
               // 应该是
               int read = is.read(b);
               System.out.println("老板说:" + new String(b, 0, read).trim());
   
               s.close();
           }
       }
   }
   ```

参考：

[https://www.thegeekstuff.com/2011/12/c-socket-programming/](https://www.thegeekstuff.com/2011/12/c-socket-programming/)

### IO模型

#### IO模型说明

1. 简单理解：用什么样的通道进行数据的发送和接收。在很大程度上决定了程序通信的性能。

2. Java支持三种网络编程模型I/O模式：BIO（同步阻塞）、NIO（同步非阻塞）、AIO（异步非阻塞）

   ##### 阻塞与非阻塞

   指的是网络IO的线程是否处于阻塞或者等待状态

   线程访问资源，该资源是否准备就绪的一种处理方式

   ![image-20220417214737992](https://img1.terwer.space/image-20220417214737992.png)

   ##### 同步和异步

   指的是数据的请求方式，同步和异步是请求数据的一种方式。

   ![image-20220417215010935](https://img1.terwer.space/image-20220417215010935.png)

#### BIO（同步阻塞）

Java BIO就是传统的socket编程

BIO（blocking IO）：同步阻塞，服务器实现方式为一个链接一个线程，即客户端有一个链接时，服务端就要启动一个线程进行处理，如果这个链接不作任何事情，会造成不必要的线程开销，可以通过线程池改善，实现多个客户端链接服务器。

##### 工作机制

![image-20220417230159590](https://img1.terwer.space/image-20220417230159590.png)

生活中的例子：

![image-20220417230242089](https://img1.terwer.space/image-20220417230242089.png)

##### BIO的问题分析

1. 每个请求都要创建独立的线程，与对应的客户端进行read，业务处理，数据write
2. 并发量大的时候，需要创建大量的线程来处理链接，系统资源占用较大
3. 链接建立后，如果当前线程没有数据可读，线程就阻塞在read上，造成线程资源浪费

#### NIO（同步非阻塞）

同步非阻塞，服务器实现模式为一个线程处理多个请求（链接），客户端发送的链接请求会注册到多路复用器上，多路复用器轮训到链接有IO请求就进行处理。

![image-20220418134554952](https://img1.terwer.space/image-20220418134554952.png)

生活中的例子：

![image-20220418134644973](https://img1.terwer.space/image-20220418134644973.png)

#### AIO（异步非阻塞）

AIO引入了异步通道的概念，采用了Proactor模式，简化了程序编写，有效的请求才启动线程。

他的特点是先由操作系统完成后才通知服务端启动线程去处理，一般适用于连接数较多且连接时间较长的应用。

> Proactor模式是一个消息异步通知的模式，Proactor通知的不是就绪事件，而是操作完成事件，这也是操作系统异步IO的主要模型。

[https://www.zhihu.com/question/26943938](https://www.zhihu.com/question/26943938)

生活中的例子：

![image-20220418135022363](https://img1.terwer.space/image-20220418135022363.png)

#### BIO、NIO、AIO的适用场景分析

1. BIO（同步阻塞模式）适用于连接数比较小，且固定的架构。对服务器资源的要求比较高，并发局限于应用中，jdk1.4以前的唯一选择，代码容易理解。
2. NIO（同步非阻塞模式）适用于链接数目多且链接比较短（轻操作）的架构，比如聊天服务器、弹幕系统、服务器之间的通讯等。编程比较复杂，jdk1.4开始支持。
3. AIO（异步非阻塞模式）适用于连接数目比较多并且连接时间比较长（重操作）的架构，比如相册服务器，充分调用OS参与并发操作。编程比较复杂，jdk1.7开始支持。