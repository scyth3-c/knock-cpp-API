import { Router } from "express";
import {middleware} from "../middleware/midd";
import {codespace} from "../controller/web/codespace.ctrl"

const app = Router();

app.get("/", codespace._default );
app.post("/new", middleware.noEmptyCodeSpace, codespace._new);
app.get("/findone", middleware.noID, codespace._findone)
app.delete("/delete", middleware.noID, codespace._delete)
app.put("/update", middleware.noID, middleware.noEmptyCodeSpace, codespace._update)
app.get("/find", codespace._find)

module.exports = app;
