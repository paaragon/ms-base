import express from 'express';
import Example from '../../models/example.model';
import HttpException from '../exceptions/HttpException';
import Request from './Request';

export default class UpdateExampleRequest extends Request {
  params: {
        id: string;
    };

  body!: Example;

  constructor() {
    super();
  }

  public validate(req: express.Request): boolean {
    if (!req.params.id) {
      throw new HttpException(400, 'Id param not found in url');
    }

    if (!req.body.name) {
      throw new HttpException(400, 'name not found in body');
    }

    if (!req.body.lastName) {
      throw new HttpException(400, 'lastName not found in body');
    }

    if (!req.body.date) {
      throw new HttpException(400, 'date not found in body');
    }

    if (isNaN(new Date(req.body.date).getDate())) {
      throw new HttpException(400, 'date is not valid');
    }

    return true;
  }
}
