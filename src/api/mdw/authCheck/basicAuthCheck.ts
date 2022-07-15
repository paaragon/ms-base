import config from 'config';
import { ConfigApiI } from '../../../config';
import AbstractCheck from './abstractCheck';

export default class BasicAuthCheck implements AbstractCheck {
  async validate(basicToken: string): Promise<boolean> {
    const [user, pass] = this.getUserPass(basicToken);

    if (!this.validateAuth(user, pass)) {
      return false;
    }

    return true;
  }

  private getUserPass(basicAuth: string): string[] {
    const token = basicAuth.replace('Basic ', '');
    const buff = Buffer.from(token, 'base64');
    const decodedToken = buff.toString('ascii');
    return decodedToken.split(':');
  }

  private validateAuth(user: string, pass: string): boolean {
    const securityConfig = config.get<ConfigApiI>('api').security;
    return securityConfig[user] && securityConfig[user] === pass;
  }
}
