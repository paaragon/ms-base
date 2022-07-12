import express from 'express';
import HttpException from './exceptions/HttpException';
import Request from './schema/Request';
import Response from './schema/Response';

export default class Controller {
  public static validate<T extends Request>(reqTypePrototype: new () => T) {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
        const controllerRequest: T = new reqTypePrototype();
        if (!controllerRequest.validate(req)) {
          throw new HttpException(400, 'Bad request');
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public static run<T extends Request, S extends Response>(method: (req: T) => Promise<S>) {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
        const response = await method(req as any);

        res.json(response);
      } catch (e) {
        next(e);
      }
    };
  }
}
