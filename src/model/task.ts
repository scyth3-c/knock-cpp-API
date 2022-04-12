import { Schema, model } from "mongoose";

const TaskSchema = new Schema({
  nombre: String,
  conten: String,
  author: String,
});

export = model("Task", TaskSchema);
