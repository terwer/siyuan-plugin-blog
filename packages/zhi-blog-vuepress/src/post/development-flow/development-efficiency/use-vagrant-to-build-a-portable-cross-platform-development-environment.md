---
title: 使用vagrant搭建可移植的跨平台的开发环境
short_title: ''
description: 使用vagrant搭建可移植的跨平台的开发环境。
date: 2022-05-09 10:44:13
category:
  - 过程改进
  - 开发效率
  - 开发流程
tag:
  - env
  - vagrant
article: true
timeline: false
---
# 使用vagrant搭建可移植的跨平台的开发环境

:::tip 文章更新历史

2022/05/25 feat:更新部分指令用法。

2022/05/12 feat:更新vbguest版本。

2022/05/11 feat:初稿。

:::

## 环境准备

安装虚拟机，比如 [VirtualBox](https://www.virtualbox.org/), [VMware Fusion](https://customerconnect.vmware.com/downloads/get-download?downloadGroup=FUS-PUBTP-2021H1)，或者 [Hyper-V](https://docs.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v).

## 安装vagrant

```bash
brew install vagrant
```

## 验证安装

```bash
➜  vagrant -v
Vagrant 2.2.19
➜  vagrant up
No usable default provider could be found for your system.

Vagrant relies on interactions with 3rd party systems, known as
"providers", to provide Vagrant with resources to run development
environments. Examples are VirtualBox, VMware, Hyper-V.

The easiest solution to this message is to install VirtualBox, which
is available for free on all major platforms.

If you believe you already have a provider available, make sure it
is properly installed and configured. You can see more details about
why a particular provider isn't working by forcing usage with
`vagrant up --provider=PROVIDER`, which should give you a more specific
error message for that particular provider.
```

如果无法启动，那是因为没有配置provider，vagrant需要依赖虚拟机，比如VirtualBox，或者VMware Fusion，VirtualBox直接安装就行，但是VMware Fusion需要自己配置provider，见后文。

## 安装vagrant的支持组件

[https://www.vagrantup.com/docs/providers/vmware](https://www.vagrantup.com/docs/providers/vmware)

```bash
# 0.25以上的VirtuaBox有bug
vagrant plugin uninstall vagrant-vbguest
vagrant plugin install vagrant-vbguest --plugin-version 0.24

# 专属VMWare工具
# vagrant plugin install vagrant-vmware-desktop
```

## 配置Vagrantfile

### 使用VMWare Fusion

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "centos/7"

  config.vm.provider "vmware_desktop" do |v|
    v.gui = true
    v.memory = "1024"
    v.linked_clone = false
  end
end
```

### 使用VirtualBox

```bash
Vagrant.configure("2") do |config|
  config.vm.box = "centos/7"

  config.vm.provider "virtualbox" do |v|
    v.gui = true
    v.memory = "1024"
    v.linked_clone = false
  end
end
```

### 切换环境

设置`VAGRANT_DEFAULT_PROVIDER`环境变量即可。

```bash
VAGRANT_DEFAULT_PROVIDER=vmware_desktop
```

或者

```bash
VAGRANT_DEFAULT_PROVIDER=virtualbox
```

## 运行

```bash
vagrant up
```

## 停止

```bash
vagrant halt
```

## 删除虚拟机

```bash
vagrant box remove "centos/7"
vagrant destroy 94038c4b667c4dcf8d712830979a69c5
vagrant box remove "centos/7"
```

## 查看状态

```bash
vagrant global-status
```

## ssh

```bash
vagrant ssh
# vagrant/vagrant
```