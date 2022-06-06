import express from 'express';
import Request from './Request';

export default class ExampleRequest extends Request {

    params: {
        id: string;
    };

    body!: {
        name: string;
        type: 'test1' | 'test2';
    };

    constructor() {
        super();
    }

    public validate(req: express.Request): boolean {
        return req.params.id
            && !isNaN(parseInt(req.params.id, 10))
            && req.body.name
            && ['test1', 'test2'].indexOf(req.body.type) !== -1
    }
}