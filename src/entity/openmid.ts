import Model from "../model/openmid"
import {sys} from "../controller/system/exceptions";
import {model} from "./abstract/interfaces";

// ESPECIAL CLASS, DONT USE EXTEND ENTITY
class Openmid {

    cabecera: String;
    cuerpo: String;
    origen: String;
    vloc: String;

    constructor( cabecera: String, cuerpo: String, origen: String, vloc: String) {
        this.cabecera = cabecera;
        this.cuerpo = cuerpo;
        this.origen = origen;
        this.vloc = vloc;
    }

    async save() : Promise<model.ModelResponse>{
        try {
            let opt = new Model({
                cabecera: this.cabecera,
                cuerpo: this.cuerpo,
                origen: this.origen,
                vloc: this.vloc,
            });
            let query = await  opt.save();
            return {
                status: query !== undefined,
                name: "Openmid",
                data: query
            }
        } catch(e){
            sys.Exceptions.add(e);
            return { status: false, name: "Openmid", data: {}};
        }
    }

    async update( vloc: string ) : Promise <model.ModelResponse>  {
        try {
            let query = await Model.updateOne({vloc: vloc}, {
                cabecera: this.cabecera,
                cuerpo: this.cuerpo,
                origen: this.origen
            });
            return {
                status:  query != undefined,
                name: "Openmid",
                data: query || {}
            };
        } catch (e:unknown){
            sys.Exceptions.add(e);
            return { status: false, name: "Openmid", data: {}}
        }
    }

    static async findOne(vloc:string) : Promise<model.ModelResponse> {
        try {
            let query : unknown = await Model.find({vloc:vloc}) || undefined;
            return  {
                status:  query != undefined,
                name: "Openmid",
                data: query || {}
            }
        } catch(e : unknown) {
            sys.Exceptions.add(e);
            return { status: false, name: "Openmid", data: {}}
        }
    }

    static async find() : Promise<model.ModelResponse> {
        try {
            let query : unknown = await Model.find() || undefined;
            return  {
                status:  query != undefined,
                name: "Notes",
                data: query || {}
            }
        } catch(e : unknown) {
            sys.Exceptions.add(e);
            return { status: false, name: "Notes", data: {}}
        }
    }


    static async deleteOne(vloc : string) : Promise<model.ModelResponse> {
        try {
            let query = await Model.deleteOne({vloc: vloc});
            return {
                status:  query != undefined,
                name: "Openmid",
                data: query || {}
            }
        } catch(e:unknown) {
            sys.Exceptions.add(e);
            return { status: false, name: "Openmid", data: {}}
        }
    }



}

export default Openmid