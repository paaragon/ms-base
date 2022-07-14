import { NextFunction, Request, Response } from 'express';
import { NotFoundException } from '../exceptions/HttpException';

export default function notFound(req: Request, res: Response, next: NextFunction) {
  next(new NotFoundException());
}
