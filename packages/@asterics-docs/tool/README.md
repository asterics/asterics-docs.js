---
sidebar: auto
---

# Developer Guide

This guide describes all steps required to build the website at [https://www.asterics.eu](https://www.asterics.eu).

## Requirements

Following tools need to be setup on you machine:

- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [node](https://nodejs.org/en/download/)
- [yarn](https://classic.yarnpkg.com/en/docs/install/#debian-stable)

## Get Started

To build the website, execute following steps:

```bash
~ $ git clone https://github.com/asterics/asterics-docs.git
~ $ cd asterics-docs
~/asterics-docs $ yarn
```

::: tip Note

[`asterics-docs`](https://github.com/asterics/asterics-docs) contains three branches with predefined roles:

- `master`: branch used to build release at [https://www.asterics.eu](https://www.asterics.eu).
- `next`: branch used to build releast at [https://www.asterics.eu/next/](https://www.asterics.eu/next/).
- `gh-pages`: branch containing both releases.

:::

After executing these steps, the main repository is cloned and all required packages are installed.

::: tip
Consider cloning [`asterics-docs`](https://github.com/asterics/asterics-docs) inside a folder, that contains other AsTeRICS repostories for faster cloning of submodules (cf. parameter [reference](#configuration)).
:::

For the next steps, we have to use commands provided by [`@asterics-docs/tool`](#asterics-docs-tool), which includes cloning all repositories containing documentation for [https://www.asterics.eu](https://www.asterics.eu).
The configuration for `@asterics-docs/tool` is stored in `docs.config.js` (see [Configuration](#configuration) for details).

```bash
~/asterics-docs $ yarn docs init     # @asterics-docs/tool docs init
~/asterics-docs $ yarn docs setup    # @asterics-docs/tool docs setup
```

These steps will clone all repositories and copy specified files in a single folder, which is used to build the website.

```bash
~/asterics-docs $ yarn dev           # Start the development server
~/asterics-docs $ yarn build         # Build for deployment
```

After executing the last step, you can locate the finished build in folder `dist/`.

## @asterics-docs/tool

To install `@asterics-docs/tool` inside a project, run following command.

For **npm** run:

```bash
$ npm install @asterics-docs/tool    # local installation
$ npm install -g @asterics-docs/tool # global installation
```

For **yarn** run:

```bash
$ yarn add @asterics-docs/tool       # local installation
$ yarn add global @asterics-docs/tool # global installation
```

Aftwards you can run `@asterics-docs/tool`:

```bash
$ npx asterics-docs --help           # local installation
$ asterics-docs --help               # global installation
```

### Commands

`asterics-docs/tool` and supported commands provide a detailed help on parameters and options.

```bash
$ npx asterics-docs -h               # @asterics-docs/tool help instruction
$ npx asterics-docs <command> -h     # @asterics-docs/tool command help instruction
```

The [`package.json`](https://github.com/asterics/asterics-docs/blob/master/package.json) of `asterics-docs` contains a script to run `@asterics-docs/tool`.
Thus, the above commands can be expressed as follows (inside [`asterics-docs`](https://github.com/asterics/asterics-docs.git)):

```bash
$ yarn docs -h                       # @asterics-docs/tool help instruction
$ yarn docs <command> -h             # @asterics-docs/tool command help instruction
```

#### init

Clone all submodules of `asterics-docs`.

```bash
$ asterics-docs init                 # global installation
$ yarn docs init                     # inside asterics-docs
```

```bash
$ yarn docs init --help
asterics-docs init

Options:
  -h, --help    Show this help.
  -c, --config  Path to configuration file.
  --reference   Pull git submodules from remote (use --no-reference).
```

#### clean

Delete all submodules of `asterics-docs`.

```bash
$ asterics-docs clean                # global installation
$ yarn docs clean                    # inside asterics-docs
```

```bash
$ yarn docs clean --help
asterics-docs clean

Options:
  -h, --help    Show this help.
  -c, --config  Path to configuration file.
```

#### setup

Copy all files according to the configuration (see configuration parameter [`source`](#source) and [`sources`](#sources)).

```bash
$ asterics-docs setup                # global installation
$ yarn docs setup                    # inside asterics-docs
```

```bash
$ yarn docs setup --help
asterics-docs setup

Options:
  --version      Show version number.
  -h, --help     Show this help.
  -c, --config   Path to configuration file.
  -v, --verbose  Print all entries.
```

#### index

Show information on entry inside the source directory of `asterics-docs` (e.g., configuration, conflicts).

```bash
$ asterics-docs index                # global installation
$ yarn docs index README.md          # inside asterics-docs
```

```bash
$ yarn docs index --help
asterics-docs index [path]

Positionals:
  path  a path of the index

Options:
  -h, --help    Show this help.
  -c, --config  Path to configuration file.
  --conflicts   Show conflicting entries.
  --silent      Do not print indexed paths.
```

#### status

Show status of source directory of `asterics-docs`.

```bash
$ asterics-docs status               # global installation
$ yarn docs status                   # inside asterics-docs
```

```bash
$ yarn docs status -h
asterics-docs status

Options:
  -h, --help    Show this help.
  -c, --config  Path to configuration file.
```

#### add

Stage changes inside the source directory of `asterics-docs`.

```bash
$ asterics-docs add <file>           # global installation
$ yarn docs add <file>               # inside asterics-docs
```

```bash
$ yarn docs add --help
asterics-docs add <file>

Positionals:
  file  File/folder to add.

Options:
  -h, --help    Show this help.
  -c, --config  Path to configuration file.
```

::: danger
Commiting can only be done per repository.

Creating new files inside `asterics-docs` is currently not supported.
If you need to create new files, you have to copy those files manually or create them before running `yarn docs setup`.

Please don't stage changes of different repositories at the same time or new files.
:::

#### commit

Commit changes inside the source directory of `asterics-docs` and source repository.

```bash
$ asterics-docs commit <submodule> <message> # global installation
$ yarn docs commit <submodule> <message> # inside asterics-docs
```

```bash
$ yarn docs commit --help
asterics-docs commit <submodule> <message>

Positionals:
  submodule  Submodule selected for commit.
  message    Commit message.

Options:
  -h, --help    Show this help.
  -c, --config  Path to configuration file.
```

#### push

Push submodule changes to remote repository.

```bash
$ asterics-docs push [submodule] [branch] # global installation
$ yarn docs push [submodule] [branch] # inside asterics-docs
```

```bash
asterics-docs push [submodule] [branch]

Positionals:
  submodule  Submodule selected for update.
  branch     Branch of submodule to be updated (with rebase).

Options:
  --version     Show version number.
  -h, --help    Show this help.
  -c, --config  Path to configuration file.
```

::: tip
Specifying no submodule, results in all branches of all submodules beeing updated.

Specifying both submodule and branch, results in a pull (with rebase) followed by a push of specified branch.
:::

### Configuration

#### base

- Type: `string`
- Default: `/`

The base URL the site will be deployed at.
You will need to change this if you plan to deploy your site under a sub path.
If you plan to deploy your site to `https://www.asterics.eu/next/`, then you should set `base` to `"/next/"`.

#### port

- Type: `number`
- Default: `8080`

Specify the port to use fot the dev server.

#### source

- Type: `string`
- Default: `docs`

Specify the output directory of `@asterics-docs/tool` or input directory for `vuepress`.
Relative paths are resolved based on the result of `process.cwd()`.

#### dest

- Type: `string`
- Default: `dist`

Specify the output directory for `vuepress build`.
Relative paths are resolved based on the result of `process.cwd()`.

#### host

- Type: `string`
- Default: `https://www.asterics.eu`

Specify the host were page it deployed to.

#### versions

- Type: `array`
- Default: `["4.0", "3.0.1", "3.0", "2.8", "2.7", "2.6", "2.5", "2.3"]`

Specify the version you want to build.
First entry is always the current version and is not sub-pathed as others.

#### sources

- Type: `array`

The definition of `sourcesConfig` is as follows:

```ts
interface normalSourcesConfig {
  repository: string; // name of repository in .gitmodules
  reference: string; // reference location of git repository
  files: [filesConfig]; // file dependencies of submodule (for asterics-docs)
}

interface filesConfig {
  source: string; // source location (folder/file)
  destination: string; // target destination (asterics-docs)
  branch: string; // branch containing the required files, or
  versions: [string, string]; // version map, specifying branches for each version ([version, branch])
}

type sourceConfig = normalSourcesConfig;
```
