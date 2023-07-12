import { Router } from "express";
import midds from "../middleware/midd";
import * as crypto_ctrl from "../controller/crypto.ctrl";

const app = Router();

/* These lines of code are defining two routes for the Express router. */
app.get("/", crypto_ctrl._default);
app.get("/sha256", midds.noEmptySHA, crypto_ctrl._sha256);

module.exports = app;
