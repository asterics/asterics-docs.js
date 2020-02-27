module.exports = (options, ctx) => {
  const config = {
    extendCli(cli) {
      cli
        .command("logo [targetDir]", "")
        .option("--debug", "display info in debug mode")
        .action((dir = ".") => {
          console.log("Display info of your website");
        });
    }
  };

  return config;
};
