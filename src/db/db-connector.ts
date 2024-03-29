import config from 'config';
import { DataSource } from 'typeorm';
import { ConfigLogI, ConfigSQLiteI } from '../config';
import TypeOrmLogger from './TypeOrmLogger';

const dbConfig = config.get<ConfigSQLiteI>('db');
const logConfig = config.get<ConfigLogI>('log');

export const AppDataSource = new DataSource({
  name: 'default',

  /* SQLite config */
  type: 'sqlite',
  database: dbConfig.location,

  /* Oracle config */
  /*
        type: 'oracle',
        // this connectString is an option. You can configure it also with host, port and database properties
        connectString: dbConfig.connectionString,
        username: dbConfig.user,
        password: dbConfig.password,
        extra: {
            poolMax: dbConfig.maxConnections
        }
     */

  /* Postgres config */
  /*
        type: 'postgres',
        database: dbConfig.db,
        host: dbConfig.host,
        port: dbConfig.port,
        username: dbConfig.user,
        password: dbConfig.password,
        ssl: {
            rejectUnauthorized: false
        },
        extra: {
            max: dbConfig.maxConnections,
        }
    */
  synchronize: true,
  logger: new TypeOrmLogger(),
  maxQueryExecutionTime: dbConfig.queryAlertTime,
  logging: logConfig.level === 'debug',
  entities: [
    `${__dirname}/entities/*.{ts,js}`,
  ],
});

export default {
  init: async () => {
    await AppDataSource.initialize();
  },
};
