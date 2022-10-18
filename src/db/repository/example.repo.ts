import Example from '../../models/example.model';
import { AppDataSource } from '../db-connector';
import ExampleDB from '../entities/example.db';

export default {
  async getExample(id: number): Promise<Example> {
    const result: ExampleDB = await AppDataSource
        .getRepository(ExampleDB)
        .findOne({
          where: { id },
        });

    return result.serialize();
  },

  async saveExample(example: Example): Promise<Example> {
    const entity: ExampleDB = new ExampleDB();
    entity.deserialize(example);
    return AppDataSource.getRepository(ExampleDB).save(example);
  },
};
