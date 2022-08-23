import Controller from '../controller';
import ExampleController from '../controllers/example.ctrl';
import customExpress from '../lib/customExpress/customExpress';
import authCheck from '../mdw/authCheck';
import UpdateExampleRequest from '../schema/UpdateExampleRequest';

const app = customExpress();

app.put(
    '/:id',
    authCheck,
    Controller.validate(UpdateExampleRequest),
    Controller.run(ExampleController.updateExample),
);

app.get(
    '/timeout',
    authCheck,
    Controller.run(ExampleController.timeout),
);

export default app;
