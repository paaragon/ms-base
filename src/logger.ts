import config from 'config';
import myfavouritelogger from "./lib/myfavouritelogger/myfavouritelogger";
import { ConfigLogI } from './models/ConfigI';


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
