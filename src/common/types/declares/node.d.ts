import { ProcessEnv as ProcessBase } from 'node:process';

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface ProcessEnv extends ProcessBase {
      SERVER_SCHEMA: string;
      SERVER_HOST: string;
      SERVER_PORT: string;
      SERVER_FULL_HOST: string;
    }
  }
}
