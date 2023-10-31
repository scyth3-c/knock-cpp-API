import { Schema, model } from "mongoose";

/* The code is defining a Mongoose schema for a task. */

const OptionsSchema = new Schema({
     name:   {
         type: String,
         required: true
     },
     values: {
         type: Array,
         required: true
     },
     meta: {
         type: Object,
         category: {
             type: String,
             required: true
         },
         update: {
             type: String,
             required: true
         },
         target:{
             type: String,
             required: true
         }
     },

}, { versionKey: false } );

export = model("Options", OptionsSchema);
