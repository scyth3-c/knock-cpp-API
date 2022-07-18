import express from "express";
import db from "../connection/database";
const app = express();
import os from "os";
import cors from 'cors'

import * as routes from "./routes.json";


//load database
//YOU SHOULD ADD .ENV FILE WITH    DATABASE=<MONGO URI>
 if (db) console.log('-> Conectado con el cluster "ABIS" database ');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//ROUTES
app.use("/notes", require(routes["notes"].route));
app.use("/crypto", require(routes["crypto"].route));
app.use("/addon", require(routes["addons"].route));

//default
app.use('/', require(routes["root"].route))

app.set("PORT", process.env.PORT || 3001);

app.listen(app.get("PORT"), () => {
  console.log("-> Servidor en linea");
  console.log("-> Host ", os.hostname());
  console.log("-> Puerto ", app.get("PORT"));
});

export default app;
