const { existsSync } = require("fs");
const { join, relative } = require("path");
const { clearScreenDown } = require("readline");

const { cursorSavePosition, cursorRestorePosition } = require("ansi-escapes");

const { ensureParentDir } = require("./util/fs.js");
const loadConfig = require("./util/config.js");
const { setupWorkingRepository } = require("./util/wdir.js");
const { getSubmodules } = require("./util/submodules.js");
const { loadIndex } = require("./util/index.js");
const { error, info } = require("./util/logger.js");

exports.command = "setup";
exports.aliases = [];
exports.describe = "Setup asterics-docs directory";
exports.builder = yargs => {
  yargs
    .usage("asterics-docs setup")
    .default("version", undefined)
    .options({
      h: { alias: "help", describe: "Show this help." },
      v: { alias: "verbose", describe: "Print all entries." }
    });
};
exports.handler = async args => {
  const config = loadConfig(args.config);
  if (destExists(config)) {
    process.stdout.write(
      error(`cannot setup asterics-docs. folder '${config.destination}' exists already.`)
    );
  } else {
    process.stdout.write(cursorSavePosition);
    await setupIndex(config, args);
    clearScreenDown(process.stdout);
    await setupWorkingRepository(config);
  }
};

function destExists({ destination }) {
  const path = join(process.cwd(), destination);
  return destination ? existsSync(path) : false;
}

async function setupIndex(config, args) {
  const submodules = getSubmodules(config).filter(submodule => submodule.config);
  const index = await loadIndex(config.versions, submodules, args);
  for (const file of index.all) {
    const dependencies = index.get(file);
    /* Skip entries without configured dependencies */
    if (dependencies.length < 1) continue;
    /* Default policy: use first entry only */
    const dep = dependencies[0];
    await load(file, dep, config, args);
  }
}

async function load(path, dependency, config, args) {
  const target = join(process.cwd(), config.destination, path);
  ensureParentDir(target);
  await copyFile(target, dependency, config, args);
}

async function copyFile(path, dependency, config, args) {
  try {
    const { version, repository, source } = dependency;
    const submodule = getSubmodule(repository, config);
    await dependency.dependency.copy(source, path, submodule, version);
    clearScreenDown(process.stdout);
    const p = relative(join(process.cwd(), config.destination), path);
    process.stdout.write(
      info(p, { end: args.verbose ? "\n" : cursorRestorePosition, label: "loading" })
    );
  } catch (e) {
    process.stdout.write(error(e));
  }
}

function getSubmodule(name, config) {
  return getSubmodules(config)
    .filter(submodule => submodule.config)
    .find(submodule => submodule.name === name);
}
