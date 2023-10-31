import {Request, Response} from "express";
import Notes from "../../entity/notes";
import  Task from "../../model/task"

namespace notes{
 export const _default = (_req: Request, res: Response)  =>{
    res.json({ name: "/notes", info: "knock-api " });
  }

  export const _new = async (req:Request, res:Response) => {
    let doc = new Notes(req.body?.nombre || "",
        req.body?.conten || "",
        req.body?.author || "");
    doc.save().then((stat: any)=>{
      if (stat.status) res.status(201).json(stat);
      else res.status(500).json(stat);
    });
  };

  export const _find = async(_req:Request, res: Response) : Promise<void> =>{
    Notes.find().then(doc=>{
      if (doc.status) res.json(doc);
      else res.status(404).json(doc);
    });
  };


  export  const _items = async (_req: Request, res: Response) => {
    const items = await Task.countDocuments();
    res.setHeader("Content-Type", "application/json");
    res.json({ items: items }).status(200);
    res.end();
  };


  export const _update = async(req:Request, res: Response) : Promise<void> => {
    await new Notes(req.body?.nombre || "",
        req.body?.conten || "",
        req.body?.author || "").update(req?.query?.id as string).then(doc=>{
      if (doc.status) res.json(doc)
      else res.status(404).json(doc);
    })
  };

  export const _delete = async(req:Request, res: Response) : Promise<void> =>{
    await Notes.deleteOne(req?.query?.id as string).then(stat => {
      if (stat.status) res.json(stat)
      else res.status(404).json(stat);
    });
  };

  export const _findone = async ( req: Request, res: Response ) => {
    await Notes.findOne(req?.query?.id as string).then(stat=>{
      if (stat.status) res.json(stat)
      else res.status(404).json(stat);
    });
  };

  export const _plain = async (req: Request, res: Response) => {
    let id = req?.query?.id?.toString();
    res.setHeader("Content-Type", "application/json");
    try {
      const resolve = await Task.findOne({ _id: id });
      if (resolve) {
        res.status(200).send(resolve?.conten);
      }
    } catch (error) {
      res.status(400).json("404 NOT FOUND!");
    }
    res.end();
  };

  export const _last = async (_req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    const aux: any = await Task.find().limit(1).sort({ $natural: -1 });
    res.json(aux);
  };
}


export { notes };
