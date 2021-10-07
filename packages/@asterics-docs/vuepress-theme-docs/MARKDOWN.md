---
sidebar: auto
---

# Website Markdown Guide

This guide describes the supported markdown syntax provided by the [theme](https://www.npmjs.com/package/@asterics-docs/vuepress-theme-docs) of the [https://www.asterics.eu](https://www.asterics.eu):

- [Markdown](#markdown): supported markdown syntax.
- [Frontmatter](#frontmatter): supported frontmatter properties.
- [Layouts](#layouts): available (custom) layouts.
- [Global Components](#global-components): available (custom) vue components.

All markdown files are compiled with [markdown-it](https://github.com/markdown-it/markdown-it) and a selection of default and custom plugins.
To experiment with the supported syntax visit [markdown-it demo](https://markdown-it.github.io/).

## Plugins (default)

- [markdown-it-sub](https://github.com/markdown-it/markdown-it-sub#readme)
- [markdown-it-sup](https://github.com/markdown-it/markdown-it-sup#readme)
- [markdown-it-footnote](https://github.com/markdown-it/markdown-it-footnote#readme)
- [markdown-it-deflist](https://github.com/markdown-it/markdown-it-deflist#readme)
- [markdown-it-abbr](https://github.com/markdown-it/markdown-it-abbr#readme)
- [markdown-it-emoji](https://github.com/markdown-it/markdown-it-emoji#readme)

## Plugins (custom)

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
  
## VuePress Markdown Extensions

The vuepress theme provides the markdown extensions described above, see [markdown extensions](https://vuepress.vuejs.org/guide/markdown.html).

For example you can create ```custom containers``` rendered as green info, yellow warning or red warning. You can also define custom titles for the boxes.

### Input

```
::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::

::: details
This is a details block, which does not work in IE / Edge
:::
```

### Output

::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::

::: details
This is a details block, which does not work in IE / Edge
:::

For more information, see [Custom Containers](https://vuepress.vuejs.org/guide/markdown.html#custom-containers).

## Model Links

When describing a text related to a certain AsTeRICS model file, it is good practice to directly link to that file in the AsTeRICS github repository. This can be done using the **online WebACS application** and the openFile query parameter which must contain the URL of the model file that should be opened within the WebACS application. 
See example below:

```
[Single Switch Model](http://webacs.asterics.eu/?areBaseURI=http://127.0.0.1:8081&openFile=https://raw.githubusercontent.com/asterics/AsTeRICS/master/bin/ARE/models/useCaseDemos/mouseControl/crosshairCursorControl_1key.acs)
```
This will be rendered as a normal link opening the model file in the WebACS application:

[Single Switch Model](http://webacs.asterics.eu/?areBaseURI=http://127.0.0.1:8081&openFile=https://raw.githubusercontent.com/asterics/AsTeRICS/master/bin/ARE/models/useCaseDemos/mouseControl/crosshairCursorControl_1key.acs)

The value of ```openFile``` must be replaced by the raw link of the model file on github. To get the link, navigate to the model file in the github repository and 

1. Open the file by clicking on it
2. Click on the Raw button.
3. Copy the URL in the browser address bar. It should start with: https://raw.githubusercontent.com/asterics/AsTeRICS/....
  
## Frontmatter

VuePress processes markdown files containing [YAML](https://yaml.org/) frontmatter blocks and supports a various properties out of the box (see [VuePress Frontmatter](https://vuepress.vuejs.org/guide/frontmatter.html)).
Here is a short example, for further details please refer to the provided links.

You can activate an automatic sidebar or turn it off completely for single pages using frontmatter properties:

```md
---
sidebar: auto   # Auto generated sidebar based on page content
sidebar: false  # Turn off sidebar
---

# Hello World

...
```

### Predefined Variables

- [title](https://vuepress.vuejs.org/guide/frontmatter.html#title)
- [lang](https://vuepress.vuejs.org/guide/frontmatter.html#lang)
- [description](https://vuepress.vuejs.org/guide/frontmatter.html#description)
- [layout](https://vuepress.vuejs.org/guide/frontmatter.html#layout)
- [permalink](https://vuepress.vuejs.org/guide/frontmatter.html#permalink)
- [metaTitle](https://vuepress.vuejs.org/guide/frontmatter.html#metatitle)
- [meta](https://vuepress.vuejs.org/guide/frontmatter.html#meta)

### Predefined Variables Powered by Default Theme

- [navbar](https://vuepress.vuejs.org/guide/frontmatter.html#navbar)
- [sidebar](https://vuepress.vuejs.org/guide/frontmatter.html#sidebar)
- [prev](https://vuepress.vuejs.org/guide/frontmatter.html#prev)
- [next](https://vuepress.vuejs.org/guide/frontmatter.html#next)
- [search](https://vuepress.vuejs.org/guide/frontmatter.html#search)
- [tags](https://vuepress.vuejs.org/guide/frontmatter.html#tags)

### Predefined Variables Powered by AsTeRICS Docs Theme

No additional global frontmatter variables defined.

## Layouts

### Home

Layout `Home` is used for building the [start page](/) of [https://www.asterics.eu](https://www.asterics.eu).

```md
---
layout: Home
title: Home
---
```

It uses [Markdown Slots](https://vuepress.vuejs.org/guide/markdown-slot.html#markdown-slot) for the jumbotron.
Some of the content is exposed to markdown and can be changed in the file directly.

```md
::: slot jumbotron

<Header>AsTeRICS</Header>
<Subtitle>Create Customized Low-Cost Assistive Technologies for People with Disabilities.</Subtitle>

<ActionGroup>
<Label>Are you looking for special solutions to use a computer, control your environment or play games?</Label>
<Actions>
  <Action path="/solutions/">Discover Solutions</Action>
  <Action path="/get-started/" dark>Get Started</Action>
</Actions>
</ActionGroup>
:::
```

## Global Compontents

VuePress allows [using vue components in markdown](https://vuepress.vuejs.org/guide/using-vue.html) files.
This theme provides some (globally available) vue components, which can be used throughout the documentation.

### Use Cases

Use cases displayed on the [start page](/) are created using component `UseCases` and `UseCase`.

```md
<UseCases>
  <UseCase
    title="Accessible Computer Control"
    media="/assets/img/harry-shutterstock_213119035.jpg">Control your computer by switches, head movements or eyetracking, depending on your capabilities.</UseCase>
  <UseCase
    ...
  >...</UseCase>
  <UseCase
  title="Accessible Music"
  media="https://www.youtube.com/watch?v=3_8TifCj0aU">Generate sounds or play adapted music instruments.</UseCase>
</UseCases>
```

A slideshow for several use cases is created by wrapping `UseCase` components in a `UseCases` component.

#### link

- Type: `string`
- Default: `#`

Hyperlink to link to.

#### media

- Type: `string`
- Default: `null`

Media (image, video) to display.

::: warning Note
Currently, only [YouTube :fab-youtube:](https://www.youtube.com/) videos are supported.
:::

#### title

- Type: `string`
- Default: `""`

Title of use case.

#### stop

- Type: `boolean`
- Default: `false`

Stop running videos on slide change (only for slideshows).

### Solutions

Solutions displayed on the [solutions page](/solutions/) are created using component `Solutions` and `Solution`.

```md
<Solutions>
  <Solution
    title="Camera Mouse"
    category="Computer Control"
    os="Windows,Linux,macOS"
    badges="Webcam"
    media="/assets/img/face-shutterstock_717365779.jpg"
    model="https://www.asterics.eu/webapps/asterics-camerainput-cameramouse/models/XFaceTrackerMouse(WLM).acs"
    webapp="https://www.asterics.eu/webapps/asterics-camerainput-cameramouse/"
    docs="/solutions/Camera-Mouse.html">Mouse control according to your head movements with configurable settings.</Solution>
    <Solution
      ...
    >...</Solution>
</Solutions>
```

A slideshow for several solutions is created by warpping `Solution` components in a `Solutions` component.

#### category

- Type: `string`
- Default: `""`

The category of the solution.

#### title

- Type: `string`
- Default: `""`

The title of the solution.

#### os

- Type: `string`
- Default: `""`

Operating systems the solution is running on (comma separated).

#### badges

- Type: `string`
- Default: `null`

Badges to display for the solution.

#### media

- Type: `string`
- Default: `null`

Media (image, video) to display.

::: warning Note
Currently, only [YouTube :fab-youtube:](https://www.youtube.com/) videos are supported.
:::

#### model

- Type: `string`
- Default: `null`

Link to AsTeRICS model file to start for the solution.

#### grid

- Type: `string`
- Default: `null`

AsTeRICS Grid to open for the solution.

::: warning Note
Property `model` has precedence over `grid`.
Don't specify `model` for grid solutions.
:::

#### webapp

- Type: `string`
- Default: `null`

Link to a web application provided for a solution.

#### docs

- Type: `string`
- Default: `null`

Link to documentation of used plugin in a solution.

### Plugins Search

The plugin search display on the plugin overview page is created using component `PluginsSearch`.

```md
<ClientOnly>
  <PluginsSearch/>
</ClientOnly>
```

There are no properties available for this component.
However, `PluginSearch` uses frontmatter properties which can be specified in the plugin documentation.

```md
---
title: AndroidPhoneControl
subcategory: Phone Interface
image: /plugins/actuators/android.svg
---
```

#### subcategory

- Type: `string`
- Default: `null`

Sub category of the plugin.

#### featured

- Type: `boolean`
- Default: `false`

Diplay plugin in featured selection.

#### image

- Type: `string`
- Default: `null`

Image in search overview for the plugin.

::: tip Note
If no `image` or FontAwesome icon (`fa-icon`, `fas-icon`, `far-icon`, `fab-icon`) is specified, the AsTeRICS logo is displayed instead.
:::

#### fa-icon

- Type: `string`
- Default: `null`

[FontAwesome](https://fontawesome.com/) ([solid](https://fontawesome.com/icons?d=gallery&s=solid&m=free)) icon.

#### fas-icon

- Type: `string`
- Default: `null`

FontAwesome ([solid](https://fontawesome.com/icons?d=gallery&s=solid&m=free)) icon.

#### far-icon

- Type: `string`
- Default: `null`

FontAwesome ([regular](https://fontawesome.com/icons?d=gallery&s=regular&m=free)) icon.

#### fab-icon

FontAwesome ([brand](https://fontawesome.com/icons?d=gallery&s=brands&m=free)) icon.
