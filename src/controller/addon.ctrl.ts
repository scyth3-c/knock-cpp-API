import fs, { WriteStream } from "fs";
import util from "util";
const exec = util.promisify(require("child_process").exec);

import * as promise from "./promises/addons";

interface commandeable {
  body:string,
  command: string,
  name:string
  useable:boolean,
  bot: boolean,
  data: DataQuery,
};

interface DataQuery {
  body:string,
  name:string,
};

interface otherHeaders {
    title:string,
    standar:string,
    O: string,
    flags:string
    bot: boolean
};


const _default = (req: any, res: any) => {
  res.json({ ruta: "/addons", info: "knock-api " });
};

const _compile = async (req: any, res: any, next: any) => {


  let headers:otherHeaders = {
    title: req.headers["title"] || (Math.floor(Math.random() * (89894 - 10)) + 10).toString(),
    standar: req.headers["standar"] || "c++17",
    O: req.headers["o"] || "1",
    flags: req.headers["flags"] || "",
    bot: req.headers["bot"] ? true : false
  };


    let flag_data:string = req.headers["data"];
    let command_data:string = `g++ -std=${headers.standar} ${headers.flags} ${process.cwd()}/src/c++/temp/${headers.title}.cpp -O${headers.O} -o ${process.cwd()}/src/c++/temp/${headers.title}  &&  ${process.cwd()}/src/c++/temp/./${headers.title} < ${process.cwd()}/src/c++/temp/${headers.title}.txt`;
    let command_raw:string = `g++ -std=${headers.standar} ${headers.flags} ${process.cwd()}/src/c++/temp/${headers.title}.cpp -O${headers.O} -o ${process.cwd()}/src/c++/temp/${headers.title}  &&  ${process.cwd()}/src/c++/temp/./${headers.title}`;


    let compile:commandeable = {
        body: req.body,
        command: flag_data === undefined ? command_raw : command_data,
        name: `${process.cwd()}/src/c++/temp/${headers.title}.cpp`,
        useable: flag_data === undefined ? false : true,
        bot: headers.bot,
        data: {
          body: flag_data,
          name: `${process.cwd()}/src/c++/temp/${headers.title}.txt`
        }
    };

  
  await promise.default
    .compile(compile)
    .then((result) => {
      fs.unlink(`${process.cwd()}/src/c++/temp/${headers.title}.cpp`, (err)=>{ if(err) console.log(err);
       });
      fs.unlink(`${process.cwd()}/src/c++/temp/${headers.title}`,  (err)=>{ if(err) console.log(err);
      });
      fs.unlink(`${process.cwd()}/src/c++/temp/${headers.title}.txt`,  (err)=>{ if(err) console.log(err);
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
 
  let headers:otherHeaders = {
    title: req.headers["title"] || (Math.floor(Math.random() * (89894 - 10)) + 10).toString(),
    standar: req.headers["standar"] || "c++17",
    O: req.headers["o"] || "1",
    flags: req.headers["flags"] || "",
    bot: false
  };

  let command: string = `g++ -S -std=${headers.standar} ${process.cwd()}/src/c++/temp/${headers.title}_assembly.cpp -O${headers.O} -o ${process.cwd()}/src/c++/temp/${headers.title}_assembly`;
  await promise.default
    .assembly(
      command,
      `${process.cwd()}/src/c++/temp/${headers.title}_assembly.cpp`,
      req.body
    )
    .then((result: any) => {
      if (result.includes("true")) {
        res.download(`${process.cwd()}/src/c++/temp/${headers.title}_assembly`);
      } else {
        res.send(result);
      }
    })
    .catch((err) => {
      res.send("error");
    });
};



export { _compile, _default, _download, _asm};
