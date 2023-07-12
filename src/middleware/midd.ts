import { Request, Response, NextFunction } from "express";


/**
 * The function `noEmptySHA` checks if the `plain` property exists in the query object and calls the
 * `next` function if it does, otherwise it sends a 400 error response with the message "empty data".
 * @param {Request}  - - `query`: The query parameters of the HTTP request.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to set the status code,
 * headers, and send the response body.
 * @param {NextFunction} next - The `next` parameter is a function that is used to pass control to the
 * next middleware function in the request-response cycle. It is typically called when the current
 * middleware function has completed its processing and wants to pass control to the next middleware
 * function.
 */
const noEmptySHA = ({query}: Request, res: Response, next: NextFunction): void => {
  let {plain} = query
  if (plain)
    next();
  else 
    res.status(400).json({ error: "empty data" });
};
/**
 * The function checks if the code property in the request body is empty and returns an error if it is.
 * @param {Request}  - - `body`: This is the body of the request object. It contains the data that was
 * sent in the request.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to set the status code,
 * headers, and send the response body.
 * @param {NextFunction} next - The `next` parameter is a function that is used to pass control to the
 * next middleware function in the request-response cycle. It is typically called at the end of the
 * current middleware function to indicate that it has completed its processing and the next middleware
 * function should be called.
 */

const noEmptyCodeSpace = ({body}: Request, res: Response, next: NextFunction) =>{
  let {code} = body;
  if (code)
    next();
  else
   res.status(400).json({ error: "incomplete data" });
};

/**
 * The function `noEmptyNew` checks if the `nombre` and `conten` properties exist in the request body,
 * and if not, it sends a 400 response with an error message.
 * @param {Request}  - - `body`: The request body object, which contains the data sent in the request.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to set the status code,
 * headers, and send the response body.
 * @param {NextFunction} next - The `next` parameter is a function that is used to pass control to the
 * next middleware function in the request-response cycle. It is typically called at the end of the
 * current middleware function to indicate that it has completed its processing and the next middleware
 * function should be called.
 */
const noEmptyNew = ({body}: Request, res: Response, next: NextFunction): void => {
  const {nombre, conten} = body;
  if (nombre && conten) 
    next();
  else 
    res.status(400).json({ error: "incomplete data" });
};

/**
 * The function `noID` checks if the `id` parameter is present in the request query, and if not, it
 * sends a 400 error response with a JSON object containing an error message.
 * @param {Request}  - - `query`: The query parameters of the HTTP request.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to set the status code,
 * headers, and send the response body.
 * @param {NextFunction} next - The `next` parameter is a function that is used to pass control to the
 * next middleware function in the request-response cycle. It is typically called at the end of the
 * current middleware function to indicate that it has completed its processing and the next middleware
 * function should be called.
 */
const noID = ({query}: Request, res: Response, next: NextFunction): void => {
    let {id} = query
  if (id) 
      next();
  else 
    res.status(400).json({ error: "empty id" });
};

/**
 * The function `noVloc` checks if the `vloc` property exists in the query object of a request, and if
 * not, it sends a 400 error response with a JSON object containing an error message.
 * @param {Request}  - - `query`: This is the request query object that contains the query parameters
 * sent with the request.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to set the status code,
 * headers, and send the response body.
 * @param {NextFunction} next - The `next` parameter is a function that is used to pass control to the
 * next middleware function in the request-response cycle. It is typically used when you want to move
 * to the next middleware function or route handler after performing some operations in the current
 * middleware function.
 */
const noVloc = ({query}: Request, res: Response, next: NextFunction): void => {
  let {vloc} = query;
  if (vloc) 
    next();
  else 
    res.status(400).json({ error: "empty id" });
};

/**
 * The function checks if the request body is empty and sends an error response if it is.
 * @param {Request}  - - `body`: The body of the request object.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It is an instance of the `Response` class, which provides methods for setting
 * the response status code, headers, and body.
 * @param {NextFunction} next - The `next` parameter is a function that is called to pass control to
 * the next middleware function in the request-response cycle. It is typically used to move to the next
 * middleware function or to the final route handler.
 */
const noEmptyCompile = ({ body }: Request, res: Response, next: NextFunction): void => {
  if (body) 
    next();
  else
   res.status(400).send("CODE IS EMPTY");
};

/**
 * The function `NewOpenmoid` checks if the request body contains the required properties and calls the
 * next middleware function if they are present, otherwise it sends a 400 Bad Request response.
 * @param {Request}  - - `body`: The request body object that contains the data sent in the request.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code, headers, and sending the response body.
 * @param {NextFunction} next - The `next` parameter is a function that is used to pass control to the
 * next middleware function in the request-response cycle. It is typically used to move on to the next
 * function in the middleware stack.
 */
const NewOpenmoid = ({ body }: Request, res: Response, next: NextFunction): void => {
  const { cabecera, cuerpo, origen, vloc } = body;
  if (cabecera && cuerpo && origen && vloc) {
    next();
  } else {
    res.status(400).json("BAD REQUEST");
  }
};


export default {
  noEmptySHA,
  noEmptyCompile,
  noEmptyCodeSpace,
  noID,
  noVloc,
  noEmptyNew,
  NewOpenmoid
}
