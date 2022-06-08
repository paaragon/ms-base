import Example from '../../models/example.model';
import exampleRepo from '../../repository/example.repo';
import Controller from '../schema/Controller';
import UpdateExampleRequest from '../schema/UpdateExampleRequest';
import UpdateExampleResponse from '../schema/UpdateExampleResponse';


export default class ExampleController extends Controller {
  async updateExample(req: UpdateExampleRequest): Promise<UpdateExampleResponse> {

    const id = parseInt(req.params.id, 10);
    const example: Example = req.body;
    example.id = id;

    const result = await exampleRepo.saveExample(example);

    return {
      error: false,
      result: result
    };
  }
}