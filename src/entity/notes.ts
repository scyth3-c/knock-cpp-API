import Model from "../model/task"
import {sys} from "../controller/system/exceptions";
import {model} from "./abstract/interfaces";
import Entity from "./abstract/entity";

class Notes extends Entity{

    name: string;
    conten: string;
    author: string

    constructor(name:string, conten:string, author:string){
        super("Notes");
        this.name = name; this.conten = conten; this.author = author;
    }

    async save() : Promise<model.ModelResponse>{
        try {
            let opt = new Model({
               nombre: this.name,
               conten: this.conten,
               author: this.author
            });
           let query = await  opt.save();
            return {
                status: query !== undefined,
                name: "Notes",
                data: query
            }
        } catch(e){
            sys.Exceptions.add(e);
            return { status: false, name: "Notes", data: {}};
        }
    }

    async update( id: string ) : Promise <model.ModelResponse>  {
        try {
            let query = await Model.updateOne({_id: id}, {
                nombre: this.name,
                conten: this.conten,
                author: this.author
            });
            return {
                status:  query != undefined,
                name: "Notes",
                data: query
            };
        } catch (e:unknown){
            sys.Exceptions.add(e);
            return { status: false, name: "Notes", data: {}}
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
}

export  default Notes;