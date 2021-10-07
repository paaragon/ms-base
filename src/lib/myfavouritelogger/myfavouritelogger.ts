import * as colors from 'colors';
import { TransformableInfo } from 'logform';
import moment from 'moment';
import winston from 'winston';
import 'winston-daily-rotate-file';
import DailyRotateFile from 'winston-daily-rotate-file';
import { Console, ConsoleTransportInstance } from 'winston/lib/winston/transports';
import { LoggerConfig, LoggerFileConfig, LoggerLevel, LoggerPrintFunction } from './myfavouriteloggerI';

const { printf } = winston.format;

export default function (loggerConfig?: LoggerConfig) {
    const printFormat = loggerConfig?.printFormat || defaultPrint;
    const level = loggerConfig?.level || 'info';
    const filePath = loggerConfig?.file?.path;
    const printColors = loggerConfig?.colors;
    const dateFormat = loggerConfig?.dateFormat || 'YYYY-MM-DD HH:mm:ssZ';

    if (printColors === false) {
        colors.disable();
    }
    const transports: (DailyRotateFile | ConsoleTransportInstance)[] = [];

    const tsFormat = () => moment.utc().format(dateFormat).trim();
    if (filePath) {
        transports.push(getDailyFileTransport(level, loggerConfig.file, printFormat, tsFormat));
    }

    if (loggerConfig.console !== false) {
        transports.push(getConsoleTransport(level, printFormat, tsFormat));
    }


    const logger = winston.createLogger({ transports });

    return logger;
}

function getDailyFileTransport(level: LoggerLevel, fileConfig: LoggerFileConfig, printFormat: LoggerPrintFunction, tsFormat: () => string): DailyRotateFile {
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

function getConsoleTransport(level: LoggerLevel, printFormat: LoggerPrintFunction, tsFormat: () => string): ConsoleTransportInstance {
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

function defaultPrint(this: any, str: string, info: TransformableInfo): string {
    if (info.level) {
        str += mapLevelColor(info.level, `[${info.level}] `);
    }
    if (info.name) {
        str += `[${info.name}] `.green;
    }

    str += `${info.message}`;

    return str;
}

export function mapLevelColor(level: string, str: string) {
    switch (level) {
        case 'info':
            return str.blue;
        case 'error':
            return str.red;
        case 'warn':
            return str.yellow;
        case 'debug':
            return str.grey;
        default:
            return str;
    }
}