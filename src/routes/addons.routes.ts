import { Router } from "express";
import { text } from "express";

import * as ctrl from "../controller/addon.ctrl";
import midds from "../middleware/midd";

const app = Router();

app.get("/", ctrl._default);



/* The code snippet is defining a route for the HTTP POST method with the path "/compile" in the
Express router. When a POST request is made to this route, it will execute the following middleware
functions in order: */

app.post(
  "/compile",
  midds.noEmptyCompile,
  text({ type: "*/*" }),
  ctrl._compile
);



/* The code snippet is defining a route for the HTTP POST method with the path "/download" in the
Express router. When a POST request is made to this route, it will execute the following middleware
functions in order: */

app.post(
  "/download",
  midds.noEmptyCompile,
  text({ type: "*/*" }),
  ctrl._download
);



/* defining a route for the HTTP POST method with the path "/assembly" in the Express router. */
app.post("/assembly", midds.noEmptyCompile, text({ type: "*/*" }), ctrl._asm);

module.exports = app;
