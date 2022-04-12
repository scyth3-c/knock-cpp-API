import fs, { WriteStream } from "fs";
import util from "util";
const exec = util.promisify(require("child_process").exec);

import * as promise from "./promises/addons";

const _default = (req: any, res: any) => {
  res.json({ ruta: "/addons", info: "knock-api " });
};

const _compile = async (req: any, res: any, next: any) => {
  let title: string;
  let standar: string;
  let o: string;
  let flags:string;

  if (req.headers["title"] === undefined) {
    let auc: number = Math.floor(Math.random() * (89894 - 10)) + 10;
    title = auc.toString();
  } else {
    title = req.headers["title"];
  }
  if (req.headers["standar"] === undefined) {
    standar = "c++17";
  } else standar = req.headers["standar"];

  if (req.headers["o"] === undefined) {
    o = "1";
  } else {
    o = req.headers["o"];
  }
  if(req.headers["flags"]) {
    flags = req.headers["flags"];
  } else {
    flags = "";
  }
  let command: string = `g++ -std=${standar} ${flags} ${process.cwd()}/src/c++/temp/${title}.cpp -O${o} -o ${process.cwd()}/src/c++/temp/${title}  &&  ${process.cwd()}/src/c++/temp/./${title}`;

  await promise.default
    .compile(command, `${process.cwd()}/src/c++/temp/${title}.cpp`, req.body)
    .then((result) => {
      fs.unlink(`${process.cwd()}/src/c++/temp/${title}.cpp`, (err)=>{ if(err) console.log(err);
       });
      fs.unlink(`${process.cwd()}/src/c++/temp/${title}`,  (err)=>{ if(err) console.log(err);
      });
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

const _download = (req: any, res: any, next: any) => {
  let title: string;
  if (req.headers["title"] === undefined) {
    let auc: number = Math.floor(Math.random() * (89894 - 10)) + 10;
    title = auc.toString();
  } else {
    title = req.headers["title"];
  }

  promise.default
    .download(`${process.cwd()}/src/c++/temp/${title}.cpp`, req.body)
    .then((result: any) => {
      if (result.includes("true")) {
        res.download(`${process.cwd()}/src/c++/temp/${title}.cpp`);
      } else {
        res.send("internal error!");
      }
    });
};

const _asm = async (req: any, res: any, next: any) => {
  let title: string;
  let standar: string;
  let o: string;

  if (req.headers["title"] === undefined) {
    let auc: number = Math.floor(Math.random() * (89894 - 10)) + 10;
    title = auc.toString();
  } else {
    title = req.headers["title"];
  }
  if (req.headers["standar"] === undefined) {
    standar = "c++17";
  } else standar = req.headers["standar"];

  if (req.headers["o"] === undefined) {
    o = "1";
  } else {
    o = req.headers["o"];
  }
  let command: string = `g++ -S -std=${standar} ${process.cwd()}/src/c++/temp/${title}_assembly.cpp -O${o} -o ${process.cwd()}/src/c++/temp/${title}_assembly`;
  await promise.default
    .assembly(
      command,
      `${process.cwd()}/src/c++/temp/${title}_assembly.cpp`,
      req.body
    )
    .then((result: any) => {
      if (result.includes("true")) {
        res.download(`${process.cwd()}/src/c++/temp/${title}_assembly`);
      } else {
        res.send(result);
      }
    })
    .catch((err) => {
      res.send("error");
    });
};

export { _compile, _default, _download, _asm };
