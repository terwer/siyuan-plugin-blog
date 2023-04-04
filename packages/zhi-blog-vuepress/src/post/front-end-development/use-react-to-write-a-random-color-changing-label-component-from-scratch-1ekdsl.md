---
title: 从零开始使用react写一个随机变色的标签组件
short_title: ''
description: 从零开始使用react写一个随机变色的标签组件标签定义及引用color_设置标签颜色visible_标签是否显示trueclosable_标签是否可以关闭（点击默认关闭）falseonclose_关闭会调icon_iconimportreact{usestate}fromreact_importclassnamesfromclassnames_interfaceipropstag{color?_string_visbile?_boolean_closable?_boolean_onclose?_()=ic
date: 2022-08-05 17:50:29
category:
  - 前端开发
tag:
  - 标签
  - 关闭
  - 定义
  - 是否
  - 从零开始
article: true
timeline: false
---
# 从零开始使用react写一个随机变色的标签组件



## 标签定义及引用

```ts
/**
 *
 *  color: 设置标签颜色
 *  visible: 标签是否显示  true
 *  closable： 标签是否可以关闭（点击默认关闭） false
 *  onClose: 关闭会调
 *  icon: Icon
 */
import React, {useState} from 'react';
import classnames from 'classnames';

interface IPropsTag {
    color?: string;
    visbile?: boolean;
    closable?: boolean;
    onClose?: () => void;
    icon?: React.ReactNode;
    children?: any
}
```

定义标签接口并且引入相关依赖

## 标签实现

```ts
export const Tag: React.FC<IPropsTag> = (props) => {

    const {color, visbile = true, closable = false, onClose, icon} = props;

    const [showTag, setShowTag] = useState(visbile);

    const handleClose = () => {
        onClose && onClose();
        setShowTag(false);
    };

    return (
        <div
            className={classnames(tagStyles.OwnTag, color ? tagStyles.hasuserColor : '')}
            style={{
                display: !showTag ? 'none' : 'visible',
                color: '#333333',
                backgroundColor: color,
            }}
        >
            {icon && <span style={{marginRight: 4}}>{icon}</span>}
            <span className={tagStyles.TagTextOwn}>{props.children}</span>
            {closable && (
                <span className={tagStyles.closeBtn} onClick={handleClose}>
          x
        </span>
            )}
        </div>
    );
};
```

实现标签组件

## 样式

```css
.tagBox{
    margin-bottom: 10px;
}

.OwnTag {
    margin: 4px 16px 4px 0;
    padding: 0 4px;
    border-radius: 4px;
    cursor: default;
    display: inline-block;
    font-size: 14px;
    line-height: 20px;
    white-space: nowrap;
    background-color: #fafafa;
    border: 1px solid #d9d9d9;
}
.hasuserColor {
    color: #fff;
    background-color: transparent;
}
.TagTextOwn {
    font-weight: 600;
}
.closeBtnWhite {
    margin-left: 4px;
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
}
.closeBtn {
    margin-left: 4px;
    color: rgba(0, 0, 0, 0.8);
    cursor: pointer;
}
```

## 标签使用

```ts
export default function DefaultPostTags({tagstr}: { tagstr: string }) {
    const tags = tagstr.split(",")
    const colors = ["#cce7e0", "#dbdcf4", "#fcf4cc", "#fbd2d4"]

    return (
        <div className={tagStyles.tagBox}>
            {
                tags.map((tag) => {
                    const randomColor = colors[Math.floor(Math.random() * colors.length)];

                    return <Tag key={tag} color={randomColor} closable={false}>
                        {tag}
                    </Tag>
                })
            }
        </div>
    )
}
```

## 实际效果

![](https://img1.terwergreen.com/api/public/20220805175334.png)