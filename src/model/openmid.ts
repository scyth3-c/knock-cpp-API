import { Schema, model } from "mongoose";

/* The code is defining a Mongoose schema called `OpenmidSchema`. The schema has four fields:
`cabecera`, `cuerpo`, `origen`, and `vloc`, all of which are of type `String`. The `{ versionKey:
false }` option is used to disable the version key in the schema. */

const OpenmidSchema = new Schema({
  cabecera: String,
  cuerpo: String,
  origen: String,
  vloc: String
}, { versionKey: false } );

export = model("Openmid", OpenmidSchema);