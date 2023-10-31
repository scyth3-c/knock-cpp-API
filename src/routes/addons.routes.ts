import { Router } from "express";
import { text } from "express";

import * as ctrl from "../controller/web/addon.ctrl";
import {middleware} from "../middleware/midd";

const app = Router();

app.get("/", ctrl._default);


app.post(
  "/compile",
    middleware.noEmptyCompile,
  text({ type: "*/*" }),
  ctrl._compile
);


app.post(
  "/download",
    middleware.noEmptyCompile,
  text({ type: "*/*" }),
  ctrl._download
);


app.post("/assembly", middleware.noEmptyCompile, text({ type: "*/*" }), ctrl._asm);

module.exports = app;
