---
title: 自定义RPC框架之基于Netty实现RPC框架
short_title: ''
description: Dubbo底层使用Netty作为网络通讯框架，要求使用Netty实现一个简单的RPC框架，消费者和提供者约定协议和接口，消费者远程调用提供者的服务。
date: 2022-05-04 16:21:46
category:
  - 后端开发
  - 分布式
tag:
  - rpc
  - netty
article: true
timeline: false
---
## 基于Netty实现RPC框架

`Dubbo` 底层使用 `Netty` 作为网络通讯框架，要求使用 `Netty` 实现一个简单的 `RPC` 框架，消费者和提供者约定协议和接口，消费者远程调用提供者的服务。

1、创建一个接口，定义抽象方法，用于消费者和提供者之间的约定。

2、创建一个提供者，该类需要监听消费者的请求，并按照约定返回数据。

3、创建一个消费者，该类需要透明的调用自己不存在的方法，内部需要使用 `Netty` 进行数据通信。

4、提供者与消费者传输数据使用json字符串格式。

5、提供者使用 `Netty` 集成 `Spring Boot` 环境。

案例：客户端调用服务端，利用ID查询User对象的方法

### 需求分析

<img src="https://img1.terwer.space/16467573463305.png" alt="image-20220306234352362" style="zoom:50%;" />

### 具体实现

需要分成三个子项目

```bash
.
├── custom-rpc-api
├── custom-rpc-consumer
├── custom-rpc-provider
└── pom.xml
```

#### 主项目

主项目的 `pom.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xmlns="http://maven.apache.org/POM/4.0.0"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.terewrgreen</groupId>
    <artifactId>custom-rpc</artifactId>
    <packaging>pom</packaging>
    <version>1.0.0</version>

    <modules>
        <module>custom-rpc-api</module>
        <module>custom-rpc-provider</module>
        <module>custom-rpc-consumer</module>
    </modules>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.6.3</version>
    </parent>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <curator.version>4.3.0</curator.version>
    </properties>

    <dependencies>
        <!--netty依赖 -->
        <dependency>
            <groupId>io.netty</groupId>
            <artifactId>netty-all</artifactId>
        </dependency>
        <!--json依赖 -->
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>fastjson</artifactId>
            <version>1.2.79</version>
        </dependency>
        <!--lombok依赖 -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
    </dependencies>
</project>
```

#### custom-rpc-api

pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>custom-rpc</artifactId>
        <groupId>com.terewrgreen</groupId>
        <version>1.0.0</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>custom-rpc-api</artifactId>

    <name>custom-rpc-api</name>
    <url>http://www.terwergreen.com</url>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>

    <dependencies>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.1</version>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <pluginManagement>
        </pluginManagement>
    </build>
</project>
```



#### custom-rpc-consumer

pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>custom-rpc</artifactId>
        <groupId>com.terewrgreen</groupId>
        <version>1.0.0</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>custom-rpc-consumer</artifactId>

    <name>custom-rpc-consumer</name>
    <url>http://www.terwergreen.com</url>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>

    <dependencies>
        <dependency>
            <groupId>com.terewrgreen</groupId>
            <artifactId>custom-rpc-api</artifactId>
            <version>1.0.0</version>
        </dependency>

        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.1</version>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <pluginManagement>
        </pluginManagement>
    </build>
</project>
```

RpcClient

```java
/**
 * Rpc客户端
 * 1、连接netty服务端
 * 2、提供给调用者关闭资源的方法
 * 3、提供消息发送的方法
 *
 * @name: RpcClient
 * @author: terwer
 * @date: 2022-03-13 21:04
 **/
public class RpcClient {

    private NioEventLoopGroup group;
    private Channel channel;

    private String ip;
    private int port;

    private RpcClientHandler rpcClientHandler = new RpcClientHandler();
    private ExecutorService executorService = Executors.newCachedThreadPool();

    public RpcClient(String ip, int port) {
        this.ip = ip;
        this.port = port;
        initClient();
    }

    /**
     * 初始化客户端，连接netty服务端
     */
    public void initClient() {

        try {
            // 创建线程组
            group = new NioEventLoopGroup();
            //  创建启动助手
            Bootstrap bootstrap = new Bootstrap();
            bootstrap.group(group)
                    .channel(NioSocketChannel.class)
                    .option(ChannelOption.SO_KEEPALIVE, true)
                    .option(ChannelOption.SO_TIMEOUT, 3000)
                    .handler(new ChannelInitializer<SocketChannel>() {
                        @Override
                        protected void initChannel(SocketChannel channel) throws Exception {
                            ChannelPipeline pipeline = channel.pipeline();
                            // String 编解码器
                            pipeline.addLast(new StringDecoder());
                            pipeline.addLast(new StringEncoder());
                            // 客户端处理类
                            pipeline.addLast(rpcClientHandler);
                        }
                    });
            channel = bootstrap.connect(ip, port).sync().channel();
            System.out.println("===========客户端启动成功==========");
        } catch (Exception e) {
            if (channel != null) {
                channel.close();
                System.out.println("客户端关闭channel");
            }
            if (group != null) {
                group.shutdownGracefully();
                System.out.println("客户端关闭group");
            }
            e.printStackTrace();
        }
    }

    public void close(){
        if (channel != null) {
            channel.close();
            System.out.println("外部调用客户端关闭channel");
        }
        if (group != null) {
            group.shutdownGracefully();
            System.out.println("外部调用客户端关闭group");
        }
    }

    public Object send(String msg) throws ExecutionException, InterruptedException {
        rpcClientHandler.setRequestMessage(msg);
        Future future = executorService.submit(rpcClientHandler);
        return future.get();
    }
}
```

RpcClienthandler

```java
/**
 * 客户端处理类
 * 1、发送消息
 * 2、接收消息
 *
 * @name: RpcClientHandler
 * @author: terwer
 * @date: 2022-03-13 23:01
 **/
public class RpcClientHandler extends SimpleChannelInboundHandler implements Callable {

    private ChannelHandlerContext ctx;
    // 消息
    private String requestMessage;
    private String responseMessage;

    public String getRequestMessage() {
        return requestMessage;
    }

    public void setRequestMessage(String requestMessage) {
        this.requestMessage = requestMessage;
    }

    /**
     * 通道读取就绪事件
     *
     * @param channelHandlerContext
     * @param msg
     * @throws Exception
     */
    @Override
    protected synchronized void channelRead0(ChannelHandlerContext channelHandlerContext, Object msg) throws Exception {
        responseMessage = (String) msg;
        // 唤醒等待线程
        notify();
    }

    /**
     * 通道就绪事件
     *
     * @param ctx
     * @throws Exception
     */
    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
        this.ctx = ctx;
    }

    @Override
    public synchronized Object call() throws Exception {
        // 消息发送
        ctx.writeAndFlush(requestMessage);
        // 线程等待
        wait();
        return responseMessage;
    }
}
```

RpcClientProxy

```java
/**
 * 客户端代理类，创建代理对象
 * 1、封装request请求对象
 * 2、创建RpcClient对象
 * 3、发送消息
 * 4、返回结果
 *
 * @name: RpcClientProxy
 * @author: terwer
 * @date: 2022-03-13 23:45
 **/
public class RpcClientProxy {
    public static Object createProxy(Class serviceClass) {
        return Proxy.newProxyInstance(Thread.currentThread().getContextClassLoader(), new Class[]{serviceClass}, new InvocationHandler() {
            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                // 1、封装request请求对象
                RpcRequest rpcRequest = new RpcRequest();
                rpcRequest.setRequestId(UUID.randomUUID().toString());
                rpcRequest.setClassName(method.getDeclaringClass().getName());
                rpcRequest.setMethodName(method.getName());
                rpcRequest.setParameterTypes(method.getParameterTypes());
                rpcRequest.setParameters(args);

                // 2、创建RpcClient对象
                RpcClient rpcClient = new RpcClient("127.0.0.1", 9999);

                try {
                    // 3、发送消息
                    Object responseMessage = rpcClient.send(JSON.toJSONString(rpcRequest));

                    // 4、返回结果
                    RpcResponse response = JSON.parseObject(responseMessage.toString(), RpcResponse.class);
                    if (response.getError() != null) {
                        throw new RuntimeException(response.getError());
                    }
                    Object result = response.getResult();
                    Object object = JSON.parseObject(result.toString(), method.getReturnType());
                    return object;
                } catch (Exception e) {
                    throw e;
                } finally {
                    rpcClient.close();
                }


            }
        });
    }
}
```

ClientBoosStrap

```java
/**
 * 客户端启动类
 *
 * @name: ClientBootStrap
 * @author: terwer
 * @date: 2022-03-14 00:00
 **/
public class ClientBootStrap {
    public static void main(String[] args) {
        IUSerService userService = (IUSerService) RpcClientProxy.createProxy(IUSerService.class);
        User user = userService.getById(1);
        System.out.println(user);
    }
}
```



#### custom-rpc-provider

pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>custom-rpc</artifactId>
        <groupId>com.terewrgreen</groupId>
        <version>1.0.0</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>custom-rpc-provider</artifactId>

    <name>custom-rpc-provider</name>
    <url>http://www.terwergreen.com</url>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>

    <dependencies>
        <dependency>
            <groupId>com.terewrgreen</groupId>
            <artifactId>custom-rpc-api</artifactId>
            <version>1.0.0</version>
        </dependency>
        <!--Spring相关依赖 -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-autoconfigure</artifactId>
        </dependency>

        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.1</version>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <pluginManagement>
        </pluginManagement>
    </build>
</project>
```



UserServiceImpl

```java
/**
 * 用户服务实现类
 *
 * @name: UserServiceImpl
 * @author: terwer
 * @date: 2022-03-09 23:34
 **/
@RpcService
@Service
public class UserServiceImpl implements IUSerService {
    Map<Object, User> userMap = new HashMap<>();

    @Override
    public User getById(int id) {
        User user = new User();
        user.setId(1);
        user.setName("唐有炜");
        userMap.put(user.getId(), user);

        User user2 = new User();
        user2.setId(2);
        user2.setName("张三");
        userMap.put(user2.getId(), user2);

        return userMap.get(id);
    }
}
```

RpcServer

```java
/**
 * 对外服务
 *
 * @name: RpcServer
 * @author: terwer
 * @date: 2022-03-09 23:53
 **/
@Service
public class RpcServer implements DisposableBean {
    private NioEventLoopGroup bossGroup;
    private NioEventLoopGroup workerGroup;

    @Autowired
    private RpcServerHandler rpcServerHandler;

    public void startServer(String ip, int port) {
        try {
            // 1、创建线程组
            bossGroup = new NioEventLoopGroup(1);
            workerGroup = new NioEventLoopGroup();

            // 2、创建服务端启动助手
            ServerBootstrap serverBootstrap = new ServerBootstrap();

            // 3、设置参数
            serverBootstrap.group(bossGroup, workerGroup)
                    .channel(NioServerSocketChannel.class)
                    .childHandler(new ChannelInitializer<SocketChannel>() {
                        @Override
                        protected void initChannel(SocketChannel channel) throws Exception {
                            ChannelPipeline pipeline = channel.pipeline();
                            // 添加String的编解码器
                            pipeline.addLast(new StringDecoder());
                            pipeline.addLast(new StringEncoder());
                            // 业务处理类
                            pipeline.addLast(rpcServerHandler);
                        }
                    });

            // 4、绑定端口
            ChannelFuture sync = serverBootstrap.bind(ip, port).sync();
            System.out.println("===========服务端启动成功=============");
            sync.channel().closeFuture().sync();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            if (bossGroup != null) {
                bossGroup.shutdownGracefully();
                System.out.println("finally bossGroup成功关闭");
            }
            if (workerGroup != null) {
                workerGroup.shutdownGracefully();
                System.out.println("finally workerGroup成功关闭");
            }
        }
    }

    @Override
    public void destroy() throws Exception {
        if (bossGroup != null) {
            bossGroup.shutdownGracefully();
            System.out.println("destroy bossGroup成功关闭");
        }
        if (workerGroup != null) {
            workerGroup.shutdownGracefully();
            System.out.println("destroy workerGroup成功关闭");
        }
    }
}
```

RpcServerHandler

```java
/**
 * 服务端处理类
 * <p>
 * 1、将标有@RpcService注解的类进行缓存
 * 2、接收客户端请求
 * 3、根据传过来的beanName在缓存中查找对应的bean
 * 4、解析请求中的方法名、参数类型、参数信息
 *
 * @name: RpcServerHandler
 * @author: terwer
 * @date: 2022-03-10 00:22
 **/
@Component
@ChannelHandler.Sharable
public class RpcServerHandler extends SimpleChannelInboundHandler<String> implements ApplicationContextAware {
    private static final Map SERVICE_INSTANCE_MAP = new ConcurrentHashMap();

    /**
     * 1、将标有@RpcService注解的类进行缓存
     *
     * @param applicationContext
     * @throws BeansException
     */
    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        Map<String, Object> serviceMap = applicationContext.getBeansWithAnnotation(RpcService.class);
        if (serviceMap != null && serviceMap.size() > 0) {
            Set<Map.Entry<String, Object>> entries = serviceMap.entrySet();
            for (Map.Entry<String, Object> entry : entries) {
                Object serviceBean = entry.getValue();
                if (serviceBean.getClass().getInterfaces().length == 0) {
                    throw new RuntimeException("服务必须实现接口");
                }

                // 默认取第一个接口作为名称
                SERVICE_INSTANCE_MAP.put(serviceBean.getClass().getInterfaces()[0].getName(), serviceBean);
            }

        }
    }

    /**
     * 通道读取就绪事件
     *
     * @param channelHandlerContext
     * @param s
     * @throws Exception
     */
    @Override
    protected void channelRead0(ChannelHandlerContext ctx, String msg) throws Exception {
        // 接收客户端请求，转换成RpcReuest
        RpcRequest rpcRequest = JSON.parseObject(msg, RpcRequest.class);
        RpcResponse rpcResponse = new RpcResponse();
        rpcResponse.setRequestId(rpcRequest.getRequestId());

        try {
            Object result = handler(rpcRequest);
            rpcResponse.setResult(result);
        } catch (Exception e) {
            rpcResponse.setError(e.getMessage());
            e.printStackTrace();
        }

        ctx.writeAndFlush(JSON.toJSONString(rpcResponse));
    }

    /**
     * 业务逻辑处理方法
     *
     * @param rpcRequest
     * @return
     */
    private Object handler(RpcRequest rpcRequest) throws InvocationTargetException {
        // 根据传过来的beanName在缓存中查找对应的bean
        Object serviceBean = SERVICE_INSTANCE_MAP.get(rpcRequest.getClassName());
        if(null == serviceBean){
            throw new RuntimeException("根据beanName找不到服务"+rpcRequest.getClassName());
        }

        // 解析请求中的方法名、参数类型、参数信息
        Class<?> beanClass = serviceBean.getClass();
        String methodName = rpcRequest.getMethodName();
        Class<?>[] parameterTypes = rpcRequest.getParameterTypes();
        Object[] parameters = rpcRequest.getParameters();

        // 反射调用
        FastClass fastClass = FastClass.create(beanClass);
        FastMethod fastMethod = fastClass.getMethod(methodName, parameterTypes);
        Object result = fastMethod.invoke(serviceBean, parameters);

        return result;
    }
}
```

ServerBootdtrapApplication

```java
/**
 * 启动类
 *
 * @name: ServerBootstrapApplication
 * @author: terwer
 * @date: 2022-03-09 23:46
 **/
@SpringBootApplication
public class ServerBootstrapApplication implements CommandLineRunner {
    @Autowired
    private RpcServer rpcServer;

    public static void main(String[] args) {
        SpringApplication.run(ServerBootstrapApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        new Thread(new Runnable() {
            @Override
            public void run() {
                rpcServer.startServer("127.0.0.1", 9999);
            }
        }).start();
    }
}
```

运行效果

![image-20220416114148874](https://img1.terwer.space/image-20220416114148874.png)

![image-20220416114243692](https://img1.terwer.space/image-20220416114243692.png)

错误解决

```
com.terewrgreen.rpc.provider.handler.RpcServerHandler is not a @Sharable handler, so can't be added or removed multiple times.
```

加上 `@ChannelHandler.Sharable` 注解即可。