import fs from "fs";


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


/* An interface that is used to create a type for the headers object. */
interface otherHeaders {
    title:string,
    standar:string,
    O: string,
    flags:string
    bot: boolean
};


const _default = (req: any, res: any) => {
  res.json({ ruta: "/addons", endpoints: ['/assembly', '/download', '/compile'], info: "knock-api " });
};



/**
 * It takes the request body, and compiles it into a c++ file, then it runs the file and returns the
 * result.
 * @param {any} req - any, res: any, next: any
 * @param {any} res - the response object
 * @param {any} next - is a function that is called when the middleware is done.
 */
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
        },
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




/**
 * It downloads a file from the server to the client.
 * @param {any} req - any, res: any, next: any
 * @param {any} res - any =&gt; the response object
 * @param {any} next - any =&gt; next()
 */
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



/**
 * _asm is a function that takes in a request, response, and next function as parameters. It then
 * creates a headers object that contains the headers of the request. It then creates a command string
 * that is used to compile the code. It then uses the promise.default.assembly function to compile the
 * code. If the promise is resolved, it will either send the result or download the file. If the
 * promise is rejected, it will send an error message.
 * @param {any} req - any, res: any, next: any
 * @param {any} res - response
 * @param {any} next - is the next function in the middleware chain
 */
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
