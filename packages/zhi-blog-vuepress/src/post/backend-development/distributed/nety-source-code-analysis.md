---
title: Nety源码剖析
short_title: ''
description: 本文对Netty源码进行了深入剖析，透过Netty源码来理解Netty框架背后的原理。
date: 2022-04-21 23:11:38
category:
  - 后端开发
  - 分布式
tag:
  - netty
  - source
article: true
timeline: false
---
本文对Netty源码进行了深入剖析，透过Netty源码来理解Netty框架背后的原理。

<!-- more -->

## Nety源码剖析

### 下载netty源码

[https://github.com/netty/netty](https://github.com/netty/netty)

### 导入netty源码

直接IDEA导入Maven项目选择 `pom.xml` 即可。

## 新建demo项目 

在example项目下面新建最简单的demo

![image-20220502223808503](https://img1.terwer.space/image-20220502223808503.png)

## EventLoop事件循环组（线程组）源码

`EventLoopGroup` 是一组 EventLoop 的抽象，Netty 为了更好的利用多核 CPU 资源，一般会有多

个 EventLoop 同时工作，每个 EventLoop 维护着一个 Selector 实例。

### 线程组源码流程分析

![image-20220502225316981](https://img1.terwer.space/image-20220502225316981.png)



![image-20220502225836471](https://img1.terwer.space/image-20220502225836471.png)

### 线程组源码主要源码跟踪

1. NioEventLoopGroup线程组的创建

   ```java
   static {
     DEFAULT_EVENT_LOOP_THREADS = Math.max(1, SystemPropertyUtil.getInt(
       "io.netty.eventLoopThreads", NettyRuntime.availableProcessors() * 2));
   
     if (logger.isDebugEnabled()) {
       logger.debug("-Dio.netty.eventLoopThreads: {}", DEFAULT_EVENT_LOOP_THREADS);
     }
   }
   
   /**
    * @see MultithreadEventExecutorGroup#MultithreadEventExecutorGroup(int, Executor, Object...)
   */
   protected MultithreadEventLoopGroup(int nThreads, Executor executor, Object... args) {
     super(nThreads == 0 ? DEFAULT_EVENT_LOOP_THREADS : nThreads, executor, args);
   }
   ```

2. NioEventLoop的创建

   ```java
    protected MultithreadEventExecutorGroup(int nThreads, Executor executor,
                                               EventExecutorChooserFactory chooserFactory, Object... args) {
           checkPositive(nThreads, "nThreads");
   
           if (executor == null) {
               executor = new ThreadPerTaskExecutor(newDefaultThreadFactory());
           }
   
           children = new EventExecutor[nThreads];
   
           for (int i = 0; i < nThreads; i ++) {
               boolean success = false;
               try {
                   children[i] = newChild(executor, args);
                   success = true;
               } catch (Exception e) {
                   // TODO: Think about if this is a good exception type
                   throw new IllegalStateException("failed to create a child event loop", e);
               } finally {
                   if (!success) {
                       for (int j = 0; j < i; j ++) {
                           children[j].shutdownGracefully();
                       }
   
                       for (int j = 0; j < i; j ++) {
                           EventExecutor e = children[j];
                           try {
                               while (!e.isTerminated()) {
                                   e.awaitTermination(Integer.MAX_VALUE, TimeUnit.SECONDS);
                               }
                           } catch (InterruptedException interrupted) {
                               // Let the caller handle the interruption.
                               Thread.currentThread().interrupt();
                               break;
                           }
                       }
                   }
               }
           }
   
           chooser = chooserFactory.newChooser(children);
   
           final FutureListener<Object> terminationListener = new FutureListener<Object>() {
               @Override
               public void operationComplete(Future<Object> future) throws Exception {
                   if (terminatedChildren.incrementAndGet() == children.length) {
                       terminationFuture.setSuccess(null);
                   }
               }
           };
   
           for (EventExecutor e: children) {
               e.terminationFuture().addListener(terminationListener);
           }
   
           Set<EventExecutor> childrenSet = new LinkedHashSet<EventExecutor>(children.length);
           Collections.addAll(childrenSet, children);
           readonlyChildren = Collections.unmodifiableSet(childrenSet);
    }
   ```

   newChild方法

   ```java
   @Override
   protected EventLoop newChild(Executor executor, Object... args) throws Exception {
     SelectorProvider selectorProvider = (SelectorProvider) args[0];
     SelectStrategyFactory selectStrategyFactory = (SelectStrategyFactory) args[1];
     RejectedExecutionHandler rejectedExecutionHandler = (RejectedExecutionHandler) args[2];
     EventLoopTaskQueueFactory taskQueueFactory = null;
     EventLoopTaskQueueFactory tailTaskQueueFactory = null;
   
     int argsLength = args.length;
     if (argsLength > 3) {
       taskQueueFactory = (EventLoopTaskQueueFactory) args[3];
     }
     if (argsLength > 4) {
       tailTaskQueueFactory = (EventLoopTaskQueueFactory) args[4];
     }
     return new NioEventLoop(this, executor, selectorProvider,
                             selectStrategyFactory.newSelectStrategy(),
                             rejectedExecutionHandler, taskQueueFactory, tailTaskQueueFactory);
   }
   ```

   NioEventLoop

   ```java
   NioEventLoop(NioEventLoopGroup parent, Executor executor, SelectorProvider selectorProvider,
                SelectStrategy strategy, RejectedExecutionHandler rejectedExecutionHandler,
                EventLoopTaskQueueFactory taskQueueFactory, EventLoopTaskQueueFactory tailTaskQueueFactory) {
     super(parent, executor, false, newTaskQueue(taskQueueFactory), newTaskQueue(tailTaskQueueFactory),
           rejectedExecutionHandler);
     this.provider = ObjectUtil.checkNotNull(selectorProvider, "selectorProvider");
     this.selectStrategy = ObjectUtil.checkNotNull(strategy, "selectStrategy");
     final SelectorTuple selectorTuple = openSelector();
     this.selector = selectorTuple.selector;
     this.unwrappedSelector = selectorTuple.unwrappedSelector;
   }
   ```

## Netty启动源码

### 启动流程分析

![image-20220502234157772](https://img1.terwer.space/image-20220502234157772.png)

### 主要源码跟踪

1. initAndRegister

   ```java
   final ChannelFuture initAndRegister() {
     Channel channel = null;
     try {
       channel = channelFactory.newChannel();
       init(channel);
     } catch (Throwable t) {
       if (channel != null) {
         // channel can be null if newChannel crashed (eg SocketException("too many open files"))
         channel.unsafe().closeForcibly();
         // as the Channel is not registered yet we need to force the usage of the GlobalEventExecutor
         return new DefaultChannelPromise(channel, GlobalEventExecutor.INSTANCE).setFailure(t);
       }
       // as the Channel is not registered yet we need to force the usage of the GlobalEventExecutor
       return new DefaultChannelPromise(new FailedChannel(), GlobalEventExecutor.INSTANCE).setFailure(t);
     }
   
     ChannelFuture regFuture = config().group().register(channel);
     if (regFuture.cause() != null) {
       if (channel.isRegistered()) {
         channel.close();
       } else {
         channel.unsafe().closeForcibly();
       }
     }
   
     // If we are here and the promise is not failed, it's one of the following cases:
     // 1) If we attempted registration from the event loop, the registration has been completed at this point.
     //    i.e. It's safe to attempt bind() or connect() now because the channel has been registered.
     // 2) If we attempted registration from the other thread, the registration request has been successfully
     //    added to the event loop's task queue for later execution.
     //    i.e. It's safe to attempt bind() or connect() now:
     //         because bind() or connect() will be executed *after* the scheduled registration task is executed
     //         because register(), bind(), and connect() are all bound to the same thread.
   
     return regFuture;
   }
   ```

2. init方法

   ```java
   @Override
   void init(Channel channel) {
     setChannelOptions(channel, newOptionsArray(), logger);
     setAttributes(channel, newAttributesArray());
   
     ChannelPipeline p = channel.pipeline();
   
     final EventLoopGroup currentChildGroup = childGroup;
     final ChannelHandler currentChildHandler = childHandler;
     final Entry<ChannelOption<?>, Object>[] currentChildOptions = newOptionsArray(childOptions);
     final Entry<AttributeKey<?>, Object>[] currentChildAttrs = newAttributesArray(childAttrs);
   
     p.addLast(new ChannelInitializer<Channel>() {
       @Override
       public void initChannel(final Channel ch) {
         final ChannelPipeline pipeline = ch.pipeline();
         ChannelHandler handler = config.handler();
         if (handler != null) {
           pipeline.addLast(handler);
         }
   
         ch.eventLoop().execute(new Runnable() {
           @Override
           public void run() {
             pipeline.addLast(new ServerBootstrapAcceptor(
               ch, currentChildGroup, currentChildHandler, currentChildOptions, currentChildAttrs));
           }
         });
       }
     });
   }
   ```

3. regidter方法

   ```java
   @Override
   public final void register(EventLoop eventLoop, final ChannelPromise promise) {
     ObjectUtil.checkNotNull(eventLoop, "eventLoop");
     if (isRegistered()) {
       promise.setFailure(new IllegalStateException("registered to an event loop already"));
       return;
     }
     if (!isCompatible(eventLoop)) {
       promise.setFailure(
         new IllegalStateException("incompatible event loop type: " + eventLoop.getClass().getName()));
       return;
     }
   
     AbstractChannel.this.eventLoop = eventLoop;
   
     if (eventLoop.inEventLoop()) {
       register0(promise);
     } else {
       try {
         eventLoop.execute(new Runnable() {
           @Override
           public void run() {
             register0(promise);
           }
         });
       } catch (Throwable t) {
         logger.warn(
           "Force-closing a channel whose registration task was not accepted by an event loop: {}",
           AbstractChannel.this, t);
         closeForcibly();
         closeFuture.setClosed();
         safeSetFailure(promise, t);
       }
     }
   }
   
   ```

4. execute()方法

   ```java
   private void execute(Runnable task, boolean immediate) {
     boolean inEventLoop = inEventLoop();
     addTask(task);
     if (!inEventLoop) {
       startThread();
       if (isShutdown()) {
         boolean reject = false;
         try {
           if (removeTask(task)) {
             reject = true;
           }
         } catch (UnsupportedOperationException e) {
           // The task queue does not support removal so the best thing we can do is to just move on and
           // hope we will be able to pick-up the task before its completely terminated.
           // In worst case we will log on termination.
         }
         if (reject) {
           reject();
         }
       }
     }
   
     if (!addTaskWakesUp && immediate) {
       wakeup(inEventLoop);
     }
   }
   ```

5. startThread的run方法

   ```java
   for (;;) {
     try {
       int strategy;
       try {
         strategy = selectStrategy.calculateStrategy(selectNowSupplier, hasTasks());
         switch (strategy) {
           case SelectStrategy.CONTINUE:
             continue;
   
           case SelectStrategy.BUSY_WAIT:
             // fall-through to SELECT since the busy-wait is not supported with NIO
   
           case SelectStrategy.SELECT:
             long curDeadlineNanos = nextScheduledTaskDeadlineNanos();
             if (curDeadlineNanos == -1L) {
               curDeadlineNanos = NONE; // nothing on the calendar
             }
             nextWakeupNanos.set(curDeadlineNanos);
             try {
               if (!hasTasks()) {
                 strategy = select(curDeadlineNanos);
               }
             } finally {
               // This update is just to help block unnecessary selector wakeups
               // so use of lazySet is ok (no race condition)
               nextWakeupNanos.lazySet(AWAKE);
             }
             // fall through
           default:
         }
       } catch (IOException e) {
         // If we receive an IOException here its because the Selector is messed up. Let's rebuild
         // the selector and retry. https://github.com/netty/netty/issues/8566
         rebuildSelector0();
         selectCnt = 0;
         handleLoopException(e);
         continue;
       }
   
       selectCnt++;
       cancelledKeys = 0;
       needsToSelectAgain = false;
       final int ioRatio = this.ioRatio;
       boolean ranTasks;
       if (ioRatio == 100) {
         try {
           if (strategy > 0) {
             processSelectedKeys();
           }
         } finally {
           // Ensure we always run tasks.
           ranTasks = runAllTasks();
         }
       } else if (strategy > 0) {
         final long ioStartTime = System.nanoTime();
         try {
           processSelectedKeys();
         } finally {
           // Ensure we always run tasks.
           final long ioTime = System.nanoTime() - ioStartTime;
           ranTasks = runAllTasks(ioTime * (100 - ioRatio) / ioRatio);
         }
       } else {
         ranTasks = runAllTasks(0); // This will run the minimum number of tasks
       }
   
       if (ranTasks || strategy > 0) {
         if (selectCnt > MIN_PREMATURE_SELECTOR_RETURNS && logger.isDebugEnabled()) {
           logger.debug("Selector.select() returned prematurely {} times in a row for Selector {}.",
                        selectCnt - 1, selector);
         }
         selectCnt = 0;
       } else if (unexpectedSelectorWakeup(selectCnt)) { // Unexpected wakeup (unusual case)
         selectCnt = 0;
       }
     } catch (CancelledKeyException e) {
       // Harmless exception - log anyway
       if (logger.isDebugEnabled()) {
         logger.debug(CancelledKeyException.class.getSimpleName() + " raised by a Selector {} - JDK bug?",
                      selector, e);
       }
     } catch (Error e) {
       throw e;
     } catch (Throwable t) {
       handleLoopException(t);
     } finally {
       // Always handle shutdown even if the loop processing threw an exception.
       try {
         if (isShuttingDown()) {
           closeAll();
           if (confirmShutdown()) {
             return;
           }
         }
       } catch (Error e) {
         throw e;
       } catch (Throwable t) {
         handleLoopException(t);
       }
     }
   }
   }
   ```

6. runAllTasks方法

   ```java
   protected boolean runAllTasks(long timeoutNanos) {
     fetchFromScheduledTaskQueue();
     Runnable task = pollTask();
     if (task == null) {
       afterRunningAllTasks();
       return false;
     }
   
     final long deadline = timeoutNanos > 0 ? ScheduledFutureTask.nanoTime() + timeoutNanos : 0;
     long runTasks = 0;
     long lastExecutionTime;
     for (;;) {
       safeExecute(task);
   
       runTasks ++;
   
       // Check timeout every 64 tasks because nanoTime() is relatively expensive.
       // XXX: Hard-coded value - will make it configurable if it is really a problem.
       if ((runTasks & 0x3F) == 0) {
         lastExecutionTime = ScheduledFutureTask.nanoTime();
         if (lastExecutionTime >= deadline) {
           break;
         }
       }
   
       task = pollTask();
       if (task == null) {
         lastExecutionTime = ScheduledFutureTask.nanoTime();
         break;
       }
     }
   
     afterRunningAllTasks();
     this.lastExecutionTime = lastExecutionTime;
     return true;
   }
   ```

7. register0方法

   ```java
   private void register0(ChannelPromise promise) {
     try {
       // check if the channel is still open as it could be closed in the mean time when the register
       // call was outside of the eventLoop
       if (!promise.setUncancellable() || !ensureOpen(promise)) {
         return;
       }
       boolean firstRegistration = neverRegistered;
       doRegister();
       neverRegistered = false;
       registered = true;
   
       // Ensure we call handlerAdded(...) before we actually notify the promise. This is needed as the
       // user may already fire events through the pipeline in the ChannelFutureListener.
       pipeline.invokeHandlerAddedIfNeeded();
   
       safeSetSuccess(promise);
       pipeline.fireChannelRegistered();
       // Only fire a channelActive if the channel has never been registered. This prevents firing
       // multiple channel actives if the channel is deregistered and re-registered.
       if (isActive()) {
         if (firstRegistration) {
           pipeline.fireChannelActive();
         } else if (config().isAutoRead()) {
           // This channel was registered before and autoRead() is set. This means we need to begin read
           // again so that we process inbound data.
           //
           // See https://github.com/netty/netty/issues/4805
           beginRead();
         }
       }
     } catch (Throwable t) {
       // Close the channel directly to avoid FD leak.
       closeForcibly();
       closeFuture.setClosed();
       safeSetFailure(promise, t);
     }
   }
   ```

8. doRegister()方法

   ```java
   @Override
   protected void doRegister() throws Exception {
     boolean selected = false;
     for (;;) {
       try {
         selectionKey = javaChannel().register(eventLoop().unwrappedSelector(), 0, this);
         return;
       } catch (CancelledKeyException e) {
         if (!selected) {
           // Force the Selector to select now as the "canceled" SelectionKey may still be
           // cached and not removed because no Select.select(..) operation was called yet.
           eventLoop().selectNow();
           selected = true;
         } else {
           // We forced a select operation on the selector before but the SelectionKey is still cached
           // for whatever reason. JDK bug ?
           throw e;
         }
       }
     }
   ```

9. invokeHandlerIfNeeded方法，就是initChannel方法

   ```java
   p.addLast(new ChannelInitializer<Channel>() {
       @Override
       public void initChannel(final Channel ch) {
           final ChannelPipeline pipeline = ch.pipeline();
           ChannelHandler handler = config.handler();
           if (handler != null) {
               pipeline.addLast(handler);
           }
   
           ch.eventLoop().execute(new Runnable() {
               @Override
               public void run() {
                   pipeline.addLast(new ServerBootstrapAcceptor(
                           ch, currentChildGroup, currentChildHandler, currentChildOptions, currentChildAttrs));
               }
           });
       }
   });
   ```

## BossGroup/WorkerGroup/消息入站源码

BossGroup主要负责监听，WorkerGroup负责消息处理。

入站就是BossGroup如何将通道交给WorkerGroup以及如何进行消息处理。

### BossGroup/WorkerGroup源码分析

![image-20220503223437802](https://img1.terwer.space/image-20220503223437802.png)

### 主要源码流程

1. processSelectedKeysOptimized

   ```java
   private void processSelectedKeysOptimized() {
       for (int i = 0; i < selectedKeys.size; ++i) {
           final SelectionKey k = selectedKeys.keys[i];
           // null out entry in the array to allow to have it GC'ed once the Channel close
           // See https://github.com/netty/netty/issues/2363
           selectedKeys.keys[i] = null;
   
           final Object a = k.attachment();
   
           if (a instanceof AbstractNioChannel) {
               processSelectedKey(k, (AbstractNioChannel) a);
           } else {
               @SuppressWarnings("unchecked")
               NioTask<SelectableChannel> task = (NioTask<SelectableChannel>) a;
               processSelectedKey(k, task);
           }
   
           if (needsToSelectAgain) {
               // null out entries in the array to allow to have it GC'ed once the Channel close
               // See https://github.com/netty/netty/issues/2363
               selectedKeys.reset(i + 1);
   
               selectAgain();
               i = -1;
           }
       }
   }
   ```

2. processSelectedKey

   ```java
   private void processSelectedKey(SelectionKey k, AbstractNioChannel ch) {
       final AbstractNioChannel.NioUnsafe unsafe = ch.unsafe();
       if (!k.isValid()) {
           final EventLoop eventLoop;
           try {
               eventLoop = ch.eventLoop();
           } catch (Throwable ignored) {
               // If the channel implementation throws an exception because there is no event loop, we ignore this
               // because we are only trying to determine if ch is registered to this event loop and thus has authority
               // to close ch.
               return;
           }
           // Only close ch if ch is still registered to this EventLoop. ch could have deregistered from the event loop
           // and thus the SelectionKey could be cancelled as part of the deregistration process, but the channel is
           // still healthy and should not be closed.
           // See https://github.com/netty/netty/issues/5125
           if (eventLoop == this) {
               // close the channel if the key is not valid anymore
               unsafe.close(unsafe.voidPromise());
           }
           return;
       }
   
       try {
           int readyOps = k.readyOps();
           // We first need to call finishConnect() before try to trigger a read(...) or write(...) as otherwise
           // the NIO JDK channel implementation may throw a NotYetConnectedException.
           if ((readyOps & SelectionKey.OP_CONNECT) != 0) {
               // remove OP_CONNECT as otherwise Selector.select(..) will always return without blocking
               // See https://github.com/netty/netty/issues/924
               int ops = k.interestOps();
               ops &= ~SelectionKey.OP_CONNECT;
               k.interestOps(ops);
   
               unsafe.finishConnect();
           }
   
           // Process OP_WRITE first as we may be able to write some queued buffers and so free memory.
           if ((readyOps & SelectionKey.OP_WRITE) != 0) {
               // Call forceFlush which will also take care of clear the OP_WRITE once there is nothing left to write
               ch.unsafe().forceFlush();
           }
   
           // Also check for readOps of 0 to workaround possible JDK bug which may otherwise lead
           // to a spin loop
           if ((readyOps & (SelectionKey.OP_READ | SelectionKey.OP_ACCEPT)) != 0 || readyOps == 0) {
               unsafe.read();
           }
       } catch (CancelledKeyException ignored) {
           unsafe.close(unsafe.voidPromise());
       }
   }
   ```

3. Unsafe.read()

   ```java
   @Override
   public void read() {
       assert eventLoop().inEventLoop();
       final ChannelConfig config = config();
       final ChannelPipeline pipeline = pipeline();
       final RecvByteBufAllocator.Handle allocHandle = unsafe().recvBufAllocHandle();
       allocHandle.reset(config);
   
       boolean closed = false;
       Throwable exception = null;
       try {
           try {
               do {
                   int localRead = doReadMessages(readBuf);
                   if (localRead == 0) {
                       break;
                   }
                   if (localRead < 0) {
                       closed = true;
                       break;
                   }
   
                   allocHandle.incMessagesRead(localRead);
               } while (continueReading(allocHandle));
           } catch (Throwable t) {
               exception = t;
           }
   
           int size = readBuf.size();
           for (int i = 0; i < size; i ++) {
               readPending = false;
               pipeline.fireChannelRead(readBuf.get(i));
           }
           readBuf.clear();
           allocHandle.readComplete();
           pipeline.fireChannelReadComplete();
   
           if (exception != null) {
               closed = closeOnReadError(exception);
   
               pipeline.fireExceptionCaught(exception);
           }
   
           if (closed) {
               inputShutdown = true;
               if (isOpen()) {
                   close(voidPromise());
               }
           }
       } finally {
           // Check if there is a readPending which was not processed yet.
           // This could be for two reasons:
           // * The user called Channel.read() or ChannelHandlerContext.read() in channelRead(...) method
           // * The user called Channel.read() or ChannelHandlerContext.read() in channelReadComplete(...) method
           //
           // See https://github.com/netty/netty/issues/2254
           if (!readPending && !config.isAutoRead()) {
               removeReadOp();
           }
       }
   }
   ```

## 消息出站源码

```java
private void write(Object msg, boolean flush, ChannelPromise promise) {
    ObjectUtil.checkNotNull(msg, "msg");
    try {
        if (isNotValidPromise(promise, true)) {
            ReferenceCountUtil.release(msg);
            // cancelled
            return;
        }
    } catch (RuntimeException e) {
        ReferenceCountUtil.release(msg);
        throw e;
    }

    final AbstractChannelHandlerContext next = findContextOutbound(flush ?
            (MASK_WRITE | MASK_FLUSH) : MASK_WRITE);
    final Object m = pipeline.touch(msg, next);
    EventExecutor executor = next.executor();
    if (executor.inEventLoop()) {
        if (flush) {
            next.invokeWriteAndFlush(m, promise);
        } else {
            next.invokeWrite(m, promise);
        }
    } else {
        final WriteTask task = WriteTask.newInstance(next, m, promise, flush);
        if (!safeExecute(executor, task, promise, m, !flush)) {
            // We failed to submit the WriteTask. We need to cancel it so we decrement the pending bytes
            // and put it back in the Recycler for re-use later.
            //
            // See https://github.com/netty/netty/issues/8343.
            task.cancel();
        }
    }
}
```