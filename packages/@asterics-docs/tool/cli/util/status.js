const ident = {
  repository: 4,
  file: 8,
};

function hasCandidate(status, index, submodule, changes = "headToIndex") {
  return status.find((file) => isInSubmodule(file, index, submodule, changes));
}

function isInSubmodule(file, index, submodule, changes = "headToIndex") {
  const path = file.isRenamed() ? getOldFilePath(file, changes) : file.path();
  const entry = index.resolve(path);
  return entry && entry.repository === submodule;
}

function getOldFilePath(file, changes = "headToIndex") {
  return file[changes]().oldFile().path();
}

function log(logger, file, changes = "headToIndex") {
  const prefix = " ".repeat(ident.file);
  if (file.isConflicted()) {
    process.stdout.write(logger("", { end: "\n", label: prefix + `conflicted: ${file.path()}` }));
  } else if (file.isDeleted()) {
    process.stdout.write(logger("", { end: "\n", label: prefix + `deleted:    ${file.path()}` }));
  } else if (file.isRenamed()) {
    const oldFile = file[changes]().oldFile();
    const newFile = file[changes]().newFile();
    process.stdout.write(
      logger("", {
        end: "\n",
        label: prefix + `renamed:    ${oldFile.path()} -> ${newFile.path()}`,
      })
    );
  } else if (file.isIgnored()) {
  } else if (file.isModified()) {
    process.stdout.write(logger("", { end: "\n", label: prefix + `modified:   ${file.path()}` }));
  } else if (file.isNew()) {
    process.stdout.write(logger("", { end: "\n", label: prefix + `new file:   ${file.path()}` }));
  } else {
    process.stdout.write(logger("", { end: "\n", label: prefix + `unknown:    ${file.path()}` }));
  }
}

module.exports = { hasCandidate, isInSubmodule, getOldFilePath, log, ident };
