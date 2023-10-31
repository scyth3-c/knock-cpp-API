import {sys} from "../system/exceptions"
import {Request, Response} from "express";


const _find_exception = (_req:Request, res: Response) : void =>{
    try{
        let list : Array<unknown> =  sys.Exceptions.get();
        res.json({
            status: true,
            name: "Exceptions",
            data: list
        })
    }catch (e){
        sys.Exceptions.add(e);
        res.status(500).json("ERROR");
    }
};


const _last_exception = (_req:Request, res:Response) : void =>{
    try{
        let last : unknown =  sys.Exceptions.last();
        res.json({
            status: true,
            name: "Exceptions",
            data: last
        })
    }catch (e){
        sys.Exceptions.add(e);
        res.status(500).json("ERROR");
    }
};


export default {_find_exception, _last_exception}
