import { Request, Response, NextFunction } from 'express';
import { v4 as uuid } from 'uuid';
import httpContext from 'express-http-context';

declare global {
    namespace Express {
        interface Request {
            uuid: string
        }
    }
}

export default function (req: Request, res: Response, next: NextFunction) {
    const currUuid = uuid();
    httpContext.set('uuid', currUuid)
    req.uuid = currUuid;
    next();
}
