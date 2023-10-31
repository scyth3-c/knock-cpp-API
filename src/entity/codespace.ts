import Model from "../model/codespace"
import {sys} from "../controller/system/exceptions";
import {model} from "./abstract/interfaces";
import Entity from "./abstract/entity";


class Codespace extends Entity{

    code: string;
    codespace: string;
    time: string;

    constructor(code:string, codespace: string, time:string) {
        super("Codespace")
        this.code = code; this.codespace = codespace; this.time  = time;
    }

    async save() : Promise<model.ModelResponse>{
        try {
            let opt = new Model({
                code: this.code,
                codespace: this.codespace,
                time: this.time
            });
            let query = await  opt.save();
            return {
                status: query !== undefined,
                name: "Codespace",
                data: query || {}
            }
        } catch(e){
            sys.Exceptions.add(e);
            return { status: false, name: "Codespace", data: {}};
        }
    }

    async update( id: string ) : Promise <model.ModelResponse>  {
        try {
            let query = await Model.updateOne({_id: id}, {
                code: this.code,
                codespace: this.codespace,
                time: this.time
            });
            return {
                status:  query != undefined,
                name: "Codespace",
                data: query || {}
            };
        } catch (e:unknown){
            sys.Exceptions.add(e);
            return { status: false, name: "Codespace", data: {}}
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

export  default Codespace;