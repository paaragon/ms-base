import { body, param } from 'express-validator';
import customExpress from '../../lib/customExpress/customExpress';
import exampledbCtrl from '../controllers/exampledb.ctrl';
import authCheck from '../mdw/authCheck';
import validateRequest from '../mdw/validateRequest';

const app = customExpress();

app.get('/:id',
    authCheck, [
    param('id').isNumeric(),
], validateRequest, exampledbCtrl.getExample);

app.post('/',
    authCheck, [
    body('name').isString(),
    body('lastName').isString(),
], validateRequest, exampledbCtrl.addExample);

export default app;
