import {model} from "./interfaces";
import {sys} from "../../controller/system/exceptions";
import mongoose from "mongoose";


 abstract class Entity{

     protected static target: string;
     protected constructor(target:string) {
         Entity.target = target;
     }

  static async _find(Model : mongoose.Model<any>) : Promise<model.ModelResponse> {
        try {
            let query : unknown = await Model.find() || undefined;
            return  {
                status:  query != undefined,
                name: this.target,
                data: query || {}
            }
        } catch(e : unknown) {
            sys.Exceptions.add(e);
            return { status: false, name: this.target, data: {}}
        }
    }

   static async _findOne(Model : mongoose.Model<any>, id:string) : Promise<model.ModelResponse> {
        try {
            let query = await Model.findOne({_id: id});
            return {
                status:  query != undefined,
                name: this.target,
                data: query || {}
            }
        }catch (e:unknown) {
            sys.Exceptions.add(e);
            return { status: false, name: this.target, data: {}}
        }
    }

    static async _deleteOne(Model : mongoose.Model<any>,  id:string) : Promise<model.ModelResponse> {
        try {
            let query = await Model.deleteOne({_id: id});
            return {
                status:  query != undefined,
                name: this.target,
                data: query
            }
        } catch(e:unknown) {
            sys.Exceptions.add(e);
            return { status: false, name: this.target, data: {}}
        }
    }


    abstract  save() : Promise<model.ModelResponse>;
    abstract  update(id:string) : Promise<model.ModelResponse>;

}

export default Entity;
