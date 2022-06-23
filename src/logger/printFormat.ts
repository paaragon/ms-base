import colors from 'colors';
import httpContext from 'express-http-context';
import { TransformableInfo } from 'logform';
import { mapLevelColor } from 'myfavouritelogger';

colors.enable();

function formatTime(time: number): string {
  if (time > 1000) {
    return `+${Math.round(time / 10) / 100}s`;
  }
  return `+${time}ms`;
}

export default function printFormat(str: string, info: TransformableInfo): string {
  let ret = str;
  if (httpContext.get('starttime')) {
    const time = formatTime(new Date().getTime() - httpContext.get('starttime'));
    ret += `[${time}] `;
  }
  if (info.level) {
    ret += mapLevelColor(info.level, `[${info.level}] `);
  }
  if (info.name) {
    ret += `[${info.name}] `.green;
  }
  if (httpContext.get('uuid')) {
    ret += `[${httpContext.get('uuid')}] `.grey;
  }
  ret += `${info.message}`;

  return ret;
}
