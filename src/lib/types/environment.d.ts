/// <reference types="node" />

import { DatabaseInfo } from '~/data/db';

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly MONGODB_URI: string;
  }
}

declare global {
  namespace NodeJS {
    interface Global {
      db: DatabaseInfo;
    }
  }
}
