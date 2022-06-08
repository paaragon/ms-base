import { AppDataSource } from '../db/db-connector';
import ExampleDB from '../db/entities/example.db';
import Example from '../models/example.model';

export default {
  async getExample(id: number): Promise<Example> {
    const result: ExampleDB = await AppDataSource.getRepository(ExampleDB).findOne({
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
