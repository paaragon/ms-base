import * as colors from 'colors';
import httpContext from 'express-http-context';
import { TransformableInfo } from 'logform';
import moment from 'moment';
import winston from 'winston';
import 'winston-daily-rotate-file';
colors.green;

const { printf } = winston.format;
const tsFormat = () => moment.utc().format('YYYY-MM-DD HH:mm:ssZ').trim();

const logFolder = process.env.LOG_FOLDER_PATH || './logs';

export default function (loggerConfig?: LoggerConfig) {
    const printFormat = loggerConfig?.printFormat || defaultPrint;
    const level = loggerConfig?.level || 'info';
    const datePattern: string = loggerConfig?.file?.datePattern || 'YYYY-MM-DD';
    const filePath = loggerConfig?.file?.path || `${logFolder}/application-%DATE%.log`;
    const maxSize: string | number = loggerConfig?.file?.maxSize || '20m';
    const maxFiles: string | number = loggerConfig?.file?.maxFiles || '14d';
    const zippedArchive: boolean = loggerConfig?.file?.zippedArchive || true;

    const transports = [];


    if (filePath) {
        const fileFormat = printf((info: TransformableInfo) => {
            let str = `${tsFormat()} `;
            str = printFormat(str, info);
            return str.replace(/\[[0-9]{2}m/g, '');
        });

        const dailyTransport = new winston.transports.DailyRotateFile({
            filename: filePath,
            datePattern,
            zippedArchive,
            maxSize,
            maxFiles,
            level,
            format: fileFormat
        });
        transports.push(dailyTransport);
    }

    const consoleFormat = printf((info: TransformableInfo) => {
        let str = `${tsFormat()} `;
        str = printFormat(str, info);
        return str;
    });

    const consoleTransport = new winston.transports.Console({
        level: level,
        format: consoleFormat,
    });

    transports.push(consoleTransport);

    const logger = winston.createLogger({ transports });

    return logger;
}

export interface LoggerConfig {
    printFormat?: (str: string, info: TransformableInfo) => string,
    file?: {
        path?: string,
        maxSize?: string | number,
        maxFiles?: string | number,
        zippedArchive?: boolean,
        datePattern?: string,
    }
    console?: boolean,
    level?: 'info' | 'error' | 'warn' | 'debug',
}

function defaultPrint(str: string, info: TransformableInfo): string {
    if (httpContext.get('starttime')) {
        const time = formatTime(new Date().getTime() - httpContext.get('starttime'));
        str += `[${time.padStart(7, ' ')}] `;
    }
    if (info.level) {
        str += mapLevelColor(info.level, `[${info.level.padEnd(7, ' ')}] `);
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

function formatTime(time: number): string {
    if (time > 1000) {
        return `+${Math.round(time / 10) / 100}s`;
    } else {
        return `+${time}ms`;
    }
}