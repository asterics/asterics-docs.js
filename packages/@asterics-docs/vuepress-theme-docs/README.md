---
sidebar: auto
---

# Editor Guide

This guide describes how to edit or update content of the website [https://www.asterics.eu](https://www.asterics.eu).

----

Editors can improve, correct and adapt the contents of this website in two ways:

* offline, or
* online

## Offline

To edit the contents of this website offline, or _locally_, you need to download the [source repository](https://github.com/asterics/asterics-docs.git).
All required steps are described in the [developer guide](/guide/docs.html).

After cloning the source repository and installing all required tools, run following commands.

```bash
$ yarn docs init    # Initialize git submodules
$ yarn docs setup   # Create folder docs/ containing all files
$ yarn dev          # Build website and host files with the development server
```

::: tip Detailed Instructions
For details, please refer to the [developer guide](/guide/docs.html).
:::

With the last command, a development server is started hosting the files locally.
You should see a similar output:

```bash
success [13:13:42] Build 6b0cef finished in 400 ms! ( http://localhost:8080/ )
```

Afterwards you need to perform the desired changes within the files inside `docs/`.
When saving changes inside those files, a new build is triggered and the content displayed in the browser is updated, automatically.

After finishing editing the files, you need to create a pull request or commit and push your changes to the source repository.

## Online

Alternatively, you can edit the files used for this website online, or _remotely_.

The easiest way to locate the files in their source repository, is by clicking the link `Edit this page on GitHub` provided within every page of this website.
After clicking the link, a website at GitHub is opened, displaying the relevant file and allowing to perform the required changes and committing immediately.

The changes are merged in the source repositories and incorporated in the hosted website at a later point.
Testing the changes is not possible when editing the files remotely.

### Pictures

To add or upload new pictures to the relevant repositories, you don't need to upload/add these image separately before using them in the markdown file.
You can simply paste a copied image from the clipboard in the opened file.
GitHub uploads these pictures to a separate domain (https://user-images.githubusercontent.com/) and pastes a link to them inside the file, instead.
You can keep (and reuse) this link, without the need to add the image to the source repository.

Pictures uploaded to `githubusercontent.com` are included in the source repository, at a later point, when merging the changes to the main branch, by the developers of this website.

### Web-based editor

GitHub provides a [web-based editor](https://docs.github.com/en/codespaces/developing-in-codespaces/web-based-editor) that allows editing files remotely, but with a similar experience to working locally.

To edit the files of a GitHub repository online, you can press `.` on the main page of the repository.
GitHub displays the files inside the _web-based editor_, allowing you to edit several files at once, remotely.

