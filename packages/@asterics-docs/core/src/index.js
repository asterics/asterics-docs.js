import readline from "readline";

export function core() {
  console.log("@asterics-docs/core");
  readline.clearScreenDown(process.stdout);
  let s = "hello";
  (() => {
    console.log(s);
  })();
}
