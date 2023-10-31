import crypto, { BinaryToTextEncoding } from 'crypto'
//módulo de encryption SHA256 ~_~
/* The SHA256 class takes a string and returns a string. */
class SHA256 {
    private plainText: any
    private readonly digest: BinaryToTextEncoding
    public constructor(text:string, digest:BinaryToTextEncoding = 'hex') {
        this.plainText = text
        this.digest = digest
    } 
    public convert():string {
        const hash = crypto.createHash('sha256').update(this.plainText).digest(this.verify())
        return hash as string
    }
    private verify():BinaryToTextEncoding {
        if(this.digest === 'hex' || this.digest === 'base64') {
            return this.digest
        } else{
           return 'hex'
        }
    }
}

export {SHA256}

