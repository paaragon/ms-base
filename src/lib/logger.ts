import * as colors from 'colors';
import config from 'config';
import httpContext from 'express-http-context';
import { TransformableInfo } from 'logform';
import moment from 'moment';
import winston from 'winston';
import 'winston-daily-rotate-file';
import { ConfigLogI } from '../models/ConfigI';
colors.green;


const { printf } = winston.format;
const tsFormat = () => moment.utc().format('YYYY-MM-DD hh:mm:ssZ').trim();

const logFolder = process.env.LOG_FOLDER_PATH || './logs';

const logString = (str: string, info: TransformableInfo): string => {
    if (info.level) {
        str += mapLevelColor(info.level, `[${info.level}] `.padEnd(8, ' '));
    }
    if (info.name) {
        str += `[${info.name}] `.green;
    }
    if (httpContext.get('uuid')) {
        str += `[${httpContext.get('uuid')}] `.grey;
    }
    str += `${info.message}`;

    return str;
}

const myFormat = printf((info: TransformableInfo) => {
    let str = `${tsFormat()} `;
    str = logString(str, info);
    return str;
});

const fileFormat = printf((info: TransformableInfo) => {
    let str = `${tsFormat()} `;
    str = logString(str, info);
    return str.replace(/\[[0-9]{2}m/g, '');
});

const dailyTransport = new winston.transports.DailyRotateFile({
    filename: `${logFolder}/application-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    level: config.get<ConfigLogI>('log').level,
    format: fileFormat
});

const accessDailyTransport = new winston.transports.DailyRotateFile({
    filename: `${logFolder}/application-%DATE%.access.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    level: config.get<ConfigLogI>('log').level,
    format: fileFormat
});

const consoleTransport = new winston.transports.Console({
    level: config.get<ConfigLogI>('log').level,
});

const logger = winston.createLogger({
    format: myFormat,
    transports: [
        consoleTransport,
        dailyTransport,
    ]
});

const accessLogger = winston.createLogger({
    format: myFormat,
    transports: [
        consoleTransport,
        accessDailyTransport,
    ]
});

export { logger, accessLogger };

function mapLevelColor(level: string, str: string) {
    if (level === 'info') {
        return str.blue;
    } else if (level === 'error') {
        return str.red;
    } else if (level === 'warn') {
        return str.yellow;
    } else if (level === 'debug') {
        return str.grey;
    } else {
        return str;
    }
}