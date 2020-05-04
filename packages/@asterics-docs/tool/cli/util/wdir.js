const { join, basename, dirname, relative, sep } = require("path");
const { copyFileSync, existsSync, unlinkSync, renameSync } = require("fs");

const { Branch, Checkout, Reference, Repository, Signature, Status } = require("nodegit");
const { yellow } = require("chalk");

const { ensureParentDir } = require("./fs.js");
const { success, error, info } = require("./logger.js");
const { hasCandidate, isInSubmodule, log, ident, getOldFilePath } = require("./status.js");
const { getSubmodules } = require("./submodules.js");

const filterUnique = (value, index, self) => {
  return self.indexOf(value) === index;
};

async function setupWorkingRepository(config) {
  try {
    const r = await Repository.init(getDocsPath(config), 0);

    const index = await r.refreshIndex();
    await index.addAll();
    await index.write();
    const oid = await index.writeTree();

    const author = await getAuthor();
    const committer = await getCommitter();
    await r.createCommit("HEAD", author, committer, "Initial commit", oid, []);
  } catch (e) {
    process.stdout.write(error(e));
  }
}
function getDocsPath(config) {
  return join(process.cwd(), config.source);
}
async function getAuthor() {
  const r = await Repository.open(process.cwd());
  const c = await r.config();
  const name = (await c.getEntry("user.name")).value();
  const email = (await c.getEntry("user.email")).value();
  return Signature.now(name, email);
}
async function getCommitter() {
  const r = await Repository.open(process.cwd());
  const c = await r.config();
  const name = (await c.getEntry("user.name")).value();
  const email = (await c.getEntry("user.email")).value();
  return Signature.now(name, email);
}
async function getWorkingRepository(config) {
  const path = getDocsPath(config);
  let repository;
  if (existsSync(path)) {
    repository = await Repository.open(path);
  } else {
    process.stdout.write(
      info(`working repository not available. use '${yellow("yarn docs setup")}'.`)
    );
  }
  return repository;
}
async function hasChanges(repository) {
  const staged = await getStaged(repository);
  const unstaged = await getUnstaged(repository);
  const untracked = await getUntracked(repository);
  const noChanges = staged.length === 0 && unstaged.length === 0 && untracked.length === 0;
  return !noChanges;
}
async function hasMoreSubmodulesStaged(repository, index) {
  const staged = await getStaged(repository);
  const repositories = staged
    .filter((e) => !e.isNew())
    .map((e) => {
      return e.isRenamed() ? index.get(getOldFilePath(e)) : index.get(e.path());
    })
    .map(([first]) => first)
    .map(({ repository }) => repository)
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
  return repositories.length > 1;
}
async function hasUntracked(repository) {
  const staged = await getStaged(repository);
  return staged.find((e) => e.isNew()) ? true : false;
}
async function logStaged(repository, index) {
  const staged = await getStaged(repository);
  if (staged.length) {
    process.stdout.write("Changes to be committed:\n");

    /* Log indexed files */
    for (const submodule of index.submodules) {
      if (hasCandidate(staged, index, submodule)) {
        process.stdout.write(
          info("\n" + " ".repeat(ident.repository) + submodule, {
            end: "\n",
            label: "",
          })
        );
        for (const file of staged) {
          if (isInSubmodule(file, index, submodule)) {
            log(success, file);
          }
        }
      }
    }

    /* Log unindexed files */
    const unindexed = staged.filter((e) => e.isNew());
    if (unindexed.length) {
      process.stdout.write(
        info("\n" + " ".repeat(ident.repository) + "-", { end: "\n", label: "" })
      );
      for (const file of unindexed) {
        log(success, file);
      }
    }

    process.stdout.write("\n");
  }
}
async function getStaged(repository) {
  const opts = {
    flags:
      Status.OPT.INCLUDE_UNTRACKED |
      Status.OPT.RECURSE_UNTRACKED_DIRS |
      Status.OPT.RENAMES_HEAD_TO_INDEX,
    // Status.OPT.RENAMES_FROM_REWRITES,
    show: Status.SHOW.INDEX_ONLY,
  };
  return await repository.getStatusExt(opts);
}
async function logUnstaged(repository, index) {
  const unstaged = await getUnstaged(repository);
  if (unstaged.length) {
    process.stdout.write("Changes not staged for commit:\n");
    for (const submodule of index.submodules) {
      if (hasCandidate(unstaged, index, submodule, "indexToWorkdir")) {
        process.stdout.write(
          info("\n" + " ".repeat(ident.repository) + submodule, { end: "\n", label: "" })
        );
        for (file of unstaged) {
          if (isInSubmodule(file, index, submodule, "indexToWorkdir")) {
            log(error, file, "indexToWorkdir");
          }
        }
      }
    }
    process.stdout.write("\n");
  }
}
async function getUnstaged(repository) {
  const opts = {
    flags:
      Status.OPT.RENAMES_HEAD_TO_INDEX |
      Status.OPT.RENAMES_INDEX_TO_WORKDIR |
      Status.OPT.RENAMES_FROM_REWRITES,
    show: Status.SHOW.WORKDIR_ONLY,
  };
  return await repository.getStatusExt(opts);
}
async function logUntracked(repository) {
  const untracked = await getUntracked(repository);
  if (untracked.length) {
    process.stdout.write("Untracked files:\n\n");
    for (const file of untracked) {
      process.stdout.write(error("", { end: "\n", label: " ".repeat(4) + file.path() }));
    }
    process.stdout.write("\n");
  }
}
async function getUntracked(repository) {
  const opts = {
    flags: Status.OPT.INCLUDE_UNTRACKED | Status.OPT.RECURSE_UNTRACKED_DIRS,
    show: Status.SHOW.WORKDIR_ONLY,
  };
  const status = await repository.getStatusExt(opts);
  return status.filter((entry) => entry.isNew());
}

async function commit(repository, index, config, args) {
  const staged = await getStaged(repository);
  const jobs = staged.map((e) => {
    const path = e.isRenamed() && e.isNew() ? getOldFilePath(e) : e.path();
    const resolution = index.get(path)[0];
    return {
      branch: resolution.dependency.getBranch(resolution.version),
      repository: resolution.repository,
      target: resolution.source,
      source: e,
    };
  });

  /* Verify that only single submodule */
  const repositories = jobs.map(({ repository }) => repository).filter(filterUnique);
  if (repositories.length > 1) {
    throw new Error("Multiple submodules staged for commit.");
  }

  /* Load all required branches */
  const branches = jobs.map(({ branch }) => branch).filter(filterUnique);

  /* Save current branch of submodule */
  const submoduleConfig = getSubmodules(config)
    .filter((submodule) => submodule.config)
    .find(({ name }) => name === args.submodule);
  const submodule = await Repository.open(join(process.cwd(), submoduleConfig.path));
  const currentBranch = (await submodule.getCurrentBranch()).shorthand();

  /* Commit staged changes to branches */
  for (const branch of branches) {
    const currentJobs = jobs.filter((entry) => entry.branch === branch);

    /* Checkout branch in submodule */
    await checkoutBranch(submodule, branch);

    /* Update changes */
    for (const job of currentJobs) {
      if (job.source.isDeleted()) {
        const target = getTarget(job, submoduleConfig);
        if (existsSync(target)) unlinkSync(target);
      } else {
        /* Rename file in submodule */
        if (job.source.isRenamed() && job.source.isNew()) {
          renameTarget(job, submoduleConfig);
        }
        /* Copy new file content */
        const source = getSource(job, config);
        const target = getTarget(job, submoduleConfig);
        copyFileSync(source, target);
      }
    }

    /* Stage */
    const idx = await submodule.refreshIndex();
    await idx.addAll();
    await idx.write();

    /* Commit */
    const oid = await idx.writeTree();
    const head = await Reference.nameToId(submodule, "HEAD");
    const parent = await submodule.getCommit(head);
    const author = await getAuthor();
    const committer = await getCommitter();
    const { message } = args;
    await submodule.createCommit("HEAD", author, committer, message, oid, [parent]);
  }
  /* Restore submodule */
  await checkoutBranch(submodule, currentBranch);
}

function getSource(job, config) {
  const cwd = process.cwd();
  return join(cwd, config.source, job.source.path());
}

function getTarget(job, submoduleConfig) {
  const cwd = process.cwd();
  return join(cwd, submoduleConfig.path, job.target);
}

function renameTarget(job, submoduleConfig) {
  const oldSource = job.source.headToIndex().oldFile().path();
  const newSource = job.source.path();
  const move = relative(dirname(oldSource), dirname(newSource));
  const cwd = process.cwd();
  const oldTarget = join(cwd, submoduleConfig.path, job.target);
  const newTargetLocation = join(dirname(job.target), move, basename(newSource));
  const newTarget = join(cwd, submoduleConfig.path, newTargetLocation);
  const submodulePath = join(cwd, submoduleConfig.path);
  if (newTarget.startsWith(submodulePath + sep)) {
    ensureParentDir(newTarget);
    renameSync(oldTarget, newTarget);
    job.target = newTargetLocation;
  }
}

async function checkoutBranch(repository, branch) {
  const opts = {
    checkoutStrategy:
      Checkout.STRATEGY.SAFE ||
      Checkout.STRATEGY.RECREATE_MISSING ||
      Checkout.STRATEGY.ALLOW_CONFLICTS ||
      Checkout.STRATEGY.USE_THEIRS,
  };
  const remoteBranch = await repository.getBranch(`origin/${branch}`);
  const remoteCommit = await repository.getCommit(remoteBranch.target());
  const localBranch = await getLocalBranch(repository, branch, remoteCommit);
  const localCommit = await repository.getCommit(localBranch.target());
  const tree = await repository.getTree(localCommit.treeId());
  await Checkout.tree(repository, tree, opts);
  await repository.setHead(`refs/heads/${branch}`);
}

async function getLocalBranch(repository, branch, commitWorkingRepository) {
  let localBranch;
  try {
    localBranch = await repository.getBranch(branch);
  } catch (e) {
    if (typeof localBranch === "undefined") {
      localBranch = await repository.createBranch(branch, commitWorkingRepository, false);
      await Branch.setUpstream(localBranch, `origin/${branch}`);
    }
  }
  return localBranch;
}

async function commitWorkingRepository(repository, index, config, args) {
  const idx = await repository.refreshIndex();
  const oid = await idx.writeTree();
  const head = await Reference.nameToId(repository, "HEAD");
  const parent = await repository.getCommit(head);
  const author = await getAuthor();
  const committer = await getCommitter();
  const { message } = args;
  await repository.createCommit("HEAD", author, committer, message, oid, [parent]);
}

module.exports = {
  setupWorkingRepository,
  getWorkingRepository,
  hasChanges,
  hasMoreSubmodulesStaged,
  hasUntracked,
  logStaged,
  logUnstaged,
  logUntracked,
  getStaged,
  getUnstaged,
  getUntracked,
  commitWorkingRepository,
  commit,
};
