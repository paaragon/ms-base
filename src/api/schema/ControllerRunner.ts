import express from 'express';
import HttpException from '../exceptions/HttpException';
import Request from './Request';
import Response from './Response';

export default class ControllerRunner {
  public static validateAndRun<T extends Request, S extends Response>(
      reqTypePrototype: new () => T,
      method: (req: T) => Promise<S>,
  ) {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
        const controllerRequest: T = new reqTypePrototype();
        if (!controllerRequest.validate(req)) {
          throw new HttpException(400, 'Bad request');
        }

        controllerRequest.body = req.body;
        controllerRequest.params = req.params;
        controllerRequest.headers = req.headers;
        controllerRequest.query = req.query;

        const response = await method(controllerRequest);

        res.json(response);
      } catch (e) {
        next(e);
      }
    };
  }
}
