import { Router } from "express";
import {middleware} from "../middleware/midd";
import {notes} from "../controller/web/notes.ctrl";

const app = Router();

/* The code block is defining the routes for a RESTful API using the Express framework in TypeScript.
Each route corresponds to a specific HTTP method (GET, POST, DELETE) and URL path. */

app.get("/", notes._default);
app.post("/new", middleware.noEmptyNew, notes._new);
app.get("/find", notes._find);
app.put("/update", middleware.noID, middleware.noEmptyNew ,notes._update)
app.post("/items", notes._items);
app.delete("/delete", middleware.noID, notes._delete);
app.get("/show", middleware.noID, notes._findone);
app.get("/last", notes._last);
app.get("/plain", middleware.noID, notes._plain)


module.exports = app;
