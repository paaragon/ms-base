import express from 'express';
import { body, param } from 'express-validator';
import exampleCtrl from '../controllers/example.ctrl';
import authCheck from '../mdw/authCheck';
import validateRequest from '../mdw/validateRequest';

const app = express();

app.get('/:id',
    authCheck, [
    param('id').isNumeric(),
], validateRequest, exampleCtrl.getExample);

app.post('/',
    authCheck, [
    body('userId').isNumeric(),
    body('title').isString(),
    body('body').isString(),
], validateRequest, exampleCtrl.addExample);

export default app;
