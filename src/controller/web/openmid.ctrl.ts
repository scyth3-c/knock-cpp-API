import { Request, Response } from "express";
import Openmid from "../../entity/openmid";

namespace openmid{
   export const _default = (_req: Request, res: Response)  =>{
        res.json({ ruta: "/openmid", info: "knock-api " });
    }
    export  const _send = async (req:Request, res:Response) => {
        let doc = new Openmid(
            req?.body?.cabecera as string || "0",
            req?.body?.cuerpo as string || "0",
            req?.body?.origen as string || "0",
            req?.body?.vloc as string || "0"
        );
        doc.save().then((stat: any)=>{
            if (stat.status) res.status(201).json(stat);
            else res.status(500).json(stat);
        });
    };

    export const _update = async(req:Request, res: Response) : Promise<void> => {
        await new Openmid(
            req?.body?.cabecera as string || "0",
            req?.body?.cuerpo as string || "0",
            req?.body?.origen as string || "0", "").update(req?.query?.vloc as string).then(doc=>{
            if (doc.status) res.json(doc)
            else res.status(404).json(doc);
        })
    };

    export const _search = async ( req: Request, res: Response ) => {
        await Openmid.findOne(req?.query?.vloc as string).then(stat=>{
            if (stat.status) res.json(stat)
            else res.status(404).json(stat);
        });
    };

    export const _find = async(_req:Request, res: Response) : Promise<void> =>{
        Openmid.find().then(doc=>{
            if (doc.status) res.json(doc);
            else res.status(404).json(doc);
        });
    };

    export  const _delete = async(req:Request, res: Response) : Promise<void> =>{
        await Openmid.deleteOne(req?.query?.vloc as string).then(stat => {
            if (stat.status) res.json(stat)
            else res.status(404).json(stat);
        });
    };
}

export {
openmid
}