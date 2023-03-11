https://stylus.github.io/stylelint-stylus/rules/no-at-require.html

# stylelint配合插件在IDEA上检测Stylus语法

先安装插件

```bash
pnpm add stylelint stylelint-config-standard stylelint-stylus stylus -D
```

然后再IDEA开启

[https://www.jetbrains.com/help/idea/using-stylelint-code-quality-tool.html#ws_stylelint_configure](https://www.jetbrains.com/help/idea/using-stylelint-code-quality-tool.html#ws_stylelint_configure)

​`.stylelintrc.json`​

```json
{
  "extends": ["stylelint-config-standard", "stylelint-stylus/standard"],
  "rules": {
    "import-notation": "string",
    "string-quotes": "double",
    "selector-combinator-space-after": "always",
    "value-list-comma-space-before": "never",
    "value-list-comma-space-after": "always",
    "stylus/declaration-colon": "never",
    "stylus/pythonic": "always",
    "stylus/selector-list-comma": "never",
    "stylus/semicolon": "never",
    "stylus/single-line-comment": "always"
  }
}

```

