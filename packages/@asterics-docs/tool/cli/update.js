const {
  cursorSavePosition,
  cursorRestorePosition,
  cursorHide,
  cursorShow,
  cursorDown
} = require("ansi-escapes");

const loadConfig = require("./util/config.js");
const { getSubmodules } = require("./util/submodules.js");

exports.command = "update";
exports.aliases = [];
exports.describe = "Update submodules";
exports.builder = yargs => {
  yargs.usage("asterics-docs update").options({
    h: { alias: "help", describe: "Show this help." }
  });
};
exports.handler = args => {
  const config = loadConfig(args.config);

  /* Pull recent changes of submodules */
  const submodules = getSubmodules(config);
  process.stdout.write(cursorSavePosition + "\n".repeat(submodules.length) + cursorHide);
  const updates = submodules.map((submodule, position) => submodule.update(position));
  Promise.all(updates).then(() => {
    process.stdout.write(cursorRestorePosition + cursorDown(updates.length));
    process.stdout.write("asterics-docs submodules updated.\n" + cursorShow);
  });
};
