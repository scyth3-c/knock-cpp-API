import { Router } from "express";
import ctrl from "../controller/web/sys"

const app = Router();

app.get("/exceptions", ctrl._find_exception);
app.get("/exceptions/last", ctrl._last_exception);

module.exports = app;