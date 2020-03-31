const loadConfig = require("./util/config.js");
const { error } = require("./util/logger.js");
const { getSubmoduleNames, getSubmodules } = require("./util/submodules.js");
const { loadIndex } = require("./util/index.js");
const {
  commit,
  commitWorkingRepository,
  getWorkingRepository,
  hasMoreSubmodulesStaged,
  hasUntracked
} = require("./util/wdir.js");

exports.command = "commit <submodule> <message>";
exports.aliases = [];
exports.describe = "Commit files of asterics-docs (to submodules)";
exports.builder = yargs => {
  yargs
    .usage("asterics-docs commit <submodule> <message>")
    .positional("submodule", {
      describe: "Submodule selected for commit.",
      type: "string",
      choices: getSubmoduleNames()
    })
    .positional("message", { describe: "Commit message." })
    .options({
      h: { alias: "help", describe: "Show this help." }
    });
};
exports.handler = async args => {
  const config = loadConfig(args.config);
  const docs = await getWorkingRepository(config);
  const index = await getIndex(config, args);

  /* Verify if more than one submodule is staged */
  if (await hasMoreSubmodulesStaged(docs, index)) {
    process.stdout.write(
      error(
        "Committing to multiple submodules not supported. Use 'git reset HEAD -- <file>' to unstage files."
      )
    );
  } else {
    /* Verify if any new files were created */
    if (await hasUntracked(docs)) {
      process.stdout.write(
        error(
          "Committing new files not supported. Use 'git reset HEAD -- <file>' to unstage files."
        )
      );
    } else {
      try {
        await commit(docs, index, config, args);
        await commitWorkingRepository(docs, index, config, args);
      } catch (e) {
        console.error(e);
      }
    }
  }
};

async function getIndex(config, args) {
  const submodules = getSubmodules(config).filter(submodule => submodule.config);
  return await loadIndex(config.versions, submodules, args);
}
