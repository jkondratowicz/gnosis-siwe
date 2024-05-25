import { CamelCasePlugin, Kysely, PostgresDialect, PostgresPool } from 'kysely';
import pg from 'pg';
import { env } from '@/common/utils/env.js';
import { DB } from '@/db/types.gen.js';
import { logger as mainLogger } from '@/common/utils/logger.js';

const logger = mainLogger.child({ module: 'db' });

const { Pool } = pg;
const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

pool.on('error', (err) => {
  logger.error('Unexpected error on idle client', err as Error);
  process.exit(-1);
});

export function createDatabaseInstance({ pool }: { pool: PostgresPool }) {
  const dialect = new PostgresDialect({
    pool,
  });

  return new Kysely<DB>({
    dialect,
    plugins: [
      new CamelCasePlugin({
        underscoreBeforeDigits: true,
      }),
    ],
    log(event) {
      switch (event.level) {
        case 'error':
          logger.error(event.error);
          break;
        case 'query':
          if (env.DEBUG_SQL_QUERIES) {
            logger.info(`[${Math.round(event.queryDurationMillis)}ms] ${event.query.sql}`);
          }
          break;
      }
    },
  });
}

export const db = createDatabaseInstance({ pool });
