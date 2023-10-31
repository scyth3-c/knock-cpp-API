import * as interfaces from "../../entity/abstract/interfaces"
import env from "dotenv";
env.config();

namespace sys {
   export  abstract class Exceptions {

         static body: interfaces.sys.ExceptMan;
         static inited: boolean = false;

         static init() : void {

             this.body = {
                 date: new Date().getUTCDate().toString(),
                 meta: {category:"", update: "", target: ""},
                 total: Number.parseInt(process.env.TOTAL_EXCEP as string),
                 list: new Array<unknown>(),
                 last: undefined,
                 lasted: 0,
             }
             this.inited = true;
         }

         public static add(value:any) : boolean {
            try {
                if (!this.inited) return false;
                this.body.last = value;
                if(this.body.list?.length > this.body?.total){
                    this.body.list.push(value);
                    return true;
                } else{
                    if(this.body.lasted >= this.body.total)
                        this.body.lasted = 0;
                    this.body.list[this.body.lasted] = value;
                    this.body.lasted++;
                    return true;
                }
            } catch (e){
                return false;
            }
         }
         public static get() : Array<unknown> {
             return this.body.list?.length > 0 ? this.body.list : [];
         }
         public static last() : unknown {
             return this.body?.last;
         }
    }
}

export {sys}
