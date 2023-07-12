import { Request, Response, NextFunction } from "express";
import codespace from "../model/codespace";



/**
 * This function returns a JSON response with the route and information for a knock-api.
 * @param {Request} req - The `req` parameter is an object representing the HTTP request made by the
 * client. It contains information such as the request method, headers, query parameters, and body.
 * @param {Response} res - The `res` parameter is an object representing the HTTP response that will be
 * sent back to the client. It has various methods and properties that can be used to manipulate the
 * response, such as `json()` which is used to send a JSON response.
 */
const _default = (req: Request, res: Response)  =>{
    res.json({ ruta: "/notes", info: "knock-api " });
}


/**
 * The function `_extract` is an asynchronous function that takes in a request, response, and next
 * middleware function as parameters, and it attempts to find a document in a collection based on the
 * provided ID and sends the result as a JSON response.
 * @param {Request} req - The `req` parameter is an object representing the HTTP request made to the
 * server. It contains information such as the request method, headers, query parameters, and body.
 * @param {Response} res - The `res` parameter is the response object that is used to send a response
 * back to the client. It is an instance of the `Response` class, which is provided by the Express
 * framework.
 * @param {any} next - The `next` parameter is a function that is used to pass control to the next
 * middleware function in the request-response cycle. It is typically used when you want to pass
 * control to the next middleware function after completing some operations in the current middleware
 * function.
 */
const _extract = async (req: Request, res: Response, next: any) => {
    let id = req?.query?.id?.toString();
    res.setHeader("Content-Type", "application/json");
    try {
      const resolve = await codespace.findOne({ _id: id });
      if (resolve) {
        res.status(200).json(resolve);
      }
    } catch (error) {
      res.status(400).json("no encontrado!");
    }
    res.end();
  };
  
 /**
  * The function `_new` saves a code and codespace object to a database and returns the ID of the saved
  * object.
  * @param {Request} req - The `req` parameter is an object that represents the HTTP request made by
  * the client. It contains information such as the request headers, request body, request method,
  * request URL, etc.
  * @param {Response} res - The `res` parameter is the response object that is used to send a response
  * back to the client. It contains methods and properties that allow you to control the response, such
  * as setting the status code, headers, and sending the response body.
  * @param {NextFunction} next - The `next` parameter is a function that is used to pass control to the
  * next middleware function in the request-response cycle. It is typically used when you want to pass
  * control to the next middleware function after completing some operations in the current middleware
  * function.
  */
  const _new = async (req:Request, res:Response, next:NextFunction) => {
    try {
      const space = new codespace({
        code: req.body?.code,
        codespace: req.body?.codespace,
        time: req.body?.time,
      });
      const savedNota = await space.save();
      res.json(savedNota._id); // Devuelve el ID de la nota guardada
    } catch (error) {
      res.status(400).json("datos incompletos");
    }
  };
  
/**
 * The function `_delete` is an asynchronous function that deletes a document from a MongoDB collection
 * based on the provided ID in the request query parameter.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made by the
 * client. It contains information such as the request method, headers, query parameters, and body.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It is an instance of the `Response` class from the Express framework.
 * @param {any} next - The `next` parameter is a function that is used to pass control to the next
 * middleware function in the request-response cycle. It is typically used when you want to chain
 * multiple middleware functions together.
 */
  const _delete = async (req: Request, res: Response, next: any) => {
    res.setHeader("Content-Type", "application/json");
    try {
      const resolve = await codespace.findByIdAndDelete(req.query?.id as string);
      if (resolve) {
        res.status(200).json("todo ok");
      }
    } catch (error) {
      res.status(400).json("error, no encontrado!");
    }
    res.end();
  };

  /**
   * The function `_update` is an asynchronous function that updates a code in a codespace based on the
   * provided request body and query parameters, and returns a response indicating success or failure.
   * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to
   * the server. It contains information such as the request headers, request body, request method, and
   * request query parameters.
   * @param {Response} res - The `res` parameter is the response object that is used to send a response
   * back to the client. It contains methods and properties that allow you to control the response,
   * such as `json()` to send a JSON response, `status()` to set the status code of the response, and
   * `send
   * @param {any} next - The `next` parameter is a function that is used to pass control to the next
   * middleware function in the request-response cycle. It is typically used when you want to delegate
   * the handling of the current request to the next middleware function.
   */
  const _update = async (req: Request, res: Response, next: any) => {
    try {
      const { code } = req?.body;
      const { id } = req?.query;
      const space = await codespace.updateOne({_id: id},{ code: code})
      if (space != undefined){
      res.json("ok");
      } else{
        res.status(400).json("algo salio mal")
      }
    } catch (error) {
      res.status(400).json("datos incompletos");
    }

  };
  


export {_default, _extract, _new, _delete, _update}
  