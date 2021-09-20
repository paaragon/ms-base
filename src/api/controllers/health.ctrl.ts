import { NextFunction, Request, Response } from 'express';
import moment from 'moment';

const startTime = new Date();

export default {
  async getHealth(req: Request, res: Response, next: NextFunction) {
    const timeUpMs = new Date().getTime() - startTime.getTime();
    return res.json({
      status: 'OK',
      timeUpMs,
      timeUpHuman: moment.duration(timeUpMs).humanize(),
    });
  },
}