import { Request, Response, NextFunction } from "express";

namespace middleware  {

 export const noEmptySHA = ({query}: Request, res: Response, next: NextFunction): void => {
    let {plain} = query
    if (plain)
      next();
    else
      res.status(400).json({ error: "empty data" });
  };

  export const noEmptyCodeSpace = ({body}: Request, res: Response, next: NextFunction) =>{
    let {code} = body;
    if (code)
      next();
    else
      res.status(400).json({ error: "incomplete data" });
  };

  export const noEmptyNew = ({body}: Request, res: Response, next: NextFunction): void => {
    const {conten} = body;
    if (conten)
      next();
    else
      res.status(400).json({ error: "incomplete data" });
  };


  export const noID = ({query}: Request, res: Response, next: NextFunction): void => {
    let {id} = query
    if (id)
      next();
    else
      res.status(400).json({ error: "empty id" });
  };

  export const noVloc = ({query}: Request, res: Response, next: NextFunction): void => {
    let {vloc} = query;
    if (vloc)
      next();
    else
      res.status(400).json({ error: "empty id" });
  };


  export const noEmptyCompile = ({ body }: Request, res: Response, next: NextFunction): void => {
    if (body)
      next();
    else
      res.status(400).send("CODE IS EMPTY");
  };


  export const NewOpenmoid = ({ body }: Request, res: Response, next: NextFunction): void => {
    const { cabecera, cuerpo, origen, vloc } = body;
    if (cabecera && cuerpo && origen && vloc) {
      next();
    } else {
      res.status(400).json("BAD REQUEST");
    }
  };
}

export {
  middleware
}
