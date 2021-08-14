import config from 'config';
import { ConnectionOptions, createConnection } from 'typeorm';
import { logger } from '../lib/logger';
import { ConfigLogI, ConfigSQLiteI } from '../models/ConfigI';

const dbConfig = config.get<ConfigSQLiteI>('db');
const logConfig = config.get<ConfigLogI>('log');

const options: ConnectionOptions = {
    name: 'default',
    type: 'sqlite',
    database: dbConfig.location,
    synchronize: true,
    logging: logConfig.level === 'debug', // ['query'],
    entities: [
        `${__dirname}/../models/dbentities/*.ts`,
        `${__dirname}/../../dist/**/models/dbentities/*.js`,
    ],
};

export default {
    createConnection: async () => {
        logger.info(`${JSON.stringify(options)}`)
        const connection = await createConnection(options);
    }
}