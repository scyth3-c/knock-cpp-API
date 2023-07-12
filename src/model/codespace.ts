import { Schema, model } from "mongoose";

/* The code is defining a Mongoose schema for a model called "Codespace". */
const CodeSchema = new Schema({
  code:{
    type: String,
    required: true
  },
  codespace: {
    type: String,
    default: "unknow"
  },
  time: {
    type: String,
    default: "00:00"
  }
},
{ versionKey: false });

export = model("Codespace", CodeSchema);
