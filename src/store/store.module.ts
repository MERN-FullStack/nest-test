import { DynamicModule, Module } from "@nestjs/common";
import { StoreService } from "./store.service";

export interface StoreConfig{
    dirname: string,
    filename: string
}
// @Module({
    // providers: [
    //     StoreService,
    //     {
    //         provide: 'STORE-CONFIG',
    //         useValue: {
    //             dirname: 'store',
    //             filename: 'user.json'
    //         } as StoreConfig
    //     }
    // ],
    // exports: [StoreService]
// })

@Module({})
export class StoreModule{
    static register(config: StoreConfig): DynamicModule{
        return {
            module: StoreModule,
            providers: [
                StoreService,
                {
                    provide: 'STORE-CONFIG',
                    useValue: config
                }
            ],
            exports: [StoreService]
        }
    }
}