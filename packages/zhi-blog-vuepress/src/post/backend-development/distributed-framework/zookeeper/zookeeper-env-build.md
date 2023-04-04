---
title: Zookeeper 的环境搭建
short_title: ''
description: Zookeeper 的环境搭建。
date: 2022-05-25 15:22:22
category:
  - 分布式框架
  - 后端开发
  - Zookeeper
tag:
  - zookeeper
article: true
timeline: false
---
> **文章更新历史**
>
> 2022/05/25 feat:初稿。

# Zookeeper 的环境搭建

Zookeeper 的安装方式有三种：单机模式、集群模式和伪集群模式。

- 单机模式：Zookeeper 只运行在一台服务器上，适合测试环境。
- 集群模式：Zookeeper 运行于一个集群上，适合生产环境，这个计算机集群被称为一个“集合体”。
- 伪集群模式：就是在一台服务器上运行多个 Zookeeper 实例。

## 单机模式搭建

### 普通搭建

zookeeper 官网

[https://zookeeper.apache.org/](https://zookeeper.apache.org/)

下载 Zookeeper，最新稳定版是3.7.1

```bash
cd /app
wget https://dlcdn.apache.org/zookeeper/zookeeper-3.7.1/apache-zookeeper-3.7.1-bin.tar.gz
```

解压

```bash
tar -zxvf apache-zookeeper-3.7.1-bin.tar.gz
```

运行

```bash
cd apache-zookeeper-3.7.1-bin
mkdir data

cd conf
cp zoo_sample.cfg zoo.cfg
vim zoo.cfg
```

修改配置如下

```ini
# the directory where the snapshot is stored.
# do not use /tmp for storage, /tmp here is just 
# example sakes.
dataDir=/app/apache-zookeeper-3.7.1-bin/data
# the port at which the clients will connect
clientPort=2181
```

启动

```bash
cd ..
cd bin
./zkServer.sh start
```

效果

````bash
➜  bin ./zkServer.sh start
ZooKeeper JMX enabled by default
Using config: /app/apache-zookeeper-3.7.1-bin/bin/../conf/zoo.cfg
Starting zookeeper ... STARTED
````

查看状态

```bash
./zkServer.sh status
```

```bash
➜  bin ./zkServer.sh status
ZooKeeper JMX enabled by default
Using config: /app/apache-zookeeper-3.7.1-bin/bin/../conf/zoo.cfg
Client port found: 2181. Client address: localhost. Client SSL: false.
Mode: standalone
```

### docker 方式搭建

官方镜像地址：

[https://hub.docker.com/_/zookeeper](https://hub.docker.com/_/zookeeper)

Dockerfile

```dockerfile
FROM zookeeper:3.8
```

docker-compose.yml

```yaml
version: '3'

services:
  zoo1:
    image: terwer/zookeeper
    container_name: portable-zookeeper
    build:
      context: .
      dockerfile: Dockerfile
    restart: always
    hostname: zoo1
    ports:
      - 2181:2181
    environment:
      ZOO_MY_ID: 1
      ZOO_SERVERS: server.1=zoo1:2888:3888;2181
```

## 伪集群模式搭建

  伪集群模式是在同一机器上运行多个 Zookeeper 实例来模拟多个 Zookeeper 集群的情况，操作简单，便于开发和测试阶段调试。

  伪集群模式需要注意的问题：

  1、要保证端口不能冲突。

  2、dataDir 的路径不能相同。

  3、dataDir 需要创建 myid 文件夹来标识对应的 Zookeeper 服务器实例。

  - clientPort 端口
  
    监听的端口要独立
  
  - dataDir 和 dataLogDir
  
    数据文件和日志文件要分别存储
  
  - Server.X 和 myid

  Server.X 中的 X 对应 data/myid 中的 id 。

### 下载

参考普通模式

```bash
cd /media/terwer/data/app
wget https://dlcdn.apache.org/zookeeper/zookeeper-3.7.1/apache-zookeeper-3.7.1-bin.tar.gz
```

### 解压，创建集群目录

```bash
mkdir zkcluster
```

```bash
tar -zxvf apache-zookeeper-3.7.1-bin.tar.gz -C /media/terwer/data/app/zkcluster
```

### 复制并改名

```bash
cd zkcluster
mv apache-zookeeper-3.7.1-bin zookeeper01
```

```bash
cp -r zookeeper01/ zookeeper02
cp -r zookeeper01/ zookeeper03
```

![image-20220601185111062](https://img1.terwer.space20220601185111.png)

### 分别在 zookeeper01 、zookeeper02 、zookeeper03 目录下创建 data 和 logs 目录

```bash
mkdir data
mkdir logs
```

### 修改配置文件名称

```bash
cd conf
cp zoo_sample.cfg zoo.cfg
```

### 修改每一个 Zookeeper 的 DataDir、DataLogDir 和 ClientPort，端口分别为2181、2182、2183

```properties
dataDir=/media/terwer/data/app/zkcluster/zookeeper01/data
dataLogDir=/media/terwer/data/app/zkcluster/zookeeper01/logs
clientPort=2181
```

```properties
dataDir=/media/terwer/data/app/zkcluster/zookeeper02/data
dataLogDir=/media/terwer/data/app/zkcluster/zookeeper02/logs
clientPort=2182
```

```properties
dataDir=/media/terwer/data/app/zkcluster/zookeeper03/data
dataLogDir=/media/terwer/data/app/zkcluster/zookeeper03/logs
clientPort=2183
```

### 配置集群

- 在每个集群的 data 目录下都新建一个 myid 文件，值分别为1、2、3

  ```bash
  cd data
  touch myid
  vim myid
  ```

- 在每个 Zookeeper 的 zoo.cfg 中配置访问端口和集群列表

  ```properties
  server.1=192.168.3.46:2181:2181
  server.2=192.168.3.46:2182:2182
  server.3=192.168.3.46:2183:2183
  # server.服务器 ID=服务器 IP 地址:服务器之间通信端口:服务器之间投票选举端口
  ```

### 启动集群

依次启动三个集群

```bash
cd bin
./zkServer.sh start
./zkServer.sh status
```

### 报错解决

#### 错误一

```bash
org.apache.zookeeper.server.quorum.QuorumPeerConfig$ConfigException: Client and election port must be different! Please update the configuration file on server.3
        at org.apache.zookeeper.server.quorum.QuorumPeer$QuorumServer.initializeWithAddressString(QuorumPeer.java:362)
        at org.apache.zookeeper.server.quorum.QuorumPeer$QuorumServer.<init>(QuorumPeer.java:279)
        at org.apache.zookeeper.server.quorum.QuorumPeer$QuorumServer.<init>(QuorumPeer.java:274)
        at org.apache.zookeeper.server.quorum.flexible.QuorumMaj.<init>(QuorumMaj.java:92)
        at org.apache.zookeeper.server.quorum.QuorumPeerConfig.createQuorumVerifier(QuorumPeerConfig.java:658)
        at org.apache.zookeeper.server.quorum.QuorumPeerConfig.parseDynamicConfig(QuorumPeerConfig.java:689)
        at org.apache.zookeeper.server.quorum.QuorumPeerConfig.setupQuorumPeerConfig(QuorumPeerConfig.java:663)
        at org.apache.zookeeper.server.quorum.QuorumPeerConfig.parseProperties(QuorumPeerConfig.java:491)
        at org.apache.zookeeper.server.quorum.QuorumPeerConfig.parse(QuorumPeerConfig.java:194)
        at org.apache.zookeeper.server.quorum.QuorumPeerMain.initializeAndRun(QuorumPeerMain.java:125)
        at org.apache.zookeeper.server.quorum.QuorumPeerMain.main(QuorumPeerMain.java:91)
Invalid config, exiting abnormally
2022-06-01 22:17:55,296 [myid:] - INFO  [main:ZKAuditProvider@42] - ZooKeeper audit is disabled.
2022-06-01 22:17:55,298 [myid:] - ERROR [main:ServiceUtils@48] - Exiting JVM with code 2
```

客户端端口和选举端口不能一样，换一下端口就行了。

```properties
server.1=192.168.3.46:2181:3181
server.2=192.168.3.46:2182:3182
server.3=192.168.3.46:2183:3183
```

#### 错误二

```
QuorumCnxManager$Listener@7631Exception while listening java.net.BindException
```

解决方法：在三个 zoo.cfg 中加入

```properties
quorumListenOnAllIPs=true
```

#### 错误三

```
Exception when following the leader java.io.EOFException
```

实际上，第一个问题没解决，服务端端口也不能和客户端一样。

```properties
server.1=192.168.3.46:2888:3888
server.2=192.168.3.46:2889:3889
server.3=192.168.3.46:2890:3890
```

### 查看效果

启动第一个之后

```bash
➜  bin ./zkServer.sh start 
ZooKeeper JMX enabled by default
Using config: /media/terwer/data/app/zkcluster/zookeeper01/bin/../conf/zoo.cfg
Starting zookeeper ... STARTED
➜  bin ./zkServer.sh status
ZooKeeper JMX enabled by default
Using config: /media/terwer/data/app/zkcluster/zookeeper01/bin/../conf/zoo.cfg
Client port found: 2181. Client address: localhost. Client SSL: false.
Error contacting service. It is probably not running.
```

启动第二个之后

```
➜  bin ./zkServer.sh start 
ZooKeeper JMX enabled by default
Using config: /media/terwer/data/app/zkcluster/zookeeper02/bin/../conf/zoo.cfg
Starting zookeeper ... STARTED
➜  bin ./zkServer.sh status
ZooKeeper JMX enabled by default
Using config: /media/terwer/data/app/zkcluster/zookeeper02/bin/../conf/zoo.cfg
Client port found: 2182. Client address: localhost. Client SSL: false.
Mode: leader
```

启动第三个节点之后

```
➜  bin ./zkServer.sh start 
ZooKeeper JMX enabled by default
Using config: /media/terwer/data/app/zkcluster/zookeeper03/bin/../conf/zoo.cfg
Starting zookeeper ... STARTED
➜  bin ./zkServer.sh status
ZooKeeper JMX enabled by default
Using config: /media/terwer/data/app/zkcluster/zookeeper03/bin/../conf/zoo.cfg
Client port found: 2183. Client address: localhost. Client SSL: false.
Mode: follower
```

## docker 版伪集群模式搭建

docker-compose.yml

```yaml
version: '3.1'

services:
  zoo1:
    image: zookeeper
    restart: "no"
    hostname: zoo1
    ports:
      - 2181:2181
    environment:
      ZOO_MY_ID: 1
      ZOO_SERVERS: server.1=zoo1:2888:3888;2181 server.2=zoo2:2888:3888;2181 server.3=zoo3:2888:3888;2181

  zoo2:
    image: zookeeper
    restart: "no"
    hostname: zoo2
    ports:
      - 2182:2181
    environment:
      ZOO_MY_ID: 2
      ZOO_SERVERS: server.1=zoo1:2888:3888;2181 server.2=zoo2:2888:3888;2181 server.3=zoo3:2888:3888;2181

  zoo3:
    image: zookeeper
    restart: "no"
    hostname: zoo3
    ports:
      - 2183:2181
    environment:
      ZOO_MY_ID: 3
      ZOO_SERVERS: server.1=zoo1:2888:3888;2181 server.2=zoo2:2888:3888;2181 server.3=zoo3:2888:3888;2181
```

检测

先 Attach Shell ，然后

```bash
/apache-zookeeper-3.8.0-bin/bin
/zkServer.sh status
```

结果

```bash
root@zoo3:/apache-zookeeper-3.8.0-bin/bin# ./zkServer.sh status
ZooKeeper JMX enabled by default
Using config: /conf/zoo.cfg
Client port found: 2181. Client address: localhost. Client SSL: false.
Mode: leader
```