import fs from "fs";
import util from "util";

const exec = util.promisify(require("child_process").exec);

const compile = (
    compile:any
): Promise<string> =>
  new Promise((resolve, reject) => {

    let stream = fs.createWriteStream(compile.name, { encoding: "utf-8" });

    if(compile.useable) {
      let dataStream = fs.createWriteStream(compile.data.name, {encoding: "utf-8"});
      dataStream.write(compile.data.body);
      dataStream.end();
    }

    stream.write(compile.body);
    stream.end();
    stream.addListener("close", async () => {
      try {
        const { stdout, stderr } = await exec(compile.command);
        if (stderr) resolve(stderr);

        if(compile.bot) {
          let array = stdout.split('\r\n');
          resolve(array);
        } else {
        resolve(stdout);
        }

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
