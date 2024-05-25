import Session from 'express-session';
import { env } from '@/common/utils/env.js';
import { SiweMessage } from 'siwe';

declare module 'express-session' {
  interface SessionData {
    nonce?: string | null;
    siwe?: SiweMessage | null;
  }
}

export const sessionMiddleware = () =>
  Session({
    name: env.APP_NAME,
    secret: env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, sameSite: true },
  });
