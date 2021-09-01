import config from 'config';
import { ConnectionOptions, createConnection } from 'typeorm';
import { logger } from '../logger/logger';
import { ConfigLogI, ConfigSQLiteI } from '../models/ConfigI';

const dbConfig = config.get<ConfigSQLiteI>('db');
const logConfig = config.get<ConfigLogI>('log');

const options: ConnectionOptions = {
    name: 'default',
    type: 'sqlite',
    database: dbConfig.location,
    synchronize: true,
    logging: logConfig.level === 'debug',
    entities: [
        `${__dirname}/../models/dbentities/*.ts`,
        `${__dirname}/../../dist/**/models/dbentities/*.js`,
    ],
    extra: {
        /**
         * Max pool size for different dbs:
         * 
         * This options come from the database driver you are
         * using. If you want to use other properties or you
         * are using a different database, read the documentation
         * of your driver
         * 
         * Uncomment the line you need for your database
         */
        // max: dbConfig.maxConnections, // PostgreSQL
        // connectionLimit: dbConfig.maxConnections, // MySQL
        // poolMax: dbConfig.maxConnections, // Oracle
    }
};

export default {
    createConnection: async () => {
        logger.info(`${JSON.stringify(options)}`)
        await createConnection(options);
    }
}