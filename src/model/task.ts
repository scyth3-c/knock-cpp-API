import { Schema, model } from "mongoose";

/* The code is defining a Mongoose schema for a task. */

const TaskSchema = new Schema({
  nombre: String,
  conten: String,
  author: String,
}, { versionKey: false } );

export = model("Task", TaskSchema);
