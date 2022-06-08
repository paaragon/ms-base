import customExpress from '../../lib/customExpress/customExpress';
import ExampleController from '../controllers/example.ctrl';
import authCheck from '../mdw/authCheck';
import UpdateExampleRequest from '../schema/UpdateExampleRequest';

const app = customExpress();

const controller = new ExampleController();

app.put('/:id',
    authCheck,
    controller.run(new UpdateExampleRequest(), controller.updateExample)
);

export default app;
