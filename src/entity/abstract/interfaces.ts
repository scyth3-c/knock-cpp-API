
namespace model {

 export type ModelResponse ={
        status: boolean,
        name: string,
        data: Object
    }
 export  type MetaData = {
        category: String,
        update: String,
        target: String
    }

}

namespace sys {

 export type ExceptMan = {
        meta: model.MetaData;
        date: string;
        list: Array<unknown>;
        last: unknown;
        total: number;
        lasted: number;
    }

}

export  { sys , model }