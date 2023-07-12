import { Request, Response, NextFunction } from "express";
import Task from "../model/task";



/**
 * _default is a function that takes two parameters, req and res, and returns nothing.
 * @param {any} req - any
 * @param {any} res - The response object.
 */
const _default = (req: Request, res: Response)  =>{
  res.json({ ruta: "/notes", info: "knock-api " });
}



/**
 * _new is a function that takes in a request, a response, and a next function, and returns a promise
 * that resolves to a response with a json body.
 * @param {any} req - any, res: Response, next: any
 * @param {any} res - any
 * @param {any} next - The next middleware function in the stack.
 */

const _new = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const nota = new Task({
      nombre: req?.body?.nombre,
      conten: req?.body?.conten,
      author: req?.body?.author || "unknown",
    });
    const savedNota = await nota?.save();
    res.json(savedNota?._id); // Devuelve el ID de la nota guardada
  } catch (error) {
    res.status(400).json("datos incompletos");
  }
};


/**
 * _recollector is a function that returns a promise that resolves to an array of objects.
 * @param {any} req - any - the request object
 * @param {any} res - any - the response object
 */
const _recollector = async (req: Request, res: Response) => {
  const result = await Task.find();
  res.setHeader("Content-Type", "application/json");
  res.json(result);
  res.end();
};


/**
 * _items is a function that returns a JSON object with the number of items in the database
 * @param {any} req - any -&gt; the request object
 * @param {any} res - any -&gt; the response object
 */

const _items = async (req: Request, res: Response) => {
  const items = await Task.countDocuments();
  res.setHeader("Content-Type", "application/json");
  res.json({ items: items }).status(200);
  res.end();
};


/**
 * It deletes a task from the database by its id.
 * @param {any} req - any, res: Response, next: any
 * @param {any} res - the response object
 * @param {any} next - The next middleware function in the stack.
 */
const _delete = async (req: Request, res: Response, next: any) => {
  res.setHeader("Content-Type", "application/json");
  try {
    const resolve = await Task.findByIdAndDelete(req.query.id as string);
    if (resolve) {
      res.status(200).json("todo ok");
    }
  } catch (error) {
    res.status(400).json("error, no encontrado!");
  }
  res.end();
};



/**
 * It's a function that takes in a request, a response, and a next function, and returns a promise that
 * resolves to a response object.
 * 
 * The function is async, so it returns a promise.
 * 
 * The function takes in a request, a response, and a next function.
 * 
 * The function returns a response object.
 * 
 * The function is async, so it returns a promise.
 * 
 * The function takes in a request, a response, and a next function.
 * 
 * The function returns a response object.
 * 
 * The function is async, so it returns a promise.
 * 
 * The function takes in a request, a response, and a next function.
 * 
 * The function returns a response object.
 * 
 * The function is async, so it returns a promise.
 * 
 * The function takes in a request, a response, and a
 * @param {any} req - any, res: Response, next: any
 * @param {any} res - any,
 * @param {any} next - The next middleware function in the stack.
 */
const _show = async (req: Request, res: Response, next: any) => {
  let id = req?.query?.id?.toString();
  res.setHeader("Content-Type", "application/json");
  try {
    const resolve = await Task.findOne({ _id: id });
    if (resolve) {
      res.status(200).json(resolve);
    }
  } catch (error) {
    res.status(400).json("no encontrado!");
  }
  res.end();
};


const _plain = async (req: Request, res: Response, next: any) => {
  let id = req?.query?.id?.toString();
  res.setHeader("Content-Type", "application/json");
  try {
    const resolve = await Task.findOne({ _id: id });
    if (resolve) {
      res.status(200).send(resolve?.conten);
    }
  } catch (error) {
    res.status(400).json("no encontrado!");
  }
  res.end();
};



/**
 * It gets the last document in the collection and returns its _id.
 * @param {any} req - any = request
 * @param {any} res - any =&gt; the response object
 */
const _last = async (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  const aux: any = await Task.find().limit(1).sort({ $natural: -1 });
  const last = aux;
  res.json(last);
};

export { _default, _new, _recollector, _items, _delete, _show, _last, _plain };
