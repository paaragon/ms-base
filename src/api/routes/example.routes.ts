import customExpress from '../../lib/customExpress/customExpress';
import ExampleController from '../controllers/example.ctrl';
import authCheck from '../mdw/authCheck';
import UpdateExampleRequest from '../schema/UpdateExampleRequest';

const app = customExpress();

app.put(
    '/:id',
    authCheck,
    ExampleController.run(new UpdateExampleRequest(), ExampleController.updateExample),
);

export default app;
