const loadConfig = require("./util/config.js");
const { getSubmodules } = require("./util/submodules.js");
const { loadIndex } = require("./util/index.js");
const {
  getWorkingRepository,
  hasChanges,
  logStaged,
  logUnstaged,
  logUntracked
} = require("./util/wdir.js");

exports.command = "status";
exports.aliases = [];
exports.describe = "Status of asterics-docs";
exports.builder = yargs => {
  yargs.usage("asterics-docs status").options({
    h: { alias: "help", describe: "Show this help." }
  });
};
exports.handler = async args => {
  const config = loadConfig(args.config);
  const docs = await getWorkingRepository(config);

  if (!docs) return;

  if (await hasChanges(docs)) {
    const index = await getIndex(config, args);
    await logStaged(docs, index);
    await logUnstaged(docs, index);
    await logUntracked(docs);
  } else {
    process.stdout.write("nothing to commit, working tree clean\n");
  }
};

async function getIndex(config, args) {
  const submodules = getSubmodules(config).filter(submodule => submodule.config);
  return await loadIndex(config.versions, submodules, args);
}
