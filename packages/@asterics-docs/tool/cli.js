#!/usr/bin/env node

const { join } = require("path");
const yargs = require("yargs");

yargs
  .usage("asterics-docs <command> [options]")
  .wrap(yargs.terminalWidth() * 0.9)
  .commandDir(join(__dirname, "cli"))
  .help("h")
  .option("c", { alias: "config", describe: "Path to configuration file.", type: "string" })
  .epilog("Run asterics-docs <command> --help for detailed usage of given command.")
  .showHelpOnFail(true)
  .demandCommand()
  .parse();
