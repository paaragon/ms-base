import config from 'config';
import myfavouritelogger from 'myfavouritelogger';
import { ConfigLogI } from '../config';
import { printFormat } from './printFormat';

const logFolder = process.env.LOG_FOLDER_PATH || './logs';

const logConfig = config.get<ConfigLogI>('log');

const logger = myfavouritelogger({
    file: {
        path: `${logFolder}/application-%DATE%.log`,
        maxSize: '20m',
        maxFiles: '14d',
    },
    level: logConfig.level,
    colors: logConfig.color,
    printFormat,
    dateFormat: 'YYYY-MM-DD HH:mm:ssZ',
});

const accessLogger = myfavouritelogger({
    file: {
        path: `${logFolder}/application-%DATE%.access.log`,
    },
    console: false,
    level: logConfig.level,
    colors: logConfig.color,
    printFormat,
    dateFormat: 'YYYY-MM-DD HH:mm:ssZ',
});

export { logger, accessLogger };
