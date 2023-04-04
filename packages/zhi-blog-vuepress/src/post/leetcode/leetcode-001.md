---
title: 判定字符是否唯一
short_title: ''
description: 【面试题库】001判定字符是否唯一。
date: 2022-05-05 20:53:53
category:
  - Leetcode
tag:
  - leetcode
article: true
timeline: false
---
# 【面试题库】001判定字符是否唯一

# leetcode

https://leetcode-cn.com/problems/is-unique-lcci/

# 最差解法
```
class Solution {
    public boolean isUnique(String astr) {
        char[] strArray = astr.toCharArray();
        for (int i = 0; i < strArray.length; i++) {
            char str = strArray[i];
            for (int j = 0; j < strArray.length; j++) {
                if (i == j) {
                    continue;
                }
                char newstr = strArray[j];

                if (str == newstr) {
                    return false;
                }
            }
        }
        return true;
    }
}
```

遍历次数 `n*n`

# 优化解法

```
class Solution {
    public boolean isUnique(String astr) {
        char[] strArray = astr.toCharArray();
        for (int i = 0; i < strArray.length; i++) {
            char str = strArray[i];
            for (int j = i + 1; j < strArray.length; j++) {
                char newstr = strArray[j];

                if (str == newstr) {
                    return false;
                }
            }
        }
        return true;
    }
}
```

https://leetcode-cn.com/submissions/detail/257308501/

第二轮遍历没必要从头开始，遍历次数

`1*(n-1) +2*(n-2)  + ...   (n-2)*2   + (n-1)*1 + n(n-n)`

# 优化解法2

```
import java.util.HashSet;

class Solution {
    public boolean isUnique(String astr) {
        char[] strArray = astr.toCharArray();

        Set set = new HashSet<>();
        for (char c : strArray) {
            set.add(String.valueOf(c));
        }

        if(set.size() == strArray.length){
            return true;
        }
        return false;
    }
}
```

https://leetcode-cn.com/submissions/detail/260226448/

利用set

# 优化解法3

```
import java.util.HashMap;

class Solution {
    public boolean isUnique(String astr) {
        char[] strArray = astr.toCharArray();

        Map map = new HashMap<>();
        for (char c : strArray) {
            map.put(c, c);
        }

        if (map.size() == strArray.length) {
            return true;
        }
        return false;
    }
}
```

https://leetcode-cn.com/submissions/detail/260234354/

利用map

# 优化解法4

```
class Solution {
    public boolean isUnique(String astr) {
        String result = astr;
        for (int i = 0; i < astr.length(); i++) {
            result = astr.replace(String.valueOf(astr.charAt(i)), "");

            if (result.length() != astr.length() - 1)
                return false;
        }
        return true;
    }
}
```

https://leetcode-cn.com/submissions/detail/260243878/

利用replace

# java
<iframe src="https://tool.lu/coderunner/embed/c30.html" width="100%" height="1320" frameborder="0" mozallowfullscreen webkitallowfullscreen allowfullscreen></iframe>

# c
参考java