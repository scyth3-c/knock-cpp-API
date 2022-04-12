import { Router } from "express";
import midds from "../middleware/midd";
import * as crypto_ctrl from "../controller/crypto.ctrl";
import cors from 'cors';

const app = Router();
app.use(cors());

app.get("/", crypto_ctrl._default);
app.get("/sha256", midds.noEmptySHA, crypto_ctrl._sha256);

module.exports = app;
