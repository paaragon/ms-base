import { NextFunction, Request, Response } from 'express';
import ExampleDB from '../../models/dbentities/example.db';
import exampleRepo from '../../repository/example.repo';
import HttpException from '../exceptions/HttpException';

export default {
  async getExample(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const result: ExampleDB = await exampleRepo.getExample(parseInt(id, 0));

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