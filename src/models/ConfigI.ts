export interface ConfigApiI {
    version: string;
    port: number;
    security: { [username: string]: string };
}

export interface ConfigLogI {
    level: 'debug' | 'info' | 'warn' | 'error';
}

export interface ConfigSQLiteI {
    location: string;
}