import * as colors from 'colors';
import httpContext from 'express-http-context';
import { TransformableInfo } from 'logform';
import moment from 'moment';
import winston from 'winston';
import 'winston-daily-rotate-file';
import DailyRotateFile from 'winston-daily-rotate-file';
import { Console, ConsoleTransportInstance } from 'winston/lib/winston/transports';
import { LoggerConfig, LoggerFileConfig, LoggerLevel, LoggerPrintFunction } from './myfavouriteloggerI';
colors.enable();

const { printf } = winston.format;
const tsFormat = () => moment.utc().format('YYYY-MM-DD HH:mm:ssZ').trim();

export default function (loggerConfig?: LoggerConfig) {
    const printFormat = loggerConfig?.printFormat || defaultPrint;
    const level = loggerConfig?.level || 'info';
    const filePath = loggerConfig?.file?.path;

    const transports: (DailyRotateFile | ConsoleTransportInstance)[] = [];

    if (filePath) {
        transports.push(getDailyFileTransport(level, loggerConfig.file, printFormat));
    }

    if (loggerConfig.console !== false) {
        transports.push(getConsoleTransport(level, printFormat));
    }

    const logger = winston.createLogger({ transports });

    return logger;
}

function getDailyFileTransport(level: LoggerLevel, fileConfig: LoggerFileConfig, printFormat: LoggerPrintFunction): DailyRotateFile {
    const fileFormat = printf((info: TransformableInfo) => {
        let str = `${tsFormat()} `;
        str = printFormat(str, info);
        return str.replace(/\[[0-9]{2}m/g, '');
    });

    const filePath = fileConfig.path;
    const datePattern: string = fileConfig.pathDatePattern || 'YYYY-MM-DD';
    const maxSize: string | number = fileConfig.maxSize || '20m';
    const maxFiles: string | number = fileConfig.maxFiles || '14d';
    const zippedArchive: boolean = fileConfig.zippedArchive || false;

    const dailyTransport = new DailyRotateFile({
        filename: filePath,
        datePattern,
        zippedArchive,
        maxSize,
        maxFiles,
        level,
        format: fileFormat
    });

    return dailyTransport;
}

function getConsoleTransport(level: LoggerLevel, printFormat: LoggerPrintFunction): ConsoleTransportInstance {
    const consoleFormat = printf((info: TransformableInfo) => {
        let str = `${tsFormat()} `;
        str = printFormat(str, info);
        return str;
    });

    const consoleTransport = new Console({
        level,
        format: consoleFormat,
    });

    return consoleTransport;
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