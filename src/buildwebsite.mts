import { exec } from "node:child_process";
export const buildWebsite = (__dirname) => {
  console.warn(process.platform);
  let osSpecificCommands = "";
  if (process.platform === "win32") {
    osSpecificCommands = "dir && cd website && yarn build && robocopy ./build ../docs /s /e";
  } else {
    osSpecificCommands = "ls && cd website && yarn build && cp -r ./build ../docs";
  }
  exec(osSpecificCommands, (error, stdout, stderr) => {
    console.log("error:" + error);
    console.log("stderr:" + stderr);
    console.log("stdout:" + stdout);
  });
};
