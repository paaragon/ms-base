import Controller from '../schema/Controller';
import ExampleRequest from '../schema/ExampleRequest';
import ExampleResponse from '../schema/ExampleResponse';


export default class ExampleController extends Controller {
  async example(req: ExampleRequest): Promise<ExampleResponse> {

    const id = req.params.id;
    const name = req.body.name;
    const type = req.body.type;

    return {
      error: false,
      message: `Received parameters:\n\tid: ${id}\n\tname: ${name}\n\ttype: ${type}`
    };
  }
}