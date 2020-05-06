---
sidebar: auto
---

# Editor Guide

This guide includes information for all editors of [https://www.asterics.eu](https://www.asterics.eu).

The following sections describe markdown syntax supported by the used [theme](https://www.npmjs.com/package/@asterics-docs/vuepress-theme-docs):

- [Markdown](#markdown): the supported markdown syntax.
- [Frontmatter](#frontmatter): the supported frontmatter properties.
- [Components](#components): available (custom) vue components.

## Markdown

All markdown files are compiled with [markdown-it](https://github.com/markdown-it/markdown-it) and a selection of default and custom plugins.
To experiment with the syntax that is supported by default, visit the [markdown-it demo](https://markdown-it.github.io/).

### Plugins (default)

- [markdown-it-sub](https://github.com/markdown-it/markdown-it-sub#readme)
- [markdown-it-sup](https://github.com/markdown-it/markdown-it-sup#readme)
- [markdown-it-footnote](https://github.com/markdown-it/markdown-it-footnote#readme)
- [markdown-it-deflist](https://github.com/markdown-it/markdown-it-deflist#readme)
- [markdown-it-abbr](https://github.com/markdown-it/markdown-it-abbr#readme)
- [markdown-it-emoji](https://github.com/markdown-it/markdown-it-emoji#readme)

### Plugins (custom)

- [markdown-it-checkbox](https://github.com/mcecot/markdown-it-checkbox#readme)  
  ::: tip Example

  ```
  [ ] unchecked
  [x] checked
  ```

  [ ] unchecked  
  [x] checked
  :::

* [markdown-it-imsize](https://github.com/tatsy/markdown-it-imsize#readme)  
  ::: tip Example

  ```
  ![AsTeRICS Logo](/img/asterics-logo.svg =200x200)
  ![AsTeRICS Logo](/img/asterics-logo.svg =400x400)
  ```

  ![AsTeRICS Logo](/img/asterics-logo.svg =200x200)  
  ![AsTeRICS Logo](/img/asterics-logo.svg =400x400)
  :::

* [markdown-it-kbd](https://github.com/jGleitz/markdown-it-kbd#readme)  
  ::: tip Example

  ```
  [[x]]
  [[Ctrl]]+[[Alt]]+[[Del]]
  ```

  [[x]]  
  [[Ctrl]]+[[Alt]]+[[Del]]
  :::

* [markdown-it-attrs](https://github.com/arve0/markdown-it-attrs#readme)  
  ::: tip Example

  ```
  # header {.style-me}
  paragraph *style me*{.red} more text
  ```

  `<h1 class="style-me">header</h1>`  
  `<p>paragraph <em class="red">style me</em> more text</p>`

  :::

* [markdown-it-fontawesome](https://github.com/nunof07/markdown-it-fontawesome#readme)  
  ::: tip Example
  ```
  Hello World! :fa-flag:
  Google :fab-google:
  GitHub :fab-github:
  ```
  Hello World! :fa-flag:  
  Google :fab-google:  
  GitHub :fab-github:
  :::

## Frontmatter

Vuepress processes markdown files containing YAML frontmatter blocks and supports a various properties out of the box (see [Vuepress Frontmatter](https://vuepress.vuejs.org/guide/frontmatter.html))
