const loadConfig = require("./util/config.js");
const { getSubmodules } = require("./util/submodules.js");
const { loadIndex } = require("./util/index.js");

const { green, blue, yellow, red } = require("chalk");

exports.command = "index";
exports.aliases = [];
exports.describe = "Show indexed files";
exports.builder = yargs => {
  yargs
    .usage("asterics-docs index [path]")
    .positional("path", { describe: "a path of the index", type: "string" })
    .options({
      h: { alias: "help", describe: "Show this help." },
      conflicts: { describe: "Show conflicting entries.", type: "boolean" },
      silent: { describe: "Do not print indexed paths.", type: "boolean" }
    });
};
exports.handler = async args => {
  const [name, path = ""] = args["_"];
  const config = loadConfig(args.config);
  const submodules = getSubmodules(config).filter(submodule => submodule.config);
  const index = await loadIndex(config.versions, submodules, args);
  const filteredIndex = index.all.filter(e => e.startsWith(path));

  if (args.conflicts) {
    printConflicts(index, filteredIndex);
  } else if (!args.silent) {
    if (filteredIndex.length === 1) {
      printIndexEntry(index, filteredIndex[0]);
    } else {
      printIndex(filteredIndex);
    }
  }
};

function printIndexEntry(index, entry) {
  process.stdout.write(`${entry}\n`);
  const dependencies = index.get(entry);
  for (const [index, dependency] of dependencies.entries()) {
    const { version, source, repository } = dependency;
    const filter = dependency.dependency.filter;
    process.stdout.write(
      `  ${blue(index)}: ${yellow(source)}` +
        ` (${green(repository)}, ${version},` +
        ` config: {` +
        ` source: ${yellow(dependency.dependency.source)}` +
        `${filter ? `, filter: ${red(filter)}` : ""}` +
        ` }) \n`
    );
  }
}

function printIndex(index) {
  for (const path of index) {
    process.stdout.write(`${path}\n`);
  }
}

function printConflicts(index, selection) {
  const conflicts = selection.filter(e => index.get(e).length > 1);
  for (const conflict of conflicts) {
    printIndexEntry(index, conflict);
    //   const reasons = index.get(conflict);
    //   process.stdout.write(yellow(conflict) + "\n");
    //   for (const reason of reasons) {
    //     const branch = reason.dependency.getBranch(reason.version);
    //     process.stdout.write(` - ${green(reason.repository)} (${blue(branch)}) ${reason.source}\n`);
    //   }
  }
}
