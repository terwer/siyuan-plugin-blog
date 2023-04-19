# zhi

🛍️ A siyuan-note theme with plugin and blog bundled

[中文版](README_zh_CN.md)

[![](https://img.shields.io/badge/api-docs-green)](https://zhi.terwer.space)
[![dev checks](https://img.shields.io/github/checks-status/terwer/zhi/dev?label=build)](https://github.com/terwer/zhi/tree/dev)
![version](https://img.shields.io/github/release/terwer/zhi.svg?style=flat-square)
![license](https://img.shields.io/badge/license-GPL-blue.svg?style=popout-square)

[![](https://img.shields.io/badge/build-assets-green)](https://github.com/terwer/zhi)
[![](https://img.shields.io/badge/theme-source-red)](https://github.com/terwer/zhi/tree/dev/packages/zhi-mini)
[![](https://img.shields.io/badge/dynamic-blog-blue)](https://github.com/terwer/zhi/tree/dev/packages/zhi-blog)
[![](https://img.shields.io/badge/static-blog-purple)](https://github.com/terwer/zhi/tree/dev/packages/zhi-blog-astro)

> ⚠️ WARNING 1: Attention: The `zhi` theme only supports the `2.7.6+` version of [siyuan-note](https://github.com/siyuan-note/siyuan) , and the plugin system only supports `2.8.1+`. Otherwise, you need to upgrade [siyuan-note](https://github.com/siyuan-note/siyuan) to a new version.

> ⚠️ WARNING 2: `1.0.0` is an available version in the early stage, and the function is not comprehensive yet. It is only used for testing and welcomes valuable opinions through issuing. Please refer to [core features](#core-features) for this version's characteristics.

> ⚠️ WARNING 3: The plugin system is set to `security mode` by default, and you need to click on the settings menu in the upper right corner to turn off the security mode before you can activate the plugin system.

> ⚠️ WARNING 4: Except for the theme's core plugins, all plugins are disabled by default and need to be enabled in the plugin list before the first use.

## Key benefits

- Integrated blog feature based on the Siyuan API

- No publishing, no configuration, ready to use out of the box

- Plugin system bundled, by design

## Quick start

You can download the `zhi` theme directly in the Market of siyuan-note, and then select the `zhi` theme
in `Settings` - `Appearance` - `Theme` to change the appearance of the notebook.

Note: `zhi` theme only supports siyuan-note `2.7.6+`, or you must upgrade siyuan-note first.

## Design Philosophy

-   The theme core should be kept lightweight and compact as much as possible.
-   Plugins should be used as much as possible to implement functions.
-   Plugin functions should be single-purpose to avoid brainless accumulation of functions.
-   Components should be kept as reusable as possible.

## Core Features

The theme is inspired by `Zhihu` but not limited to its style. The appearance optimization includes but is not limited
to:

-   Font style beautification, using `Open Sans` for English and `LXGW WenKai` for Chinese
-   Background color optimization, overall layout and spacing optimization
-   Code block beautification, similar to the Mac window style
-   It natively supports the plugin system and comes with many built-in plugins. The plugin system is supported by
    community developers.
    -   SourceNote publishing tool plugin
    -   Document image background automatic transparency plugin
    -   Blog plugin
-   It can handle both the theme and the preview. Installing the zhi theme is equivalent to installing an additional
    plugin system and an online blog.
    -   SPA blog homepage: http://127.0.0.1:6806/appearance/themes/zhi/web/blog/ <sup>simple</sup>
    -   SSR blog homepage: http://127.0.0.1:6806/appearance/themes/zhi/server/blog/ <sup>seo friendly</sup>
    -   Widget version of the blog management and publishing [Deprecated]
        homepage: http://127.0.0.1:6806/widgets/sy-post-publisher/blog/?from=siyuanNewWin

> Note: 🌹 The plugin system is provided by enthusiastic community developers. Please understand the relevant mechanisms in
> detail before using.

## Technical Roadmap

[tech](tech.md)

## Acknowledgments

Thanks to [zuoez02](https://github.com/zuoez02/siyuan-plugin-system) for providing the plugin system.