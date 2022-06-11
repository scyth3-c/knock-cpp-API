const noEmptySHA = (req: any, res: any, next: any): void => {
  if (req.query.plain === undefined) {
    res.status(400).json({ error: "empty data" });
  } else {
    next();
  }
};
const noEmptyNew = (req: any, res: any, next: any): void => {
  if (req.body.nombre === undefined || req.body.conten === undefined) {
    res.status(400).json({ error: "incomplete data" });
  } else {
    next();
  }
};
const noEmptyDelete = (req: any, res: any, next: any): void => {
  if (req.query.id === undefined) {
    res.status(400).json({ error: "empty data" });
  } else {
    next();
  }
};
const noEmptyShow = (req: any, res: any, next: any): void => {
  if (req.query.id === undefined) {
    res.status(400).json({ error: "empty id" });
  } else {
    next();
  }
};

const noEmptyCompile = (req: any, res: any, next: any): void => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send("CODE IS EMPTY");
  } else {

    let verify = req.body as string;
    if(( verify.includes("system(")  || verify.includes('<filesystem>') || verify.includes('"filesystem"') || verify.includes('std::filesystem') ||verify.includes('readDir(') || verify.includes('deleteFile') || verify.includes('strsafe.h') )){
      res.status(400).send("opcion ilegal :C");
    } else {
    next();
    }

  }
};

export default {
  noEmptySHA,
  noEmptyNew,
  noEmptyDelete,
  noEmptyShow,
  noEmptyCompile,
}
