import fs from "fs";
import util from "util";
const exec = util.promisify(require("child_process").exec);
const TIME_OUT:number = 15000



/**
 * The `compile` function takes in a compilation object and returns a promise that resolves to the
 * compiled output or an error message.
 * @param {any} compile - The `compile` parameter is an object that contains various properties and
 * methods. It is used as an argument in the `compile` function.
 */

const compile = (
    compile:any,
): Promise<string> =>
  new Promise((resolve, reject) => {

    if(compile.addons.curl) {
      compile.name = `${process.cwd()}/src/c++/addons/sources/${compile.optional.data}_main/${compile.optional.data}.cpp`;
      fs.mkdirSync(`${process.cwd()}/src/c++/addons/sources/${compile.optional.data}_main`);
    }
    let stream = fs.createWriteStream(compile.name, { encoding: "utf-8" });

    if(compile.useable) {
      let dataStream = fs.createWriteStream(compile.data.name, {encoding: "utf-8"});
      dataStream.write(compile.data.body);
      dataStream.end();
    }
    //if(compile.addons.curl) stream.write('#include "veridic.hpp"');
    stream.write(compile.body);
    stream.end();
    stream.addListener("close", async () => {
      try {

        let build_and_extract = compile.addons.curl ? compile.command + " && " + compile.optional.extract : compile.command;
        
        let options = {
          timeout: TIME_OUT
        }
        const { stdout, stderr} = await exec(build_and_extract, options)
        if (stderr) resolve(stderr);

        if(compile.bot) {
          let array = stdout.split('\r\n');
          if(compile.addons.curl) exec(`make clean title=${compile.optional.data}`);
          resolve(array);
        } else {
        if(compile.addons.curl) exec(`make clean title=${compile.optional.data}`);
        resolve(stdout);
        }

      } catch (error: any) {
        resolve(error.stderr);
      }
    });
  });


/**
 * It takes a command, a title, and a body, and returns a promise that resolves to true if the command
 * is successful, and rejects with an error if the command is unsuccessful.
 * @param {string} comando - string - The command to be executed
 * @param {string} title - The name of the file to be created.
 * @param {string} body - the body of the file
 */
  
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



/**
 * It creates a file with the name of the title parameter and writes the body parameter to it.
 * @param {string} title - The title of the file you want to download.
 * @param {string} body - The body of the file you want to download.
 */
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
