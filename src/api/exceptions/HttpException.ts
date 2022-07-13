export default class HttpException extends Error {
  status: number;

  message: any;

  extra: any;

  constructor(status: number, message: any, extra?: any) {
    super(message);
    this.status = status;
    this.message = message;
    this.extra = extra;
  }
}

export class BadRequestException extends HttpException {
  constructor(extra?: any) {
    super(400, 'Bad Request', extra);
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(extra?: any) {
    super(500, 'Internal Server Error', extra);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(extra?: any) {
    super(401, 'Unauthorized', extra);
  }
}

export class ForbiddenException extends HttpException {
  constructor(extra?: any) {
    super(403, 'Forbidden', extra);
  }
}

export class NotFoundException extends HttpException {
  constructor(extra?: any) {
    super(404, 'Not Found', extra);
  }
}

export class MethodNotAllowedException extends HttpException {
  constructor(extra?: any) {
    super(405, 'Method Not Allowed', extra);
  }
}

export class RequestTimeoutException extends HttpException {
  constructor(extra?: any) {
    super(408, 'Request Timeout', extra);
  }
}
