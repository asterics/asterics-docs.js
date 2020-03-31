const {
  cursorSavePosition,
  cursorRestorePosition,
  cursorHide,
  cursorShow,
  cursorDown
} = require("ansi-escapes");

const loadConfig = require("./util/config.js");
const { getSubmodules } = require("./util/submodules.js");

exports.command = "init";
exports.aliases = [];
exports.describe = "Initialize asterics-docs";
exports.builder = yargs => {
  yargs.usage("asterics-docs init").options({
    h: { alias: "help", describe: "Show this help." },
    reference: {
      describe: "Pull git submodules from remote (use --no-reference).",
      type: "boolean",
      default: true
    }
  });
};
exports.handler = args => {
  const config = loadConfig(args.config);

  /* Initialize and update submodules of repository */
  const submodules = getSubmodules(config);
  process.stdout.write(cursorSavePosition + "\n".repeat(submodules.length) + cursorHide);
  const updates = submodules.map((submodule, position) => submodule.init(position, args.reference));
  Promise.all(updates).then(() => {
    process.stdout.write(cursorRestorePosition + cursorDown(updates.length));
    process.stdout.write("asterics-docs initialization complete.\n" + cursorShow);
  });
};
