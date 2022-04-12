import express from "express";
import db from "../connection/database";
const app = express();
import os from "os";
import cors from 'cors'

import * as routes from "./routes.json";
//load database

if (db) console.log('-> Conectado con el cluster "ABIS" database ');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//ROUTES
app.use("/notes", require(routes["notes"].route));
app.use("/crypto", require(routes["crypto"].route));
app.use("/addon", require(routes["addons"].route));

//default
app.get("/", (req, res) => {
  res.json({
    apiData: { version: 0.1, nombre: "KNOCK-API", author: "kevin bohorquez" },
    routes: ["/notes", "/crypto"],
  });
});

app.set("PORT", process.env.PORT || 3001);

app.listen(app.get("PORT"), () => {
  console.log("-> Servidor en linea");
  console.log("-> Host ", os.hostname());
  console.log("-> Puerto ", app.get("PORT"));
});

export default app;
