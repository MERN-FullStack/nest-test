import { Inject, Optional } from '@nestjs/common';
import * as fs from 'fs';
import { StoreConfig } from './dynamic.config';

export class Dynamic_Service {
  constructor(
    @Optional() @Inject('STORE_CONFIG') private storeConfig: StoreConfig,
  ) {
    if (storeConfig && !fs.existsSync(storeConfig.dirname)) {
      fs.mkdirSync(storeConfig.dirname);
    }
  }

  save(data: any): void {
    fs.appendFileSync(
      `${this.storeConfig.dirname}/${this.storeConfig.filename}`,
      JSON.stringify(data),
    );
  }
}