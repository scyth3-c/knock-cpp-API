import express from "express";
import db from "../connection/external/database";
import sys from "../connection/system/sys.init"
import os from "os";
import cors from 'cors';
import helmet from "helmet";
import {Server} from 'socket.io'
import env from "dotenv";

const app = express();

import * as routes from "./routes.json";

if (db) console.log('-> Conectado al cluster');

sys.callEnvUtils()
env.config();

const API_VERSION = process.env.API_VERSION as string;

app.use(helmet());
app.disable('x-powered-by');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//CORS ALL ORIGINS

app.use((_req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.header('Allow', 'GET, POST, PUT, DELETE');
	next();
});

// COMPOSE ROUTES
app.use(`/api/v${API_VERSION}/notes`, require(routes["notes"].route));
app.use(`/api/v${API_VERSION}/crypto`, require(routes["crypto"].route));
app.use(`/api/v${API_VERSION}/addon`, require(routes["addons"].route));
app.use(`/api/v${API_VERSION}/codespace`, require(routes["codespace"].route));
app.use(`/api/v${API_VERSION}/openmid`, require(routes["openmid"].route));
app.use(`/api/v${API_VERSION}/sys`, require(routes["sys"].route));

// ROUTES
app.use(`/api/v${API_VERSION}`, require(routes["options"].route));


//default
app.use('/', require(routes["root"].route))

app.set("PORT", process.env.PORT || 3001);

const servidor = app.listen(app.get("PORT"), () => {
	let data:Array<Object> = [
	    {name: "API VERSION", value: API_VERSION},
		{name: "HOST", value: os.hostname()},
		{name: "TYPE", value: os.type()},
		{name: "PORT", value: app.get("PORT")},
		{name: "HOST ARCH", value: os.arch()},
		{name: "UPTIME", value: os.uptime()}
	];
	console.table(data);
});

const io = new Server(servidor,{
	cors:{
		origin: '*'
	}
})
io.on('connection',(socket:any)=>{

	socket.emit("enlace", "conectado con exito")

	socket.on('UpdateCodeSpace',(args:any)=>{
		io.emit('actualizacion_base', args)	
	});

})

export default app;
