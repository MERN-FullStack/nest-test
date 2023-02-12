import { Inject, Injectable } from "@nestjs/common";
import { StoreConfig, STORE_CONFIG_TOKEN } from "./dynamic.module";
import * as fs from 'fs';
@Injectable()
export class Dynamic_Service{
    constructor(@Inject(STORE_CONFIG_TOKEN) private readonly storeConfig: StoreConfig){
        //if not have then create new
        if(!fs.existsSync(this.storeConfig.dirname)){
            fs.mkdirSync(this.storeConfig.dirname);
        }
    }

    save(data: any): void{
        fs.appendFileSync(`${this.storeConfig.dirname}/${this.storeConfig.filename}`,JSON.stringify(data))
    }
}