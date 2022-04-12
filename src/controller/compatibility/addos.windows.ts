import fs, { WriteStream } from "fs";
import util from "util";
import os from "os";
const exec = util.promisify(require("child_process").exec);

/* 

 IF YOU USE THIS FILE, NEED ADD MINGW IN THE ROOT PROJECT

  <root>
   <MinGW>   HERE WITH THIS NAME  MinGW


*/






// OBSOLETE


const islinux = (): boolean => {
  let name = os.hostname();
  return name.includes("Linux") ||
    name.includes("linux") ||
    name.includes("Ubuntu") ||
    name.includes("ubuntu") ||
    name.includes("Debian") ||
    name.includes("debian")
    ? true
    : false;
};

let term: string = ".out";
let distro_compiler: string = "g++";

const getExecutable = async (title: string): Promise<string> => {
  if (islinux()) {
    const { stdout } = await exec(`ls ./src/c++/bin | grep '${title}' `);
    term = stdout.split(title);
    distro_compiler = "g++";
    return "src/c++/bin/./" + stdout;
  } else {
    distro_compiler = ".\\MinGW\\bin\\g++.exe";
    term = ".exe";
    return `cpp_addon.bat ${title}`;
  }
};

const _default = (req: any, res: any) => {
  res.json({ ruta: "/addons", info: "knock-api " });
};
const _compile = async (req: any, res: any, next: any) => {
  let title: string = req.headers["title"];
  let execute: string = await getExecutable(title);
  let path: string = "./src/c++/api_request_code/";
  let command: string = `${distro_compiler} -std=c++17 ${path}${title}.cpp -o  ./src/c++/bin/${title} && ${execute}`;
  let Stream: WriteStream = fs.createWriteStream(`${path}${title}.cpp`);
  Stream.setDefaultEncoding("utf-8");
  Stream.write(`//PRAGMA ONCE \n ${req.body} `);
  Stream.end();
  try {
    const { stdout, stderr } = await exec(command);
    if (stderr) res.send(stderr);
    fs.unlinkSync(`${path}${title}.cpp`);
    fs.unlinkSync(`./src/c++/bin/${title}${term}`);
    res.send(stdout as string);
  } catch (error: any) {
    fs.unlinkSync(`${path}${title}.cpp`);
    res.send(error.stderr.split("./src/c++/api_request_code/"));
  }
  res.end();
};

export { _compile, _default };
