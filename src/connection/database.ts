import db from "mongoose";
import env from "dotenv";

env.config();

db.Promise = global.Promise;

db.connect(process.env.DB as string, { ignoreUndefined: true })
  .then((res) => {
    if (res) console.log("-> conectado a la base de datos");
  })
  .catch((err) => {
    if (err) console.log(err);
  });

export default {
  db,
};
