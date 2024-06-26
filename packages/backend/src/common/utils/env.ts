import * as dotenv from 'dotenv';
import { bool, cleanEnv, host, port, str } from 'envalid';

dotenv.config();

export const env = cleanEnv(process.env, {
  APP_NAME: str({ default: 'gnosis-siwe-jk' }),
  SESSION_SECRET: str(),
  NODE_ENV: str({ default: 'development', choices: ['development', 'production', 'test'] }),
  HOST: host({ default: 'localhost' }),
  PORT: port({ default: 5000 }),
  CORS_ORIGIN: str({ default: 'http://localhost:5173' }),
  DATABASE_URL: str(),
  DEBUG_SQL_QUERIES: bool({ default: false }),
});
