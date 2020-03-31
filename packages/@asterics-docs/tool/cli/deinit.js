const {
  cursorSavePosition,
  cursorRestorePosition,
  cursorHide,
  cursorShow,
  cursorDown
} = require("ansi-escapes");

const loadConfig = require("./util/config.js");
const { getSubmodules } = require("./util/submodules.js");

exports.command = "deinit";
exports.aliases = ["clean"];
exports.describe = "Deinitialize asterics-docs";
exports.builder = yargs => {
  yargs.usage("asterics-docs clean").options({
    h: { alias: "help", describe: "Show this help." }
  });
};
exports.handler = args => {
  const config = loadConfig(args.config);

  /* Delete submodules of repository */
  const submodules = getSubmodules(config);
  process.stdout.write(cursorSavePosition + "\n".repeat(submodules.length) + cursorHide);
  const deletes = submodules.map((submodule, position) => submodule.clean(position));
  Promise.all(deletes).then(() => {
    process.stdout.write(cursorShow);
    process.stdout.write(cursorRestorePosition + cursorDown(deletes.length));
    process.stdout.write(
      "asterics-docs deinitialization complete.\n" + cursorShow + cursorSavePosition
    );
  });
};
