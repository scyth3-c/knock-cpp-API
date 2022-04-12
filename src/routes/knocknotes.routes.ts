import { Router } from "express";
import cors from "cors";
import midds from "../middleware/midd";
import * as notes_ctrl from "../controller/notes.ctrl";

const app = Router();
app.use(cors());

app.get("/", notes_ctrl._default);
app.post("/new", midds.noEmptyNew, notes_ctrl._new);
app.get("/recollector", notes_ctrl._recollector);
app.post("/items", notes_ctrl._items);
app.delete("/delete", midds.noEmptyDelete, notes_ctrl._delete);
app.get("/show", midds.noEmptyShow, notes_ctrl._show);
app.get("/last", notes_ctrl._last);

module.exports = app;
