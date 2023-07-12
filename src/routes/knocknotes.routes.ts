import { Router } from "express";
import midds from "../middleware/midd";
import * as notes_ctrl from "../controller/notes.ctrl";

const app = Router();

/* The code block is defining the routes for a RESTful API using the Express framework in TypeScript.
Each route corresponds to a specific HTTP method (GET, POST, DELETE) and URL path. */

app.get("/", notes_ctrl._default);
app.post("/new", midds.noEmptyNew, notes_ctrl._new);
app.get("/recollector", notes_ctrl._recollector);
app.post("/items", notes_ctrl._items);
app.delete("/delete", midds.noID, notes_ctrl._delete);
app.get("/show", midds.noID, notes_ctrl._show);
app.get("/last", notes_ctrl._last);
app.get("/plain", midds.noID, notes_ctrl._plain)

module.exports = app;
