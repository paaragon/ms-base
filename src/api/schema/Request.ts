import express from 'express';

export default abstract class Request {
  public body: any;

  public headers: any;

  public query: any;

  public params: any;

  constructor() {
  }

    public abstract validate(req: express.Request): boolean;
}
