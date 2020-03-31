const { join } = require("path");

const { validateShell } = require("./shell.js");
const { validateConfig } = require("./submodules.js");

module.exports = path => {
  const cwd = process.cwd();
  const config = require(`${join(cwd, path || "docs.config.js")}`);

  validateShell("git");
  validateConfig(config);

  return config;
};
