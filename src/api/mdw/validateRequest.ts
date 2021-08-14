import { Response, NextFunction, Request } from 'express';
import { validationResult } from 'express-validator';
import HttpException from '../exceptions/HttpException';

export default function (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpException(400, 'Peticion malformada', errors.array());
    }

    next();
}
