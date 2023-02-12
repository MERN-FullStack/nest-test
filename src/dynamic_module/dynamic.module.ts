import { DynamicModule, Module } from "@nestjs/common";
import { Dynamic_Service } from "./dynamic.service";

export interface StoreRootConfig{
    dirname: string,
}
export interface StoreFeatureConfig{
    filename: string
}
//! partial = ? It's okay to have it, it's okay not to have it
export type StoreConfig = Partial<StoreRootConfig & StoreFeatureConfig>;

let rootStoreConfig: StoreConfig 

export const STORE_CONFIG_TOKEN = 'STORE-CONFIG'
const DEFAULT_STORE_DIRNAME = 'store'
const DEFAULT_FILE_NAME = 'data.json'
@Module({
    providers: [Dynamic_Service],
    exports: [Dynamic_Service]
})
class Root_Dynamic_Module{}


@Module({})
export class Dynamic_Module{
    static forRoot(configRoot?: StoreRootConfig): DynamicModule{
        rootStoreConfig = this.createConfig(configRoot)
        return {
            module: Root_Dynamic_Module,
            providers: [
                {
                    provide: STORE_CONFIG_TOKEN,
                    useValue: rootStoreConfig
                }
            ],
        }
    }

    static forFeature(configFeature?: StoreFeatureConfig): DynamicModule{
        const token = 'STORE_SERVICE' + rootStoreConfig.filename;
        return {
            module: Dynamic_Module,
            providers: [
                {
                    provide: token,
                    useFactory: ()=>{
                        const featureStoreConfig = this.createConfig({...rootStoreConfig,...configFeature})
                        return new Dynamic_Service(featureStoreConfig)
                    }
                }
            ],
            exports: [token]
        }
    }
    private static createConfig(config: StoreConfig): StoreConfig{
        const defaultConfig: StoreConfig ={
            dirname: DEFAULT_STORE_DIRNAME,
            filename: DEFAULT_FILE_NAME
        }
        return {...defaultConfig, ...config};
        // return Object.assign(defaultConfig, config)
    }
}