import config from 'config';
import { NextFunction, Request, Response } from 'express';
import { ConfigApiI } from '../../models/ConfigI';
import HttpException from '../exceptions/HttpException';

export default function (req: Request, res: Response, next: NextFunction) {
    const auth = req.headers.authorization;

    if (!auth) {
        throw new HttpException(401, 'Access denied');
    }

    const [user, pass] = getUserPass(auth);

    if (!validateAuth(user, pass)) {
        throw new HttpException(401, 'Access denied');
    }

    next();
}

function getUserPass(basicAuth: string): string[] {
    const token = basicAuth.replace('Basic ', '');
    const buff = Buffer.from(token, 'base64');
    const decodedToken = buff.toString('ascii');
    return decodedToken.split(':');
}

function validateAuth(user: string, pass: string): boolean {
    const securityConfig = config.get<ConfigApiI>('api').security;
    return securityConfig[user] && securityConfig[user] === pass;
}