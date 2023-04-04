---
title: 国际化
short_title: ''
description: 国际化安装vuecli使用下面命令vueaddin然后可能会报错typeerror__ctxtisnotafunction解决办法在创建国际化组件时加上一个属性globalinjection_true默认位于srcinjs本地国际化最新版本还支持本地文件国际化使用方法如下_import{definecomponent}fromvueimport{usein}fromvueinexportdefaultdefinecomponent({name_helloinsetup(){const{t}=usein({
date: 2022-07-23 10:04:58
category:
  - 前端开发
tag:
  - 国际化
  - 使用
  - 本地
  - 语言选择
  - 安装
article: true
timeline: false
---
# 国际化



## 安装

Vue-Cli3 使用下面命令

```bash
vue add i18n
```

然后可能会报错

```bash
TypeError: _ctx.$t is not a function 
```

解决办法

在创建国际化组件时，加上一个属性

```bash
globalInjection: true,
```

默认位于/src/i18n.js

## 本地国际化

最新版本还支持本地文件国际化，使用方法如下：

```html
<template>
  <p>{{ t('hello') }}</p>
</template>

<script>
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'HelloI18n',
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local'
    })

    // Something todo ..

    return { t }
  }
})
</script>

<i18n>
{
  "en": {
    "hello": "Hello i18n in SFC!"
  }
}
</i18n>
```

## 语言选择

添加语言选择功能

```html
<template>
  <div class="locale-changer">
    <el-form label-width="120px">
      <el-form-item label="语言选择">
        <el-select placeholder="请选择语言" v-model="$i18n.locale" @change="langChanged">
          <el-option :key="i" v-for="(lang, i) in langs" :label="lang.label" :value="lang.value"/>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'locale-changer',
  data() {
    return {
      langs: [
        {
          value: 'zh_CN',
          label: "简体中文"
        },
        {
          value: 'en_US',
          label: "English"
        }
      ]
    }
  },
  methods: {
    langChanged(lang) {
      console.log("langChanged=>", lang);
      localStorage.Lang = lang;
    }
  },
  mounted() {
    if (localStorage.Lang != null) this.$i18n.locale = localStorage.Lang;
  }
}
</script>
```

参考

[https://github.com/intlify/vue-i18n-next/issues/350](https://github.com/intlify/vue-i18n-next/issues/350)

[https://stackoverflow.com/questions/56854403/vue-i18n-how-to-keep-language-after-refresh-access-i18n-locale-in-js-runtime](https://stackoverflow.com/questions/56854403/vue-i18n-how-to-keep-language-after-refresh-access-i18n-locale-in-js-runtime)