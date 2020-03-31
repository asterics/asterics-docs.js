const { existsSync, mkdirSync } = require("fs");
const { join, dirname, isAbsolute } = require("path");

function ensureParentDir(path) {
  try {
    const parent = dirname(path);
    if (!existsSync(parent)) {
      mkdirp(parent);
    }
  } catch (e) {
    process.stdout.write(error(e));
  }
}

function mkdirp(...directories) {
  for (let directory of directories) {
    if (!isAbsolute(directory)) continue;
    let parent = join(directory, "..");
    if (parent !== join("/") && !existsSync(parent)) mkdirp(parent);
    if (!existsSync(directory)) mkdirSync(directory);
  }
}

module.exports = { ensureParentDir, mkdirp };
