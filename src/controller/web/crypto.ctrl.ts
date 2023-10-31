import {SHA256} from './sha256-class'
import { BinaryToTextEncoding } from "crypto";

const _default = (_req:any,res:any):void =>res.json({ruta:"/crypto",info: "knock-api ", });

const _sha256 = (req:any,res:any,next:any):void => {
    const {plain,dg} = req.query
    let sha:SHA256 = new SHA256(plain as string, dg as BinaryToTextEncoding)
    res.json({hash:sha.convert()})
    next()  // /api/sha265?plain=RRUEBA&dg=base64  
}
export  {_default,_sha256}