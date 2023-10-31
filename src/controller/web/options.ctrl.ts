import Options from "../../entity/options"
import {Request, Response} from "express";

namespace options {

   export const _new = async ( req: Request, res: Response ) : Promise<void> => {
        let doc = new Options(req.body?.name || "",
            req.body?.values || [],
            req.body?.meta || { category: "", update: "", target: "" });
        doc.save().then(stat=>{
            if (stat.status) res.status(201).json(stat);
            else res.status(500).json(stat);
        });
    };

   export const _find = async(_req:Request, res: Response) : Promise<void> =>{
        Options.find().then(doc=>{
            if (doc.status) res.json(doc);
            else res.status(404).json(doc);
        });
    };
  export  const _update = async(req:Request, res: Response) : Promise<void> => {
        await new Options(req.body?.name || "",
            req.body?.values || [],
            req.body?.meta || { category: "", update: "", target: "" }).update(req?.query?.id as string).then(stat=>{
            if(stat.status) res.json(stat);
            else res.status(404).json(stat);
        });
    };

  export  const _delete = async(req:Request, res: Response) : Promise<void> =>{
        await Options.deleteOne(req?.query?.id as string).then(stat => {
            if (stat.status) res.json(stat)
            else res.status(404).json(stat);
        });
    };

  export  const _findone = async ( req: Request, res: Response ) => {
        await Options.findOne(req?.query?.id as string).then(stat=>{
            if (stat.status) res.json(stat)
            else res.status(404).json(stat);
        });
    };

}

export {options}