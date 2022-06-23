import express from 'express';
import HttpException from '../exceptions/HttpException';
import Request from './Request';
import Response from './Response';

export default class ControllerRunner {
  public static validate<T extends Request>(reqTypePrototype: new () => T) {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
        const controllerRequest: T = new reqTypePrototype();
        if (!controllerRequest.validate(req)) {
          throw new HttpException(400, 'Bad request');
        }
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
