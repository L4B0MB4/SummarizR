import { exec } from "node:child_process";
export const buildWebsite = (__dirname) => {
  return new Promise((res, rej) => {
    console.warn(process.platform);
    let osSpecificCommands = "";
    if (process.platform === "win32") {
      osSpecificCommands = "dir && cd website && yarn && yarn build && robocopy ./build ../docs /s /e";
    } else {
      osSpecificCommands = "ls && cd website && yarn &&yarn build && cp -r ./build ../docs";
    }
    const childProcess = exec(osSpecificCommands, (error, stdout, stderr) => {
      console.log("error:" + error);
      console.log("stderr:" + stderr);
      console.log("stdout:" + stdout);
    });
    childProcess.on("close", () => {
      res(1);
    });
  });
};
