import { TransformableInfo } from 'logform';

export type LoggerPrintFunction = (str: string, info: TransformableInfo) => string;

export type LoggerLevel = 'info' | 'error' | 'warn' | 'debug';

export interface LoggerFileConfig {
    path?: string,
    maxSize?: string | number,
    maxFiles?: string | number,
    zippedArchive?: boolean,
    pathDatePattern?: string,
}


export interface LoggerConfig {
    printFormat?: LoggerPrintFunction;
    file?: LoggerFileConfig;
    console?: boolean;
    level?: LoggerLevel;
}
