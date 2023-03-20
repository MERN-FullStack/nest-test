import { DynamicModule, Module } from '@nestjs/common';
import { Dynamic_Service } from './dynamic.service';

import {
  StoreConfig,
  StoreFeatureConfig,
  StoreRootConfig,
} from './dynamic.config';

let rootStoreOption: StoreConfig;
const STORE_CONFIG = 'STORE_CONFIG';
const DEFAULT_STORE_DIR = 'store';
const DEFAULT_FILE_NAME = 'data.json';

@Module({
  providers: [Dynamic_Service],
  exports: [Dynamic_Service],
})
class RootStoreModule {}

@Module({})
export class Dynamic_Module {
  static forRoot(storeConfig?: StoreRootConfig): DynamicModule {
    rootStoreOption = Dynamic_Module.buildStoreOptions(storeConfig);
    return {
      module: RootStoreModule,
      providers: [
        {
          provide: STORE_CONFIG,
          useValue: rootStoreOption,
        },
      ],
    };
  }

  static forFeature(storeConfig?: StoreFeatureConfig): DynamicModule {
    const token = 'STORE_SERVICE' + storeConfig.filename;
    return {
      module: Dynamic_Module,
      providers: [
        {
          provide: token,
          useFactory: () => {
            const storeOption = Dynamic_Module.buildStoreOptions({
              ...rootStoreOption,
              ...storeConfig,
            });
            return new Dynamic_Service(storeOption);
          },
        },
      ],
      exports: [token],
    };
  }

  private static buildStoreOptions(storeOptions: StoreConfig) {
    return Object.assign(
      {
        dirname: DEFAULT_STORE_DIR,
        filename: DEFAULT_FILE_NAME,
      },
      storeOptions,
    );
  }
}