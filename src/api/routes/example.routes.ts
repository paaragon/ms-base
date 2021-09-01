import { body, param } from 'express-validator';
import customExpress from '../../lib/customExpress/customExpress';
import exampleCtrl from '../controllers/example.ctrl';
import authCheck from '../mdw/authCheck';
import validateRequest from '../mdw/validateRequest';

const app = customExpress();

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

app.get('/slow/:id',
    authCheck, [
    param('id').isNumeric(),
], validateRequest, exampleCtrl.getExampleSlow);

export default app;
