import config from 'config';
import dotenv from 'dotenv';
import 'reflect-metadata';
import Server from './api/server';
import { ConfigApiI } from './config';
import dbConnection from './db/db-connector';
import { logger } from './logger/logger';

dotenv.config();

const log = logger.child({ name: 'app.ts' });
log.info('Starting app...');

(async () => {
  try {
    /** this log examples should be deleted */
    log.info('Log examples:');
    log.error('error example');
    log.warn('warning example');
    log.debug('debug example');
    log.info(`.env example variable ${process.env.EXAMPLE_ENV_VAR}`);
    /** log examples end */

    const port = normalizePort(process.env.PORT, config.get<ConfigApiI>('api').port);

    /** if you don't want db connection, delete the following lines */
    log.info('Connecting database...');
    await dbConnection.init();
    log.info('Database connected');
    /** stop deleting lines */

    log.info('Starting server...');
    const server = new Server(port);
    await server.start();
    log.info('Server started');

    log.info('application started');
  } catch (e) {
    log.error(e);
    process.exit(1);
  }
})();

function normalizePort(val: string, defaultVal: number): number {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return defaultVal;
  }

  if (port >= 0) {
    return port;
  }

  return defaultVal;
}
