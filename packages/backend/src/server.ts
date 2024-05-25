import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import { healthCheckRouter } from '@/api/healthCheck/healthCheckRouter.js';
import errorHandler from '@/common/middleware/errorHandler.js';
import requestLogger from '@/common/middleware/requestLogger.js';
import { env } from '@/common/utils/env.js';
import { sessionMiddleware } from '@/common/middleware/session.js';
import { authRouter } from '@/api/auth/authRouter.js';
import bodyParser from 'body-parser';

export const app: Express = express();

app.set('trust proxy', true);

app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(sessionMiddleware());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(requestLogger);

app.use('/health-check', healthCheckRouter);
app.use('/auth', authRouter);

app.use(errorHandler());
