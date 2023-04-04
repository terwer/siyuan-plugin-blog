---
title: Java并发之回顾Thread和runnable
short_title: ''
description: jdk文档的描述threadathreadisathreadofexecutioninaprogramthejavavirtualmachineallowsanapplicationtohavemultiplethreadsofexecutionrunningconcurrentlyeverythreadhasaprioritythreadswithhigherpriorityareexecutedinpreferencetothreadswithlowerpriorityeachthreadmayorm
date: 2022-11-08 20:13:45
category:
  - 新笔记
  - 并发新思路
tag:
  - 并发
  - 回顾
  - 笔记
  - 新思路
  - runnable
  - thread
  - concurrent
article: true
timeline: false
---
## jdk 文档的描述

### Thread

A thread is a thread of execution in a program. The Java Virtual Machine allows an application to have multiple threads of execution running concurrently.

Every thread has a priority. Threads with higher priority are executed in preference to threads with lower priority. Each thread may or may not also be marked as a daemon. When code running in some thread creates a new Thread object, the new thread has its priority initially set equal to the priority of the creating thread, and is a daemon thread if and only if the creating thread is a daemon.

When a Java Virtual Machine starts up, there is usually a single non-daemon thread (which typically calls the method named main of some designated class). The Java Virtual Machine continues to execute threads until either of the following occurs:

* The exit method of class Runtime has been called and the security manager has permitted the exit operation to take place.
* All threads that are not daemon threads have died, either by returning from the call to the run method or by throwing an exception that propagates beyond the run method.

There are two ways to create a new thread of execution. One is to declare a class to be a subclass of Thread. This subclass should override the run method of class Thread. An instance of the subclass can then be allocated and started. For example, a thread that computes primes larger than a stated value could be written as follows:

      class PrimeThread extends Thread {
          long minPrime;
          PrimeThread(long minPrime) {
              this.minPrime = minPrime;
          }

          public void run() {
              // compute primes larger than minPrime
               . . .
          }
      }

The following code would then create a thread and start it running:
      PrimeThread p = new PrimeThread(143);
      p.start();

The other way to create a thread is to declare a class that implements the Runnable interface. That class then implements the run method. An instance of the class can then be allocated, passed as an argument when creating Thread, and started. The same example in this other style looks like the following:

      class PrimeRun implements Runnable {
          long minPrime;
          PrimeRun(long minPrime) {
              this.minPrime = minPrime;
          }

          public void run() {
              // compute primes larger than minPrime
               . . .
          }
      }

The following code would then create a thread and start it running:
      PrimeRun p = new PrimeRun(143);
      new Thread(p).start();

Every thread has a name for identification purposes. More than one thread may have the same name. If a name is not specified when a thread is created, a new name is generated for it.
Unless otherwise noted, passing a null argument to a constructor or method in this class will cause a NullPointerException to be thrown.

### Runnable

```java
/**
 * The <code>Runnable</code> interface should be implemented by any
 * class whose instances are intended to be executed by a thread. The
 * class must define a method of no arguments called <code>run</code>.
 * <p>
 * This interface is designed to provide a common protocol for objects that
 * wish to execute code while they are active. For example,
 * <code>Runnable</code> is implemented by class <code>Thread</code>.
 * Being active simply means that a thread has been started and has not
 * yet been stopped.
 * <p>
 * In addition, <code>Runnable</code> provides the means for a class to be
 * active while not subclassing <code>Thread</code>. A class that implements
 * <code>Runnable</code> can run without subclassing <code>Thread</code>
 * by instantiating a <code>Thread</code> instance and passing itself in
 * as the target.  In most cases, the <code>Runnable</code> interface should
 * be used if you are only planning to override the <code>run()</code>
 * method and no other <code>Thread</code> methods.
 * This is important because classes should not be subclassed
 * unless the programmer intends on modifying or enhancing the fundamental
 * behavior of the class.
 *
 * @author  Arthur van Hoff
 * @see     java.lang.Thread
 * @see     java.util.concurrent.Callable
 * @since   JDK1.0
 */
@FunctionalInterface
public interface Runnable {
    /**
     * When an object implementing interface <code>Runnable</code> is used
     * to create a thread, starting the thread causes the object's
     * <code>run</code> method to be called in that separately executing
     * thread.
     * <p>
     * The general contract of the method <code>run</code> is that it may
     * take any action whatsoever.
     *
     * @see     java.lang.Thread#run()
     */
    public abstract void run();
}
```

## Thread 类的构造函数剖析

核心都是调用 init 方法，共 8 个构造方法。需要留意的是几个公开的构造函数：

1. Allocates a new Thread object. This constructor has the same effect as Thread (null, null, gname), where gname is a newly generated name. Automatically generated names are of the form "Thread-"+n, where n is an integer.

    ```java
    public Thread() {
    }
    ```

2. Allocates a new Thread object. This constructor has the same effect as Thread (null, target, gname), where gname is a newly generated name. Automatically generated names are of the form "Thread-"+n, where n is an integer.

    Params:  
    `target`​ – the object whose run method is invoked when this thread is started. If null, this classes run method does nothing.

    ```java
    public Thread(Runnable target) {
    }
    ```

3. Allocates a new Thread object. This constructor has the same effect as Thread (group, target, gname) ,where gname is a newly generated name. Automatically generated names are of the form "Thread-"+n, where n is an integer.

    Params:  
    `group`​ – the thread group. If null and there is a security manager, the group is determined by SecurityManager.getThreadGroup(). If there is not a security manager or SecurityManager.getThreadGroup() returns null, the group is set to the current thread's thread group.  
    `target`​ – the object whose run method is invoked when this thread is started. If null, this thread's run method is invoked.

    Throws:  
    SecurityException – if the current thread cannot create a thread in the specified thread group

    ```java
    public Thread(ThreadGroup group, Runnable target) {
    }
    ```

4. Allocates a new Thread object. This constructor has the same effect as Thread (null, null, name).

    Params:  
    `name`​ – the name of the new thread

    ```java
    public Thread(String name) {
    }
    ```

5. Allocates a new Thread object. This constructor has the same effect as Thread (group, null, name).

    Params:  
    `group`​ – the thread group. If null and there is a security manager, the group is determined by SecurityManager.getThreadGroup(). If there is not a security manager or SecurityManager.getThreadGroup() returns null, the group is set to the current thread's thread group.  
    `name`​ – the name of the new thread

    Throws:  
    SecurityException – if the current thread cannot create a thread in the specified thread group

    ```java
    public Thread(ThreadGroup group, String name) {
    }
    ```

6. Allocates a new Thread object. This constructor has the same effect as Thread (null, target, name).

    Params:  
    `target`​ – the object whose run method is invoked when this thread is started. If null, this thread's run method is invoked.  
    `name`​ – the name of the new thread

    ```java
    public Thread(Runnable target, String name) {
    }
    ```

7. Allocates a new Thread object so that it has target as its run object, has the specified name as its name, and belongs to the thread group referred to by group.  
    If there is a security manager, its checkAccess method is invoked with the ThreadGroup as its argument.  
    In addition, its checkPermission method is invoked with the RuntimePermission("enableContextClassLoaderOverride") permission when invoked directly or indirectly by the constructor of a subclass which overrides the getContextClassLoader or setContextClassLoader methods.  
    The priority of the newly created thread is set equal to the priority of the thread creating it, that is, the currently running thread. The method setPriority may be used to change the priority to a new value.  
    The newly created thread is initially marked as being a daemon thread if and only if the thread creating it is currently marked as a daemon thread. The method setDaemon may be used to change whether or not a thread is a daemon.

    Params:  
    `group`​ – the thread group. If null and there is a security manager, the group is determined by SecurityManager.getThreadGroup(). If there is not a security manager or SecurityManager.getThreadGroup() returns null, the group is set to the current thread's thread group.  
    `target`​ – the object whose run method is invoked when this thread is started. If null, this thread's run method is invoked.  
    `name`​ – the name of the new thread

    Throws:  
    SecurityException – if the current thread cannot create a thread in the specified thread group or cannot override the context class loader methods.

    ```java
    public Thread(ThreadGroup group, Runnable target, String name) {
    }
    ```
8. Allocates a new Thread object so that it has target as its run object, has the specified name as its name, and belongs to the thread group referred to by group, and has the specified stack size.  
    This constructor is identical to Thread(ThreadGroup, Runnable, String) with the exception of the fact that it allows the thread stack size to be specified. The stack size is the approximate number of bytes of address space that the virtual machine is to allocate for this thread's stack. The effect of the stackSize parameter, if any, is highly platform dependent.  
    On some platforms, specifying a higher value for the stackSize parameter may allow a thread to achieve greater recursion depth before throwing a StackOverflowError. Similarly, specifying a lower value may allow a greater number of threads to exist concurrently without throwing an OutOfMemoryError (or other internal error). The details of the relationship between the value of the stackSize parameter and the maximum recursion depth and concurrency level are platform-dependent. On some platforms, the value of the stackSize parameter may have no effect whatsoever.  
    The virtual machine is free to treat the stackSize parameter as a suggestion. If the specified value is unreasonably low for the platform, the virtual machine may instead use some platform-specific minimum value; if the specified value is unreasonably high, the virtual machine may instead use some platform-specific maximum. Likewise, the virtual machine is free to round the specified value up or down as it sees fit (or to ignore it completely).  
    Specifying a value of zero for the stackSize parameter will cause this constructor to behave exactly like the Thread(ThreadGroup, Runnable, String) constructor.  
    Due to the platform-dependent nature of the behavior of this constructor, extreme care should be exercised in its use. The thread stack size necessary to perform a given computation will likely vary from one JRE implementation to another. In light of this variation, careful tuning of the stack size parameter may be required, and the tuning may need to be repeated for each JRE implementation on which an application is to run.  
    Implementation note: Java platform implementers are encouraged to document their implementation's behavior with respect to the stackSize parameter.  

    Params:  
    `group`​ – the thread group. If null and there is a security manager, the group is determined by SecurityManager.getThreadGroup(). If there is not a security manager or SecurityManager.getThreadGroup() returns null, the group is set to the current thread's thread group.  
    `target`​ – the object whose run method is invoked when this thread is started. If null, this thread's run method is invoked.  
    `name`​ – the name of the new thread  
    `stackSize`​ – the desired stack size for the new thread, or zero to indicate that this parameter is to be ignored.

    Throws:  
    SecurityException – if the current thread cannot create a thread in the specified thread group  

    Since:  
    1.4

    ```java
    public Thread(ThreadGroup group, Runnable target, String name,
    }
    ```

分析 init 方法各参数的含义。

```java
/**
 * Initializes a Thread.
 *
 * @param g the Thread group
 * @param target the object whose run() method gets called
 * @param name the name of the new Thread
 * @param stackSize the desired stack size for the new thread, or
 *        zero to indicate that this parameter is to be ignored.
 * @param acc the AccessControlContext to inherit, or
 *            AccessController.getContext() if null
 * @param inheritThreadLocals if {@code true}, inherit initial values for
 *            inheritable thread-locals from the constructing thread
 */
private void init(ThreadGroup g, Runnable target, String name,
                  long stackSize, AccessControlContext acc,
                  boolean inheritThreadLocals) {
}
```

## Thread 类的 start() 方法解析

Causes this thread to begin execution; the Java Virtual Machine calls the run method of this thread.
The result is that two threads are running concurrently: the current thread (which returns from the call to the start method) and the other thread (which executes its run method).

It is never legal to start a thread more than once. In particular, a thread may not be restarted once it has completed execution.

```java
public synchronized void start() {
    /**
     * This method is not invoked for the main method thread or "system"
     * group threads created/set up by the VM. Any new functionality added
     * to this method in the future may have to also be added to the VM.
     *
     * A zero status value corresponds to state "NEW".
     */
    if (threadStatus != 0)
        throw new IllegalThreadStateException();

    /* Notify the group that this thread is about to be started
     * so that it can be added to the group's list of threads
     * and the group's unstarted count can be decremented. */
    group.add(this);

    boolean started = false;
    try {
        start0();
        started = true;
    } finally {
        try {
            if (!started) {
                group.threadStartFailed(this);
            }
        } catch (Throwable ignore) {
            /* do nothing. If start0 threw a Throwable then
              it will be passed up the call stack */
        }
    }
}
```

## Thread 类的 run() 方法

If this thread was constructed using a separate Runnable run object, then that Runnable object's run method is called; otherwise, this method does nothing and returns.

Subclasses of Thread should override this method.

```java
@Override
public void run() {
    if (target != null) {
        target.run();
    }
}
```