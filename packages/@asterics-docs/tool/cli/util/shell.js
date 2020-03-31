const { exec } = require("child_process");

function validateShell() {
  const tests = Array.from(arguments).map(binary => {
    return new Promise((resolve, reject) => {
      exec(`which ${binary}`, (error, stdout, stderr) => {
        if (error) reject(binary);
      });
    });
  });
  Promise.all(tests).catch(binary =>
    process.stdout.write(
      `Command '${binary}' not installed.\nMake sure to install it before continuing.\n`
    )
  );
}

module.exports = { validateShell };
