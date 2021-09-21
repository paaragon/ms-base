import { NextFunction, Request, Response } from 'express';
import Example from '../../models/example.model';
import exampleService from '../../services/example.service';
import HttpException from '../exceptions/HttpException';

export default {
  async getExample(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const result: Example = await exampleService.getExample(id);

      return res.json(result);

    } catch (e) {
      next(e);
    }
  },

  async getExampleSlow(req: Request, res: Response, next: NextFunction) {
    setTimeout(async () => {
      try {
        const { id } = req.params;

        const result: Example = await exampleService.getExample(id);

        return res.json(result);

      } catch (e) {
        next(e);
      }
    }, 10000);
  },

  async addExample(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, title, body } = req.body;

      const result: Example = await exampleService.getExample(id);

      return res.json(result);

    } catch (e) {
      next(e);
    }
  },

  async getError(req: Request, res: Response, next: NextFunction) {
    const status = parseInt(req.params.status, 10);

    next(new HttpException(status, 'error'));
  }
}