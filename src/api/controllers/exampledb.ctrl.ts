import { NextFunction, Request, Response } from 'express';
import ExampleDB from '../../models/dbentities/example.db';
import exampleRepo from '../../repository/example.repo';

export default {
  async getExample(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const result: ExampleDB = await exampleRepo.getExample(parseInt(id));

      return res.json(result);

    } catch (e) {
      next(e);
    }
  },

  async addExample(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, lastName } = req.body;

      const exampleDB: ExampleDB = {
        name,
        lastName,
        date: new Date(),
      };

      const result: ExampleDB = await exampleRepo.saveExample(exampleDB);

      return res.json(result);

    } catch (e) {
      next(e);
    }
  },
}