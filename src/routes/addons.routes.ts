import { Router } from "express";
import { text } from "express";
import cors from "cors";

import * as ctrl from "../controller/addon.ctrl";
import midds from "../middleware/midd";

const app = Router();
app.use(text());
app.use(cors());

app.get("/", ctrl._default);

app.post(
  "/compile",
  midds.noEmptyCompile,
  text({ type: "*/*" }),
  ctrl._compile
);

app.post(
  "/download",
  midds.noEmptyCompile,
  text({ type: "*/*" }),
  ctrl._download
);
app.post("/assembly", midds.noEmptyCompile, text({ type: "*/*" }), ctrl._asm);

module.exports = app;
