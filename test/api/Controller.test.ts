import { NextFunction, Request as ExpressRequest, Response as ExpressResponse } from 'express';
import Controller from '../../src/api/Controller';
import HttpException from '../../src/api/exceptions/HttpException';
import Request from '../../src/api/schema/Request';
import Response from '../../src/api/schema/Response';

class TestRequest extends Request {
  public validate(req: ExpressRequest): boolean {
    return req.body &&
      req.body.var1 &&
      req.body.var1 === 'hello world!'
  }
}

class TestResponse implements Response {
  err: boolean;
  msg: string;
}

describe('API Controller tests', () => {
  test('Valid request OK', (done) => {
    const validateMDW: (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => void =
      Controller.validate(TestRequest);

    const req: ExpressRequest = {
      body: {
        var1: 'hello world!',
      },
    } as ExpressRequest;

    const res: ExpressResponse = {} as ExpressResponse;

    const next = (data: any) => {
      expect(data).toBeUndefined();
      done();
    };

    validateMDW(req, res, next);
  });

  test('Valid request KO', (done) => {
    const validateMDW: (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => void =
      Controller.validate(TestRequest);

    const req: ExpressRequest = {
      body: {
        var1: 'wrong request',
      },
    } as ExpressRequest;

    const res: ExpressResponse = {} as ExpressResponse;

    const next = (data: any) => {
      expect(data).not.toBeUndefined();
      done();
    };

    validateMDW(req, res, next);
  });

  test('Run request OK', (done) => {
    const controllerFn = async (req: TestRequest): Promise<TestResponse> => {
      return {
        err: false,
        msg: 'hello world!',
      };
    }

    const runMdw = Controller.run(controllerFn);

    const req: ExpressRequest = {} as ExpressRequest;
    const res: ExpressResponse = {
      json: (data: any) => {
        expect(data.err).toBe(false);
        expect(data.msg).toBe('hello world!');
        done();
      },
    } as ExpressResponse;
    const next = (data: any) => { };

    runMdw(req, res, next);
  });

  test('Run request with exception OK', (done) => {
    const controllerFn = async (req: TestRequest): Promise<TestResponse> => {
      throw new HttpException(500, 'Internal server error');
    }

    const runMdw = Controller.run(controllerFn);

    const req: ExpressRequest = {} as ExpressRequest;
    const res: ExpressResponse = {
      json: (data: any) => { },
    } as ExpressResponse;
    const next = (data: any) => {
      expect(data.status).toBe(500);
      done();
    };

    runMdw(req, res, next);
  });
});
