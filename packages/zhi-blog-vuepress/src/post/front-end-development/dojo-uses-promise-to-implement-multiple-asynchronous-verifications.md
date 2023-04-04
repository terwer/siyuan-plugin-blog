---
title: dojo利用promise实现多个异步校验
short_title: ''
description: 代码如下_敏感词过滤varpromiseall=checksenstivewords()_promiseallthen(function(results){consolelog(results)consolelog(consolelog(consolelog(if(results[]flag==true){tipfail({]replace(])replace()})_return_}if(results[]flag==true){tipfail({]replace(])replace()})_retur
date: 2022-11-26 21:30:51
category:
  - 前端开发
tag:
  - promise
  - dojo
  - js
article: true
timeline: false
---
代码如下：

```javascript
// 敏感词过滤
var promiseAll = checkSenstiveWords();
promiseAll.then(function (results) {
	// console.log("results=>", results)
	// console.log("v1=>", results[0].flag);
	// console.log("v2=>", results[1].flag);
	// console.log("v3=>", results[2].flag);

	if(results[0].flag == true){
		Tip.fail({
			"text": msg["errors.sensitive.word.warn"]
				.replace("{0}", lang["kmsMultidoc.kmsMultidocKnowledge.docSubject"])
				.replace("{1}", '<span style="color:#cc0000">' + results[0].senWords + '</span>')
		});
		return ;
	}
	if (results[1].flag == true) {
		Tip.fail({
			"text": msg["errors.sensitive.word.warn"]
				.replace("{0}", lang["kmsMultidocKnowledge.fdDescription"])
				.replace("{1}", '<span style="color:#cc0000">' + results[1].senWords + '</span>')
		});
		return;
	}
	if (results[2].flag == true) {
		Tip.fail({
			"text": msg["errors.sensitive.word.warn"]
				.replace("{0}", lang["kmsMultidoc.kmsMultidocKnowledge.docContent"])
				.replace("{1}", '<span style="color:#cc0000">' + results[2].senWords + '</span>')
		});
		return;
	}
	
	// 校验成功
	// do something
}, function () {
	Tip.fail({"text" : lang['mui.return.failure']});
})
```

具体的校验方法

```javascript
window.checkSenstiveWords = function () {
	var docSubject = document.getElementsByName("docSubject")[0].value;
	var fdDescription = document.getElementsByName("fdDescription")[0].value;
	var docContent = document.getElementsByName("docContent")[0].value;
	console.log("docSubject=>", docSubject);
	console.log("fdDescription=>", fdDescription);
	console.log("docContent=>", docContent);

	var suburl = util.formatUrl(self.senstiveValidateUrl);
	var subdata = {"content": encodeURIComponent(docSubject), formName: "kmsMultidocKnowledgeForm"};
	var docSubjectPromise = request.post(suburl, {data: subdata, method: 'POST', handleAs: 'json'});

	var desurl = util.formatUrl(self.senstiveValidateUrl);
	var desdata = {"content": encodeURIComponent(fdDescription), formName: "kmsMultidocKnowledgeForm"};
	var fdDescriptionPromise = request.post(desurl, {data: desdata, method: 'POST', handleAs: 'json'});

	var conurl = util.formatUrl(self.senstiveValidateUrl);
	var condata = {"content": encodeURIComponent(docContent), formName: "kmsMultidocKnowledgeForm"};
	var docContentPromise = request.post(conurl, {data: condata, method: 'POST', handleAs: 'json'});

	return all([docSubjectPromise, fdDescriptionPromise, docContentPromise])
}
```

import

```javascript
define([
	"dojo/_base/declare",
	 "mui/dialog/Tip",
	 "mui/form/validate/Validation",
	 "mui/i18n/i18n!:errors.sensitive.word.warn",
	 "mui/i18n/i18n!kms-multidoc:kmsMultidoc",
	 "dojo/topic", 
	 "dijit/registry",
	 "dojo/query",
	 "dojo/request",
	 "dojo/promise/all",
	 "mui/util",
	], function(declare,Tip, Validation, msg, lang,topic,registry,query,request,all,util) {

	return declare("kms.multidoc.edit", null,{
		validateUrl:'/kms/multidoc/kms_multidoc_knowledge/kmsMultidocKnowledge.do?method=checkAddSubject&fdId=!{fdId}&docSubject=!{docSubject}&cateId=!{cateId}',

		senstiveValidateUrl:'/sys/profile/sysCommonSensitiveConfig.do?method=getIsHasSensitiveword'
	
		// ...
		// 其他代码
	});
});
```