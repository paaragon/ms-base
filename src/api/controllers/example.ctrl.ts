import { NextFunction, Request, Response } from 'express';
import Example from '../../models/example.model';
import exampleService from '../../services/example.service';

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
}