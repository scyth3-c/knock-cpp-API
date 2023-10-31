import db from "mongoose";
import env from "dotenv";

env.config();

db.Promise = global.Promise;

db.set("strictQuery", false)
db.connect(process.env.DB as string, { ignoreUndefined: true })
  .then((res:any) => {
    if (res) console.log("-> conectado a la base de datos");
  })
  .catch((err:any) => {
    if (err) console.log(err);
  });

export default {
  db,
};
