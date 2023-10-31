import { Request, Response } from "express";
import Codespace from "../../entity/codespace";

namespace  codespace {

 export const _default = (_req: Request, res: Response)  =>{
    res.json({ ruta: "/codespaces", info: "knock-api " });
  }


  export const _new = async (req:Request, res:Response) => {
    let doc = new Codespace(req.body?.code || "",
        req.body?.codespace || "",
        req.body?.time || "");
    doc.save().then((stat: any)=>{
      if (stat.status) res.status(201).json(stat);
      else res.status(500).json(stat);
    });
  };

  export const _find = async(_req:Request, res: Response) : Promise<void> =>{
    Codespace.find().then(doc=>{
      if (doc.status) res.json(doc);
      else res.status(404).json(doc);
    });
  };

  export const _update = async(req:Request, res: Response) : Promise<void> => {
    await new Codespace(req.body?.code || "",
        req.body?.codespace || "",
        req.body?.time || "").update(req?.query?.id as string).then(doc=>{
      if (doc.status) res.json(doc)
      else res.status(404).json(doc);
    })
  };

  export const _findone = async ( req: Request, res: Response ) => {
    await Codespace.findOne(req?.query?.id as string).then(stat=>{
      if (stat.status) res.json(stat)
      else res.status(404).json(stat);
    });
  };

  export const _delete = async(req:Request, res: Response) : Promise<void> =>{
    await Codespace.deleteOne(req?.query?.id as string).then(stat => {
      if (stat.status) res.json(stat)
      else res.status(404).json(stat);
    });
  };
}


export {codespace}
  