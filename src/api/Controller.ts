import config from 'config';
import express from 'express';
import { ConfigApiI } from '../config';
import HttpException, { RequestTimeoutException } from './exceptions/HttpException';
import Request from './schema/Request';
import Response from './schema/Response';

const timeout = config.get<ConfigApiI>('api').timeout;

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
        const reqPromises: Promise<any>[] = [method(req as any)]

        if (timeout) {
          const timeoutPromise = new Promise((resolve, reject) => {
            setTimeout(() => reject(new RequestTimeoutException()), timeout);
          });

          reqPromises.push(timeoutPromise);
        }

        const response = await Promise.race(reqPromises);

        res.json(response);
      } catch (e) {
        next(e);
      }
    };
  }
}
