import config from 'config';
//import 'reflect-metadata';
import Server from './api/server';
import dbconnection from './db/dbconnection';
import { logger } from './lib/logger';
import { ConfigApiI } from './models/ConfigI';
require('dotenv').config();

const log = logger.child({ name: 'app.ts' });
log.info('Starting app...');

(async () => {
  try {
    log.info('Log examples:');
    log.error('error example');
    log.warn('warning example');
    log.debug('debug example');
    const port = normalizePort(process.env.PORT, config.get<ConfigApiI>('api').port);
    log.info('Connecting database...');
    await dbconnection.createConnection();
    log.info('Database connected');
    log.info('Starting server...');
    const server = new Server(port);
    server.start();
    log.info('Server started');
    log.info('application started');
  } catch (e) {
    log.error(e);
    log.error(e.stack);
    process.exit(1);
  }
})();

function normalizePort(val: string, defaultVal: number): number {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return defaultVal;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return defaultVal;
}
