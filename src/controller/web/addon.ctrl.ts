import fs from "fs";
import { Request, Response} from "express";
import * as promise from "./promises/addons";
import { v4 as uuidv4 } from 'uuid'


interface commandeable {
  body:string,
  command: string,
  name:string,
  useable:boolean,
  addons: {
    curl: boolean
  },
  data: {
    body: string,
    name: string
  }
  bot: boolean,
  optional: {
     extract: string,
     data: string
  }
}


interface otherHeaders {
    title:string,
    standar:string,
    O: string,
    flags:string,
    bot: boolean
}

const _default = (_req: Request, res: Response) => {
  res.json({ ruta: "/addons", endpoints: ['/assembly', '/download', '/compile'], info: "knock-api " });
};

const _compile = async (req: Request, res: Response) => {

  let headers:otherHeaders = {
    title: uuidv4() || req?.headers["title"] as string,
    standar: req?.headers["standar"] as string || "c++17",
    O: req?.headers["o"] as string || "1",
    flags: req?.headers["flags"] as string || "",
    bot: !!req?.headers["bot"]
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
        useable: flag_data !== undefined,
        addons: {
          curl: curl == "on"
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

const _download = (req: Request, res: Response) => {

  let title: string = uuidv4() || req?.headers["title"] as string;

  let path = `${process.cwd()}/src/c++/temp/${title}.cpp`;
  promise.default
    .download(path, req.body)
    .then((result: any) => {
      if (result.includes("true")) {
        res.download(path, ()=>{
          if(fs.existsSync(path)) fs.unlink(path, ()=>{})
        });
      } else {
        res.send("internal error!");
      }
    });
};


const _asm = async (req: Request, res: Response) => {
 
  let headers:otherHeaders = {
    title: uuidv4() || req?.headers["title"] as string,
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
          if(fs.existsSync(path)) fs.unlink(path, ()=>{})
        });
      } else {
        res.send(result);
      }
    })
    .catch((e:any) => {
      res.send(e);
    });
};


export { _compile, _default, _download, _asm};
