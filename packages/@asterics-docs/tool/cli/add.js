const loadConfig = require("./util/config.js");
const { getWorkingRepository } = require("./util/wdir.js");

exports.command = "add <file>";
exports.aliases = [];
exports.describe = "Add changes to asterics-docs";
exports.builder = yargs => {
  yargs
    .usage("asterics-docs add <file>")
    .positional("file", { describe: "file/folder to add.", type: "string" })
    .options({
      h: { alias: "help", describe: "Show this help." }
    });
};
exports.handler = async args => {
  const config = loadConfig(args.config);
  try {
    const docs = await getWorkingRepository(config);
    const docsIndex = await docs.refreshIndex();
    await docsIndex.addAll(args.file);
    await docsIndex.write();
  } catch (e) {
    console.error(err);
  }
};
