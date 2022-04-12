import fs from "fs";
import util from "util";

const exec = util.promisify(require("child_process").exec);

const compile = (
  comando: string,
  title: string,
  body: string
): Promise<string> =>
  new Promise((resolve, reject) => {

    let stream = fs.createWriteStream(title, { encoding: "utf-8" });
    stream.write(body);
    stream.end();
    stream.addListener("close", async () => {

      try {
        const { stdout, stderr } = await exec(comando);

        if (stderr) resolve(stderr);
        resolve(stdout);
      } catch (error: any) {
        resolve(error.stderr);
      }
    });


  });
const assembly = (comando: string, title: string, body: string) =>
  new Promise(async (resolve, reject) => {
    let stream = fs.createWriteStream(title, { encoding: "utf-8" });
    stream.write(body);
    stream.end();
    stream.addListener("close", async () => {
      try {
        const { stderr } = await exec(comando);
        if (stderr) reject(stderr);
        resolve("true");
      } catch (err) {
        reject(err);
      }
    });
  });

const download = (title: string, body: string) =>
  new Promise((resolve, reject) => {
    let stream = fs.createWriteStream(title, { encoding: "utf-8" });
    stream.write(body);
    stream.end();
    stream.addListener("close", () => {
      if (fs.existsSync(title)) {
        resolve("true");
      } else {
        resolve("false");
      }
    });
  });

export default { compile, assembly, download };
