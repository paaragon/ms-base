import customExpress from '../../lib/customExpress/customExpress';
import ExampleController from '../controllers/example.ctrl';
import authCheck from '../mdw/authCheck';
import ExampleRequest from '../schema/ExampleRequest';

const app = customExpress();

const controller = new ExampleController();

app.put('/:id',
    authCheck,
    controller.run(new ExampleRequest(), controller.example)
);

export default app;
