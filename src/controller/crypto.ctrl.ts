import {SHA256} from '../controller/sha256-class'
import { BinaryToTextEncoding } from "crypto";

const _default = (req:any,res:any):void =>res.json({ruta:"/crypto",info: "knock-api ", });

/**
 * _sha256 is a function that takes a request, a response, and a next function as arguments and returns
 * nothing.
 * @param {any} req - Request object
 * @param {any} res - The response object.
 * @param {any} next - The next middleware function in the stack.
 */
const _sha256 = (req:any,res:any,next:any):void => {
    const {plain,dg} = req.query
    let sha:SHA256 = new SHA256(plain as string, dg as BinaryToTextEncoding)
    res.json({hash:sha.convert()})
    next()  // /api/sha265?plain=RRUEBA&dg=base64  
}
export  {_default,_sha256}