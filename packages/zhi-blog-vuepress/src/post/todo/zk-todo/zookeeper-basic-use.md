---
title: Zookeeper的基本使用
short_title: ''
description: ZNode 是 Zookeeper 中的最小数据单位。ZNode 可以挂在子 ZNode，最终形成了 ZNode 树，成为 ZNode Tree。ZNode
  采用了类似文件系统的层级树状结构进行管理。
date: 2022-06-03 23:56:29
category:
  - ZK-TODO
  - TODO
tag:
  - framework
  - zk
  - zookeeper
article: true
timeline: false
---
# Zookeeper 的基本使用

> 文章更新历史
>
> 2022/06/03 feat:初稿。
>

## Zookeeper 系统模型

### Zookeeper 的数据节点 ZNode

Zookeeper 中，保存数据信息的节点，成为 ZNode。

ZNode 是 Zookeeper 中的最小数据单位。ZNode 可以挂在子 ZNode，最终形成了 ZNode 树，成为 ZNode Tree。ZNode 采用了类似文件系统的层级树状结构进行管理。

![image-20220604223814769](https://img1.terwer.space/20220604223819.png)

Zookeeper 的节点路径类似与 Unix 的文件系统，由/开头，可以在节点写入数据，也可以创建子节点。

### ZNode 的类型

Zookeeper 的节点类型可分为三大类

持久性节点（Persistent）

临时性节点（Ephemeral）

顺序性节点（Sequiental）

在开发中，通常生成四种节点类型：持久性节点、持久顺序节点、临时节点、临时顺序节点。不同的节点会有不同的声明周期。

**持久性节点**：是 Zookeeper 中最常见的节点类型，节点创建后会一直存在于服务器，直到删除操作主动删除。

**持久顺序节点**：有顺序的持久节点，节点和持久节点一样，只是有顺序。顺序特性的实质是在创建节点的时候，会在节点后面加上一个数字后缀，代表节点的顺序。

**临时节点**：会被自动清理掉的节点。生命周期和客户端会话绑定在一起，客户端会话结束，节点也会被删除。

与持久性节点不同，临时节点不能创建子节点。

**临时顺序节点**：有顺序的临时节点，和持久顺序节点相同，在创建的时候会在名字后面加上数字后缀。

### 事务 ID

事务具有 ACID 的特性：即原子性（Atomic）、一致性（Consistency）、隔离性（Isolation）和持久性（Durability）。

在 Zookeeper 中，事务是指能够改变服务器状态的操作，也称之为事务操作或者更新操作。

对于每个事务操作，Zookeeper 都会分配一个全局唯一事务 ID，称为 **ZXID**，通常是一个 64 位的数字。每一个 ZXID 对应一个事务操作，从 ZXID 可以间接识别 Zookeeper 处理更新操作请求的全局顺序。

### 使用客户端连接 Zookeeper

如果是 docker 版，先进入 shell

![image-20220702204837498](https://img1.terwer.space/20220702204843.png)。

连接 server

```bash
./zkCli.sh -server 127.0.0.1:2181
```

信息如下

```bash
root@zoo1:/apache-zookeeper-3.8.0-bin# cd bin
root@zoo1:/apache-zookeeper-3.8.0-bin/bin# ./zkCli.sh -server 127.0.0.1:2181
Connecting to 127.0.0.1:2181
2022-07-02 12:52:32,639 [myid:] - INFO  [main:o.a.z.Environment@98] - Client environment:zookeeper.version=3.8.0-5a02a05eddb59aee6ac762f7ea82e92a68eb9c0f, built on 2022-02-25 08:49 UTC
2022-07-02 12:52:32,641 [myid:] - INFO  [main:o.a.z.Environment@98] - Client environment:host.name=zoo1
2022-07-02 12:52:32,641 [myid:] - INFO  [main:o.a.z.Environment@98] - Client environment:java.version=11.0.15
2022-07-02 12:52:32,641 [myid:] - INFO  [main:o.a.z.Environment@98] - Client environment:java.vendor=Oracle Corporation
2022-07-02 12:52:32,641 [myid:] - INFO  [main:o.a.z.Environment@98] - Client environment:java.home=/usr/local/openjdk-11
2022-07-02 12:52:32,642 [myid:] - INFO  [main:o.a.z.Environment@98] - Client environment:java.class.path=/apache-zookeeper-3.8.0-bin/bin/../zookeeper-server/target/classes:/apache-zookeeper-3.8.0-bin/bin/../build/classes:/apache-zookeeper-3.8.0-bin/bin/../zookeeper-server/target/lib/*.jar:/apache-zookeeper-3.8.0-bin/bin/../build/lib/*.jar:/apache-zookeeper-3.8.0-bin/bin/../lib/zookeeper-prometheus-metrics-3.8.0.jar:/apache-zookeeper-3.8.0-bin/bin/../lib/zookeeper-jute-3.8.0.jar:/apache-zookeeper-3.8.0-bin/bin/../lib/zookeeper-3.8.0.jar:/apache-zookeeper-3.8.0-bin/bin/../lib/snappy-java-1.1.7.7.jar:/apache-zookeeper-3.8.0-bin/bin/../lib/slf4j-api-1.7.30.jar:/apache-zookeeper-3.8.0-bin/bin/../lib/simpleclient_servlet-0.9.0.jar:/apache-zookeeper-3.8.0-bin/bin/../lib/simpleclient_hotspot-0.9.0.jar:/apache-zookeeper-3.8.0-bin/bin/../lib/simpleclient_common-0.9.0.jar:/apache-zookeeper-3.8.0-bin/bin/../lib/simpleclient-0.9.0.jar:/apache-zookeeper-3.8.0-bin/bin/../lib/netty-transport-native-unix-common-4.1.73.Final.jar:/apache-zookeeper-3.8.0-bin/bin/../lib/netty-transport-native-epoll-4.1.73.Final.jar:/apache-zookeeper-3.8.0-bin/bin/../lib/netty-transport-classes-epoll-4.1.73.Final.jar:/apache-zookeeper-3.8.0-bin/bin/../lib/netty-transport-4.1.73.Final.jar:/apache-zookeeper-3.8.0-bin/bin/../lib/netty-tcnative-classes-2.0.48.Final.jar:/apache-zookeeper-3.8.0-bin/bin/../lib/netty-tcnative-2.0.48.Final.jar:/apache-zookeeper-3.8.0-bin/bin/../lib/netty-resolver-4.1.73.Final.jar:/apache-zookeeper-3.8.0-bin/bin/../lib/netty-handler-4.1.73.Final.jar:/apache-zookeeper-3.8.0-bin/bin/../lib/netty-common-4.1.73.Final.jar:/apache-zookeeper-3.8.0-bin/bin/../lib/netty-codec-4.1.73.Final.jar:/apache-zookeeper-3.8.0-bin/bin/../lib/netty-buffer-4.1.73.Final.jar:/apache-zookeeper-3.8.0-bin/bin/../lib/metrics-core-4.1.12.1.jar:/apache-zookeeper-3.8.0-bin/bin/../lib/logback-core-1.2.10.jar:/apache-zookeeper-3.8.0-bin/bin/../lib/logback-classic-1.2.10.jar:/apache-zookeeper-3.8.0-bin/bin/../lib/jline-2.14.6.jar:/apache-zookeeper-3.8.0-bin/bin/../lib/jetty-util-ajax-9.4.43.v20210629.jar:/apache-zookeeper-3.8.0-bin/bin/../lib/jetty-util-9.4.43.v20210629.jar:/apache-zookeeper-3.8.0-bin/bin/../lib/jetty-servlet-9.4.43.v20210629.jar:/apache-zookeeper-3.8.0-bin/bin/../lib/jetty-server-9.4.43.v20210629.jar:/apache-zookeeper-3.8.0-bin/bin/../lib/jetty-security-9.4.43.v20210629.jar:/apache-zookeeper-3.8.0-bin/bin/../lib/jetty-io-9.4.43.v20210629.jar:/apache-zookeeper-3.8.0-bin/bin/../lib/jetty-http-9.4.43.v20210629.jar:/apache-zookeeper-3.8.0-bin/bin/../lib/javax.servlet-api-3.1.0.jar:/apache-zookeeper-3.8.0-bin/bin/../lib/jackson-databind-2.13.1.jar:/apache-zookeeper-3.8.0-bin/bin/../lib/jackson-core-2.13.1.jar:/apache-zookeeper-3.8.0-bin/bin/../lib/jackson-annotations-2.13.1.jar:/apache-zookeeper-3.8.0-bin/bin/../lib/commons-io-2.11.0.jar:/apache-zookeeper-3.8.0-bin/bin/../lib/commons-cli-1.4.jar:/apache-zookeeper-3.8.0-bin/bin/../lib/audience-annotations-0.12.0.jar:/apache-zookeeper-3.8.0-bin/bin/../zookeeper-*.jar:/apache-zookeeper-3.8.0-bin/bin/../zookeeper-server/src/main/resources/lib/*.jar:/conf:
2022-07-02 12:52:32,642 [myid:] - INFO  [main:o.a.z.Environment@98] - Client environment:java.library.path=/usr/java/packages/lib:/usr/lib64:/lib64:/lib:/usr/lib
2022-07-02 12:52:32,642 [myid:] - INFO  [main:o.a.z.Environment@98] - Client environment:java.io.tmpdir=/tmp
2022-07-02 12:52:32,642 [myid:] - INFO  [main:o.a.z.Environment@98] - Client environment:java.compiler=<NA>
2022-07-02 12:52:32,642 [myid:] - INFO  [main:o.a.z.Environment@98] - Client environment:os.name=Linux
2022-07-02 12:52:32,643 [myid:] - INFO  [main:o.a.z.Environment@98] - Client environment:os.arch=amd64
2022-07-02 12:52:32,643 [myid:] - INFO  [main:o.a.z.Environment@98] - Client environment:os.version=5.10.104-linuxkit
2022-07-02 12:52:32,643 [myid:] - INFO  [main:o.a.z.Environment@98] - Client environment:user.name=root
2022-07-02 12:52:32,643 [myid:] - INFO  [main:o.a.z.Environment@98] - Client environment:user.home=/root
2022-07-02 12:52:32,643 [myid:] - INFO  [main:o.a.z.Environment@98] - Client environment:user.dir=/apache-zookeeper-3.8.0-bin/bin
2022-07-02 12:52:32,643 [myid:] - INFO  [main:o.a.z.Environment@98] - Client environment:os.memory.free=116MB
2022-07-02 12:52:32,643 [myid:] - INFO  [main:o.a.z.Environment@98] - Client environment:os.memory.max=256MB
2022-07-02 12:52:32,644 [myid:] - INFO  [main:o.a.z.Environment@98] - Client environment:os.memory.total=128MB
2022-07-02 12:52:32,646 [myid:] - INFO  [main:o.a.z.ZooKeeper@637] - Initiating client connection, connectString=127.0.0.1:2181 sessionTimeout=30000 watcher=org.apache.zookeeper.ZooKeeperMain$MyWatcher@6ec8211c
2022-07-02 12:52:32,651 [myid:] - INFO  [main:o.a.z.c.X509Util@77] - Setting -D jdk.tls.rejectClientInitiatedRenegotiation=true to disable client-initiated TLS renegotiation
2022-07-02 12:52:32,656 [myid:] - INFO  [main:o.a.z.ClientCnxnSocket@239] - jute.maxbuffer value is 1048575 Bytes
2022-07-02 12:52:32,662 [myid:] - INFO  [main:o.a.z.ClientCnxn@1732] - zookeeper.request.timeout value is 0. feature enabled=false
Welcome to ZooKeeper!
2022-07-02 12:52:32,675 [myid:127.0.0.1:2181] - INFO  [main-SendThread(127.0.0.1:2181):o.a.z.ClientCnxn$SendThread@1171] - Opening socket connection to server localhost/127.0.0.1:2181.
2022-07-02 12:52:32,675 [myid:127.0.0.1:2181] - INFO  [main-SendThread(127.0.0.1:2181):o.a.z.ClientCnxn$SendThread@1173] - SASL config status: Will not attempt to authenticate using SASL (unknown error)
2022-07-02 12:52:32,686 [myid:127.0.0.1:2181] - INFO  [main-SendThread(127.0.0.1:2181):o.a.z.ClientCnxn$SendThread@1005] - Socket connection established, initiating session, client: /127.0.0.1:49668, server: localhost/127.0.0.1:2181
JLine support is enabled
2022-07-02 12:52:32,724 [myid:127.0.0.1:2181] - INFO  [main-SendThread(127.0.0.1:2181):o.a.z.ClientCnxn$SendThread@1444] - Session establishment complete on server localhost/127.0.0.1:2181, session id = 0x100004a571a0000, negotiated timeout = 30000

WATCHER::

WatchedEvent state:SyncConnected type:None path:null
[zk: 127.0.0.1:2181(CONNECTED) 0] 
```

查看所有节点

```bash
ls /
```

![image-20220702205359400](https://img1.terwer.space/20220702205359.png)

查看某个节点

```bash
ls /zookeeper
```

### ZNode 的状态信息

使用 `ls -s /zookeeper` 代替 `ls2`

新版本已经没有 `ls2` 了

```bash
ls -s /zookeeper
```

![image-20220702205637988](https://img1.terwer.space/20220702205638.png)

参考：

[https://blog.csdn.net/kuifanshu3027/article/details/106452692](https://blog.csdn.net/kuifanshu3027/article/details/106452692)

整个 ZNode 节点包括两部分信息：节点数据内容和节点状态信息。

qoute 是数据内容，其他的属于状态信息。具体含义如下：

```bash
cZxid 指的是 Create ZXID ，表示节点被创建时的事务ID。
ctime 指的是 Create Time ，表示节点创建时间。
mZxid 指的是 Modified ZXID ，表示事务最后一次被修改时的事务ID。
mtime 指的是 Modified Time， 表示节点最后一次被修改的世间。
pZxid 表示该节点的子节点列表最后一次被修改时的事务ID。只有子节点列表更新才会更新 pZxid，子节点内容变更不会更新。
cversion 表示子节点的版本号。
dataVersion 表示内容的版本号。
aclVersion 表示acl的版本
ephemeralOwner 表示创建该临时节点时的会话 sessionID，如果是持久性节点，那么值为0。
dataLength 表示数据长度。
numChildren 表示直系子节点数目
```

### Water-数据变更通知

### ACL-保障数据的安全

## Zookeeper 命令行操作

## Zookeeper 的 api 实用

## Zookeeper 开业客户端