import { NextFunction, Request, Response } from 'express';
import { logger } from '../../logger/logger';
import HttpException from '../exceptions/HttpException';

const log = logger.child({ name: 'error-handler' });

export default function errorHandler(error: HttpException, req: Request, res: Response, next: NextFunction) {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    const extra = error.extra;
    log.error(`Response error: ${status} - ${message}`);
    log.error(error.stack);
    res.status(status)
        .json({ error: true, message, extra })
}
