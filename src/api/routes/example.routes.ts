import customExpress from '../../lib/customExpress/customExpress';
import ExampleController from '../controllers/example.ctrl';
import authCheck from '../mdw/authCheck';
import ControllerRunner from '../schema/ControllerRunner';
import UpdateExampleRequest from '../schema/UpdateExampleRequest';

const app = customExpress();

app.put(
    '/:id',
    authCheck,
    ControllerRunner.validateAndRun(UpdateExampleRequest, ExampleController.updateExample),
);

export default app;
