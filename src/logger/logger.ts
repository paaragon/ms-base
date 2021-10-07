import config from 'config';
import myfavouritelogger from "../lib/myfavouritelogger/myfavouritelogger";
import { ConfigLogI } from '../models/ConfigI';
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
    printFormat
});

const accessLogger = myfavouritelogger({
    file: {
        path: `${logFolder}/application-%DATE%.access.log`,
    },
    console: false,
    level: logConfig.level,
    colors: logConfig.color,
    printFormat
});

export { logger, accessLogger };
