---
sidebar: auto
---

# Website Editor Guide

This guide describes how to edit or update content of the website [https://www.asterics.eu](https://www.asterics.eu).

----

Editors can improve, correct and adapt the contents of this website in two ways:

* online, or
* offline

## Online

You can edit the contents of this website online, or _remotely_, via GitHub.

The easiest way to locate the files in their source repository, is by clicking the link `Edit this page on GitHub` provided within every page of this website.
After clicking the link, a website at GitHub is opened, displaying the relevant file and allowing to perform the required changes and committing immediately.

![GitHub Editing](./github-edit.png "GitHub Editing")

<!-- The changes are merged in the source repositories and incorporated in the hosted website at a later point. -->
Testing the changes is not possible when editing the files remotely, but GitHub provides a simple preview function, which understands basic markdown syntax.

![GitHub Editing - Preview](./github-edit-preview.png "GitHub Editing - Preview")

Note, however, that GitHub supports only a **subset** of the markdown features described in the [markdown guide](/guide/markdown.html) of this website.
The preview does not show the same _style_ of the page as shown on [https://www.asterics.eu](https://www.asterics.eu).

After you finish editing a file, you can commit your changes to the repository.

![Github Editing - Commit](./github-edit-commit-explanation.png "GitHub Editing - Commit")

At the bottom of the page you will find the **Commit changes** section.
Perform the following steps to save your changes.

1. Enter your commit message
1. Optionally, provide a detailed description of the current changes
1. Define a GitHub profile as the author of the commit
1. Create a _new branch_ , if you don't have write access to the repository, and start a pull request
1. Propose the changes to the owners of the repository

### Uploading Files

GitHub allows you to upload files and pictures, by _dragging & dropping_, _selecting_, and _pasting_ them.

![GitHub Editing - Uploading Files](./github-edit-upload.png "GitHub Editing - Uploading Files")

The above screenshots shows GitHub's behavior when adding files (`editor.md`) and pictures (`github-edit.png`).
Files are stored in the respective repository directly.
However, pictures are stored in user specific locations.
You can keep (and reuse) this link, without the need to add the picture to the source repository.

::: tip Hint

Pictures uploaded to `githubusercontent.com` are added, by the developers of this website, to the source repository at a later point, when merging the changes to the main branch.

:::

Note, that you **can't** determine their path or location using this view.

Alternatively, you can open the folder in a repository via GitHub, like in the following screenshot, by clicking the directory.

![GitHub Editing - Upload Location](./github-upload-location.png "GitHub Editing - Upload Location")

Afterwards you can create new files or upload multiple files in the opened directory and thereby define the path or location of the uploaded files in the repository.

![GitHub Editing - Uploading Files](./github-upload.png "GitHub Editing - Uploading Files")

### Web-based editor

GitHub provides a [web-based editor](https://docs.github.com/en/codespaces/developing-in-codespaces/web-based-editor) that allows editing files remotely, but with a similar experience to working locally.

To edit the files of a GitHub repository online, you can press `.` on the main page of the repository.
GitHub displays the files inside the _web-based editor_, allowing you to edit several files at once, remotely.

![GitHub Web-based Editor](./github-dev-preview.png "GitHub Web-based Editor")

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

After finishing editing the files, you need to create a pull request or commit and push your changes to the source repository. Please check the [developer guide](/guide/docs.html) for this purpose.

## Publishing Updates

You can't publish new builds of the website by yourself.
The developers of this website integrate incoming pull request regularly.
After adding the pull request, the website is built and published with the most recent content.

