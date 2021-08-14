import { NextFunction, Response, Request } from 'express';
import HttpException from '../exceptions/HttpException';
import { logger } from '../../lib/logger';

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
