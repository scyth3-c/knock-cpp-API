import { Request, Response } from "express";
import openmid = require("../model/openmid");

/**
 * The above function is a TypeScript function that searches for a specific value in a database and
 * returns the result if found, or a "NOT FOUND" message if not found.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request headers, query parameters, request body, and
 * more.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code, headers, and sending the response body.
 */

let _search =  async function (req: Request, res: Response ) : Promise<void> {
  try {
       /* `const {vloc} = req?.query;` is destructuring the `vloc` property from the `query` object of
       the `req` parameter. */
       const {vloc} = req?.query;
       const query = await openmid.find({vloc:vloc as string})

       if (query) { res.json({result: query })} 
       else { res.status(404).json({result: "NOT FOUND"})}

  } catch (error) {
    res.status(500).json("Ocurrio un error en el servidor");
  }
};

/**
 * This TypeScript function deletes a document from a MongoDB collection based on a specific query
 * parameter.
 * @param {Request} req - The `req` parameter is an object representing the HTTP request made to the
 * server. It contains information such as the request method, headers, query parameters, and body.
 * @param {Response} res - The "res" parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code, headers, and sending the response body.
 */

let _delete =  async function (req: Request, res: Response ) : Promise<void> {
    try {
         let query  = await openmid.findByIdAndDelete({vloc:req?.query?.vloc as string})
         if (query) { res.json({result: query })} 
         else { res.status(404).json({result: "NOT FOUND"})}
  
    } catch (error) {
      res.status(500).json("Ocurrio un error en el servidor");
    }
  };


/**
 * This TypeScript function handles a POST request by saving the request body to a database using the
 * openmid library and returning a JSON response.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request headers, request body, request method, request
 * URL, etc.
 * @param {Response} res - The `res` parameter is an instance of the `Response` object, which
 * represents the HTTP response that will be sent back to the client. It is used to send the response
 * data, such as the response body, headers, and status code.
 */
let _send =  async function (req: Request, res: Response ) : Promise<void> {
    try {        

        const mid = new openmid({
                cabecera: req?.body?.cabecera as string || "0",
                cuerpo: req?.body?.cuerpo as string || "0",
                origen: req?.body?.origen as string || "0",
                vloc:   req?.body?.vloc as string || "0"
            });

            let query = await mid?.save();
         if (query) { res.json({result: "OK" })} 
         else { res.status(404).json({result: "NOT FOUND"})}

    } catch (error) {
      res.status(500).json("Ocurrio un error en el servidor");
    }
  };

/**
 * This TypeScript function updates a document in a MongoDB collection based on the provided request
 * parameters and body.
 * @param {Request} req - The `req` parameter is an object representing the HTTP request made to the
 * server. It contains information such as the request method, headers, query parameters, and body.
 * @param {Response} res - The `res` parameter is an instance of the `Response` object, which
 * represents the HTTP response that will be sent back to the client. It is used to send the response
 * data, such as the JSON result or error messages, back to the client.
 */
  let _update = async function (req: Request, res: Response ) : Promise<void> {
    try {        

        const mid = await openmid.findByIdAndUpdate( {vloc: req?.query?.vloc as string } ,{
                cabecera: req?.body?.cabecera as string || "0",
                cuerpo: req?.body?.cuerpo as string || "0",
                origen: req?.body?.origen as string || "0"
            });

         let query = await mid?.save();
         if (query) { res.json({result: "OK" })} 
         else { res.status(404).json({result: "NOT FOUND"})}

    } catch (error) {
      res.status(500).json("Ocurrio un error en el servidor");
    }
  }; 


export {
    _search,
    _send,
    _delete,
    _update
}