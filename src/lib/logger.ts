import config from 'config';
import { ConfigLogI } from '../models/ConfigI';
import myfavouritelogger from "./myfavouritelogger/myfavouritelogger";


const logFolder = process.env.LOG_FOLDER_PATH || './logs';

const logger = myfavouritelogger({
    file: {
        path: `${logFolder}/application-%DATE%.log`,
        maxSize: '20m',
        maxFiles: '14d',
    },
    level: config.get<ConfigLogI>('log').level
});

const accessLogger = myfavouritelogger({
    file: {
        path: `${logFolder}/application-%DATE%.access.log`,
    },
    console: false,
    level: config.get<ConfigLogI>('log').level
});

export { logger, accessLogger };
