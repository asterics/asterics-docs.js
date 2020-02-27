module.exports = (options, ctx) => {
  const config = {
    extendCli(cli) {
      cli.command("docs [targetDir] [...command]", "").action((docs, command) => {
        console.log("Display info of your website", command);
      });
    }
  };

  return config;
};
