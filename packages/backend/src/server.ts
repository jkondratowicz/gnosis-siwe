import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import errorHandler from '@/common/middleware/errorHandler.js';
import requestLogger from '@/common/middleware/requestLogger.js';
import { env } from '@/common/utils/env.js';
import { sessionMiddleware } from '@/common/middleware/session.js';
import { healthCheckRouter } from '@/api/healthCheck/healthCheckRouter.js';
import { authRouter } from '@/api/auth/authRouter.js';
import { profileRouter } from '@/api/profile/profileRouter.js';

export const app: Express = express();

app.set('trust proxy', true);

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(sessionMiddleware());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(requestLogger);

app.use('/health-check', healthCheckRouter);
app.use('/auth', authRouter);
app.use('/profile', profileRouter);

app.use(errorHandler());
