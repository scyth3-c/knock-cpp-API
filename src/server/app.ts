import express from "express";
import db from "../connection/database";
import os from "os";
import cors from 'cors';
import helmet from "helmet";

const app = express();


import * as routes from "./routes.json";

if (db) console.log('-> Conectado con el cluster "ABIS" database ');

app.use(helmet());
app.disable('x-powered-by');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//CORS

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

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
