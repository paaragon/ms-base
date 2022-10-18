import exampleRepo from '../../db/repository/example.repo';
import Example from '../../models/example.model';
import UpdateExampleRequest from '../schema/UpdateExampleRequest';
import UpdateExampleResponse from '../schema/UpdateExampleResponse';

export default class ExampleController {
  static async updateExample(req: UpdateExampleRequest): Promise<UpdateExampleResponse> {
    const id = parseInt(req.params.id, 10);
    const avatar = req.body.avatar;

    const example: Example = req.body;
    example.id = id;
    example.avatar = avatar;

    const result = await exampleRepo.saveExample(example);

    return {
      error: false,
      result,
    };
  }
  static async timeout(req: any): Promise<UpdateExampleResponse> {
    await new Promise((res) => {
      setTimeout(() => {
        console.log('This has executed unit the end');
        res(true);
      }, 10000);
    });

    console.log('Esto se ejecuta después del timeout');

    return {
      error: false,
      result: {},
    };
  }
}
