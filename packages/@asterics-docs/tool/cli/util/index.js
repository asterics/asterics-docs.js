const { join } = require("path");

const { green, blue, yellow } = require("chalk");

const { warn } = require("./logger.js");

class Index {
  constructor() {
    this.map = new Map();
  }
  get all() {
    return Array.from(this.map.keys());
  }
  get conflicts() {
    return Array.from(this.map.entries()).filter(([key, value]) => value.length > 1);
  }
  get submodules() {
    return Array.from(this.map.values())
      .map(([first]) => first)
      .map(({ repository }) => repository)
      .filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
  }
  get(path) {
    return this.map.get(path);
  }
  resolve(path) {
    return this.map.get(path) ? this.map.get(path)[0] : {};
  }
  add(path, dependency) {
    if (this.map.has(path)) this.map.get(path).push(dependency);
    else this.map.set(path, [dependency]);
  }
  async update(version, submodule, isLatest, options) {
    for (const dependency of submodule.config.dependencies) {
      if (dependency.hasEntries(version, isLatest)) {
        try {
          let files = await dependency.getFiles(submodule, version);
          for (const file of files) {
            const target = isLatest
              ? join(dependency.destination, file)
              : join(version, dependency.destination, file);
            this.add(target, {
              repository: submodule.name,
              source: join(dependency.source, file),
              version,
              dependency
            });
          }
        } catch (e) {
          process.stderr.write(
            warn(
              `Please check the configuration in ${blue(options.config || "docs.config.js")}. ` +
                `Files at ${yellow(dependency.source)} (${green(submodule.name)}` +
                `, at ${blue(dependency.getBranch(version))}) could not be resolved.`
            )
          );
        }
      }
    }
  }
}

function loadIndex(versions, submodules, options) {
  return new Promise(async (resolve, reject) => {
    const index = new Index();
    for (const [idx, version] of versions.entries()) {
      const isLatest = idx === 0;
      for (const submodule of submodules) {
        await index.update(version, submodule, isLatest, options);
      }
    }
    resolve(index);
  });
}

module.exports = { Index, loadIndex };
