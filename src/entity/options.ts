import {model} from "./abstract/interfaces"
import Model from "../model/options"
import {sys} from "../controller/system/exceptions"
import Entity from "./abstract/entity";


class Options extends Entity{

        name: string;
        values: Array<Object>;
        meta: model.MetaData;

        constructor (name:string, values:any, meta:any) {
            super("Options");
            try {
                this.name = name !== "" ? name : "<unknow>";
                this.values = Array.isArray(values) ? values : new Array<Object>();
                this.meta = meta as model.MetaData;

            } catch (e) {
                sys.Exceptions.add(e);
                this.name = ""
                this.values = [];
                this.meta = ({ category: "", update: "", target: "" });
            }
       }

       async save() : Promise<model.ModelResponse> {

           try {
               let opt = new Model({
                   name: this.name,
                   values: this.values,
                   meta: {
                       type: this.meta.category,
                       update: this.meta.update,
                       target: this.meta.target
                   }
               });
               let query = await opt.save();
               return {
                   status: query !== undefined,
                   name: "Options",
                   data: query
               }
           } catch (e: unknown) {
               sys.Exceptions.add(e);
               return { status: false, name: "Options", data: {}};
           }
       }
       async update( id: string ) : Promise <model.ModelResponse>  {
            try {
                let query = await Model.updateOne({_id: id}, {
                    name: this.name,
                    values: this.values,
                    meta: {
                        type: this.meta.category,
                        update: this.meta.update,
                        target: this.meta.target
                    }
                });
                return {
                    status: query !== undefined,
                    name: "Options",
                    data: query || {}
                }
            } catch (e:unknown){
                sys.Exceptions.add(e);
                return { status: false, name: "Options", data: {}};
            }
       }


    static async find() : Promise<model.ModelResponse> {
        return await this._find(Model);
    }
     static async findOne(id: string) : Promise<model.ModelResponse> {
        return await this._findOne(Model,id);
     }
    static async deleteOne(id : string) : Promise<model.ModelResponse> {
        return  await this._deleteOne(Model,id);
    }
       // ENDIF ! OPTIONS
}

export default Options