import * as dotenv from 'dotenv';
import { cleanEnv, host, port, str } from 'envalid';

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ default: 'development', choices: ['development', 'production', 'test'] }),
  HOST: host({ default: 'localhost' }),
  PORT: port({ default: 5000 }),
  CORS_ORIGIN: str({ default: 'http://localhost:5173' }),
});
