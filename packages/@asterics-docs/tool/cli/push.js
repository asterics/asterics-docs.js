const { join } = require("path");
const { createInterface } = require("readline");
const { Writable } = require("stream");

const { Cred, Reference, Repository } = require("nodegit");
const { yellow } = require("chalk");

const loadConfig = require("./util/config.js");
const { getSubmoduleNames, getSubmodules } = require("./util/submodules.js");

exports.command = "push [submodule]";
exports.aliases = [];
exports.describe = "Push changes to remote repository";
exports.builder = yargs => {
  yargs
    .usage("asterics-docs push [submodule]")
    .positional("submodule", {
      describe: "Submodule selected for update.",
      type: "string",
      choices: getSubmoduleNames()
    })
    .options({
      h: { alias: "help", describe: "Show this help." }
    });
};
exports.handler = async args => {
  const config = loadConfig(args.config);
  const submodules = getSubmodules(config).filter(submodule => submodule.config);
  if (args.submodule) {
    const submodule = submodules.find(({ name }) => name === args.submodule);
    // await pullWithRebase(submodule);
    await push(submodule);
  } else {
    for (const submodule of submodules) {
      // await pullWithRebase(submodule);
      await push(submodule);
    }
  }
};

async function push(repository) {
  const location = join(process.cwd(), repository.path);
  const submodule = await Repository.open(location);
  const remote = await submodule.getRemote("origin");
  const refs = await submodule.getReferenceNames(Reference.TYPE.ALL);
  const refSpecs = refs.filter(ref => ref.match(/^refs\/heads\//)).map(ref => `${ref}:${ref}`);
  await remote.push(refSpecs, {
    callbacks: {
      credentials: async (url, username) => {
        process.stdout.write(`Enter credentials for ${yellow(repository.name)}.\n`);
        return Cred.userpassPlaintextNew(await askUsername(), await askPassword());
      }
    }
  });
  process.stdout.write(`\nPushed local branches to origin (${yellow(repository.name)})\n`);
  process.stdout.write("Done.\n");
}

async function askUsername() {
  const question = "Username: ";
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return await ask(rl, question);
}

async function askPassword() {
  const question = "Password: ";
  const mutable = new Writable({ write: (chunk, encoding, resolve) => resolve() });
  const rl = createInterface({ input: process.stdin, stdout: mutable, terminal: true });
  process.stdout.write(question);
  return await ask(rl, question);
}

function ask(interface, question, close = true) {
  return new Promise((resolve, reject) => {
    interface.question(question, answer => {
      if (close) interface.close();
      resolve(answer);
    });
  });
}
