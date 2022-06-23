import { NextFunction, Request, Response } from 'express';
import { accessLogger, logger } from '../../logger/logger';

const accessLog = accessLogger.child({ name: 'access-logger' });
const log = logger.child({ name: 'access-logger' });

export default function(req: Request, res: Response, next: NextFunction) {
  const reqDate: Date = new Date();
  logRequest(req, res);
  const originalJsonfn = res.json.bind(res);

  res.json = (arg: any): Response<any> => {
    logResponse(req, res, reqDate);
    return originalJsonfn(arg);
  };

  next();
}

function logResponse(req: Request, res: Response, reqDate: Date) {
  const { baseUrl } = req;
  const { url } = req;
  const duration = new Date().getTime() - reqDate.getTime();
  const { statusCode } = res;
  const { method } = req;
  const accessLogStr = `${statusCode} ${method.toUpperCase()} ${baseUrl}${url} ${duration}ms`.yellow;
  accessLog.info(`End of request: ${accessLogStr}`);
  log.info(`End of request: ${accessLogStr}`);
}

function logRequest(req: Request, res: Response) {
  const { baseUrl } = req;
  const { url } = req;
  const { method } = req;
  const accessLogStr = `${method.toUpperCase()} ${baseUrl}${url}`.yellow;
  accessLog.info(`Incoming request: ${accessLogStr}`);
  log.info(`Incoming request: ${accessLogStr}`);
}
