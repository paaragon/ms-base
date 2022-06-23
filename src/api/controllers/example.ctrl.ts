import Example from '../../models/example.model';
import exampleRepo from '../../repository/example.repo';
import exampleService from '../../services/example.service';
import Controller from '../schema/Controller';
import UpdateExampleRequest from '../schema/UpdateExampleRequest';
import UpdateExampleResponse from '../schema/UpdateExampleResponse';

export default class ExampleController extends Controller {
  static async updateExample(req: UpdateExampleRequest): Promise<UpdateExampleResponse> {
    const id = parseInt(req.params.id, 10);
    const example: Example = req.body;
    example.id = id;

    const avatar = await exampleService.getAvatar(id);
    example.avatar = avatar;

    const result = await exampleRepo.saveExample(example);

    return {
      error: false,
      result,
    };
  }
}
