export interface ConfigApiI {
    version: string;
    port: number;
    security: { [username: string]: string };
    timeout: number;
}

export interface ConfigLogI {
    level: 'debug' | 'info' | 'warn' | 'error';
    color: boolean;
}

export interface ConfigDB {
    queryAlertTime: number;
}

export interface ConfigSQLiteI extends ConfigDB {
    location: string;
}
