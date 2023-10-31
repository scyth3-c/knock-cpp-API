import { Router } from "express";
import {middleware} from "../middleware/midd";
import * as crypto_ctrl from "../controller/web/crypto.ctrl";

const app = Router();

/* These lines of code are defining two routes for the Express router. */
app.get("/", crypto_ctrl._default);
app.get("/sha256", middleware.noEmptySHA, crypto_ctrl._sha256);

module.exports = app;
