import { NextFunction, Request, Response } from 'express';
import { CustomExpress } from '../../lib/customExpress/customExpress';
import { MethodNotAllowedException } from '../exceptions/HttpException';

export default function methodNotAllowed(app: CustomExpress) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { method, url } = req;
    const methodNotAllowed = app.endpoints.some((end) => end.method !== method && checkPath(end.path, url));

    if (methodNotAllowed) {
      next(new MethodNotAllowedException());
    } else {
      next();
    }
  }
}

function checkPath(endpoint: string, url: string) {
  const regexEndpoint: string = endpoint.replace(/(\:.*?)(\/|$)/g, '(.*)');

  const regex = new RegExp(regexEndpoint);
  console.log('regex endpoint', regexEndpoint);
  return regex.test(url);
}
