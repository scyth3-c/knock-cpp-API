import fs from "fs";

import * as promise from "./promises/addons";

interface commandeable {
  body: string;
  command: string;
  name: string;
  useable: boolean;
  addons: {
    curl: boolean;
  };
  bot: boolean;
  data: DataQuery;
  optional: {
    extract: string;
    data: string;
  };
}

interface DataQuery {
  body: string;
  name: string;
}

/* An interface that is used to create a type for the headers object. */
interface otherHeaders {
  title: string;
  standar: string;
  O: string;
  flags: string;
  bot: boolean;
}

const _default = (req: any, res: any) => {
  res.json({
    ruta: "/addons",
    endpoints: ["/assembly", "/download", "/compile"],
    info: "knock-api ",
  });
};

/**
 * It takes the request body, and compiles it into a c++ file, then it runs the file and returns the
 * result.
 * @param {any} req - any, res: any, next: any
 * @param {any} res - the response object
 * @param {any} next - is a function that is called when the middleware is done.
 */
const _compile = async (req: any, res: any, next: any) => {
  let headers: otherHeaders = {
    title:
      req.headers["title"] ||
      (Math.floor(Math.random() * (89894 - 10)) + 10).toString(),
    standar: req.headers["standar"] || "c++17",
    O: req.headers["o"] || "1",
    flags: req.headers["flags"] || "",
    bot: req.headers["bot"] ? true : false,
  };

  let flag_data: string = req.headers["data"];
  let curl: string = req.headers["curl"];

  let command_data: string = `g++ -std=${headers.standar} ${
    headers.flags
  } ${process.cwd()}/src/c++/temp/${headers.title}.cpp -O${
    headers.O
  } -o ${process.cwd()}/src/c++/temp/${
    headers.title
  }  &&  ${process.cwd()}/src/c++/temp/./${
    headers.title
  } < ${process.cwd()}/src/c++/temp/${headers.title}.txt`;
  let command_raw: string = `g++ -std=${headers.standar} ${
    headers.flags
  } ${process.cwd()}/src/c++/temp/${headers.title}.cpp -O${
    headers.O
  } -o ${process.cwd()}/src/c++/temp/${
    headers.title
  }  &&  ${process.cwd()}/src/c++/temp/./${headers.title}`;
  let command_make: string = `make title=${headers.title}`;
  let command_make_data: string = `make title=${headers.title} data=1`;

  const _getCommand = () => {
    if (flag_data === undefined && curl != "on") return command_raw;
    else if (flag_data === undefined && curl == "on") return command_make;
    else if (flag_data != undefined && curl != "on") return command_data;
    else if (flag_data != undefined && curl == "on") return command_make_data;
    else {
      return command_raw;
    }
  };

  const _getOpt = () => {
    if (flag_data) {
      return `${process.cwd()}/src/c++/temp/${headers.title}_bin/./${
        headers.title
      } < ${process.cwd()}/src/c++/temp/${headers.title}.txt`;
    } else {
      return `${process.cwd()}/src/c++/temp/${headers.title}_bin/./${
        headers.title
      }`;
    }
  };

  let compile: commandeable = {
    body: req.body,
    command: _getCommand(),
    name: `${process.cwd()}/src/c++/temp/${headers.title}.cpp`,
    useable: flag_data === undefined ? false : true,
    addons: {
      curl: curl != "on" ? false : true,
    },
    bot: headers.bot,
    data: {
      body: flag_data,
      name: `${process.cwd()}/src/c++/temp/${headers.title}.txt`,
    },
    optional: {
      extract: _getOpt(),
      data: headers.title,
    },
  };

  await promise.default
    .compile(compile)
    .then((result) => {
      if (!compile.addons.curl) {
        fs.unlink(
          `${process.cwd()}/src/c++/temp/${headers.title}.cpp`,
          (err) => {
            if (err) console.log(err);
          }
        );
        fs.unlink(`${process.cwd()}/src/c++/temp/${headers.title}`, (err) => {
          if (err) console.log(err);
        });
      } else {
        fs.unlink(
          `${process.cwd()}/src/c++/addons/sources/${headers.title}_main/${
            headers.title
          }.cpp`,
          (err) => {
            if (err) console.log(err);
          }
        );
        fs.rmdir(
          `${process.cwd()}/src/c++/addons/sources/${headers.title}_main`,
          (err) => {
            if (err) console.log(err);
          }
        );
      }
      if (fs.existsSync(`${process.cwd()}/src/c++/temp/${headers.title}.txt`))
        fs.unlink(
          `${process.cwd()}/src/c++/temp/${headers.title}.txt`,
          (err) => {
            if (err) console.log(err);
          }
        );
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
  let path = `${process.cwd()}/src/c++/temp/${title}.cpp`;
  promise.default.download(path, req.body).then((result: any) => {
    if (result.includes("true")) {
      res.download(path, () => {
        if (fs.existsSync(path))
          fs.unlink(path, (err) => {
            console.log(err);
          });
      });
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
  let headers: otherHeaders = {
    title:
      req.headers["title"] ||
      (Math.floor(Math.random() * (89894 - 10)) + 10).toString(),
    standar: req.headers["standar"] || "c++17",
    O: req.headers["o"] || "1",
    flags: req.headers["flags"] || "",
    bot: false,
  };

  let command: string = `g++ -S -std=${
    headers.standar
  } ${process.cwd()}/src/c++/temp/${headers.title}_assembly.cpp -O${
    headers.O
  } -o ${process.cwd()}/src/c++/temp/${headers.title}_assembly`;
  let path = `${process.cwd()}/src/c++/temp/${headers.title}_assembly`;
  await promise.default
    .assembly(command, path + ".cpp", req.body)
    .then((result: any) => {
      if (result.includes("true")) {
        res.download(path, () => {
          if (fs.existsSync(path))
            fs.unlink(path, (err) => {
              console.log(err);
            });
        });
      } else {
        res.send(result);
      }
    })
    .catch((err) => {
      res.send("error");
    });
};

export { _compile, _default, _download, _asm };
