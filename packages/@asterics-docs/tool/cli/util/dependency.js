const { writeFileSync } = require("fs");
const { join, relative } = require("path");

const { Repository } = require("nodegit");

class SubModuleConfig {
  constructor(config) {
    this.dependencies = [];
    if (config && config.reference) this.reference = config.reference;
    if (config && config.files)
      config.files.forEach((entry) => this.dependencies.push(new Dependency(entry)));
  }
}

class Dependency {
  constructor(config) {
    Object.assign(this, config);
  }
  hasEntries(versionLabel, isLatest) {
    const hasBranch = Boolean(this.branch);
    const hasVersionMap =
      Boolean(this.versions) && this.versions.find(([version]) => version === versionLabel);
    return isLatest ? hasBranch || hasVersionMap : hasVersionMap;
  }
  getBranch(versionLabel) {
    const [version, branch] = this.versions
      ? this.versions.find(([version, branch]) => version === versionLabel)
      : ["latest", "master"];
    return Boolean(this.branch) ? this.branch : branch;
  }
  async getFiles(submodule, versionLabel) {
    const location = join(process.cwd(), submodule.path);
    const branch = this.getBranch(versionLabel);
    const r = await Repository.open(location);
    const commit = await r.getBranchCommit(`origin/${branch}`);
    const entry = await commit.getEntry(this.source);
    let f;
    if (entry.isDirectory()) {
      const tree = await entry.getTree();
      f = await walk(this.source, this.filter, this.exclude, tree);
    } else {
      f = single(this.source, entry);
    }
    return f;
  }
  async copy(source, target, submodule, versionLabel) {
    const location = join(process.cwd(), submodule.path);
    const branch = this.getBranch(versionLabel);
    const r = await Repository.open(location);
    const commit = await r.getBranchCommit(`origin/${branch}`);
    const entry = await commit.getEntry(source);
    const blob = await entry.getBlob();
    const content = blob.isBinary() ? blob.content() : blob.toString();
    writeFileSync(target, content);
  }
}

async function walk(location, filter = /.*/, exclude = /a^/, tree) {
  return await new Promise(async (resolve) => {
    let a = [];
    await tree
      .walk()
      .on("end", (trees) => {
        trees = trees.filter((t) => t && filter.test(t.path()) && !exclude.test(t.path()));
        for (let tree of trees) {
          a.push(relative(location, tree.path()));
        }
        resolve(a);
      })
      .start();
  });
}

function single(location, treeEntry) {
  return [relative(location, treeEntry.path())];
}

module.exports = { SubModuleConfig };
