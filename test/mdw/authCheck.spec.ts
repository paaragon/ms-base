import config from 'config';
import { NextFunction, Request, Response } from 'express';
import { mocked } from 'jest-mock';
import authCheck from '../../src/api/mdw/authCheck';

jest.mock('config');

describe('check auth mdw', () => {
    beforeAll(() => {
        mocked(config).get.mockReturnValue({ security: { admin: 'admin' } });
    });

    test('access granted OK', (done) => {
        const authorization = 'Basic ' + Buffer.from(`admin:admin`, 'utf-8').toString('base64');
        const req: Request = {
            headers: {
                authorization
            }
        } as Request;

        const res: Response = {} as Response;
        const next: NextFunction = () => {
            done();
        }

        authCheck(req, res, next);
    });

    test('wrong pass', () => {
        const authorization = 'Basic ' + Buffer.from(`admin:asdf`, 'utf-8').toString('base64');
        const req: Request = {
            headers: {
                authorization
            }
        } as Request;

        const res: Response = {} as Response;
        const next: NextFunction = () => { };
        try {
            authCheck(req, res, next);
        } catch (e) {
            expect(e.status).toBe(401);
            expect(e.message).toBe('Access denied');
        }
    });

    test('no authorization header sent', () => {
        const authorization = 'Basic ' + Buffer.from(`admin:asdf`, 'utf-8').toString('base64');
        const req: Request = {
            headers: {}
        } as Request;

        const res: Response = {} as Response;
        const next: NextFunction = () => { };
        try {
            authCheck(req, res, next);
        } catch (e) {
            expect(e.status).toBe(401);
            expect(e.message).toBe('Access denied');
        }
    });
});