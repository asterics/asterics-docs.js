const { readFileSync, existsSync } = require("fs");
const { join, relative, resolve } = require("path");
const { exec } = require("child_process");

const { green, blue } = require("chalk");
const { cursorRestorePosition, eraseEndLine, cursorDown } = require("ansi-escapes");

const { SubModuleConfig } = require("./dependency.js");

class Submodule {
  constructor(name, path, url, config) {
    this.name = name;
    this.path = path;
    this.url = url;
    this.config = new SubModuleConfig(config);
  }
  init(position = 0, useReference) {
    return updateSubmodule(this, position, useReference).then(() => {
      return checkoutSubmodule(this, position).then(() => {
        return pullChanges(this, position);
      });
    });
  }
  update(position = 0) {
    return pull(this, position);
  }
  clean(position = 0) {
    return deleteSubmodules(this, position);
  }
  pullWithRebase(branch) {
    return checkoutSubmodule(this, 0, branch).then(() => {
      return pullWithRebase(this, branch);
    });
  }
}

function getSubmodules(config) {
  const r = /\[submodule\s?\"(.*?)\"\]\s*?path\s?=\s?(.*?)\s*?url\s?=\s?(.*\/(.*?)\.git)\s?/;
  const entries = new RegExp(r, "g");
  const data = new RegExp(r, "m");

  /* Read git submodules configuration from local repository */
  const gitConfig = readFileSync(join(process.cwd(), ".gitmodules"), "utf-8");
  let submodules = [];

  /* Convert submodules configuration to objects */
  if (gitConfig.match(entries))
    submodules = gitConfig
      .match(entries)
      .map((e) => e.match(data))
      .map((e) => ({ name: e[4], path: e[2], url: e[3] }))
      .map(({ name, path, url }) => {
        return new Submodule(
          name,
          path,
          url,
          config.sources.find(({ repository }) => repository === name)
        );
      });

  return submodules;
}

function getSubmoduleNames() {
  const r = /\[submodule\s?\"(.*?)\"\]\s*?path\s?=\s?(.*?)\s*?url\s?=\s?(.*\/(.*?)\.git)\s?/;
  const entries = new RegExp(r, "g");
  const data = new RegExp(r, "m");

  /* Read git submodules configuration from local repository */
  const gitConfig = readFileSync(join(process.cwd(), ".gitmodules"), "utf-8");
  let submodules = [];
  /* Convert submodules configuration to objects */
  if (gitConfig.match(entries))
    submodules = gitConfig
      .match(entries)
      .map((e) => e.match(data))
      .map((e) => ({ name: e[4], path: e[2], url: e[3] }))
      .map(({ name }) => name);

  return submodules;
}

function validateConfig(config) {
  const submodules = getSubmodules(config);
  /* Read configured repositories from provided `asterics-docs` configuration */
  const configSubmodules = config.sources.map(({ repository }) => repository);
  /* Test if all configured repositories exist in git's submodules configuration */
  for (const repository of configSubmodules) {
    if (!submodules.find(({ name }) => name === repository)) {
      console.log(`No submodule ${repository} exists in .gitmodules`);
    }
  }
}

function gitwd(path) {
  return `--git-dir=${path}/.git --work-tree=${path}`;
}

function updateSubmodule(submodule, position, useReference = true) {
  return new Promise(function(_resolve, reject) {
    const cwd = process.cwd();
    const path = join(cwd, submodule.path);
    const reference = submodule.config.reference;
    const ref =
      reference && useReference && referenceExists(reference)
        ? `--reference ${resolve(cwd, reference)}`
        : "";
    const cmd = `git ${gitwd(cwd)} submodule update --init --progress ${ref} ${path}`;
    const label = `Updating submodule ${green(submodule.name)}`;
    writeLine(`${label} ...`, position);
    const subprocess = exec(cmd, (error, stdout, stderr) => {
      if (error) reject(error);
      const line = `${label} finished.`;
      writeLine(line, position);
      _resolve({ stdout, stderr });
    });
    subprocess.stderr.on("data", (chunk) => processProgress(submodule, position, chunk));
  });
}

function referenceExists(reference) {
  const path = join(process.cwd(), reference);
  return existsSync(path);
}

function checkoutSubmodule(submodule, position = 0, branch = "master") {
  return new Promise(function(_resolve, reject) {
    const cwd = process.cwd();
    const path = join(cwd, submodule.path);
    console.log("DEBUG", branch);
    const cmd = `git ${gitwd(path)} checkout ${branch}`;
    const label = `Updating submodule ${green(submodule.name)}`;
    const line = `${label} finished. Checking out master`;
    writeLine(`${line} ...`, position);
    exec(cmd, (error, stdout, stderr) => {
      if (error) reject(error);
      writeLine(`${line} completed.`, position);
      _resolve({ stdout, stderr });
    });
  });
}

function pull(submodule, position) {
  return new Promise(function(_resolve, reject) {
    const cwd = process.cwd();
    const path = join(cwd, submodule.path);
    const cmd = `git ${gitwd(path)} pull --all`;
    const line = `Pulling recent changes of ${green(submodule.name)}`;
    writeLine(`${line} ...`, position);
    exec(cmd, (error, stdout, stderr) => {
      if (error) reject(error);
      writeLine(`${line} completed.`, position);
      _resolve({ stdout, stderr });
    });
  });
}

function pullWithRebase(submodule, branch) {
  return new Promise(function(_resolve, reject) {
    const cwd = process.cwd();
    const path = join(cwd, submodule.path);
    const cmd = `git ${gitwd(path)} pull --rebase origin ${branch}`;
    const line = `Pulling and rebasing recent changes of ${green(
      submodule.name
    )} on branch ${branch}`;
    writeLine(`${line} ...`);
    exec(cmd, (error, stdout, stderr) => {
      if (error) reject(error);
      writeLine(`${line} completed.`);
      _resolve({ stdout, stderr });
    });
  });
}

function pullChanges(submodule, position) {
  return new Promise(function(_resolve, reject) {
    const cwd = process.cwd();
    const path = join(cwd, submodule.path);
    const cmd = `git ${gitwd(path)} pull --all`;
    const label = `Updating submodule ${green(submodule.name)}`;
    const line = `${label} finished. Checking out master completed. Pulling recent changes`;
    writeLine(`${line} ...`, position);
    exec(cmd, (error, stdout, stderr) => {
      if (error) reject(error);
      writeLine(`${line} completed.`, position);
      _resolve({ stdout, stderr });
    });
  });
}

function processProgress(submodule, position, data) {
  const rReceive = /^Receiving objects:\s*([\d\.]*)%\s*\((.*)\/(.*)\)\,\s*([\d\.]*)\s(.*?)\s*\|\s*([\d\.]*)\s*(.*\/s)/m;
  const rResolve = /^Resolving deltas:\s*([\d\.]*)%\s*\((.*)\/(.*)\)/m;
  if (!(data.match(rReceive) || data.match(rResolve))) return;

  let line;
  const label = `Updating submodule ${green(submodule.name)}`;
  if (data.match(rReceive)) {
    const m = data.match(rReceive);
    line = `${label}: ${m[1]}% (${m[2]}/${m[3]}). ${m[4]} ${m[5]} at ${m[6]} ${m[7]}`;
  } else if (data.match(rResolve)) {
    const m = data.match(rResolve);
    line = `Resolving deltas of ${green(submodule.name)}: ${m[1]}% (${m[2]}/${m[3]})`;
  }
  writeLine(line, position);
}

function deleteSubmodules(submodule, position) {
  return new Promise((_resolve, reject) => {
    const cwd = process.cwd();
    const localPath = resolve(cwd, submodule.path);
    const gitPath = resolve(cwd, ".git/modules", submodule.name);
    const localP = blue(relative(cwd, localPath));
    const gitP = blue(relative(cwd, gitPath));
    const line = `Deleting submodule ${green(submodule.name)} at ${localP}, ${gitP}`;
    const cmd = `rm -rf ${localPath} ${gitPath}`;
    writeLine(line, position);
    exec(cmd, (error, stdout, stderr) => {
      if (error) reject(error);
      writeLine(`${line} completed.`, position);
      _resolve({ stdout, stderr });
    });
  });
}

function writeLine(line, position = 0, cb) {
  const pos = position > 0 ? cursorDown(position) : "";
  const single = cursorRestorePosition + pos + eraseEndLine + line;
  process.stdout.write(single, cb);
}

module.exports = { Submodule, getSubmodules, getSubmoduleNames, validateConfig };
