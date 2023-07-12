import { Router } from "express";
import midds from "../middleware/midd";
import * as ctrls from "../controller/codespace.ctrl"

const app = Router();

/* The code is defining different routes for the Express router `app` and associating each route with a
specific controller function. */

app.get("/", ctrls._default );
app.post("/new", midds.noEmptyCodeSpace, ctrls._new);
app.get("/extract", midds.noID, ctrls._extract)
app.delete("/delete", midds.noID, ctrls._delete)
app.put("/update", midds.noID, midds.noEmptyCodeSpace, ctrls._update)

module.exports = app;
