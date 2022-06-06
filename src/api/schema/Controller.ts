import express from 'express';
import HttpException from '../exceptions/HttpException';
import Request from './Request';
import Response from './Response';

export default class Controller {
    public run<T extends Request, S extends Response>(requestType: T, method: (req: T) => Promise<S>) {
        return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            try {
                if (!requestType.validate(req)) {
                    throw new HttpException(400, 'Bad request');
                }

                requestType.body = req.body;
                requestType.params = req.params;
                requestType.headers = req.headers;
                requestType.query = req.query;

                const response = await method(requestType);

                res.json(response);
            } catch (e) {
                next(e);
            }
        }
    }
}