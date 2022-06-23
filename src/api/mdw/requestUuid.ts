/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import httpContext from 'express-http-context';
import { v4 as uuid } from 'uuid';

declare global {
    namespace Express {
        interface Request {
            uuid: string
        }
    }
}

export default function(req: Request, res: Response, next: NextFunction) {
  const currUuid = uuid();
  httpContext.set('uuid', currUuid);
  (req as any).uuid = currUuid;
  httpContext.set('starttime', new Date().getTime());
  next();
}
