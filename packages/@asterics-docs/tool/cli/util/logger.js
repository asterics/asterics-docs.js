const chalk = require("chalk");

const logger = (col, lbl) => {
  return (text, opts = { end: "\n", label: lbl }) => {
    return `${col(opts.label)} ${text}${opts.end}`;
  };
};

exports.warn = logger(chalk.yellow, "warning");
exports.info = logger(chalk.blue, "info");
exports.error = logger(chalk.red, "error");
exports.success = logger(chalk.green, "success");
exports.message = logger(chalk.white, "message");
