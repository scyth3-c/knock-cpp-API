import fs from "fs";
import { Request, Response} from "express";

import * as promise from "./promises/addons";

/* The `commandeable` interface is defining the structure of an object that represents a command that
can be executed. It has the following properties: */
interface commandeable {
  body:string,
  command: string,
  name:string
  useable:boolean,
  addons: {
    curl: boolean
  }
  bot: boolean,
  data: DataQuery,
  optional: {
     extract: string,
     data: string
  }
};

/* The `DataQuery` interface is defining the structure of an object that represents a data query. It
has two properties: `body` and `name`, both of which are of type string. This interface is used to
define the structure of the `data` property in the `commandeable` interface. */
interface DataQuery {
  body:string,
  name:string,
};


/* An interface that is used to create a type for the headers object. */
interface otherHeaders {
    title:string,
    standar:string,
    O: string,
    flags:string,
    bot: boolean
};

const _default = (req: Request, res: Response) => {
  res.json({ ruta: "/addons", endpoints: ['/assembly', '/download', '/compile'], info: "knock-api " });
};



/**
 * The above function is a TypeScript code snippet that compiles and executes C++ code based on the
 * provided headers and flags.
 * @param {Request} req - The `req` parameter is an object representing the HTTP request received by
 * the server. It contains information such as the request headers, body, and URL.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It is an instance of the `Response` class.
 */

const _compile = async (req: Request, res: Response) => {


  let headers:otherHeaders = {
    title: req?.headers["title"] as string || (Math.floor(Math.random() * (89894 - 10)) + 10).toString(),
    standar: req?.headers["standar"] as string || "c++17",
    O: req?.headers["o"] as string || "1",
    flags: req?.headers["flags"] as string || "",
    bot: req?.headers["bot"] ? true : false
  };


    let flag_data:string = req?.headers["data"] as string;
    let curl:string = req?.headers["curl"] as string;

    let command_data:string = `g++ -std=${headers.standar} ${headers.flags} ${process.cwd()}/src/c++/temp/${headers.title}.cpp -O${headers.O} -o ${process.cwd()}/src/c++/temp/${headers.title}  &&  ${process.cwd()}/src/c++/temp/./${headers.title} < ${process.cwd()}/src/c++/temp/${headers.title}.txt`;
    let command_raw:string = `g++ -std=${headers.standar} ${headers.flags} ${process.cwd()}/src/c++/temp/${headers.title}.cpp -O${headers.O} -o ${process.cwd()}/src/c++/temp/${headers.title}  &&  ${process.cwd()}/src/c++/temp/./${headers.title}`;
    let command_make:string = `make title=${headers.title}  standar=${headers.standar}`;
    let command_make_data:string = `make title=${headers.title} standar=${headers.standar} data=1`;

    const _getCommand = () => {
      if(flag_data === undefined && curl != "on") return command_raw;
      else if(flag_data === undefined && curl == "on") return command_make;
      else if(flag_data != undefined && curl != "on") return command_data;
      else if(flag_data != undefined && curl == "on") return command_make_data; 
      else {
        return command_raw;
      }
    };  

    const _getOpt = () => {
      if(flag_data) {
        return `${process.cwd()}/src/c++/temp/${headers.title}_bin/./${headers.title} < ${process.cwd()}/src/c++/temp/${headers.title}.txt`;
      } else{
        return `${process.cwd()}/src/c++/temp/${headers.title}_bin/./${headers.title}`;
      }
    };

    let compile:commandeable = {
        body: req.body,
        command: _getCommand(),
        name: `${process.cwd()}/src/c++/temp/${headers.title}.cpp`,
        useable: flag_data === undefined ? false : true,
        addons: {
          curl: curl != "on" ? false : true
        },
        bot: headers.bot,
        data: {
          body: flag_data,
          name: `${process.cwd()}/src/c++/temp/${headers.title}.txt`
        },
        optional: {
          extract: _getOpt(),
          data: headers.title
        },
    };

  
  await promise.default
    .compile(compile)
    .then((result) => {

      if(!compile.addons.curl){
        fs.unlink(`${process.cwd()}/src/c++/temp/${headers.title}.cpp`, ()=>{});
       fs.unlink(`${process.cwd()}/src/c++/temp/${headers.title}`,  ()=>{});
      } else{
        fs.unlink(`${process.cwd()}/src/c++/addons/sources/${headers.title}_main/${headers.title}.cpp`,()=>{ });
        fs.rmdir(`${process.cwd()}/src/c++/addons/sources/${headers.title}_main`,()=>{});
      }
      if(fs.existsSync( `${process.cwd()}/src/c++/temp/${headers.title}.txt`))   fs.unlink(`${process.cwd()}/src/c++/temp/${headers.title}.txt`, ()=>{});
      res.send(result.normalize());
    })
    .catch((err) => {
      res.send(err);
    });
};



/**
 * The above function is a TypeScript function that handles downloading a file based on the request
 * headers and body.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made by the
 * client. It contains information such as the request headers, request body, request method, and
 * request URL. In this code snippet, it is used to access the request headers and request body.
 * @param {Response} res - The "res" parameter is an instance of the Response object in Express.js. It
 * represents the HTTP response that will be sent back to the client.
 */


const _download = (req: Request, res: Response) => {

  let title: string;
  if (req.headers["title"] === undefined) {
    let auc: number = Math.floor(Math.random() * (89894 - 10)) + 10;
    title = auc.toString();
  } else {
    title = req.headers["title"] as string;
  }
  let path = `${process.cwd()}/src/c++/temp/${title}.cpp`;
  promise.default
    .download(path, req.body)
    .then((result: any) => {
      if (result.includes("true")) {
        res.download(path, ()=>{
          if(fs.existsSync(path)) fs.unlink(path, (err)=>{console.log(err);})
        });
      } else {
        res.send("internal error!");
      }
    });
};


/**
 * The above function is an asynchronous function that compiles C++ code to assembly language and
 * either sends the assembly file as a download or sends an error message.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made by the
 * client. It contains information such as the request headers, request body, request method, and
 * request URL.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as `res.send()` to send a response body, `res.download()` to send a file as a response, and `
 * @param {any} next - The `next` parameter in the code snippet is a callback function that is used to
 * pass control to the next middleware function in the request-response cycle. It is typically used in
 * Express.js applications to chain multiple middleware functions together.
 */


const _asm = async (req: Request, res: Response, next: any) => {
 
  let headers:otherHeaders = {
    title: req.headers["title"] as string || (Math.floor(Math.random() * (89894 - 10)) + 10).toString(),
    standar: req.headers["standar"] as string || "c++17",
    O: req.headers["o"]  as string|| "1",
    flags: req.headers["flags"] as string || "",
    bot: false
  };

  let command: string = `g++ -S -std=${headers.standar} ${process.cwd()}/src/c++/temp/${headers.title}_assembly.cpp -O${headers.O} -o ${process.cwd()}/src/c++/temp/${headers.title}_assembly`;
  let path= `${process.cwd()}/src/c++/temp/${headers.title}_assembly`;
  await promise.default
    .assembly(
      command,
      path+".cpp",
      req.body
    )
    .then((result: any) => {
      if (result.includes("true")) {
        res.download(path,()=>{
          if(fs.existsSync(path)) fs.unlink(path, (err)=>{console.log(err);})
        });
      } else {
        res.send(result);
      }
    })
    .catch((err) => {
      res.send("error");
    });
};



export { _compile, _default, _download, _asm};
