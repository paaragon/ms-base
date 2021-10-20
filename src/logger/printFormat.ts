import colors from 'colors';
import httpContext from 'express-http-context';
import { TransformableInfo } from 'logform';
import { mapLevelColor } from 'myfavouritelogger';
colors.enable();

export function printFormat(str: string, info: TransformableInfo): string {
    if (httpContext.get('starttime')) {
        const time = formatTime(new Date().getTime() - httpContext.get('starttime'));
        str += `[${time}] `;
    }
    if (info.level) {
        str += mapLevelColor(info.level, `[${info.level}] `);
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

function formatTime(time: number): string {
    if (time > 1000) {
        return `+${Math.round(time / 10) / 100}s`;
    } else {
        return `+${time}ms`;
    }
}