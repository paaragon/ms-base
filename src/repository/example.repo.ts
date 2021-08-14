import { getRepository } from "typeorm";
import ExampleDB from "../models/dbentities/example.db";

export default {
    async getExample(id: number): Promise<ExampleDB> {
        return getRepository(ExampleDB).findOne(id);
    },

    async saveExample(example: ExampleDB): Promise<ExampleDB> {
        return getRepository(ExampleDB).save(example);
    }
}