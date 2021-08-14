class HttpException extends Error {
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

export default HttpException;
