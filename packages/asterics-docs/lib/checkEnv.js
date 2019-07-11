"use strict";

/*
 * Module dependencies.
 */
const { chalk, semver } = require("@asterics-docs/shared-utils");

/*
 * Expose checkEnv function.
 */
module.exports = function checkEnv(pkg) {
  const requiredVersion = pkg.engines.node;

  if (!semver.satisfies(process.version, requiredVersion)) {
    process.stdout.write(
      chalk.red(
        `\n[asterics-docs] minimum Node version not met:` +
          `\nYou are using Node ${process.version}, but asterics-docs ` +
          `requires Node ${requiredVersion}.\nPlease upgrade your Node version.\n\n`
      )
    );
    process.exit(1);
  }
};
