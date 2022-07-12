import customExpress from '../../lib/customExpress/customExpress';
import Controller from '../controller';
import ExampleController from '../controllers/example.ctrl';
import authCheck from '../mdw/authCheck';
import UpdateExampleRequest from '../schema/UpdateExampleRequest';

const app = customExpress();

app.put(
    '/:id',
    authCheck,
    Controller.validate(UpdateExampleRequest),
    Controller.run(ExampleController.updateExample),
);

export default app;
