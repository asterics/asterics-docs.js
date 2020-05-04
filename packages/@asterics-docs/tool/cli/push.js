const { join } = require("path");
const { createInterface } = require("readline");
const { Writable } = require("stream");

const { Cred, Enums, Reference, Repository } = require("nodegit");
const { yellow } = require("chalk");
const {
  cursorSavePosition,
  cursorRestorePosition,
  cursorHide,
  cursorShow,
} = require("ansi-escapes");

const loadConfig = require("./util/config.js");
const { getSubmoduleNames, getSubmodules } = require("./util/submodules.js");

exports.command = "push [submodule] [branch]";
exports.aliases = [];
exports.describe = "Push changes to remote repository";
exports.builder = (yargs) => {
  yargs
    .usage("asterics-docs push [submodule] [branch]")
    .positional("submodule", {
      describe: "Submodule selected for update.",
      type: "string",
      choices: getSubmoduleNames(),
    })
    .positional("branch", {
      describe: "Branch of submodule to be updated (with rebase)",
      type: "string",
    })
    .options({
      h: { alias: "help", describe: "Show this help." },
    });
};
exports.handler = async (args) => {
  const config = loadConfig(args.config);
  const submodules = getSubmodules(config).filter((submodule) => submodule.config);
  process.stdout.write(`Enter credentials\n`);
  const name = await askUsername();
  const pwd = await askPassword();
  if (args.submodule) {
    const submodule = submodules.find(({ name }) => name === args.submodule);
    if (args.branch) {
      process.stdout.write("\n" + cursorSavePosition + cursorHide);
      await submodule.pullWithRebase(args.branch);
      process.stdout.write(cursorRestorePosition + cursorShow);
      await pushBranchChanges(submodule, args.branch, name, pwd);
    } else {
      await pushChanges(submodule, name, pwd);
    }
  } else {
    for (const submodule of submodules) {
      await pushChanges(submodule, name, pwd);
    }
  }
};

// TODO: continue
//
// - https://github.com/libgit2/libgit2sharp/blob/master/LibGit2Sharp/RemoteCallbacks.cs
// - https://www.nodegit.org/api/remote/
// - https://libgit2.org/libgit2/#HEAD
async function pushChanges(repository, name, pwd) {
  const location = join(process.cwd(), repository.path);
  const submodule = await Repository.open(location);
  const remote = await submodule.getRemote("origin");
  const refs = await submodule.getReferenceNames(Reference.TYPE.ALL);
  const refSpecs = refs.filter((ref) => ref.match(/^refs\/heads\//)).map((ref) => `${ref}:${ref}`);
  // const refSpecs = "/refs/heads/*:refs/heads/*";
  process.stdout.write(`\nPushing changes for ${yellow(repository.name)}...\n`);
  try {
    await remote.connect(Enums.DIRECTION.PUSH, {
      credentials: function(/*url, username*/) {
        return Cred.userpassPlaintextNew(name, pwd);
      },
    });
    await remote.push(refSpecs, {
      callbacks: {
        credentials: function(/*url, username*/) {
          return Cred.userpassPlaintextNew(name, pwd);
        },
        /*pushTransferProgress: function(current, total, bytes, payload) {
          console.log({ current, total, bytes, payload });
        },
        pushUpdateReference: function(name, status, payload) {
          console.log({ name, status, payload });
        },
        transferProgress: function(progress, payload) {
          console.log({ progress, payload });
        }*/
      },
    });
  } catch (e) {
    process.stderr.write(`${yellow(repository.name)}:\n`);
    process.stderr.write(String(e));
  }
  process.stdout.write(`Pushed local branches to origin (${yellow(repository.name)})\n`);
  process.stdout.write("Done.\n");
}

async function pushBranchChanges(repository, branch, name, pwd) {
  const location = join(process.cwd(), repository.path);
  const submodule = await Repository.open(location);
  const remote = await submodule.getRemote("origin");
  const refs = await submodule.getReferenceNames(Reference.TYPE.ALL);
  const refSpecs = refs
    .filter((ref) => ref.match(new RegExp(`^refs\\/heads\\/${branch}`)))
    .map((ref) => `${ref}:${ref}`);
  process.stdout.write(`\nPushing changes for ${yellow(repository.name)}...\n`);
  try {
    await remote.connect(Enums.DIRECTION.PUSH, {
      credentials: function(/*url, username*/) {
        return Cred.userpassPlaintextNew(name, pwd);
      },
    });
    await remote.push(refSpecs, {
      callbacks: {
        credentials: function(/*url, username*/) {
          return Cred.userpassPlaintextNew(name, pwd);
        },
        /*pushTransferProgress: function(current, total, bytes, payload) {
          console.log({ current, total, bytes, payload });
        },
        pushUpdateReference: function(name, status, payload) {
          console.log({ name, status, payload });
        },
        transferProgress: function(progress, payload) {
          console.log({ progress, payload });
        }*/
      },
    });
  } catch (e) {
    process.stderr.write(`${yellow(repository.name)}:\n`);
    process.stderr.write(String(e));
  }
  process.stdout.write(`Pushed local branches to origin (${yellow(repository.name)})\n`);
  process.stdout.write("Done.\n");
}

async function askUsername() {
  const question = "Username: ";
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return await ask(rl, question);
}

async function askPassword() {
  const question = "Password: ";
  const mutable = new Writable({ write: (chunk, encoding, resolve) => resolve("") });
  const rl = createInterface({ input: process.stdin, stdout: mutable, terminal: true });
  process.stdout.write(question);
  return await ask(rl, question);
}

function ask(interface, question, close = true) {
  return new Promise((resolve, reject) => {
    interface.question(question, (answer) => {
      if (close) interface.close();
      resolve(answer);
    });
  });
}
